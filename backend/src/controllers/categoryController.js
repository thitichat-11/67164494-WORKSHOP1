import db from '../../Database/db.js';


export const getCategories = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM categories');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ 
            message: "เกิดข้อผิดพลาดในการดึงข้อมูลหมวดหมู่", 
            error: error.message 
        });
    }
};

// 2. ฟังก์ชันเพิ่มหมวดหมู่ใหม่ (POST)
export const createCategory = async (req, res) => {
    const { category_name, category_slug } = req.body;
    
    // Validation เบื้องต้น
    if (!category_name) {
        return res.status(400).json({ message: "กรุณากรอกชื่อหมวดหมู่สินค้า" });
    }

    try {
        const sql = 'INSERT INTO categories (category_name, category_slug) VALUES (?, ?)';
        const [result] = await db.query(sql, [category_name, category_slug || null]);
        
        res.status(201).json({ 
            message: "เพิ่มหมวดหมู่สินค้าสำเร็จ", 
            categoryId: result.insertId 
        });
    } catch (error) {
        res.status(500).json({ 
            message: "เกิดข้อผิดพลาดในการเพิ่มหมวดหมู่", 
            error: error.message 
        });
    }
};