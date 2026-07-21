import db from '../../Database/db.js';

const STATUS_COLORS = {
  pending: { name: 'pending', color: '#A6713B' },
  completed: { name: 'completed', color: '#2D612A' },
  cancelled: { name: 'cancelled', color: '#A73937' },
  refunded: { name: 'refunded', color: '#CAB18B' },
};

const STATUS_THAI = {
  pending: 'ดำเนินการ',
  completed: 'จัดส่งเสร็จ',
  cancelled: 'ยกเลิก',
  refunded: 'คืนเงิน',
};

// ── Helper: Thai day names ──
const THAI_DAYS = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];

// ────────────────────────────────────────────
//  getDashboardStats
// ────────────────────────────────────────────
export const getDashboardStats = async (req, res) => {
  try {
    const results = await Promise.all([
      db.query(`SELECT COALESCE(SUM(total_price), 0) AS total FROM orders WHERE status NOT IN ('cancelled','refunded')`),
      db.query(`SELECT COALESCE(SUM(total_price), 0) AS total FROM orders WHERE status NOT IN ('cancelled','refunded') AND MONTH(created_at) = MONTH(NOW()) AND YEAR(created_at) = YEAR(NOW())`),
      db.query(`SELECT COALESCE(SUM(total_price), 0) AS total FROM orders WHERE status NOT IN ('cancelled','refunded') AND MONTH(created_at) = MONTH(NOW() - INTERVAL 1 MONTH) AND YEAR(created_at) = YEAR(NOW() - INTERVAL 1 MONTH)`),
      db.query(`SELECT COUNT(*) AS count FROM orders WHERE DATE(created_at) = CURDATE()`),
      db.query(`SELECT COUNT(*) AS count FROM orders WHERE DATE(created_at) = CURDATE() - INTERVAL 1 DAY`),
      db.query(`SELECT COUNT(*) AS count FROM users`),
      db.query(`SELECT COUNT(*) AS count FROM users WHERE MONTH(created_at) = MONTH(NOW()) AND YEAR(created_at) = YEAR(NOW())`),
      db.query(`SELECT COUNT(*) AS count FROM products`),
      db.query(`SELECT COUNT(*) AS count FROM product_variants WHERE stock_quantity = 0`),
      db.query(`SELECT COUNT(*) AS count FROM orders WHERE status = 'pending'`),
      db.query(`SELECT COUNT(*) AS count FROM product_variants WHERE stock_quantity > 0 AND stock_quantity <= 5`),
      db.query(`SELECT COUNT(*) AS count FROM orders`),
    ]);

    const totalRevenueRow = results[0][0][0];
    const monthlyRevenueRow = results[1][0][0];
    const lastMonthRevenueRow = results[2][0][0];
    const todayOrdersRow = results[3][0][0];
    const yesterdayOrdersRow = results[4][0][0];
    const totalCustomersRow = results[5][0][0];
    const newCustomersRow = results[6][0][0];
    const totalProductsRow = results[7][0][0];
    const outOfStockRow = results[8][0][0];
    const pendingOrdersRow = results[9][0][0];
    const lowStockRow = results[10][0][0];
    const totalOrdersRow = results[11][0][0];

    const totalRevenue = parseFloat(totalRevenueRow?.total || 0);
    const monthlyRevenue = parseFloat(monthlyRevenueRow?.total || 0);
    const lastMonthRevenue = parseFloat(lastMonthRevenueRow?.total || 0);
    const todayOrders = todayOrdersRow?.count || 0;
    const yesterdayOrders = yesterdayOrdersRow?.count || 0;
    const totalCustomers = totalCustomersRow?.count || 0;
    const newCustomersThisMonth = newCustomersRow?.count || 0;
    const totalProducts = totalProductsRow?.count || 0;
    const outOfStockProducts = outOfStockRow?.count || 0;
    const pendingOrders = pendingOrdersRow?.count || 0;
    const lowStockProducts = lowStockRow?.count || 0;
    const totalOrders = totalOrdersRow?.count || 0;

    let revenueChange = '+0%';
    if (lastMonthRevenue > 0) {
      const pct = ((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100;
      revenueChange = `${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%`;
    }

    let ordersChange = '0';
    if (yesterdayOrders > 0) {
      const diff = todayOrders - yesterdayOrders;
      ordersChange = `${diff >= 0 ? '+' : ''}${diff}`;
    } else if (todayOrders > 0) {
      ordersChange = `+${todayOrders}`;
    }

    res.json({
      totalRevenue: totalRevenue || 0,
      monthlyRevenue: monthlyRevenue || 0,
      revenueChange,
      todayOrders: todayOrders || 0,
      ordersChange,
      totalCustomers: totalCustomers || 0,
      newCustomersThisMonth: newCustomersThisMonth || 0,
      totalProducts: totalProducts || 0,
      outOfStockProducts: outOfStockProducts || 0,
      pendingOrders: pendingOrders || 0,
      lowStockProducts: lowStockProducts || 0,
      totalOrders: totalOrders || 0,
    });
  } catch (e) {
    console.error('[dashboard] getDashboardStats error:', e);
    console.error('[dashboard] getDashboardStats error stack:', e.stack);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลสถิติแดชบอร์ด', error: e.message, stack: e.stack });
  }
};

// ────────────────────────────────────────────
//  getSalesData  (period: week | month | year)
// ────────────────────────────────────────────
export const getSalesData = async (req, res) => {
  try {
    const period = req.query.period || 'week';
    let data = [];
    let total = 0;

    if (period === 'year') {
      // Monthly sales for the past 12 months
      const [rows] = await db.query(`
        SELECT DATE_FORMAT(created_at, '%Y-%m') AS label,
               COALESCE(SUM(total_price), 0) AS sales
        FROM orders
        WHERE status NOT IN ('cancelled','refunded')
          AND created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
        GROUP BY DATE_FORMAT(created_at, '%Y-%m')
        ORDER BY label
      `);
      data = rows.map(r => ({ label: r.label, sales: parseFloat(r.sales) }));
      total = data.reduce((sum, d) => sum + d.sales, 0);
    } else if (period === 'month') {
      // Daily sales for the past 30 days
      const [rows] = await db.query(`
        SELECT DATE(created_at) AS date,
               COALESCE(SUM(total_price), 0) AS sales
        FROM orders
        WHERE status NOT IN ('cancelled','refunded')
          AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        GROUP BY DATE(created_at)
        ORDER BY date
      `);
      data = rows.map(r => ({
        label: new Date(r.date).getDate().toString(),
        sales: parseFloat(r.sales),
      }));
      total = data.reduce((sum, d) => sum + d.sales, 0);
    } else {
      // Weekly: last 7 days grouped by day-of-week
      const [rows] = await db.query(`
        SELECT DAYOFWEEK(created_at) AS day_num,
               COALESCE(SUM(total_price), 0) AS sales
        FROM orders
        WHERE status NOT IN ('cancelled','refunded')
          AND created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
        GROUP BY DAYOFWEEK(created_at)
        ORDER BY day_num
      `);
      // DAYOFWEEK: 1=Sunday … 7=Saturday
      data = rows.map(r => ({
        label: THAI_DAYS[r.day_num - 1],
        sales: parseFloat(r.sales),
      }));
      total = data.reduce((sum, d) => sum + d.sales, 0);
    }

    res.json({ data, total });
  } catch (e) {
    console.error('[dashboard] getSalesData error:', e);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลยอดขาย', error: e.message });
  }
};

// ────────────────────────────────────────────
//  getOrderStatusDistribution
// ────────────────────────────────────────────
export const getOrderStatusDistribution = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT status, COUNT(*) AS value
      FROM orders
      GROUP BY status
    `);

    const data = rows.map(r => ({
      name: STATUS_THAI[r.status] || r.status,
      value: r.value,
      color: STATUS_COLORS[r.status]?.color || '#CAB18B',
    }));

    const total = data.reduce((sum, d) => sum + d.value, 0);

    res.json({ data, total });
  } catch (e) {
    console.error('[dashboard] getOrderStatusDistribution error:', e);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลสถานะคำสั่งซื้อ', error: e.message });
  }
};

// ────────────────────────────────────────────
//  getRecentOrders
// ────────────────────────────────────────────
export const getRecentOrders = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT o.order_id, o.total_price, o.status, o.created_at,
             u.first_name, u.last_name
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.user_id
      ORDER BY o.created_at DESC
      LIMIT 5
    `);

    const data = rows.map(r => ({
      id: `#SL-${r.order_id}`,
      customer: `${r.first_name} ${r.last_name}`.trim(),
      total: `฿${parseFloat(r.total_price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      status: r.status,
    }));

    res.json(data);
  } catch (e) {
    console.error('[dashboard] getRecentOrders error:', e);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลคำสั่งซื้อล่าสุด', error: e.message });
  }
};

// ────────────────────────────────────────────
//  getTopProducts
// ────────────────────────────────────────────
export const getTopProducts = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.name,
             SUM(oi.quantity) AS sold,
             SUM(oi.quantity * oi.price) AS revenue
      FROM order_items oi
      JOIN product_variants pv ON oi.variant_id = pv.variant_id
      JOIN products p ON pv.product_id = p.product_id
      JOIN orders o ON oi.order_id = o.order_id
      WHERE o.status NOT IN ('cancelled', 'refunded')
      GROUP BY p.product_id, p.name
      ORDER BY sold DESC
      LIMIT 5
    `);

    const data = rows.map(r => ({
      name: r.name,
      sold: r.sold,
      revenue: `฿${parseFloat(r.revenue).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    }));

    res.json(data);
  } catch (e) {
    console.error('[dashboard] getTopProducts error:', e);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลสินค้าขายดี', error: e.message });
  }
};

// ────────────────────────────────────────────
//  insertSampleSalesData  (kept for compatibility)
// ────────────────────────────────────────────
export const insertSampleSalesData = async (req, res) => {
  try {
    res.json({ success: true, message: 'Sample data endpoint (no-op)' });
  } catch (e) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล', error: e.message });
  }
};

// ────────────────────────────────────────────
//  debugOrders
// ────────────────────────────────────────────
export const debugOrders = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT COUNT(*) AS total FROM orders');
    res.json({ total: rows[0].total });
  } catch (e) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูล', error: e.message });
  }
};

// ────────────────────────────────────────────
//  getRevenueByCategory
// ────────────────────────────────────────────
export const getRevenueByCategory = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.category_name,
             SUM(oi.quantity * oi.price) AS revenue,
             COUNT(DISTINCT oi.order_id) AS orders
      FROM order_items oi
      JOIN product_variants pv ON oi.variant_id = pv.variant_id
      JOIN products p ON pv.product_id = p.product_id
      JOIN categories c ON p.category_id = c.category_id
      JOIN orders o ON oi.order_id = o.order_id
      WHERE o.status NOT IN ('cancelled', 'refunded')
      GROUP BY c.category_id, c.category_name
      ORDER BY revenue DESC
    `);

    const data = rows.map(r => ({
      name: r.category_name,
      revenue: parseFloat(r.revenue) || 0,
      orders: r.orders || 0,
    }));

    const total = data.reduce((sum, d) => sum + d.revenue, 0);

    res.json({ data, total });
  } catch (e) {
    console.error('[dashboard] getRevenueByCategory error:', e);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลรายได้ตามหมวดหมู่', error: e.message });
  }
};

// ────────────────────────────────────────────
//  getTopCustomers
// ────────────────────────────────────────────
export const getTopCustomers = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT u.first_name, u.last_name, u.email,
             COUNT(o.order_id) AS orderCount,
             SUM(o.total_price) AS totalSpent
      FROM users u
      LEFT JOIN orders o ON u.user_id = o.user_id
      WHERE o.status NOT IN ('cancelled', 'refunded')
      GROUP BY u.user_id, u.first_name, u.last_name, u.email
      HAVING COUNT(o.order_id) > 0
      ORDER BY totalSpent DESC
      LIMIT 5
    `);

    const data = rows.map(r => ({
      name: `${r.first_name} ${r.last_name}`.trim(),
      email: r.email,
      orders: r.orderCount || 0,
      spent: `฿${parseFloat(r.totalSpent).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      spentValue: parseFloat(r.totalSpent) || 0,
    }));

    res.json(data);
  } catch (e) {
    console.error('[dashboard] getTopCustomers error:', e);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลลูกค้าหลัก', error: e.message });
  }
};

