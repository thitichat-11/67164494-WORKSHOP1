import db from '../../Database/db.js';

// ==========================================
// 1. ดึงรายการ Order ทั้งหมดในระบบ (GET /api/orders)
// ==========================================
export const getAllOrders = async (req, res) => {
    try {
        // ดึงข้อมูล Order ทั้งหมด พร้อมชื่อผู้ใช้งาน (ถ้ามี)
        const [orders] = await db.query(`
            SELECT 
                o.*, 
                u.username AS account_username
            FROM orders o
            LEFT JOIN users u ON o.user_id = u.user_id
            ORDER BY o.created_at DESC
        `);

        // ดึงรายการสินค้าย่อย (Order Items) ในแต่ละ Order
        for (let order of orders) {
            const [items] = await db.query(`
                SELECT 
                    oi.item_id, 
                    oi.quantity, 
                    oi.price, 
                    pv.color, 
                    pv.size, 
                    pv.code, 
                    p.product_id,
                    p.name AS product_name,
                    pi.img_url AS primary_image
                FROM order_items oi
                LEFT JOIN product_variants pv ON oi.variant_id = pv.variant_id
                LEFT JOIN products p ON pv.product_id = p.product_id
                LEFT JOIN product_images pi ON p.product_id = pi.product_id AND pi.is_primary = 1
                WHERE oi.order_id = ?
            `, [order.order_id]);

            order.items = items;
        }

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ 
            message: "เกิดข้อผิดพลาดในการดึงรายการคำสั่งซื้อ", 
            error: error.message 
        });
    }
};

// ==========================================
// 2. อัปเดตสถานะ Order (PUT /api/orders/:id/status)
// (เผื่อ Admin กดเปลี่ยนสถานะ เช่น pending -> paid / shipped / cancelled)
// ==========================================
export const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ message: "กรุณาระบุสถานะที่ต้องการเปลี่ยน" });
    }

    try {
        const [result] = await db.query(
            'UPDATE orders SET status = ? WHERE order_id = ?',
            [status, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "ไม่พบคำสั่งซื้อนี้" });
        }

        res.status(200).json({ message: "อัปเดตสถานะคำสั่งซื้อสำเร็จ " });
    } catch (error) {
        res.status(500).json({ 
            message: "เกิดข้อผิดพลาดในการอัปเดตสถานะคำสั่งซื้อ", 
            error: error.message 
        });
    }
};