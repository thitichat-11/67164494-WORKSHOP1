import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Collaborations from './pages/user/Collaborations';

// page จากฝั่ง user


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

