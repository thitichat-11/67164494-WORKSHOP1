import React from 'react'
import Menu from './Menu'
import { Link } from 'react-router-dom'

const LayOut = () => {
  return (
    <>
        <Menu />

        <footer className='row g-0 text-center py-2 fw-bolder'>

            <div className='col-4 pe-4'>
                <div className='mb-2'>SALA</div>
                <div className='fw-normal' style={{ fontSize: '14px' }}>
                    <Link to='collaborations' className='text-decoration-none text-dark'>
                        <div>COLLABORATIONS</div>
                    </Link>
                    <div>PRIVACY POLICY</div>
                    <Link to='comeontrend' className='text-decoration-none text-dark'>
                        <div>COME ON TREND</div>
                    </Link>
                </div>
            </div>

            <div className='col-4'>
                <div className='mb-2'>CONNECT</div>
                <div className='fw-normal' style={{ fontSize: '14px' }}>
                    <div>FACEBOOK</div>
                    <div>INSTAGRAM</div>
                    <div>LINE OFFICIAL</div>
                </div>
            </div>

            <div className='col-4 ps-4'>
                <div className='mb-2'>HELP</div>
                <div className='fw-normal' style={{ fontSize: '14px' }}>
                    <div>SHIPPING AND RETURNS</div>
                    <div>LEGAL</div>
                </div>
            </div>
        </footer>
    </>
  )
}

export default LayOut