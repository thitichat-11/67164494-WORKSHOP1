import db from '../../Database/db.js';

export const getDashboardStats = async (req, res) => {
  console.log('[getDashboardStats] Starting');
  try {
    console.log('[getDashboardStats] Query 1 - Total revenue');
    // Total revenue
    const [[rev]] = await db.query(`SELECT COALESCE(SUM(total_price), 0) AS v FROM orders WHERE status IN ('delivered', 'shipped')`);
    console.log('[getDashboardStats] Got revenue:', rev);

    // Monthly revenue
    const [[monthRev]] = await db.query(`SELECT COALESCE(SUM(total_price), 0) AS v FROM orders WHERE status IN ('delivered', 'shipped') AND MONTH(created_at) = MONTH(NOW()) AND YEAR(created_at) = YEAR(NOW())`);

    // Previous month revenue
    const [[prevMonthRev]] = await db.query(`SELECT COALESCE(SUM(total_price), 0) AS v FROM orders WHERE status IN ('delivered', 'shipped') AND MONTH(created_at) = MONTH(DATE_SUB(NOW(), INTERVAL 1 MONTH))`);

    // Today orders
    const [[todayOrders]] = await db.query(`SELECT COUNT(*) AS v FROM orders WHERE DATE(created_at) = DATE(NOW())`);

    // Yesterday orders
    const [[yesterdayOrders]] = await db.query(`SELECT COUNT(*) AS v FROM orders WHERE DATE(created_at) = DATE(DATE_SUB(NOW(), INTERVAL 1 DAY))`);

    // Total customers
    const [[cust]] = await db.query(`SELECT COUNT(*) AS v FROM users WHERE role = 'customer'`);

    // New customers this month
    const [[newCust]] = await db.query(`SELECT COUNT(*) AS v FROM users WHERE role = 'customer' AND MONTH(created_at) = MONTH(NOW()) AND YEAR(created_at) = YEAR(NOW())`);

    // Total products
    const [[prod]] = await db.query(`SELECT COUNT(*) AS v FROM products`);

    // Out of stock products
    const [[outOfStock]] = await db.query(`SELECT COUNT(*) AS v FROM products WHERE stock = 0`);

    // Pending orders
    const [[pend]] = await db.query(`SELECT COUNT(*) AS v FROM orders WHERE status = 'pending'`);

    // Low stock products (less than 10)
    const [[lowStock]] = await db.query(`SELECT COUNT(*) AS v FROM products WHERE stock < 10 AND stock > 0`);

    const revenueChange = prevMonthRev?.v > 0 ? ((((monthRev?.v || 0) - (prevMonthRev?.v || 0)) / (prevMonthRev?.v || 0)) * 100).toFixed(0) : '+0';
    const ordersChange = yesterdayOrders?.v > 0 ? ((((todayOrders?.v || 0) - (yesterdayOrders?.v || 0)) / (yesterdayOrders?.v || 0)) * 100).toFixed(0) : '0';

    console.log('[getDashboardStats] About to send response');
    res.json({
      totalRevenue: rev?.v || 0,
      monthlyRevenue: monthRev?.v || 0,
      revenueChange: `${revenueChange >= 0 ? '+' : ''}${revenueChange}%`,
      todayOrders: todayOrders?.v || 0,
      ordersChange: `${ordersChange >= 0 ? '+' : ''}${ordersChange}%`,
      totalCustomers: cust?.v || 0,
      newCustomersThisMonth: newCust?.v || 0,
      totalProducts: prod?.v || 0,
      outOfStockProducts: outOfStock?.v || 0,
      pendingOrders: pend?.v || 0,
      lowStockProducts: lowStock?.v || 0,
    });
    console.log('[getDashboardStats] Response sent');
  } catch (e) {
    console.error('[getDashboardStats] ERROR:', e);
    res.status(500).json({ error: e.message });
  }
};

