import db from "../../Database/db.js";

export const UsersCheckout = async (req, res) => {
    const userId = req.user.id;

    // เช็คว่ามีไฟล์สลีปแนบมาไหม
    if (!req.file) {
        return res.status(400).json({ message: "กรุณาแนบหลักฐานการโอนเงิน" });
    }
    const paymentSlipPath = `/uploads/payment-slips/${req.file.filename}`;


    const {
        total_price, payment_method, email, first_name, last_name,
        phone, address, city, state, postcode, country, subtotal, shipping_free
    } = req.body;

    const cart_items = JSON.parse(req.body.cart_items);

    try {
        await db.query("START TRANSACTION");

        // ดึงสินค้าในตะกร้าของ User คนนี้มาตรวจสอบและประมวลผล
        const cartQuery = `
            SELECT ci.cart_id, ci.variant_id, ci.quantity, p.base_price, pv.stock_quantity, p.name
            FROM cart_items ci
            JOIN product_variants pv ON ci.variant_id = pv.variant_id
            JOIN products p ON pv.product_id = p.product_id
            WHERE ci.user_id = ?
        `;

        const [cartItems] = await db.query(cartQuery, [userId]);

        // ถ้าไม่มีของในตะกร้า ให้ดีดออกทันที
        if (cartItems.length === 0) {
            await db.query("ROLLBACK");
            return res.status(400).json({ message: "ไม่พบสินค้าในตะกร้าสำหรับการสั่งซื้อ" });
        }

        // เช็กสต็อกสินค้า
        for (const item of cartItems) {
            if (item.quantity > item.stock_quantity) {
                await db.query("ROLLBACK");
                // เปลี่ยนมาใช้ Backticks (`) ครอบข้อความเพื่อให้ใช้ ${} แสดงชื่อตัวแปรได้ถูกต้อง
                return res.status(400).json({
                    message: `ไม่สามารถสั่งซื้อได้ เนื่องจากสินค้า ${item.name} เกินจำนวนสต็อก (เหลือในคลัง ${item.stock_quantity} ชิ้น)`
                });
            }
        }

        // บันทึกข้อมูลใบสั่งซื้อหลักลงตาราง orders
        const orderQuery = `
            INSERT INTO orders (
                user_id, total_price, payment_method, email, first_name, last_name, 
                phone, address, city, state, postcode, country, subtotal, shipping_free, 
                payment_slip, status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
        `;

        const [orderResult] = await db.query(orderQuery, [
            userId, total_price, payment_method, email, first_name, last_name,
            phone, address, city, state, postcode, country, subtotal, shipping_free,
            paymentSlipPath
        ]);

        const orderId = orderResult.insertId; // ดึง id ออเดอร์ที่เพิ่งสร้าง

        // วนลูปบันทึกสินค้าลงตาราง order_items และทำการตัดสต็อกสินค้าทีละชิ้น
        const insertItemQuery = `
            INSERT INTO order_items (order_id, variant_id, quantity, price) 
            VALUES (?, ?, ?, ?)
        `;
        const updateStockQuery = `
            UPDATE product_variants 
            SET stock_quantity = stock_quantity - ? 
            WHERE variant_id = ?
        `;

        for (const item of cartItems) {
            // บันทึกรายละเอียดสินค้าที่ซื้อลง order_items (ใช้ราคา ณ วินาทีที่ซื้อจาก DB เพื่อความปลอดภัย)
            await db.query(insertItemQuery, [orderId, item.variant_id, item.quantity, item.base_price]);

            // ตัดสต็อกสินค้าตาม variant ที่ระบุ
            await db.query(updateStockQuery, [item.quantity, item.variant_id]);
        }

        // เคลียร์ตะกร้าสินค้าของ User คนนี้ออกให้หมด (เมื่อซื้อเรียบร้อยแล้ว)
        await db.query(`DELETE FROM cart_items WHERE user_id = ?`, [userId]);

        // ถ้าทำงานถูกต้องครบถ้วน ให้บันทึกข้อมูลถาวรลงฐานข้อมูล
        await db.query("COMMIT");

        // ส่งข้อมูลกลับไปบอกหน้าบ้าน
        return res.status(201).json({
            success: true,
            message: "คำสั่งซื้อสำเร็จเรียบร้อยแล้ว",
            order_id: orderId
        });

    } catch (error) {
        // หากมีอะไรพังในระบบ ให้ทำ Rollback เพื่อยกเลิกทุกคำสั่ง SQL ด้านบนทันที
        await db.query("ROLLBACK");
        console.error("Checkout System Error:", error);
        return res.status(500).json({ message: "Checkout failed", error: error.message });
    }
};