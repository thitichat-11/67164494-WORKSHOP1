import db from '../../Database/db.js';

// 🐷 ดึงข้อมูลสินค้าตาม id
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