// ────────────────────────────────────────────
//  getPaymentMethodStats
// ────────────────────────────────────────────
export const getPaymentMethodStats = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT payment_method,
             COUNT(*) AS count,
             SUM(total_price) AS total
      FROM orders
      WHERE status NOT IN ('cancelled', 'refunded')
      GROUP BY payment_method
      ORDER BY count DESC
    `);

    const data = rows.map(r => ({
      method: r.payment_method,
      count: r.count || 0,
      total: parseFloat(r.total) || 0,
      percentage: 0,
    }));

    const totalCount = data.reduce((sum, d) => sum + d.count, 0);
    data.forEach(d => {
      d.percentage = totalCount > 0 ? (d.count / totalCount * 100).toFixed(1) : 0;
    });

    res.json(data);
  } catch (e) {
    console.error('[dashboard] getPaymentMethodStats error:', e);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลวิธีการชำระเงิน', error: e.message });
  }
};

// ────────────────────────────────────────────
//  getInventoryValue
// ────────────────────────────────────────────
export const getInventoryValue = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT SUM(pv.stock_quantity * p.base_price) AS totalValue,
             SUM(pv.stock_quantity) AS totalItems,
             COUNT(DISTINCT p.product_id) AS productCount
      FROM product_variants pv
      JOIN products p ON pv.product_id = p.product_id
    `);

    const row = rows[0] || { totalValue: 0, totalItems: 0, productCount: 0 };

    res.json({
      totalValue: parseFloat(row.totalValue) || 0,
      totalItems: row.totalItems || 0,
      productCount: row.productCount || 0,
    });
  } catch (e) {
    console.error('[dashboard] getInventoryValue error:', e);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลมูลค่าสินค้า', error: e.message });
  }
};

