import React from 'react'
import Button from 'react-bootstrap/Button';

const OrderHistory = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 20px',
      textAlign: 'center',
      gap: '16px'
    }}>

      <div style={{ fontSize: '60px', color: '#000000' }}> {/* ขยายขนาดไอคอนให้สมดุลกับกล่อง */}
        <i class="bi bi-box-seam"></i>
      </div>

      <div style={{ fontSize: '48px', fontWeight: 'normal', letterSpacing: '1px' }}>
        NO RECENT ORDERS
      </div>

      <div>
        <Button variant="dark">SHOP NOW</Button>
      </div>

    </div>
  )
}

export default OrderHistory