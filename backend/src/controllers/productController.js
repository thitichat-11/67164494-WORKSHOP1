import db from '../../Database/db.js';

export const getProducts = async (req, res) => {
    try {
        // 1. ดึงข้อมูลสินค้าหลัก (JOIN หมวดหมู่มาด้วย)
        const [products] = await db.query(`
            SELECT p.*, c.category_name, c.category_slug 
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.category_id
            ORDER BY p.created_at DESC
        `);

        // 2. ดึงข้อมูลตัวเลือกสินค้า (Variants) ทั้งหมด
        const [variants] = await db.query('SELECT * FROM product_variants');

        // 3. ดึงข้อมูลรูปภาพ (Images) ทั้งหมด
        const [images] = await db.query('SELECT * FROM product_images');

        // 4. ประกอบร่าง (Data Mapping) จับ Variants และ Images ยัดเข้าไปในสินค้านั้นๆ
        const fullProducts = products.map(product => {
            // คัดกรองเอาเฉพาะตัวเลือกและรูปภาพที่มี product_id ตรงกับสินค้านี้
            const productVariants = variants.filter(v => v.product_id === product.product_id);
            const productImages = images.filter(i => i.product_id === product.product_id);

            // คำนวณสต็อกรวมเผื่อให้หน้าบ้านเอาไปทำป้าย In Stock / Out of Stock ได้ง่ายๆ
            const totalStock = productVariants.reduce((sum, item) => sum + Number(item.stock_quantity), 0);

            // ส่งข้อมูลกลับไปเป็นก้อน Object เดียวที่สมบูรณ์แบบ
            return {
                ...product,
                total_stock: totalStock,
                variants: productVariants,
                images: productImages
            };
        });
        res.status(200).json(fullProducts);
    } catch (error) {
        res.status(500).json({ 
            message: "เกิดข้อผิดพลาดในการดึงข้อมูลสินค้าแบบเต็ม", 
            error: error.message 
        });
    }
};

// ฟังก์ชันสำหรับเพิ่มสินค้าใหม่ (POST)
export const createProduct = async (req, res) => {
    const { category_id, name, description, base_price, variants, images } = req.body;

    // 1. Validation เบื้องต้น
    if (!name || !base_price) {
        return res.status(400).json({ message: "กรุณากรอกชื่อสินค้าและราคาเริ่มต้น" });
    }

    //ดึง Connection มาเพื่อทำ Transaction
    const connection = await db.getConnection();

    try {
        // เริ่มต้น Transaction
        await connection.beginTransaction();

        // สเต็ปที่ 1: เพิ่มข้อมูลลงตาราง products
        const productSql = 'INSERT INTO products (category_id, name, description, base_price) VALUES (?, ?, ?, ?)';
        const [productResult] = await connection.query(productSql, [category_id || null, name, description || null, base_price]);
        const newProductId = productResult.insertId; // ดึง ID ของสินค้าที่เพิ่งสร้างมาใช้ต่อ

        // สเต็ปที่ 2: เพิ่มข้อมูลตัวเลือกสินค้า (Variants) ถ้ามีส่งมา
        if (variants && variants.length > 0) {
            const variantSql = 'INSERT INTO product_variants (product_id, color, size, code, stock_quantity) VALUES (?, ?, ?, ?, ?)';
            for (const variant of variants) {
                await connection.query(variantSql, [
                    newProductId,
                    variant.color,
                    variant.size,
                    variant.code,
                    variant.stock_quantity || 0
                ]);
            }
        }

        // สเต็ปที่ 3: เพิ่มข้อมูลรูปภาพสินค้า (Images) ถ้ามีส่งมา
        if (images && images.length > 0) {
            const imageSql = 'INSERT INTO product_images (product_id, variant_id, img_url, is_primary) VALUES (?, ?, ?, ?)';
            for (const image of images) {
                await connection.query(imageSql, [
                    newProductId,
                    null, // ตอนแอดครั้งแรกเซ็ตคู่กับ product หลักไปก่อน
                    image.img_url,
                    image.is_primary || 0
                ]);
            }
        }

        // ถ้าทุกตารางบันทึกผ่านฉลุย ทำการ Commit บันทึกลง DB จริง
        await connection.commit();

        res.status(201).json({
            message: "เพิ่มสินค้าและข้อมูลที่เกี่ยวข้องสำเร็จ 🚀",
            productId: newProductId
        });

    } catch (error) {
        // หากเกิดข้อผิดพลาด ให้ Rollback ยกเลิกคำสั่งทั้งหมดทันที ป้องกันข้อมูลขยะค้างในระบบ
        await connection.rollback();
        res.status(500).json({
            message: "เกิดข้อผิดพลาดในการเพิ่มสินค้า",
            error: error.message
        });
    } finally {
        // คืน Connection กลับเข้า Pool หลังใช้งานเสร็จ
        connection.release();
    }
};