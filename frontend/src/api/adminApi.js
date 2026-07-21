import axios from "axios";

const baseURL = "http://localhost:5000";

function getToken() {
  return localStorage.getItem("token");
}

function buildAuthHeaders() {
  const token = getToken();
  if (!token) return {};
  return {
    Authorization: `Bearer ${token}`,
  };
}

export const adminApi = axios.create({
  baseURL,
  timeout: 8000,
});

adminApi.interceptors.request.use((config) => {
  config.headers = {
    ...(config.headers || {}),
    ...buildAuthHeaders(),
  };
  return config;
});

// ---------- Admin profile ----------
export async function fetchAdminProfile() {
  // expected: { name, role, avatarUrl }
  const res = await adminApi.get("/api/admin/profile");
  return res.data;
}

// ---------- Categories ----------
export async function fetchCategories() {
  // expected: [{ category_id, category_name, category_slug }]
  const res = await adminApi.get("/api/categories");
  return res.data;
}

export async function createCategory(payload) {
  // payload: { category_name, category_slug? }
  const res = await adminApi.post("/api/categories", payload);
  return res.data;
}

export async function updateCategory(categoryId, payload) {
  const res = await adminApi.put(`/api/categories/${categoryId}`, payload);
  return res.data;
}

export async function deleteCategory(categoryId) {
  const res = await adminApi.delete(`/api/categories/${categoryId}`);
  return res.data;
}

// ---------- Products ----------
export async function fetchProducts() {
  const res = await adminApi.get("/api/products");
  return res.data;
}

export async function createProduct(payload) {
  // payload: { name, base_price, description?, category_id, variants: [...], images: [...] }
  const res = await adminApi.post("/api/products", payload);
  return res.data;
}

export async function updateProduct(productId, payload) {
  // payload: { name, category_id, description, base_price }
  const res = await adminApi.put(`/api/products/${productId}`, payload);
  return res.data;
}

export async function deleteProduct(productId) {
  const res = await adminApi.delete(`/api/products/${productId}`);
  return res.data;
}

// ---------- Customers ----------
export async function fetchCustomers() {
  // expected: customer list
  const res = await adminApi.get("/api/users");
  return res.data;
}

export async function updateCustomerStatus(userId, payload) {
  const res = await adminApi.put(`/api/users/${userId}/status`, payload);
  return res.data;
}

// ---------- Orders ----------
export async function fetchOrders() {
  // expected: [{ order_id, status, tracking, ... }]
  const res = await adminApi.get("/api/orders");
  return res.data;
}

export async function updateOrderStatus(orderId, payload) {
  const res = await adminApi.put(`/api/orders/${orderId}/status`, payload);
  return res.data;
}

// ---------- Dashboard ----------
export async function fetchDashboardStats() {
  const res = await adminApi.get("/api/dashboard/stats");
  return res.data;
}

export async function fetchSalesData(period = "week") {
  const res = await adminApi.get(`/api/dashboard/sales?period=${period}`);
  return res.data;
}

export async function fetchOrderStatus() {
  const res = await adminApi.get("/api/dashboard/order-status");
  return res.data;
}

export async function fetchRecentOrders() {
  const res = await adminApi.get("/api/dashboard/recent-orders");
  return res.data;
}

export async function fetchTopProducts() {
  const res = await adminApi.get("/api/dashboard/top-products");
  return res.data;
}

export async function fetchRevenueByCategory() {
  const res = await adminApi.get("/api/dashboard/revenue-by-category");
  return res.data;
}

export async function fetchTopCustomers() {
  const res = await adminApi.get("/api/dashboard/top-customers");
  return res.data;
}

export async function fetchPaymentMethodStats() {
  const res = await adminApi.get("/api/dashboard/payment-methods");
  return res.data;
}

export async function fetchInventoryValue() {
  const res = await adminApi.get("/api/dashboard/inventory-value");
  return res.data;
}

export async function fetchAverageOrderValue() {
  const res = await adminApi.get("/api/dashboard/average-order-value");
  return res.data;
}

