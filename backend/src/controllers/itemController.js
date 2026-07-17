import db from '../../Database/db.js';

// ดึงข้อมูลสินค้าตาม id
export const getItemById = async (req, res) => {
    const { id } = req.params // รับ id

    try {
        // ดึงข้อมูลสินค้าหลัก
        const [products] = await db.query(
            `SELECT p.*, c.category_name, c.category_slug 
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.category_id
            WHERE p.product_id = ?`, [id])

        // เช็คว่ามีสินค้ามั้ย
        if (products.length === 0) {
            return res.status(404).json({ message: "ไม่พบข้อมูลสินค้าชิ้นนี้" })
        }

        const product = products[0]


        // ดึงรูปกับ size สี
        const [images] = await db.query(
            `SELECT * FROM product_images 
            WHERE product_id = ?`, [id])

        const [variants] = await db.query(
            `SELECT * FROM product_variants 
            WHERE product_id = ?`, [id])


        // ดึงสินค้าแนะนำ ซึ่งก็จะต้องไม่ใช่อันที่เราเลือกไว้ <>
        const [recommendedRows] = await db.query(
            `SELECT 
                p.product_id,
                p.name,
                p.base_price,
                c.category_name,
                pi.img_url
            FROM products p
            LEFT JOIN categories c
                ON p.category_id = c.category_id
            LEFT JOIN product_images pi
                ON p.product_id = pi.product_id
                AND pi.is_primary = 1
            WHERE p.product_id <> ?
            LIMIT 4`, [id])


        // ใส่สีของแต่ละสินค้าแนะนำ
        const recommended = await Promise.all(
            recommendedRows.map(async (item) => {

                const [colors] = await db.query(
                    `SELECT DISTINCT color
                     FROM product_variants
                     WHERE product_id = ?`,
                    [item.product_id])

                return {
                    id: item.product_id,
                    image: item.img_url,
                    tag: item.category_name,
                    name: item.name,
                    price: `$${item.base_price}`,
                    colors: colors.map(c => c.color)
                }
            })
        )

        // อันนี้คือข้อมูลที่ส่งกลับฟ้อนเอน
        res.status(200).json({
            ...product,
            images: images,
            variants: variants,
            recommended: recommended
        })

    } catch (error) {
        res.status(500).json({
            message: "เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า",
            error: error.message
        })
    }
}

export const addToCart = async (req, res) => {
    const { userId, variant_id, quantity } = req.body;

    try {
        // เช็คก่อนว่ามีสินค้านี้ในตะกร้าของ user คนนี้หรือยัง
        const [existing] = await db.query(
            "SELECT * FROM cart_items WHERE user_id = ? AND variant_id = ?",
            [userId, variant_id]
        );

        if (existing.length > 0) {
            // ถ้ามีแล้ว ให้บวกจำนวนเพิ่ม
            await db.query(
                "UPDATE cart_items SET quantity = quantity + ? WHERE cart_id = ?",
                [quantity, existing[0].cart_id]
            );
        } else {
            // ถ้ายังไม่มี ให้เพิ่มใหม่
            await db.query(
                "INSERT INTO cart_items (user_id, variant_id, quantity) VALUES (?, ?, ?)",
                [userId, variant_id, quantity]
            );
        }
        res.status(200).json({ message: "เพิ่มสินค้าเข้าตะกร้าสำเร็จ" });
    } catch (error) {
        res.status(500).json({ message: "เพิ่มสินค้าไม่สำเร็จ", error: error.message });
    }
};

// ดึงข้อมูลมาโชว์
export const getCartItems = async (req, res) => {
    const { userId } = req.params // ดึง id จาก url

    try {
        const query = 
        `SELECT 
            ci.cart_id, 
            ci.quantity, 
            p.name AS product_name, 
            p.base_price, 
            pv.variant_id, 
            pv.color, 
            pv.size,
            pi.img_url
        FROM cart_items ci
        JOIN product_variants pv ON ci.variant_id = pv.variant_id
        JOIN products p ON pv.product_id = p.product_id
        LEFT JOIN product_images pi ON p.product_id = pi.product_id AND pi.is_primary = 1
        WHERE ci.user_id = ?`
        
        // ยิงเข้า db ด้วย id ที่เราต้องการ
        const [rows] = await db.query(query, [userId])
        res.status(200).json(rows)
    } 
    catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: "ดึงข้อมูลตะกร้าไม่สำเร็จ", error: error.message })
    }
}

// อัพเดตจำนวนสินค้าในตะกร้า
export const updateCartItemQuantity = async (req, res) => {
    const { cart_id } = req.params // ดึง id จาก url
    const { quantity } = req.body // ดึงจำนวนสินค้าในตะกร้ามา

    try {
        // ก็ถ้าของในตะกร้าเป็น 0 ก็ให้ลบไปเลย
        if (quantity <= 0) {
            await db.query(
                `DELETE 
                FROM cart_items 
                WHERE cart_id = ?`
                , [cart_id])
            
        // ส่งกลับ
        res.status(200).json({ message: "Item removed" })
        
    } 
        else {
            // อัพเคตค่าจำนวนสินค้าในตะกร้า
            await db.query(`
                UPDATE cart_items 
                SET quantity = ? 
                WHERE cart_id = ?`
                , [quantity, cart_id])

            // ส่งกลับฟ้อนเอน
            res.status(200).json({ message: "Quantity updated" })
        }
    } catch (error) {
        res.status(500).json({ message: "Update failed", error: error.message })
    }
}