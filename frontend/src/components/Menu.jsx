import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Menu = () => {
  return (
    <>
        <div className='position-relative d-flex justify-content-center align-items-center p-3'>
            <h1 className='m-0 fw-bolder'>SALA</h1>

            <div className='position-absolute end-10 d-flex gap-2 align-items-center fs-6'>
                
                <Link to='/' className='text-decoration-none text-dark'>   
                    <i className="bi bi-bag"></i>
                </Link>

                <Link to='/' className='text-decoration-none text-dark'>   
                    <i className="bi bi-heart"></i>
                </Link>

                <Link to='/' className='text-decoration-none text-dark'>   
                    <i className="bi bi-search"></i>
                </Link>
            </div>
        </div>

        {/* ส่วนล่าง */}
        <div className='row g-0 text-center py-2'>

            <div className='col-4 d-flex justify-content-end align-items-center pe-4'>
                <Link to='/' className='text-decoration-none text-dark'>            
                    <p className='m-0'>SALA</p>
                </Link>
            </div>

            <div className='col-4 d-flex justify-content-center align-items-center'>
                <Link to='/collaborations' className='text-decoration-none text-dark fw-medium'>           
                    <p className='m-0'>COLLABORATIONS</p>
                </Link>
            </div>

            <div className='col-4 d-flex justify-content-start align-items-center ps-4'>
                <Link to='/' className='text-decoration-none text-dark'>       
                    <p className='m-0'>COME ON TREND</p>
                </Link>
            </div>
            
        </div>

        <div className='mt-8'>
            <Outlet />
        </div>
    </>
  )
}

export default Menu