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