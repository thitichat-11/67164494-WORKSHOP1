import React from 'react'
import { NavLink, Outlet, useParams, useNavigate } from 'react-router-dom'

const Menu = () => {

    const navigate = useNavigate()

    const { id } = useParams() // ดึง id ปัจจุบันมา
    const activeId = id || 1   // แต่ถ้าไม่มีก็ให้เป็น 1

    const isLoggedIn = !!localStorage.getItem('token')

    const handleAccountClick = () => {
        if (isLoggedIn) {
        navigate('/accountpage')
        } else {
        navigate('/signin')
        }
    }

    const handleBagClick = (e) => {
        e.preventDefault() // หยุดไม่ให้ navlink มันทำงานทันที่เรากดไป คือให้เช็คก่อน
        if (isLoggedIn) {
            navigate(`/shippingbagpage/${activeId}`)
        } else {
            navigate('/signin')
        }
    }

    const getUnderLine = ({ isActive }) => {
        return `text-decoration-none text-dark m-0 d-inline-block pb-1 ${
        isActive ? 'border-bottom border-dark fw-bold' : ''
        }`
    }

  return (
    <>
        <div className='position-relative d-flex justify-content-center align-items-center p-3 mt-2'>
            <NavLink to='/mainpage' className='text-decoration-none text-dark'>
                <h1 className='m-0 fw-bolder'>SALA</h1>
            </NavLink>

            <div className='position-absolute end-10 d-flex gap-2 align-items-center fs-6'>
                
                <NavLink to={`/shippingbagpage/${activeId}`} 
                onClick={handleBagClick} className='text-decoration-none text-dark'>   
                    <i className="bi bi-bag"></i>
                </NavLink>

                <NavLink to='/wishlistpage' className='text-decoration-none text-dark'>   
                    <i className="bi bi-heart"></i>
                </NavLink>

                <NavLink to='/searchpage' className='text-decoration-none text-dark'>   
                    <i className="bi bi-search"></i>
                </NavLink>

                <span onClick={handleAccountClick} className='text-decoration-none text-dark' 
                style={{ cursor: 'pointer', fontSize: '19px' }}>
                    <i className="bi bi-person"></i>
                </span>
            </div>
        </div>

        {/* ส่วนล่าง */}
        <div className='row g-0 text-center py-2'>

            <div className='col-4 d-flex justify-content-end align-items-center pe-4'>
                <NavLink to='/salapick' end className={getUnderLine}>            
                    SALA
                </NavLink>
            </div>

            <div className='col-4 d-flex justify-content-center align-items-center'>
                <NavLink to='/collaborations' className={getUnderLine}>           
                    COLLABORATIONS
                </NavLink>
            </div>

            <div className='col-4 d-flex justify-content-start align-items-center ps-4'>
                <NavLink to='/comeontrend' className={getUnderLine}>       
                    COME ON TREND
                </NavLink>
            </div>
            
        </div>

        <div className='mt-5'>
            <Outlet />
        </div>
    </>
  )
}

export default Menu