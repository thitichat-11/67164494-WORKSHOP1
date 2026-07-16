import db from '../../Database/db.js';

// ดึงข้อมูลสินค้าชิ้นเดียวตาม ID สำหรับหน้า PickItem ของเรา
export const getItemById = async (req, res) => {
    const { id } = req.params

    try {
        // ดึงข้อมูลสินค้าหลัก
        const [products] = await db.query(`
            SELECT p.*, c.category_name, c.category_slug 
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.category_id
            WHERE p.product_id = ?
        `, [id])

        if (products.length === 0) {
            return res.status(404).json({ message: "ไม่พบข้อมูลสินค้าชิ้นนี้" })
        }

        const product = products[0]

        // ดึงรูปภาพ และ ตัวเลือก (Variants)
        const [images] = await db.query('SELECT * FROM product_images WHERE product_id = ?', [id])
        const [variants] = await db.query('SELECT * FROM product_variants WHERE product_id = ?', [id])

        res.status(200).json({
            ...product,
            images: images,
            variants: variants
        })

    } catch (error) {
        res.status(500).json({ 
            message: "เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า", 
            error: error.message 
        })
    }
}