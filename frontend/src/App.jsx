import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import Login from "./pages/user/Login";
import OrderHistory from "./pages/user/OrderHistory";

// components
import Menu from "./components/Menu";
import LayOut from "./components/LayOut";
import Sidebar from "./components/SideBar";

const App = () => {
  return (
    <div style={{ backgroundColor: "#FFFEF0" }}>
      <BrowserRouter basename="/SALA/">
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="searchpage" element={<SearchPage />} />

          {/* route เฉพาะหน้าที่ต้องใช้ navbar ด้านบนนะ */}
          <Route element={<Menu />}>
            <Route path="collaborations" element={<Collaborations />} />
            <Route path="comeontrend" element={<ComeOnTrend />} />
            <Route path="seemoreinher" element={<SeeMoreInHer />} />
            <Route path="salapick" element={<SaLaPick />} />
            <Route path="wishlistpage" element={<WishlistPage />} />

            {/* route สำหรับหน้าที่ใช้ navbar และ sidebar */}
            <Route element={<Sidebar />}>
              <Route path="orderhistory" element={<OrderHistory />} />
            </Route>
          </Route>

          {/* route สำหรับหน้าที่ต้องมีทั้ง navbar แล้วก็ footer */}
          <Route element={<LayOut />}>
            <Route path="pickitem" element={<PickItem />} />
            <Route path="shippingbagpage" element={<ShippingBagPage />} />
            <Route path="mainpage" element={<MainPage />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
