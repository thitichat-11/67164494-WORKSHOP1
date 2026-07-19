import db from "../../Database/db.js";

export const accountOverview = async (req, res) => {

    try {

        const userId = req.user.id; // ดึง userId จาก token ที่ถูกตรวจสอบแล้ว

        // ดึงข้อมูลบัญชีของผู้ใช้จากฐานข้อมูล
        const [rows] = await db.query(
            `SELECT user_id, first_name, last_name, email, username, phonenumber, birthdate, role_id, created_at
             FROM users
             WHERE user_id = ?`,
            [userId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({
            message: 'Account overview retrieved successfully',
            user: rows[0]
        });



    } catch (error) {

        console.error('Error retrieving account overview:', error);
        return res.status(500).json({ message: 'Internal server error , please try again later' });



    }

}


export const getMyOrders = async (req, res) => {

    try {

        const userId = req.user.id;

        const [orders] = await db.query(
            `SELECT order_id, total_price, status, created_at
             FROM orders
             WHERE user_id = ? AND status IN ('pending', 'completed')
             ORDER BY created_at DESC`,
            [userId]
        );

        if (orders.length === 0) {
            return res.status(200).json({ orders: [] });
        }

        for (const order of orders) {
            const [items] = await db.query(
                `SELECT
                    oi.item_id,
                    oi.quantity,
                    oi.price,
                    pv.color,
                    pv.size,
                    pi.img_url
                 FROM order_items oi
                 JOIN product_variants pv ON oi.variant_id = pv.variant_id
                 LEFT JOIN product_images pi
                    ON pi.product_id = pv.product_id AND pi.is_primary = 1
                 WHERE oi.order_id = ?`,
                [order.order_id]
            );

            order.items = items;
        }

        return res.status(200).json({ orders });

    } catch (error) {

        console.error('Get Orders Error:', error);
        return res.status(500).json({ message: 'Internal server error , please try again later'});

    }

}