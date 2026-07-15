import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


// page จากฝั่ง user
import Collaborations from "./pages/user/Collaborations";
import MainPage from "./pages/user/MainPage";
import ComeOnTrend from "./pages/user/ComeOnTrend";
import SeeMoreInHer from "./pages/user/SeeMoreInHer";
import SearchPage from "./pages/user/SearchPage";

// components
import Menu from "./components/Menu";
import LayOut from "./components/LayOut";
import PickItem from "./pages/user/PickItem";


const App = () => {
  return (
    <div style={{ backgroundColor: "#FFFEF0" }}>
      <BrowserRouter basename="/SALA/">
        <Routes>

          <Route path="searchpage" element={<SearchPage />} />

          {/* route เฉพาะหน้าที่ต้องใช้ navbar ด้านบนนะ */}
          <Route element={<Menu />}>
            <Route path="mainpage" element={<MainPage />} />
            <Route path="collaborations" element={<Collaborations />} />
            <Route path="comeontrend" element={<ComeOnTrend />} />
            <Route path="seemoreinher" element={<SeeMoreInHer />} /> 
          </Route>

          {/* route สำหรับหน้าที่ต้องมีทั้ง navbar แล้วก็ footer */}
          <Route element={<LayOut />}>
            <Route path="pickitem" element={<PickItem />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;