import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

// page จากฝั่ง user
import Collaborations from "./pages/user/Collaborations";
import MainPage from "./pages/user/MainPage";
import ComeOnTrend from "./pages/user/ComeOnTrend";
import SeeMoreInHer from "./pages/user/SeeMoreInHer";
import SearchPage from "./pages/user/SearchPage";
import SaLaPick from "./pages/user/SaLaPick";
import WishlistPage from "./pages/user/WishlistPage";
import PickItem from "./pages/user/PickItem";
import ShippingBagPage from "./pages/user/ShippingBagPage";
import OrderHistory from "./pages/user/OrderHistory";
import SeeMoreSpring from "./pages/user/SeeMoreSpring";

import Checkout from "./pages/user/Checkout";
import AccountPage from "./pages/user/AccountPage";
import PersonalInformation from "./pages/user/ProsonalInformation";
import ShippingAddress from "./pages/user/ShippingAddess";
import Signup from "./pages/user/Signup";
import Signin from "./pages/user/Signin";
import OrderSuccess from "./pages/user/OrderSuccess";

// Admin pages
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StatisticsPage from "./pages/admin/StatisticsPage";
import ProductsPage from "./pages/admin/ProductsPage";
import CategoryPage from "./pages/admin/CategoryPage";
import AddProductPage from "./pages/admin/AddProductPage";
import CustomersPage from "./pages/admin/CustomersPage";
import OrdersPage from "./pages/admin/OrdersPage";

// components
import Menu from "./components/Menu";
import LayOut from "./components/LayOut";
import Sidebar from "./components/SideBar";


const ProtectedRoute = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/signin" replace />
  }
  return <Outlet />
}

const AdminRoute = () => {
  const token = localStorage.getItem('token');
  const roleId = localStorage.getItem('roleId');

  // ถ้าไม่ได้ล็อกอิน ให้ไปหน้า signin
  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  
  // ถ้าล็อกอินแล้ว แต่ไม่ใช่ admin ให้เตะกลับไปหน้า mainpage
  if (roleId !== '2') {
    return <Navigate to="/mainpage" replace />;
  }

  // ถ้าเป็น admin ให้แสดงเนื้อหาได้ปกติ
  return <Outlet />;
}

const App = () => {
  return (
    <div style={{ backgroundColor: "#FFFEF0" }}>
      <BrowserRouter basename="/SALA/">
        <Routes>
          <Route path="" element={<Navigate to="mainpage" replace />} />

          <Route path="signin" element={<Signin />} />
          <Route path="searchpage" element={<SearchPage />} />

          {/* route เฉพาะหน้าที่ต้องใช้ navbar ด้านบนนะ */}
          <Route element={<Menu />}>
            <Route path="collaborations" element={<Collaborations />} />
            <Route path="comeontrend" element={<ComeOnTrend />} />
            <Route path="seemoreinher" element={<SeeMoreInHer />} />
            <Route path="salapick" element={<SaLaPick />} />
            <Route path="wishlistpage" element={<WishlistPage />} />
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="signup" element={<Signup />} />
            <Route path="order-success/:order_id" element={<OrderSuccess />} />

            {/* route สำหรับหน้าที่ใช้ navbar และ sidebar และเปิดให้เข้าเฉพาะคนล็อกอินแล้วเท่านั้น */}
            <Route element={<ProtectedRoute />}>
              <Route element={<Sidebar />}>
                <Route path="orderhistory" element={<OrderHistory />} />
                <Route path="accountpage" element={<AccountPage />} />
                <Route path="personalinformation" element={<PersonalInformation />} />
                <Route path="shippingaddress" element={<ShippingAddress />} />
              </Route>
            </Route>
          </Route>

          {/* route สำหรับหน้าที่ต้องมีทั้ง navbar แล้วก็ footer */}
          <Route element={<LayOut />}>
            <Route path="/pickitem/:id" element={<PickItem />} />
            <Route path="shippingbagpage/:id" element={<ShippingBagPage />} />
            <Route path="mainpage" element={<MainPage />} />
            <Route path="seemorespring" element={<SeeMoreSpring />} />
          </Route>

          {/* Admin routes */}
          <Route element={<AdminRoute />}>
            <Route path="/Admin" element={<Navigate to="/Admin/Dashboard" replace />} />
            <Route path="/Admin/Dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
            <Route path="/Admin/Statistics" element={<AdminLayout><StatisticsPage /></AdminLayout>} />
            <Route path="/Admin/Products" element={<AdminLayout><ProductsPage /></AdminLayout>} />
            <Route path="/Admin/Category" element={<AdminLayout><CategoryPage /></AdminLayout>} />
            <Route path="/Admin/AddProduct" element={<AdminLayout><AddProductPage /></AdminLayout>} />
            <Route path="/Admin/Customers" element={<AdminLayout><CustomersPage /></AdminLayout>} />
            <Route path="/Admin/Orders" element={<AdminLayout><OrdersPage /></AdminLayout>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
