import React from 'react'
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom';


const Checkout = () => {

    const { id } = useParams()

    return (
        <div>

            <Link to={`/pickitem/${id}`} className='text-decoration-none text-black'>    
                <div className="absolute top-24 left-8 flex items-center gap-2 cursor-pointer text-sm">
                    <i className="bi bi-arrow-left"></i>
                    <span className="font-semibold">BACK TO SHOP</span>
                </div>
            </Link>

            <div className="flex justify-between items-start gap-40 w-full max-w-6xl mx-auto p-6">

                {/* ด้านซ้าย (หน้าสรุปออเดอร์) */}
                <div className="w-1/2">
                    <h4 className="text-lg font-bold mb-4">ORDER SUMMARY</h4>
                    <p className="text-gray-500 mb-4">(ดึงจำนวนไอเท็มในตะกร้ามาแสดง)</p>

                    {/* ส่วนรูปภาพและรายละเอียดสินค้า */}
                    <div className="flex gap-4 mb-6">
                        <img src="path-to-image.jpg" className="w-24 h-32 object-cover" alt="product" />
                        <div>
                            <p className="font-semibold">SALA Plaid Wool-Blend Twill Shirt Jacket</p>
                            <p className="text-sm text-gray-500">Qty: 1</p>
                            <p className="font-bold mt-2">$480</p>
                        </div>
                    </div>

                    <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between"><p>SUBTOTAL:</p><p>$480</p></div>
                        <div className="flex justify-between"><p>SHIPMENT:</p><p>Free</p></div>
                        <div className="flex justify-between font-bold text-lg border-t pt-2"><p>TOTAL:</p><p>$480</p></div>
                    </div>
                </div>

                {/* ด้านขวา (ฟอร์มที่อยู่และการจ่ายเงิน) */}
                <div className="w-1/2">
                    <h4 className="text-lg font-bold mb-4">CONTACT INFORMATION</h4>
                    {/*Form */}

                    <div className="flex items-center gap-2 text-sm">
                        <i class="bi bi-geo-alt"></i>
                        <span className="font-semibold">SHIPPING ADDRESS</span>
                    </div>


                    <div className="mt-6">
                        <Form.Label htmlFor="inputemail">
                            EMAIL <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="email"
                            id="inputemail"
                            aria-describedby="emailHelpBlock"
                            required //บังคับต้องใส่
                            style={{
                                border: '0.5px solid rgba(0, 0, 0, 0.2)', // เส้นขอบบาง 0.5px สีดำจางๆ 20%
                            }}
                        />
                    </div>




                    <div className="w-full">
                        {/* สร้างกล่องครอบสองช่องนี้และใช้ flex เพื่อจัดเรียงซ้าย-ขวา */}
                        <div className="flex gap-10 mb-6 mt-6" >

                            {/* กล่อง First Name (ใช้ w-1/2 เพื่อแบ่งคนละครึ่ง) */}
                            <div className="w-1/2">
                                <Form.Label htmlFor="inputfirstname">
                                    FIRST NAME <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    id="inputfirstname"
                                    aria-describedby="firstnameHelpBlock"
                                    required
                                    style={{
                                        border: '0.5px solid rgba(0, 0, 0, 0.2)',
                                    }}
                                />
                            </div>

                            {/* กล่อง Last Name (ใช้ w-1/2 เพื่อแบ่งคนละครึ่ง) */}
                            <div className="w-1/2">
                                <Form.Label htmlFor="inputlastname">
                                    LAST NAME <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    id="inputlastname"
                                    aria-describedby="lastnameHelpBlock"
                                    required
                                    style={{
                                        border: '0.5px solid rgba(0, 0, 0, 0.2)',
                                    }}
                                />
                            </div>

                        </div>
                    </div>



                    <div className="w-full">
                        {/* สร้างกล่องครอบสองช่องนี้และใช้ flex เพื่อจัดเรียงซ้าย-ขวา */}
                        <div className="flex gap-10 mb-6">

                            {/* กล่อง First Name (ใช้ w-1/2 เพื่อแบ่งคนละครึ่ง) */}
                            <div className="w-1/2">
                                <Form.Label htmlFor="inputCONTRY">
                                    CONTRY   <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Select aria-label="Default select example" required style={{
                                    border: '0.5px solid rgba(0, 0, 0, 0.2)',
                                }}>
                                    <option value="1">THAILAND</option>
                                    <option value="2">SINGAPORE</option>
                                    <option value="3">MALAYSIA</option>
                                    <option value="4">JAPAN</option>
                                    <option value="5">KOREA</option>
                                </Form.Select>
                            </div>

                            {/* กล่อง Last Name (ใช้ w-1/2 เพื่อแบ่งคนละครึ่ง) */}
                            <div className="w-1/2">
                                <Form.Label htmlFor="inputphone">
                                    PHONE <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    id="inputphone"
                                    aria-describedby="phoneHelpBlock"
                                    required
                                    style={{
                                        border: '0.5px solid rgba(0, 0, 0, 0.2)',
                                    }}
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
                            aria-describedby="addressHelpBlock"
                            required //บังคับต้องใส่
                            style={{
                                border: '0.5px solid rgba(0, 0, 0, 0.2)', // เส้นขอบบาง 0.5px สีดำจางๆ 20%
                            }}
                        />
                    </div>


                    <div className="w-full">
                        {/* สร้างกล่องครอบสองช่องนี้และใช้ flex เพื่อจัดเรียงซ้าย-ขวา */}
                        <div className="flex gap-10 mt-6 mb-6">

                            {/* กล่อง First Name (ใช้ w-1/2 เพื่อแบ่งคนละครึ่ง) */}
                            <div className="w-1/2">
                                <Form.Label htmlFor="inputcity">
                                    CITY <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    id="inputcity"
                                    aria-describedby="cityHelpBlock"
                                    required
                                    style={{
                                        border: '0.5px solid rgba(0, 0, 0, 0.2)',
                                    }}
                                />
                            </div>

                            {/* กล่อง Last Name (ใช้ w-1/2 เพื่อแบ่งคนละครึ่ง) */}
                            <div className="w-1/2">
                                <Form.Label htmlFor="inputstate">
                                    STATE <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    id="inputstate"
                                    aria-describedby="stateHelpBlock"
                                    required
                                    style={{
                                        border: '0.5px solid rgba(0, 0, 0, 0.2)',
                                    }}
                                />
                            </div>

                        </div>
                    </div>



                    <div className=" w-1/2 mt-6">
                        <Form.Label htmlFor="inputpostcode">
                            POSTCODE <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            id="inputpostcode"
                            aria-describedby="postcodeHelpBlock"
                            required //บังคับต้องใส่
                            style={{
                                border: '0.5px solid rgba(0, 0, 0, 0.2)', // เส้นขอบบาง 0.5px สีดำจางๆ 20%
                            }}
                        />
                    </div>




                    <div className="flex items-center gap-2 mt-14 text-sm">
                        <h4> SELECT PAYMENT METHOD </h4>
                    </div>


                    <Accordion defaultActiveKey="0" style={{
                        border: '0.5px solid rgba(0, 0, 0, 0.2)', // เส้นขอบบาง 0.5px สีดำจางๆ 20%
                    }}>

                        <Accordion.Item eventKey="0" style={{
                            border: '0.5px solid rgba(0, 0, 0, 0.2)', // เส้นขอบบาง 0.5px สีดำจางๆ 20%
                        }}>

                            <Accordion.Header><i class="bi bi-qr-code-scan">&nbsp;&nbsp;</i>PROMPTPAY</Accordion.Header>

                            <Accordion.Body>

                                <img src=" https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="" />

                            </Accordion.Body>
                        </Accordion.Item>


                        <Accordion.Item eventKey="1">

                            <Accordion.Header><i class="bi bi-credit-card"></i>&nbsp;&nbsp;CREDIT / DEBIT CARD</Accordion.Header>

                            <Accordion.Body>

                                KBANK 1234567890


                            </Accordion.Body>

                        </Accordion.Item>
                    </Accordion>



                    <Button
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



            </div>






        </div>
    )
}

export default Checkout