// ────────────────────────────────────────────
//  getAverageOrderValue
// ────────────────────────────────────────────
export const getAverageOrderValue = async (req, res) => {
  try {
    const [todayRows] = await db.query(`
      SELECT AVG(total_price) AS avgToday
      FROM orders
      WHERE status NOT IN ('cancelled', 'refunded')
        AND DATE(created_at) = CURDATE()
    `);

    const [monthRows] = await db.query(`
      SELECT AVG(total_price) AS avgMonth
      FROM orders
      WHERE status NOT IN ('cancelled', 'refunded')
        AND MONTH(created_at) = MONTH(NOW())
        AND YEAR(created_at) = YEAR(NOW())
    `);

    const [allTimeRows] = await db.query(`
      SELECT AVG(total_price) AS avgAllTime
      FROM orders
      WHERE status NOT IN ('cancelled', 'refunded')
    `);

    res.json({
      today: parseFloat(todayRows[0]?.avgToday) || 0,
      month: parseFloat(monthRows[0]?.avgMonth) || 0,
      allTime: parseFloat(allTimeRows[0]?.avgAllTime) || 0,
    });
  } catch (e) {
    console.error('[dashboard] getAverageOrderValue error:', e);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลค่าเฉลี่ย', error: e.message });
  }
};

