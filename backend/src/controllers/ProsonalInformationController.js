import db from "../../Database/db.js";



export const ProsonalInformation = async (req, res) => {
    try {

        const userId = req.user.id;

        const [rows] = await db.query(
            `SELECT first_name, last_name, email, phonenumber, birthdate , phonenumber, birthdate, role_id, created_at,
                country_region, house_number_street, apartment_suite_unit, town_city, state_province, postcode_zip
             FROM users
             WHERE user_id = ?`,
            [userId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({
            message: 'Personal information retrieved successfully',
            user: rows[0]
        })


    } catch (error) {
        console.error('Get Personal Information Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}








export const EditProsonalInformation = async (req, res) => {

    try {

        const userId = req.user.id;

        // รับมาเฉพาะ field ที่อนุญาตให้แก้ได้ ป้องกันคนส่ง field แปลกๆ เช่น role_id มาแก้เอง
        const {
            first_name, last_name, email, username, phonenumber, birthdate,
            country_region, house_number_street, apartment_suite_unit,
            town_city, state_province, postcode_zip
        } = req.body;

        const fieldsToUpdate = {};
        if (first_name !== undefined) fieldsToUpdate.first_name = first_name;
        if (last_name !== undefined) fieldsToUpdate.last_name = last_name;
        if (email !== undefined) fieldsToUpdate.email = email;
        if (username !== undefined) fieldsToUpdate.username = username;
        if (phonenumber !== undefined) fieldsToUpdate.phonenumber = phonenumber;
        if (birthdate !== undefined) fieldsToUpdate.birthdate = birthdate;
        if (country_region !== undefined) fieldsToUpdate.country_region = country_region;
        if (house_number_street !== undefined) fieldsToUpdate.house_number_street = house_number_street;
        if (apartment_suite_unit !== undefined) fieldsToUpdate.apartment_suite_unit = apartment_suite_unit;
        if (town_city !== undefined) fieldsToUpdate.town_city = town_city;
        if (state_province !== undefined) fieldsToUpdate.state_province = state_province;
        if (postcode_zip !== undefined) fieldsToUpdate.postcode_zip = postcode_zip;


        // ไม่ส่งอะไรมาแก้เลย
        if (Object.keys(fieldsToUpdate).length === 0) {
            return res.status(400).json({ message: 'Please indicate the information that needs to be revised.' });
        }


        // เช็คความซ้ำเฉพาะ field ที่ต้อง unique (email, username) และเช็คเฉพาะตอนที่ user ส่ง field นั้นมาแก้
        if (fieldsToUpdate.email) {
            const [existingEmail] = await db.query(
                `SELECT user_id FROM users WHERE email = ? AND user_id != ?`,
                [fieldsToUpdate.email, userId]
            );
            if (existingEmail.length > 0) {
                return res.status(409).json({ message: 'อีเมลนี้ถูกใช้โดยบัญชีอื่นแล้ว' });
            }
        }

        if (fieldsToUpdate.username) {
            const [existingUsername] = await db.query(
                `SELECT user_id FROM users WHERE username = ? AND user_id != ?`,
                [fieldsToUpdate.username, userId]
            );
            if (existingUsername.length > 0) {
                return res.status(409).json({ message: 'ชื่อผู้ใช้นี้ถูกใช้โดยบัญชีอื่นแล้ว' });
            }
        }

        // สร้าง SQL แบบ dynamic ตามจำนวน field ที่ส่งมาจริง
        // ตัวอย่าง ["first_name = ?", "email = ?"] -> "first_name = ?, email = ?"
        const setClause = Object.keys(fieldsToUpdate)
            .map(field => `${field} = ?`)
            .join(', ');

        const values = Object.values(fieldsToUpdate);

        await db.query(
            `UPDATE users SET ${setClause} WHERE user_id = ?`,
            [...values, userId]
        );

        return res.status(200).json({ message: 'Information saved successfully.' });



    } catch (error) {
        console.error('Edit Personal Information Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
