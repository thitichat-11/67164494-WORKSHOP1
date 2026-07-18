import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../../Database/db.js';

// เอาไว้ test เพิ่มรหัสที่ hash แล้ว
// node -e "const bcrypt = require('bcrypt'); console.log(bcrypt.hashSync('123456', 10));"

// 🐷 LOGIN
export const login = async (req, res) => {
    const { emailOrUsername, password } = req.body // รับจากฟ้อนเอน
    const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"

    // เช็ค usermame / email / password นางมามั้ย
    try {
        if (!emailOrUsername || !password) {
            return res.status(400).json({ message: 'กรุณากรอก Username หรือ Email และ Password' })
        }

        // เช็คว่าคนนี้ที่กรอกมามีข้อมูลในฐานข้อมูลจริงมั้ย
        const [users] = await db.query(
            `SELECT users.*, roles.role_name 
             FROM users 
             JOIN roles ON users.role_id = roles.role_id 
             WHERE users.username = ? OR users.email = ?`,[emailOrUsername, emailOrUsername])

        if (users.length === 0) {
            return res.status(404).json({ message: 'ไม่พบผู้ใช้นี้ในระบบ' })
        }

        const user = users[0]

        // ตรวจสอบรหัสผ่าน
        const isMatch = await bcrypt.compare(password, user.password)
        
        if (!isMatch) {
            return res.status(401).json({ message: 'รหัสผ่านไม่ถูกต้อง' })
        }

        // สร้าง token
        const token = jwt.sign(
            { id: user.user_id, role: user.role_name, role_id: user.role_id },
            JWT_SECRET,
            { expiresIn: '30m' }
        )

        // ที่จะส่งกลับไปฟ้อนเอน
        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.user_id,
                username: user.username,
                email: user.email,
                role: user.role_name,
                role_id: user.role_id
            }
        })

    } catch (error) {
        console.error("Login Error:", error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

// 🐷 LOGOUT
export const logout = async (req, res) => {
    try {
        const { refreshToken } = req.body

        // ลบ refresh token จากฐานข้อมูลไปด้วย
        await db.query("DELETE FROM refresh_tokens WHERE token = ?", [refreshToken])
        
        // ส่งกลับฟ้อนเอน
        return res.status(200).json({ message: 'Logout successful' })
    } 
    catch (error) {
        console.error("Logout Error:", error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

// 🐷 REFRESH TOKEN
export const refreshToken = async (req, res) => {
    const { refreshToken } = req.body
    if (!refreshToken) return res.status(401).json({ message: "Missing token" })

    try {
        // เช็คว่าได้รับมาจริงมั้ย
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET)

        // สร้าง token ใบใหม่มาให้
        const newAccessToken = jwt.sign(
            { id: decoded.id, role: decoded.role, role_id: decoded.role_id },
            process.env.JWT_SECRET,
            { expiresIn: '30m' }
        )

        // ส่ง token อันใหม่กลับไปฟ้อนเอน
        return res.status(200).json({ accessToken: newAccessToken })

    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired refresh token" })
    }
}