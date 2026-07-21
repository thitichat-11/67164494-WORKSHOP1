import express from 'express';
import {
  getDashboardStats,
  getSalesData,
  getOrderStatusDistribution,
  getRecentOrders,
  getTopProducts,
  insertSampleSalesData,
} from '../controllers/dashboardController.js';

console.log('Dashboard routes file loaded, getDashboardStats =', typeof getDashboardStats);

const router = express.Router();

router.get('/stats', (req, res, next) => {
  console.log('[STATS ENDPOINT] Called');
  return getDashboardStats(req, res);
});
router.get('/sales', getSalesData);
router.get('/order-status', getOrderStatusDistribution);
router.get('/recent-orders', getRecentOrders);
router.get('/top-products', getTopProducts);
router.post('/insert-sample-data', insertSampleSalesData);

export default router;

