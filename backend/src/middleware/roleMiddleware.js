export const authorizeRole = (requiredRole) => {
    return (req, res, next) => {
        console.log("--- ตรวจสอบสิทธิ์ ---")
        console.log("ข้อมูล User ที่ได้จาก Token:", req.user)
        console.log("Role ID ของ User:", req.user?.role_id)
        console.log("Role ID ที่ต้องการ:", requiredRole)
        
        // แปลงเป็น number ด้วยเพราะว่าบางที token นางอาจจะมาเลขมาเป็น string แล้วจะเช็คไม่ผ่าน
        if (req.user && Number(req.user.role_id) === Number(requiredRole)) {
            next()
        } 
        else {
            return res.status(403).json({ message: "ไม่มีสิทธิ์เข้าถึงส่วนนี้" })
        }
    }
}