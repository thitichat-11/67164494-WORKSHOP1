import pool from '../Config/db.js'; 

// ดึงรายการ Wishlist ทั้งหมดของ User 
export const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const [rows] = await pool.query(`
      SELECT 
        w.product_id AS id,
        pi.img_url AS imgSrc,
        c.category_name AS tag,
        p.name AS title,
        CONCAT('$', p.base_price) AS price,
        'In Stock' AS status
      FROM wishlists w
      JOIN products p ON w.product_id = p.product_id
      LEFT JOIN categories c ON p.category_id = c.category_id
      LEFT JOIN product_images pi ON p.product_id = pi.product_id AND pi.is_primary = 1
      WHERE w.user_id = ?
    `, [userId]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// เพิ่มสินค้าเข้า Wishlist 
export const addToWishlist = async (req, res) => {
  try {
    const { user_id, product_id } = req.body;
    
    const [existing] = await pool.query(
      'SELECT * FROM wishlists WHERE user_id = ? AND product_id = ?', 
      [user_id, product_id]
    );
    
    if (existing.length === 0) {
      await pool.query('INSERT INTO wishlists (user_id, product_id) VALUES (?, ?)', [user_id, product_id]);
    }
    res.json({ success: true, message: 'Added to wishlist' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ลบสินค้าออกจาก Wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    await pool.query('DELETE FROM wishlists WHERE user_id = ? AND product_id = ?', [userId, productId]);
    res.json({ success: true, message: 'Removed from wishlist' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};