import db from "../../Database/db.js";

export const searchProducts = async (req, res) => {
  const keyword = req.query.q;

  // หากไม่มี keyword ส่งมา ให้ส่งอาร์เรย์ว่างกลับไปทันที
  if (!keyword) {
    return res.json([]);
  }

  try {
    const sql = `
      SELECT 
        p.product_id, 
        p.name, 
        p.base_price, 
        pi.img_url,
        MIN(pv.code) as product_code
      FROM products p
      LEFT JOIN product_variants pv ON p.product_id = pv.product_id
      LEFT JOIN product_images pi ON p.product_id = pi.product_id AND pi.is_primary = 1
      WHERE p.name LIKE ? OR pv.code LIKE ?
      GROUP BY p.product_id, p.name, p.base_price, pi.img_url
    `;

    const searchPattern = `%${keyword}%`;

    const [rows] = await db.execute(sql, [searchPattern, searchPattern]);

    return res.json(rows);
  } catch (error) {
    console.error("=========================================");
    console.error("BACKEND DATABASE SEARCH ERROR:");
    console.error(error); 
    console.error("=========================================");

    // ส่งสถานะ 500 กลับไปบอก React พร้อมข้อความผิดพลาด
    return res.status(500).json({
      error: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์หลังบ้าน",
      details: error.message,
    });
  }
};