export const getSalesData = async (req, res) => {
  const { period = 'week' } = req.query;
  try {
    let query = '';

    if (period === 'month') {
      query = `
        SELECT DATE_FORMAT(created_at, '%d') AS label, COALESCE(SUM(total_price), 0) AS sales
        FROM orders
        WHERE MONTH(created_at) = MONTH(NOW()) AND YEAR(created_at) = YEAR(NOW())
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at)
      `;
    } else if (period === 'year') {
      query = `
        SELECT DATE_FORMAT(created_at, '%b') AS label, COALESCE(SUM(total_price), 0) AS sales
        FROM orders
        WHERE YEAR(created_at) = YEAR(NOW())
        GROUP BY MONTH(created_at), YEAR(created_at)
        ORDER BY MONTH(created_at)
      `;
    } else {
      query = `
        SELECT DATE_FORMAT(created_at, '%a') AS label, COALESCE(SUM(total_price), 0) AS sales
        FROM orders
        WHERE created_at >= DATE_SUB(NOW(), INTERVAL 6 DAY)
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at)
      `;
    }

    const [data] = await db.query(query);
    const [[{ total }]] = await db.query(
      `SELECT COALESCE(SUM(total_price), 0) AS total FROM orders WHERE ${
        period === 'month'
          ? "MONTH(created_at) = MONTH(NOW()) AND YEAR(created_at) = YEAR(NOW())"
          : period === 'year'
          ? "YEAR(created_at) = YEAR(NOW())"
          : "created_at >= DATE_SUB(NOW(), INTERVAL 6 DAY)"
      }`
    );

    res.json({ data: data || [], total: total || 0 });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getOrderStatusDistribution = async (req, res) => {
  try {
    const [data] = await db.query(`SELECT status, COUNT(*) AS value FROM orders GROUP BY status`);
    const [[{ total }]] = await db.query(`SELECT COUNT(*) AS total FROM orders`);

    const colorMap = {
      'pending': '#CAB18B',
      'shipped': '#3C7741',
      'delivered': '#2D612A',
      'cancelled': '#A73937'
    };

    const statusDisplayMap = {
      'pending': 'Processing',
      'shipped': 'Shipped',
      'delivered': 'Delivered',
      'cancelled': 'Cancelled'
    };

    const formattedData = data.map(item => ({
      name: statusDisplayMap[item.status] || item.status,
      value: item.value,
      color: colorMap[item.status] || '#999'
    }));

    res.json({ data: formattedData, total: total || 0 });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getRecentOrders = async (req, res) => {
  try {
    const [orders] = await db.query(`
      SELECT
        o.order_id,
        o.total_price,
        o.status,
        COALESCE(u.username, CONCAT(o.first_name, ' ', o.last_name)) AS customer
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.user_id
      ORDER BY o.created_at DESC
      LIMIT 5
    `);

    const statusDisplayMap = {
      'pending': 'Processing',
      'shipped': 'Shipped',
      'delivered': 'Delivered',
      'cancelled': 'Cancelled'
    };

    const result = orders.map(o => ({
      id: `#SL-${o.order_id}`,
      customer: o.customer || 'ลูกค้า',
      total: `฿${Number(o.total_price).toFixed(0)}`,
      status: statusDisplayMap[o.status] || o.status,
    }));
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getTopProducts = async (req, res) => {
  try {
    const [products] = await db.query(`
      SELECT
        p.product_id,
        p.name,
        SUM(oi.quantity) AS sold,
        SUM(oi.price * oi.quantity) AS revenue
      FROM order_items oi
      INNER JOIN product_variants pv ON oi.variant_id = pv.variant_id
      INNER JOIN products p ON pv.product_id = p.product_id
      GROUP BY p.product_id
      ORDER BY sold DESC
      LIMIT 4
    `);

    const result = products.map(p => ({
      name: p.name,
      sold: p.sold || 0,
      revenue: `฿${Number(p.revenue || 0).toFixed(0)}`,
    }));

    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
