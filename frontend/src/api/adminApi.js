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
  try {
    const res = await adminApi.get("/api/dashboard/stats");
    return res.data;
  } catch {
    // Fallback: calculate from orders
    const orders = await fetchOrders();
    const customers = await fetchCustomers();
    return {
      totalRevenue: orders.reduce((sum, o) => sum + (parseInt(o.total_price) || 0), 0),
      monthlyRevenue: orders
        .filter(o => new Date(o.created_at).getMonth() === new Date().getMonth())
        .reduce((sum, o) => sum + (parseInt(o.total_price) || 0), 0),
      revenueChange: "+0%",
      todayOrders: orders.filter(o => new Date(o.created_at).toDateString() === new Date().toDateString()).length,
      ordersChange: "0%",
      totalCustomers: customers.length,
      newCustomersThisMonth: customers.filter(c => new Date(c.created_at).getMonth() === new Date().getMonth()).length,
      totalProducts: 0,
      outOfStockProducts: 0,
      pendingOrders: orders.filter(o => o.status === 'pending').length,
      lowStockProducts: 0,
    };
  }
}

export async function fetchSalesData(period = "week") {
  try {
    const res = await adminApi.get(`/api/dashboard/sales?period=${period}`);
    return res.data;
  } catch {
    return { data: [], total: 0 };
  }
}

export async function fetchOrderStatus() {
  try {
    const res = await adminApi.get("/api/dashboard/order-status");
    return res.data;
  } catch {
    const orders = await fetchOrders();
    const statusMap = {};
    const colorMap = {
      'pending': { name: 'Processing', color: '#CAB18B' },
      'shipped': { name: 'Shipped', color: '#3C7741' },
      'delivered': { name: 'Delivered', color: '#2D612A' },
      'cancelled': { name: 'Cancelled', color: '#A73937' }
    };

    orders.forEach(o => {
      const status = o.status || 'pending';
      const displayName = colorMap[status]?.name || status;
      statusMap[displayName] = (statusMap[displayName] || 0) + 1;
    });

    const data = Object.entries(statusMap).map(([name, value]) => ({
      name,
      value,
      color: Object.values(colorMap).find(c => c.name === name)?.color || '#999'
    }));

    return {
      data,
      total: orders.length
    };
  }
}

export async function fetchRecentOrders() {
  try {
    const res = await adminApi.get("/api/dashboard/recent-orders");
    return res.data;
  } catch {
    const orders = await fetchOrders();
    return orders.slice(0, 5).map(o => ({
      id: `#SL-${o.order_id}`,
      customer: o.customer || 'ลูกค้า',
      total: `฿${Math.round(o.total_price || 0)}`,
      status: o.status,
    }));
  }
}

export async function fetchTopProducts() {
  try {
    const res = await adminApi.get("/api/dashboard/top-products");
    return res.data;
  } catch {
    return [];
  }
}

