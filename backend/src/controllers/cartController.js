import db from '../../Database/db.js';

// 🐷 ดึงข้อมูลสินค้าที่ระบุเพื่อนำไปแสดงในตะกร้าช็อปปิ้ง
export const getCartItemDetail = async (req, res) => {
    const { id } = req.params // รับ id

    try {
        // ดึงข้อมูลสินค้า
        const [products] = await db.query(`
            SELECT p.product_id, p.name, p.base_price, c.category_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.category_id
            WHERE p.product_id = ?`, [id])

        // เช็คว่ามีสินค้ามั้ย
        if (products.length === 0) {
            return res.status(404).json({ message: "ไม่พบข้อมูลสินค้าชิ้นนี้ในระบบ" })
        }

        const product = products[0]

        // ดึงมารูปมารูปนึง
        let imageUrl = null
        try {
            const [images] = await db.query(
                `SELECT img_url 
                FROM product_images 
                WHERE product_id = ? AND is_primary = 1
                LIMIT 1`, [id])

            if (images.length > 0) imageUrl = images[0].img_url
            } 
            catch (imgError) {
                console.log("ตาราง product_images มีปัญหา หรือไม่มีคอลัมน์ img_url/is_primary:", imgError.message)
            }

        // ดึงตัวเลือกนางมาด้วย
        let variantData = null
        try {
            const [variants] = await db.query(`
                SELECT color, size, stock_quantity 
                FROM product_variants 
                WHERE product_id = ?
                LIMIT 1`, [id])

            // เช็คว่านางส่งมาแล้วจริง ๆ
            if (variants.length > 0) {
                variantData = {
                    color: variants[0].color,
                    size: variants[0].size,
                    stock: variants[0].stock_quantity
                }
            }
        } catch (variantError) {
            console.log("ตาราง product_variants มีปัญหา หรือไม่มีคอลัมน์ stock_quantity:", variantError.message)
            variantData = { color: "BROWN", size: "XS", stock: 5 } // อันนี้เผื่อพังจะได้มีโชว์
        }

        // ส่งข้อมูลกลับฟ้อนเอน
        res.status(200).json({
            id: product.product_id,
            name: product.name,
            price: product.base_price,
            category: product.category_name,
            image: imageUrl,
            variant: variantData
        })

    } catch (error) {
        console.error("Error details:", error)
        res.status(500).json({
            message: "เกิดข้อผิดพลาดในการดึงข้อมูลสินค้าสำหรับตะกร้าช็อปปิ้ง",
            error: error.message
        })
    }
}