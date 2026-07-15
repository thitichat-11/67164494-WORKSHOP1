import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Menu from './components/Menu';

// page จากฝั่ง user
import Collaborations from './pages/user/Collaborations';
import MainPage from './pages/user/MainPage'; // สมมติว่าคุณมีหน้า MainPage สำหรับหน้าแรก


const App = () => {
  return (
    <div style={{backgroundColor: '#FFFEF0'}}>
      <BrowserRouter basename='/SALA/'>
        <Routes>
          <Route element={<Menu />}>
            
            {/* เพิ่มบรรทัดนี้: เพื่อให้เป็นหน้าเริ่มต้นเมื่อเข้ามาที่ URL หลัก */}
            <Route index element={<MainPage />} /> 
            {/* หรือจะใช้เป็น <Route path="/" element={<MainPage />} /> ก็ได้ครับ */}

            <Route path='collaborations' element={<Collaborations />} />
          
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App