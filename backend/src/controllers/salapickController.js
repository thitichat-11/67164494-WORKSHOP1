import db from "../../Database/db.js";

//  ฟังก์ชันดึงข้อมูลสินค้าทั้งหมด
export const getSaLaPicks = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        p.product_id AS id,
        c.category_name AS tag,
        p.name,
        p.base_price AS price,
        pi.img_url AS image,
        v.color,
        v.size
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.category_id
      LEFT JOIN product_images pi ON p.product_id = pi.product_id AND pi.is_primary = 1
      LEFT JOIN product_variants v ON p.product_id = v.product_id
    `);

    const formattedItems = rows.reduce((acc, row) => {
      let item = acc.find((i) => i.id === row.id);

      if (!item) {
        item = {
          id: row.id,
          tag: row.tag || "New Arrivals",
          name: row.name,
          price: "$" + parseFloat(row.price).toFixed(2),
          image: row.image || "",
          colors: [],
          sizes: [],
        };
        acc.push(item);
      }

      if (row.color && !item.colors.includes(row.color)) {
        item.colors.push(row.color);
      }
      if (row.size && !item.sizes.includes(row.size)) {
        item.sizes.push(row.size);
      }

      return acc;
    }, []);

    res.json(formattedItems);
  } catch (error) {
    console.error("Error in getSaLaPicks:", error);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในการดึงข้อมูลจาก Database" });
  }
};

// เพิ่มสินค้าลง Wishlist (เมื่อกดปุ่มหัวใจ)
export const addToWishlist = async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

    // เช็คว่าส่งข้อมูลมาครบไหม
    if (!user_id || !product_id) {
      return res
        .status(400)
        .json({ message: "ส่งข้อมูล user_id หรือ product_id ไม่ครบ" });
    }

    // บันทึกลงตาราง wishlist ตรวจชื่อตารางและคอลัมน์ให้ตรงกับ Database ของคุณ
    await db.query("INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)", [
      user_id,
      product_id,
    ]);

    res.status(201).json({ message: "เพิ่มลง Wishlist สำเร็จ" });
  } catch (error) {
    console.error("Error in addToWishlist:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการบันทึก Wishlist" });
  }
};

// ดึงข้อมูล Wishlist เมื่อเปิดหน้า /wishlist
export const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    // ดึงข้อมูลสินค้าที่อยู่ใน wishlist ของ User คนนั้น
    const [rows] = await db.query(
      `SELECT w.product_id, p.name, p.base_price, p.category_id 
       FROM wishlist w
       JOIN products p ON w.product_id = p.product_id
       WHERE w.user_id = ?`,
      [userId],
    );

    res.json(rows);
  } catch (error) {
    console.error("Error in getWishlist:", error);
    res.status(500).json({ message: "ดึงข้อมูล Wishlist ล้มเหลว" });
  }
};
