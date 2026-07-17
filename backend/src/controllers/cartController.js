import db from '../../Database/db.js';

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
        LEFT JOIN product_images pi ON p.product_id = pi.product_id
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