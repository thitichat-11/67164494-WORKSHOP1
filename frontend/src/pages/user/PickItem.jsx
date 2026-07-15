import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

    // demo ไว้ก่อน
    const recommendedProducts = [
    {
        id: 1,
        tag: 'New Arrivals',
        name: 'SALA Good Baby Blue Plaid Coat',
        price: '$700',
        image: 'https://i.pinimg.com/736x/1c/67/cd/1c67cd0258983b097b438ebc048d7e7f.jpg',
        colors: ['#2C3E50']
    },
    {
        id: 2,
        tag: 'New Arrivals',
        name: "SALA Girls Don't Cry Dress",
        price: '$900',
        image: 'https://i.pinimg.com/736x/da/67/d8/da67d87da6a9da1801f7eae25f2394aa.jpg',
        colors: ['#000000']
    },
    {
        id: 3,
        tag: 'New Arrivals',
        name: 'SALA Rainy Night Double-Breasted Coat',
        price: '$560',
        image: 'https://www.pusspussmagazine.com/wp-content/uploads/2025/02/image00003.jpg',
        colors: ['#A07855']
    },
    {
        id: 4,
        tag: 'New Arrivals',
        name: 'SALA WINTERFELL SWEATER',
        price: '$400',
        image: 'https://files.vogue.co.th/uploads/Winter_Aespa_Ralph_Lauren_Brand_Ambassador_-_COVER_VERTICAL.jpg',
        colors: ['#F5E6D3', '#1C2833']
    }
    ]

