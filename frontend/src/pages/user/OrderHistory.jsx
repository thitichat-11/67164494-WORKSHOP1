import React from 'react'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState, useEffect } from 'react';


// แถบเมนูสำหรับสถานะคำสั่งซื้อ
const tabs = [
  { label: 'ALL', statuses: ['pending', 'completed', 'cancelled', 'refunded'] },
  { label: 'PENDING PAYMENT', statuses: ['pending'] },
  { label: 'COMPLETED', statuses: ['completed'] },
  { label: 'CANCELLED / REFUNDED', statuses: ['cancelled', 'refunded'] },
];



const OrderHistory = () => {


  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState(0); // index ของ TABS, เริ่มที่ ALL
  const [loading, setLoading] = useState(true);



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


  // filter orders ตาม status ของแท็บที่เลือกอยู่
  const filteredOrders = orders.filter(order =>
    tabs[activeTab].statuses.includes(order.status)
  );



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

      {/* แถบเมนู */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        maxWidth: '600px',
        borderBottom: '1px solid #ddd',
        paddingBottom: '12px'
      }}>
        {tabs.map((tab, index) => (
          <p
            key={index}
            onClick={() => setActiveTab(index)}
            style={{
              margin: 0,
              cursor: 'pointer',
              fontWeight: activeTab === index ? 'bold' : 'normal',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </p>
        ))}
      </div>

      {/* เนื้อหา */}
      {loading ? (
        <div>Loading...</div>
      ) : filteredOrders.length === 0 ? (
        <>
          <div style={{ fontSize: '60px', color: '#000000' }}>
            <i className="bi bi-box-seam"></i>
          </div>

          <div style={{ fontSize: '48px', fontWeight: 'normal', letterSpacing: '1px' }}>
            NO RECENT ORDERS
          </div>

          <div>
            <Button variant="dark">SHOP NOW</Button>
          </div>
        </>
      ) : (
        <div style={{ width: '100%', maxWidth: '600px', textAlign: 'left' }}>
          {filteredOrders.map(order => (
            <div
              key={order.order_id}
              style={{
                border: '1px solid #eee',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '12px'
              }}
            >
              <p style={{ margin: 0, fontWeight: 'bold' }}>
                Order #{order.order_id} — {order.status.toUpperCase()}
              </p>
              <p style={{ margin: '4px 0' }}>
                TOTAL: {order.total_price} $
              </p>
              <p style={{ margin: '4px 0', fontSize: '14px', color: '#666' }}>
                {new Date(order.created_at).toLocaleDateString('th-TH')}
              </p>

              {order.items?.map(item => (
                <div key={item.item_id} style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                  {item.img_url && (
                    <img src={item.img_url} alt="" style={{ width: '48px', height: '48px', objectFit: 'cover' }} />
                  )}
                  <div>
                    <p style={{ margin: 0 }}>
                      {item.color} / {item.size} × {item.quantity}
                    </p>
                    <p style={{ margin: 0, color: '#666' }}>{item.price} $ </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default OrderHistory