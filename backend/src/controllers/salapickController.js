import db from '../../Database/db.js'; 

export const getSaLaPicks = async (req, res) => {
  try {
    // 1. คิวรีดึงข้อมูลสินค้า, หมวดหมู่ (tag), รูปภาพหลัก, และตัวเลือกสินค้า (สี, ไซส์)
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

    // 2. จัดกลุ่มข้อมูล (Group by Product) เพื่อไม่ให้ข้อมูลสินค้าซ้ำกันเวลาแสดงผล
    const formattedItems = rows.reduce((acc, row) => {
      let item = acc.find(i => i.id === row.id);
      
      // ถ้ายังไม่มีสินค้าชิ้นนี้ ให้สร้าง Object ใหม่
      if (!item) {
        item = {
          id: row.id,
          tag: row.tag || 'New Arrivals',
          name: row.name,
          price: "$" + parseFloat(row.price).toFixed(2), 
          image: row.image || '', 
          colors: [],
          sizes: []
        };
        acc.push(item);
      }

      // เพิ่มสีและไซส์เข้าไปใน Array โดยเช็คไม่ให้ค่าซ้ำ
      if (row.color && !item.colors.includes(row.color)) {
        item.colors.push(row.color);
      }
      if (row.size && !item.sizes.includes(row.size)) {
        item.sizes.push(row.size);
      }
      
      return acc;
    }, []);

    // 3. ส่งข้อมูลกลับไปให้ Frontend
    res.json(formattedItems);

  } catch (error) {
    console.error('Error in getSaLaPicks:', error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลจาก Database' });
  }
};