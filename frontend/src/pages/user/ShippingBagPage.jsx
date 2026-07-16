import React, { useState } from 'react'; // เพิ่ม useState ตรงนี้
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import PickItem from './PickItem';

const ShippingBagPage = () => {

  const navigate = useNavigate()

  const [quantity, setQuantity] = useState(1) // ค่าจำนวนสินค้า

  const handleClose = () => {
    navigate('/pickitem')
  }

  return (
    <>
    
        <div className="position-relative" style={{ minHeight: '100vh', overflow: 'hidden' }}>
        
        <div style={{ pointerEvents: 'none', userSelect: 'none' }}>
            <PickItem />
        </div>

        {/* ทำให้พื้นหลังมันมืด ๆ หน่อย */}
        <div 
            onClick={handleClose}
            style={{position: 'fixed', // เอาไว้ overlap pick item
            top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1040,
            backgroundColor: 'rgba(0, 0, 0, 0.25)', cursor: 'pointer'}}
        />


        {/* only แถบขาว */}
        <div 
            className="d-flex flex-column"
            style={{
            position: 'fixed', top: 0, right: 0,
            height: '100vh', width: '450px',
            zIndex: 1050, padding: '30px',
            backgroundColor: '#FCFCF9', fontFamily: 'serif',
            boxShadow: '-4px 0 25px rgba(0,0,0,0.1)'
            }}>

            
            {/* เนื้อหา */}
            <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-light">
                <div>
                    <h5 className="m-0 fw-normal text-uppercase"
                    style={{ fontSize: '15px', letterSpacing: '1px' }}>
                        Shopping Bag
                    </h5>

                    <span style={{ fontSize: '11px'}}>
                        1 ITEM
                    </span>
                </div>

                <button onClick={handleClose} 
                className="border-0 bg-transparent fs-4" 
                style={{ cursor: 'pointer'}}>
                    ✕
                </button>
            </div>


            <div className="flex-grow-1 overflow-auto pe-1">

                <div className="d-flex gap-3 align-items-start mb-4">
                    <div style={{ width: '90px', aspectRatio: '3/4', overflow: 'hidden', border: '1px solid #f0f0f0' }}>
                    
                    <img className="w-100 h-100 object-fit-cover"
                        src="https://cdn-images.farfetch-contents.com/29/66/49/29/29664929_58766828_1000.jpg" alt="" />
                    </div>
                    
                    <div className="d-flex flex-column gap-1">
                        <span className="fw-semibold italic"
                        style={{ fontSize: '10px', letterSpacing: '0.5px' }}>
                            New Arrivals
                        </span>

                        <h6 className="m-0 fw-normal"
                        style={{ fontSize: '13px', lineHeight: '1.2' }}>
                            SALA Plaid Wool-Blend Twill Shirt Jacket
                        </h6>

                        <span style={{ fontSize: '12px' }}>BROWN , XS</span>
                        
                        <div className="d-flex align-items-center border border-dark mt-2" style={{ width: 'fit-content', height: '24px' }}>
                            <button className="border-0 bg-transparent px-2" 
                            style={{ fontSize: '12px', cursor: 'pointer' }}
                            onClick={() => {
                                if (quantity > 1) {
                                    setQuantity(quantity - 1);
                                }}}>
                                &minus;
                            </button>
                            
                            <span className="px-2" style={{ fontSize: '12px', minWidth: '20px', textAlign: 'center' }}>
                                {quantity}
                            </span>
                            
                            <button className="border-0 bg-transparent px-2" 
                            style={{ fontSize: '12px', cursor: 'pointer' }}
                            onClick={() => setQuantity(quantity + 1)}>
                                +
                            </button>
                        </div>

                    </div>
                </div>
            </div>


            <div className="border-top pt-3 mt-auto">
                
                <div className="d-flex justify-content-between align-items-baseline mb-1">
                    <span style={{ fontSize: '18px', letterSpacing: '0.5px' }}>
                        SUBTOTAL :
                    </span>
                    <span className="fw-normal fs-5">
                        $480
                    </span>
                </div>

                <p className="mb-4" 
                style={{ fontSize: '10px', letterSpacing: '0.2px' }}>
                    SHIPPING AND TAXES CALCULATED AT CHECKOUT.
                </p>

                
                <div className="d-flex gap-2 use-42dot">
                    <Button as={Link} to="/pickitem"
                    variant="outline-dark" 
                    className="rounded-0 py-2.5 fw-bold text-decoration-none text-center w-100"
                    style={{ fontSize: '12px', letterSpacing: '1px' }}>
                        CONTINUE SHOPPING
                    </Button>
                    
                    <Button as={Link} to="/"
                    variant="dark" 
                    className="rounded-0 py-2.5 fw-bold ext-decoration-none text-center w-100"
                    style={{ fontSize: '12px', letterSpacing: '1px' }}>
                        CHECKOUT
                    </Button>
                </div>
            </div>

        </div>
        </div>
    </>
  )
}

export default ShippingBagPage