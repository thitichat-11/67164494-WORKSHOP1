import db from '../../Database/db.js';

// ==========================================
// 1. ดึงข้อมูล User ทั้งหมด (GET /api/users)
// ==========================================
export const getAllUsers = async (req, res) => {
    try {
        const [users] = await db.query(`
            SELECT 
                u.user_id, 
                u.username, 
                u.email, 
                u.phonenumber, 
                u.role_id, 
                r.role_name, 
                u.status, 
                u.created_at
            FROM users u
            LEFT JOIN roles r ON u.role_id = r.role_id
            WHERE u.role_id = 1 
            ORDER BY u.created_at DESC
        `);

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ 
            message: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้งาน", 
            error: error.message 
        });
    }
};

// ==========================================
// 2. ระงับ / ปลดระงับ บัญชีผู้ใช้ (PUT /api/users/:id/status)
// ==========================================
export const updateUserStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // รับค่า 'active' หรือ 'suspended'

    // Validation เบื้องต้น
    if (!status || !['active', 'suspended'].includes(status)) {
        return res.status(400).json({ 
            message: "กรุณาระบุสถานะเป็น 'active' หรือ 'suspended' เท่านั้น" 
        });
    }

    try {
        const [result] = await db.query(
            'UPDATE users SET status = ? WHERE user_id = ?',
            [status, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "ไม่พบผู้ใช้นี้ในระบบ" });
        }

        const statusMsg = status === 'suspended' ? 'ระงับบัญชีเรียบร้อย ' : 'เปิดใช้งานบัญชีเรียบร้อย ';
        res.status(200).json({ message: statusMsg });

    } catch (error) {
        res.status(500).json({ 
            message: "เกิดข้อผิดพลาดในการอัปเดตสถานะบัญชี", 
            error: error.message 
        });
    }
};