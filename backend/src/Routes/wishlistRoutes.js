import express from 'express';
import db from '../../Database/db.js'; 

const router = express.Router();

// 1. ดึงรายการ Wishlist ทั้งหมดของ User คนนั้น พร้อม Join รูปและแท็ก
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const [rows] = await db.query(`
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
    console.error('Error in getWishlist:', error);
    res.status(500).json({ error: error.message });
  }
});

// 2. เพิ่มสินค้าเข้า Wishlist แบบตรวจจับการส่งข้อมูลและเช็คความซ้ำซ้อน
router.post('/', async (req, res) => {
  try {
    const { user_id, product_id } = req.body;
    
    if (!user_id || !product_id) {
      return res.status(400).json({ message: 'ส่งข้อมูล user_id หรือ product_id ไม่ครบ' });
    }
    
    const [existing] = await db.query(
      'SELECT * FROM wishlists WHERE user_id = ? AND product_id = ?', 
      [user_id, product_id]
    );
    
    if (existing.length === 0) {
      await db.query('INSERT INTO wishlists (user_id, product_id) VALUES (?, ?)', [user_id, product_id]);
    }
    
    res.status(201).json({ success: true, message: 'Added to wishlist' });
  } catch (error) {
    console.error('Error in addToWishlist:', error);
    res.status(500).json({ error: error.message });
  }
});

// 3. ลบสินค้าออกจาก Wishlist
router.delete('/:userId/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;
    await db.query('DELETE FROM wishlists WHERE user_id = ? AND product_id = ?', [userId, productId]);
    res.json({ success: true, message: 'Removed from wishlist' });
  } catch (error) {
    console.error('Error in removeFromWishlist:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;