import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {


  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const statusStyles = {
    completed: { bg: '#d4edda', color: '#155724' },
    pending: { bg: '#fff3cd', color: '#856404' },
    cancelled: { bg: '#f8d7da', color: '#721c24' },
    refunded: { bg: '#e2e3e5', color: '#383d41' },
  };


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://localhost:5000/api/accounts/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setOrders(response.data.orders);

      } catch (error) {
        console.error('Fetch Orders Error:', error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);



  if (loading) {
    return <div style={{ textAlign: 'center', padding: '60px' }}>Loading...</div>;
  }



  // ไม่มี order เลยให้แสดงหน้าเดิม
  if (orders.length === 0) {
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

        <div style={{ fontSize: '60px', color: '#000000' }}>
          <i className="bi bi-box-seam"></i>
        </div>

        <div style={{ fontSize: '48px', fontWeight: 'normal', letterSpacing: '1px' }}>
          NO RECENT ORDERS
        </div>

        <div>
          <Button variant="dark" onClick={() => navigate('/mainpage')}>SHOP NOW</Button>
        </div>

      </div>
    );
  }

  // ถ้ามี order ให้แสดงรายการ
  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>

      <h2 style={{ marginBottom: '24px' }}>MY ORDERS</h2>

      {orders.map(order => (
        <div key={order.order_id} style={{
          border: '1px solid rgba(0,0,0,0.15)',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '20px'
        }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontWeight: 'bold' }}>Order #{order.order_id}</span>
            <span style={{
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '13px',
              backgroundColor: statusStyles[order.status]?.bg || '#fff3cd',
              color: statusStyles[order.status]?.color || '#856404'
            }}>
              {order.status}
            </span>
          </div>

          {order.items.map(item => (
            <div key={item.item_id} style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              marginBottom: '10px'
            }}>
              <img
                src={item.img_url}
                alt={item.color}
                style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
              />
              <div style={{ textAlign: 'left', flex: 1 }}>
                <div>Color: {item.color} {item.size ? `/ Size: ${item.size}` : ''}</div>
                <div>Qty: {item.quantity}</div>
              </div>
              <div style={{ fontWeight: 'bold' }}>{item.price} $</div>
            </div>
          ))}

          <div style={{ textAlign: 'right', marginTop: '12px', fontWeight: 'bold' }}>
            TOTAL : {order.total_price} $
          </div>

        </div>
      ))}

    </div>
  )



}

export default AccountPage