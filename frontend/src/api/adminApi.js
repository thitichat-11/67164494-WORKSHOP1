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
  const res = await adminApi.get("/api/customers");
  return res.data;
}

// ---------- Orders ----------
export async function fetchOrders() {
  // expected: [{ order_id, status, tracking, ... }]
  const res = await adminApi.get("/api/orders");
  return res.data;
}

export async function updateOrderStatus(orderId, payload) {
  const res = await adminApi.patch(`/api/orders/${orderId}`, payload);
  return res.data;
}

