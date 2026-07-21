import express from 'express';
import {
  getDashboardStats,
  getSalesData,
  getOrderStatusDistribution,
  getRecentOrders,
  getTopProducts,
  insertSampleSalesData,
  debugOrders,
  getRevenueByCategory,
  getTopCustomers,
  getPaymentMethodStats,
  getInventoryValue,
  getAverageOrderValue,
} from '../controllers/dashboardController.js';
import db from '../../Database/db.js';

const router = express.Router();

router.get('/stats', getDashboardStats);
router.get('/sales', getSalesData);
router.get('/order-status', getOrderStatusDistribution);
router.get('/recent-orders', getRecentOrders);
router.get('/top-products', getTopProducts);
router.get('/revenue-by-category', getRevenueByCategory);
router.get('/top-customers', getTopCustomers);
router.get('/payment-methods', getPaymentMethodStats);
router.get('/inventory-value', getInventoryValue);
router.get('/average-order-value', getAverageOrderValue);
router.post('/insert-sample-data', insertSampleSalesData);
router.get('/debug-orders', debugOrders);

export default router;



