import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Menu = () => {

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
                
                <NavLink to='/pickitem' className='text-decoration-none text-dark'>   
                    <i className="bi bi-bag"></i>
                </NavLink>

                <NavLink to='/' className='text-decoration-none text-dark'>   
                    <i className="bi bi-heart"></i>
                </NavLink>

                <NavLink to='searchpage' className='text-decoration-none text-dark'>   
                    <i className="bi bi-search"></i>
                </NavLink>
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