import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';

const Sidebar = () => {

  const navigate = useNavigate()
  
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false)
    navigate('/')
  }

  // ฟังก์ชันคำนวณคลาสสีของแถบเมนู (เมื่อ Active จะเปลี่ยนเป็นแถบดำเต็มความกว้าง ตัวหนังสือขาว)
  const getMenuClass = ({ isActive }) => {
    return `text-decoration-none text-uppercase p-2 px-3 d-block w-100 ${
      isActive 
        ? 'bg-dark text-white fw-normal' 
        : 'text-dark fw-normal'
    }`
  }

  return (
    <>

      <Container className="py-5" style={{ maxWidth: '1200px', fontFamily: 'serif' }}>
        <Row className="g-4">
          
          <Col xs={12} md={3}>
            <div className="d-flex flex-column" style={{ maxWidth: '240px' }}>
              
              <h2 className="fw-bold mb-1" 
              style={{ fontSize: '30px', letterSpacing: '1px' }}>
                ACCOUNT
              </h2>
              
              {/* เดี๋ยวจะเป็นชื่อของ user ที่มาใช้งาน */}
              <span className="fw-semibold mb-4"
              style={{ fontSize: '23px'}}>
                John Doe
              </span>


              <div className="d-flex flex-column gap-1"
              style={{ fontSize: '11px', letterSpacing: '0.8px' }}>
                <NavLink to='/' className={getMenuClass}>Overview</NavLink>
                <NavLink to='/' className={getMenuClass}>Personal Information</NavLink>
                <NavLink to='/orderhistory' className={getMenuClass}>Order History</NavLink>
                <NavLink to='/' className={getMenuClass}>Shipping Addresses</NavLink>
                
                <button onClick={() => setShowLogoutModal(true)}
                  className="border-0 bg-transparent text-start p-2 px-3 w-100" 
                  style={{ fontSize: '11px', letterSpacing: '0.8px', cursor: 'pointer' }}>
                    LOGOUT
                </button>
              </div>

            </div>
          </Col>


          <Col xs={12} md={9}>
            <Outlet />
          </Col>

        </Row>
      </Container>



      {showLogoutModal && (
        <>
          <div onClick={() => setShowLogoutModal(false)}
          style={{
              position: 'fixed', // เอาไว้ overlap หน้าอื่น
              top: 0, left: 0, width: '100vw', height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              zIndex: 2000, cursor: 'pointer'}}/>
              

            {/* only พื้นขาว */}
            <div style={{ position: 'fixed',
            top: '50%', left: '50%', width: '480px', padding: '40px',
            zIndex: 2011, transform: 'translate(-50%, -50%)', // ตำแหน่ง
            backgroundColor: '#E0E0E0', boxShadow: '0 10px 40px rgba(0,0,0,0.2)'}}>
            

            <h4 className="m-0 mb-2 fw-bold" style={{ fontSize: '20px' }}>
              Logout Confirmation!
            </h4>
            
            <p className="mb-4" style={{ color: '#555', fontSize: '15px' }}>
              Are you sure you want to logout?
            </p>

            <div className="d-flex gap-2 justify-content-end use-42dot">
              <Button onClick={() => setShowLogoutModal(false)}
                variant="light" 
                className="rounded-0 px-4 py-2 text-uppercase fw-bold border"
                style={{ fontSize: '12px', letterSpacing: '1px', backgroundColor: '#FFF', color: '#000' }}>
                    Cancel
              </Button>
              
              <Button onClick={handleLogoutConfirm}
                variant="dark" 
                className="rounded-0 px-4 py-2 text-uppercase fw-bold"
                style={{ fontSize: '12px', letterSpacing: '1px' }}>
                    Logout
              </Button>
            </div>

          </div>
        </>
      )}
    </>
  )
}

export default Sidebar