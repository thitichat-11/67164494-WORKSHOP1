import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.status(401).json({ message: "กรุณาล็อกอินก่อน" })


    const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Token ไม่ถูกต้อง" })
        
        // แปะข้อมูล User ลงไปใน req controller มันจะได้เอาไปใช้ต่อได้
        req.user = user
        next()
    })
}