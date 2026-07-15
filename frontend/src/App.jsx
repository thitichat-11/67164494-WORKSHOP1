import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Menu from './components/Menu';

// page จากฝั่ง user
import Collaborations from './pages/user/Collaborations';


const App = () => {
  return (
    <div style={{backgroundColor: '#FFFEF0'}}>
      <BrowserRouter basename='/SALA/'>
        <Routes>
          <Route element={<Menu />}>
            <Route path='collaborations' element={<Collaborations />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