const PickItem = () => {
  return (
    <>

        {/* กล่องใหญ่ */}
        <Container className="py-5" style={{ maxWidth: '1200px' }}>
        
            {/* ใช้ Row ทำให้ทุกอย่างอยู่ในระนาบเดียวกัน */}
            <Row className="g-5 d-flex align-items-stretch">
                

                {/* ฝั่งรูป */}
                <Col xs={12} lg={8} className="d-flex">

                    {/* ระยะห่างรูป */}
                    <Row className="g-3 w-100 h-100 align-items-center"> 
                        
                        <Col xs={6}>
                        <div className="w-100"
                        // aspectRatio: '1/1' (w 1 h 1 สี่เหลี่ยมจัตุรัส)
                        style={{ aspectRatio: '1/1', overflow: 'hidden'  }}>
                            <img className="w-100 h-100 object-fit-cover"
                            src="https://cdn-images.farfetch-contents.com/29/66/49/29/29664929_58766828_1000.jpg" alt="" />
                        </div>
                        </Col>
                        
                        <Col xs={6} className="h-100">
                        <div className="h-100" 
                        style={{overflow: 'hidden', minHeight: '100%'}}>
                        {/* ให้รูปมันไม่ยืด */}
                            <img className="w-100 h-100 object-fit-cover"
                            src="https://pbs.twimg.com/media/F_VlGB9WsAA_dws.jpg" alt="" />
                        </div>
                        </Col>
                    </Row>
                </Col>



                {/* ฝั่งข้อมูล */}
                <Col xs={12} lg={4} className="d-flex flex-column gap-4 ps-lg-5 text-dark"> {/* ใช้คอลัมน์จะได้เป็นแนวตั้ง */}
                
                {/* ชื่อกับราคา */}
                <div className="d-flex flex-column gap-1">
                    <span className="fw-semibold" 
                    style={{ fontSize: '11px', letterSpacing: '1px' }}>
                        New Arrivals
                    </span>

                    <h1 className="fs-3 fw-normal m-0" 
                    style={{ letterSpacing: '0.5px' }}>
                        SALA Plaid Wool-Blend Twill Shirt Jacket
                    </h1>

                    <span className="fs-5 fw-bold mt-2">$480</span>
                </div>

                {/* เลือกสี */}
                <div className="d-flex flex-column gap-2">

                    <span className="fw-semibold" 
                    style={{ fontSize: '13px' }}>
                    Color:&nbsp; Brown
                    </span>

                    {/* ตัวเลือก */}
                    <div className="border border-dark" 
                    style={{ width: '24px', height: '24px', backgroundColor: '#8B5A2B', cursor: 'pointer' }}
                    ></div>
                </div>

                {/* เลือก size */}
                <div className="d-flex flex-column gap-2">

                    <span className="fw-semibold" style={{ fontSize: '13px' }}>
                    Size:&nbsp; XS
                    </span>
                    
                    {/* ตัวเลือก */}
                    <div className="d-flex gap-3">
                        <Button variant="outline-dark" className="rounded-0 px-2 py-1 fw-bold" 
                        style={{ fontSize: '12px', backgroundColor: '#D9D9D9' }}>
                            XS
                        </Button>

                        <Button variant="outline-dark" className="rounded-0 px-2 py-1 border-0" 
                        style={{ fontSize: '12px' }}>
                            S
                        </Button>

                        <Button variant="outline-dark" className="rounded-0 px-2 py-1 border-0" 
                        style={{ fontSize: '12px'}}>
                            M
                        </Button>

                        <Button variant="outline-dark" className="rounded-0 px-2 py-1 border-0" 
                        style={{ fontSize: '12px'}}>
                            L
                        </Button>

                    </div>
                </div>

                {/* ปุ่ม */}
                <div className="d-flex flex-column gap-2 mt-2 use-42dot">
                    <Button variant="dark" className="rounded-0 py-2.5 fw-bold text-uppercase" 
                    style={{ fontSize: '12px', letterSpacing: '1px' }}>
                        Add to Bag
                    </Button>

                    <Button variant="outline-dark" className="rounded-0 py-2.5 fw-bold text-uppercase" 
                    style={{ fontSize: '12px', letterSpacing: '1px', backgroundColor: 'white' }}>
                        Save Item
                    </Button>
                </div>

                {/* รายละเอียดสินค้า */}
                <div className="d-flex flex-column gap-2" style={{ fontSize: '13px' }}>
                    <div>
                        <span><strong>Product Code:</strong></span> &nbsp;
                        <span>Aa813</span>
                    </div>

                    <div>
                        <span><strong>Brand:</strong></span> &nbsp;
                        <span>SALA</span>
                    </div>

                    <div>
                        <span><strong>Collection:</strong></span> &nbsp;
                        <span>Spring Summer 2026</span>
                    </div>
                </div>

                {/* คืนสินค้า */}
                <div>
                    <a href="#shipping" className="text-dark fw-bold text-decoration-none d-flex justify-content-between align-items-center" 
                    style={{ fontSize: '13px' }}>
                        <span>Shipping & Returns</span>
                    </a>
                </div>

                {/* ติดต่อ */}
                <div className="d-flex flex-column gap-2" 
                style={{ fontSize: '12px' }}>
                    <span className="fw-bold text-dark" 
                    style={{ fontSize: '13px' }}>
                        Need Help?
                    </span>
                    <p className="m-0"><strong>LINE OFFICIAL:</strong> @SALAGROUP</p>
                    <p className="m-0"><strong>TEL:</strong> +66 1 212 3121 (45)</p>
                    <p className="m-0">Mon - Sat 10.00 AM - 19.00 PM</p>
                </div>

                </Col>

            </Row>



            <div className="mt-5 pt-4 text-dark">
                <h2 className="fs-4 fw-normal mb-4" style={{ letterSpacing: '0.5px' }}>
                    You may also like
                </h2>
                
                <Row className="g-4">
                    {recommendedProducts.map((product) => (
                        <Col key={product.id} xs={6} md={3} className="d-flex flex-column gap-2 position-relative">
                            
                            <div className="w-100"
                            style={{ aspectRatio: '3/4', overflow: 'hidden' }}>
                            {/* รูป w 3: h4 */}
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-100 h-100 object-fit-cover"
                                />
                            </div>

                            <div className="d-flex justify-content-between align-items-start mt-1">
                                <span className="fw-semibold fst-italic"
                                style={{ fontSize: '11px', letterSpacing: '0.5px', color: '#555' }}>
                                    {product.tag}
                                </span>
                                <span style={{ cursor: 'pointer', fontSize: '14px' }}><i className="bi bi-heart"></i></span>
                            </div>

                            {/* รายละเอียดสินค้า */}
                            <h3 className="fw-normal m-0" 
                            style={{ fontSize: '12px', letterSpacing: '0.3px', lineHeight: '1.4' }}>
                                {product.name}
                            </h3>
                            
                            {/* ราคา */}
                            <span className="fw-bold" 
                            style={{ fontSize: '12px' }}>
                                {product.price}
                            </span>

                            {/* สี */}
                            <div className="d-flex justify-content-between align-items-center mt-auto pt-2">
                                <div className="d-flex gap-1">
                                    {product.colors.map((color, index) => (
                                        <div className="border border-secondary"
                                        style={{ width: '12px', height: '12px', backgroundColor: color }}
                                        key={index}></div>))}
                                </div>
                                
                                {/* size */}
                                <div className="d-flex gap-2" 
                                style={{ fontSize: '10px', color: '#666' }}>
                                    <span>XS</span>
                                    <span>S</span>
                                    <span>M</span>
                                    <span>L</span>
                                </div>
                            </div>

                        </Col>
                    ))}
                </Row>
            </div>

        </Container>
    </>
  )
}

export default PickItem