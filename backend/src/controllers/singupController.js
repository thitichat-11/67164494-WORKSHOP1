import db from "../../Database/db.js";
import bcrypt from 'bcrypt';

export const UserSingup = async (req, res) => {


    const { first_name, last_name, email, password, phonenumber, username, birthdate } = req.body;

    if (!first_name || !last_name || !email || !password || !phonenumber || !username || !birthdate) {
        return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
    }


    try {

        //validate เช็คว่าฟิลด์จำเป็นส่งมาครบไหม
        const [existingUser] = await db.query(
            "SELECT * FROM users WHERE email = ? OR username = ?", [email, username]
        );



        //เช็คว่า email หรือ username ซ้ำในระบบไหม
        if (existingUser.length > 0) {
            return res.status(409).json({ message: "อีเมลหรือชื่อผู้ใช้นี้ถูกใช้ไปแล้ว" });
        }

        //hash password ก่อนเก็บ
        const hashedPassword = await bcrypt.hash(password, 10);



        //insert ลง database ได้เลยจ้า
        const [result] = await db.query(
            `INSERT INTO users (first_name, last_name, email, password, phonenumber, username, birthdate, role_id)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [first_name, last_name, email, hashedPassword, phonenumber, username, birthdate, 1] 
            // role_id = 1 คือ customer ทั่วไป
        );


        //ตอบกลับ frontend
        return res.status(201).json({
            message: ' Successfully applied for membership ',
            userId: result.insertId
        });


    } catch (error) {


        console.error('Signup Error:', error);
        return res.status(500).json({ message: ' A system error occurred. Please try again. ' });


    }

}