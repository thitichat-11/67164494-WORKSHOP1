import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// page จากฝั่ง user
import Collaborations from './pages/user/Collaborations';

const App = () => {
  return (
    <>
      <BrowserRouter basename='/SALA/'>
        <Routes>
          <Route path='collaborations' element={<Collaborations />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App