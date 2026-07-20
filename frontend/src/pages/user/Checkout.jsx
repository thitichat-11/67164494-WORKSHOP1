import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
    const { id } = useParams();
    const navigate = useNavigate();




    // States สำหรับจัดการข้อมูลตะกร้าสินค้าจริง
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const shippingFree = 0;




    // States สำหรับฟอร์มข้อมูลลูกค้า
    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        country: 'THAILAND',
        phone: '',
        address: '',
        city: '',
        state: '',
        postcode: '',
    });




    // State สำหรับเก็บวิธีชำระเงิน
    const [paymentMethod, setPaymentMethod] = useState('PROMPTPAY');
    const [paymentSlip, setPaymentSlip] = useState(null);
    const [slipPreview, setSlipPreview] = useState(null);




    // ดึงข้อมูลสินค้าในตะกร้าจาก Backend เมื่อหน้าเว็บโหลด
    useEffect(() => {
        const fetchCartData = async () => {
            try {

                const userId = localStorage.getItem('userId');
                if (!userId) {
                    console.error("ไม่พบ User ID ใน localStorage กรุณาเช็กตอน Login");
                    return;
                }

                const response = await axios.get(`/api/cart/${userId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });

                setCartItems(response.data);

                // คำนวณราคารวมทั้งหมด
                const total = response.data.reduce((sum, item) => sum + (item.base_price * item.quantity), 0);
                setSubtotal(total);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartData();
    }, []);

    // ฟังก์ชันจัดการการกรอกข้อมูลใน Input ทุกประเภท
    const handleInputChange = (e) => {
        const { id, value } = e.target;

        // แปลง id ของ Form เช่น inputfirstname -> firstname
        let fieldName = id.replace('input', '').toLowerCase();

        // แมปชื่อ fieldName ให้สอดคล้องกับ Key ใน formData
        if (fieldName === 'firstname') fieldName = 'first_name';
        if (fieldName === 'lastname') fieldName = 'last_name';
        if (fieldName === 'country') fieldName = 'country'; // ดักจับสำหรับ inputCountry

        setFormData({
            ...formData,
            [fieldName]: value
        });
    };


    // ฟังก์ชันจัดการการอัปโหลดสลิป
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPaymentSlip(file);
            setSlipPreview(URL.createObjectURL(file));
        }
    };





    // ฟังก์ชันสำหรับส่งข้อมูลการสั่งซื้อไป Backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!paymentSlip) {
            alert("กรุณาแนบหลักฐานการโอนเงินก่อนสั่งซื้อ");
            return;
        }

        const orderData = new FormData();
        orderData.append('payment_slip', paymentSlip);
        orderData.append('cart_items', JSON.stringify(cartItems));
        orderData.append('subtotal', subtotal);
        orderData.append('shipping_free', shippingFree);
        orderData.append('total_price', subtotal + shippingFree);
        orderData.append('payment_method', paymentMethod);

        Object.entries(formData).forEach(([key, value]) => {
            orderData.append(key, value);
        });

        try {
            const response = await axios.post('/api/checkout', orderData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.success) {
                navigate(`/order-success/${response.data.order_id}`);
            }
        } catch (error) {
            console.error("Error creating order:", error);
            alert(error.response?.data?.message || "เกิดข้อผิดพลาดในการสั่งซื้อ กรุณาลองใหม่อีกครั้ง");
        }
    };

    return (
        <div>
            <Link to={`/pickitem/${id}`} className='text-decoration-none text-black'>
                <div className="absolute top-24 left-8 flex items-center gap-2 cursor-pointer text-sm">
                    <i className="bi bi-arrow-left"></i>
                    <span className="font-semibold">BACK TO SHOP</span>
                </div>
            </Link>

            {/* ใช้แท็ก <form> คลุมทั้งหมด เพื่อให้การตรวจตรวจสอบ required ทำงานอย่างถูกต้อง */}
            <form onSubmit={handleSubmit} className="flex justify-between items-start gap-40 w-full max-w-6xl mx-auto p-6">

                {/* ด้านซ้าย (หน้าสรุปออเดอร์จริง ดึงตาม State) */}
                <div className="w-1/2">
                    <h4 className="text-lg font-bold mb-4">ORDER SUMMARY</h4>
                    <p className="text-gray-500 mb-4">({cartItems.length} ITEMS IN CART)</p>

                    {/* ส่วนแสดงไอเท็มทั้งหมดในตะกร้า แบบ Loop */}
                    <div className="space-y-4 max-h-96 overflow-y-auto mb-6 pr-2">
                        {cartItems.map((item, index) => (
                            <div key={index} className="flex gap-4 border-b pb-4">
                                {/* ดึงรูปภาพหลัก (img_url ที่แปลงเป็น image_url แล้ว) */}
                                <img
                                    src={item.img_url || "https://via.placeholder.com/150"}
                                    className="w-24 h-32 object-cover"
                                    alt={item.product_name}
                                />
                                <div>
                                    {/* ดึงชื่อสินค้า (product_name) */}
                                    <p className="font-semibold">{item.product_name}</p>
                                    {/* ดึง Size และ Color มาโชว์เพิ่มเติมได้ เพราะหลังบ้านส่งมาให้แล้ว */}
                                    <p className="text-xs text-gray-400">Color: {item.color} | Size: {item.size}</p>
                                    {/* ดึงจำนวนชิ้น (quantity) */}
                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    {/* ดึงราคา (base_price) */}
                                    <p className="font-bold mt-2">${item.base_price}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between"><p>SUBTOTAL:</p><p>${subtotal}</p></div>
                        <div className="flex justify-between"><p>SHIPMENT:</p><p>{shippingFree === 0 ? 'Free' : `$${shippingFree}`}</p></div>
                        <div className="flex justify-between font-bold text-lg border-t pt-2"><p>TOTAL:</p><p>${subtotal + shippingFree}</p></div>
                    </div>
                </div>

                {/* ด้านขวา (ฟอร์มที่อยู่และการจ่ายเงิน) */}
                <div className="w-1/2">
                    <h4 className="text-lg font-bold mb-4">CONTACT INFORMATION</h4>

                    <div className="flex items-center gap-2 text-sm">
                        <i className="bi bi-geo-alt"></i>
                        <span className="font-semibold">SHIPPING ADDRESS</span>
                    </div>

                    <div className="mt-6">
                        <Form.Label htmlFor="inputemail">
                            EMAIL <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="email"
                            id="inputemail"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            style={{ border: '0.5px solid rgba(0, 0, 0, 0.2)' }}
                        />
                    </div>

                    <div className="w-full">
                        <div className="flex gap-10 mb-6 mt-6" >
                            <div className="w-1/2">
                                <Form.Label htmlFor="inputfirstname">
                                    FIRST NAME <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    id="inputfirstname"
                                    value={formData.first_name}
                                    onChange={handleInputChange}
                                    required
                                    style={{ border: '0.5px solid rgba(0, 0, 0, 0.2)' }}
                                />
                            </div>

                            <div className="w-1/2">
                                <Form.Label htmlFor="inputlastname">
                                    LAST NAME <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    id="inputlastname"
                                    value={formData.last_name}
                                    onChange={handleInputChange}
                                    required
                                    style={{ border: '0.5px solid rgba(0, 0, 0, 0.2)' }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="flex gap-10 mb-6">
                            <div className="w-1/2">
                                <Form.Label htmlFor="inputCountry">
                                    COUNTRY <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Select
                                    id='inputCountry'
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    required
                                    style={{ border: '0.5px solid rgba(0, 0, 0, 0.2)' }}>
                                    <option value="THAILAND">THAILAND</option>
                                    <option value="SINGAPORE">SINGAPORE</option>
                                    <option value="MALAYSIA">MALAYSIA</option>
                                    <option value="JAPAN">JAPAN</option>
                                    <option value="KOREA">KOREA</option>
                                </Form.Select>
                            </div>

                            <div className="w-1/2">
                                <Form.Label htmlFor="inputphone">
                                    PHONE <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    id="inputphone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    maxLength={10}
                                    required
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                    }}
                                    style={{ border: '0.5px solid rgba(0, 0, 0, 0.2)' }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Form.Label htmlFor="inputaddress">
                            ADDRESS <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            id="inputaddress"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                            style={{ border: '0.5px solid rgba(0, 0, 0, 0.2)' }}
                        />
                    </div>

                    <div className="w-full">
                        <div className="flex gap-10 mt-6 mb-6">
                            <div className="w-1/2">
                                <Form.Label htmlFor="inputcity">
                                    CITY <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    id="inputcity"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    required
                                    style={{ border: '0.5px solid rgba(0, 0, 0, 0.2)' }}
                                />
                            </div>

                            <div className="w-1/2">
                                <Form.Label htmlFor="inputstate">
                                    STATE <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    id="inputstate"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    required
                                    style={{ border: '0.5px solid rgba(0, 0, 0, 0.2)' }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-1/2 mt-6">
                        <Form.Label htmlFor="inputpostcode">
                            POSTCODE <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            id="inputpostcode"
                            value={formData.postcode}
                            onChange={handleInputChange}
                            required
                            style={{ border: '0.5px solid rgba(0, 0, 0, 0.2)' }}
                        />
                    </div>

                    <div className="flex items-center gap-2 mt-14 text-sm">
                        <h4> SELECT PAYMENT METHOD </h4>
                    </div>

                    {/* ปรับ Accordion ให้เซ็ตค่า paymentMethod ทันทีเมื่อเปลี่ยน activeKey */}
                    <Accordion
                        activeKey={paymentMethod}
                        onSelect={(activeKey) => { if (activeKey) setPaymentMethod(activeKey) }}
                        style={{ border: '0.5px solid rgba(0, 0, 0, 0.2)' }}
                    >
                        <Accordion.Item eventKey="PROMPTPAY" style={{ border: '0.5px solid rgba(0, 0, 0, 0.2)' }}>
                            <Accordion.Header><i className="bi bi-qr-code-scan">&nbsp;&nbsp;</i>PROMPTPAY</Accordion.Header>
                            <Accordion.Body>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="PromptPay" />
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="CREDIT_CARD">
                            <Accordion.Header><i className="bi bi-credit-card"></i>&nbsp;&nbsp;CREDIT / DEBIT CARD</Accordion.Header>
                            <Accordion.Body>
                                KBANK 1234567890
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>


                    <div className="mt-6">
                        <Form.Label className="d-flex align-items-center gap-2 mt-5 fs-3">
                            Proof of payment <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handleFileChange}
                            required
                            style={{ border: '0.5px solid rgba(0, 0, 0, 0.2)' }}
                        />
                        {slipPreview && (
                            <img src={slipPreview} alt="preview" className="mt-2 w-32 h-32 object-cover" />
                        )}
                    </div>


                    {/* ใส่ type="submit" ให้กับปุ่มสั่งซื้อ */}
                    <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        style={{
                            backgroundColor: 'black',
                            borderColor: 'black',
                            marginTop: '56px',
                            marginBottom: '66px',
                            fontSize: '16px',
                            fontWeight: 'medium',
                            letterSpacing: '1px',
                            fontFamily: "'42dot Sans', sans-serif",
                            border: '0.5px solid rgba(0, 0, 0, 0.2)'
                        }}
                    >
                        PLACE ORDER
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Checkout;