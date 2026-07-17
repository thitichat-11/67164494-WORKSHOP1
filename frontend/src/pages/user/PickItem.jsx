import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'


const PickItem = () => {

  const { id } = useParams() // ดึง product_id
  const [product, setProduct] = useState(null)
  
  const [loading, setLoading] = useState(true)

  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)

  const [recommendedProducts, setRecommendedProducts] = useState([]);

  
  useEffect(() => {
    axios.get(`http://localhost:5000/api/item/${id}`) 
      .then(res => {
        // ดึงข้อมูลมาโชว์
        const targetProduct = res.data
        setProduct(targetProduct)
        
        // เอาสีเอา size[0] มาโชว์ก่อน
        if (targetProduct.variants && targetProduct.variants.length > 0) {
          setSelectedColor(targetProduct.variants[0].color) 
          setSelectedSize(targetProduct.variants[0].size)
        }

        // ดึงข้อมูล You may also like มาไว้ที่ recommendedProducts
        if (targetProduct.recommendations) {
          setRecommendedProducts(targetProduct.recommendations)
        } 
        else if (targetProduct.recommended) {
          setRecommendedProducts(targetProduct.recommended)
        }

        setLoading(false)})
        .catch(err => {
            console.error("เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า:", err)
            setLoading(false)
        })
  }, [id])

  
  if (loading) {
    return <Container className="py-5 text-center"><p>Loading...</p></Container>
  }

  if (!product) {
    return <Container className="py-5 text-center"><p>Product not found</p></Container>
  }

  // ดึงรูปมาโชว์
  const img1 = product.images && product.images[0] ? product.images[0].img_url : "https://cdn-images.farfetch-contents.com/29/66/49/29/29664929_58766828_1000.jpg"
  const img2 = product.images && product.images[1] ? product.images[1].img_url : "https://pbs.twimg.com/media/F_VlGB9WsAA_dws.jpg"

  // ไม่ให้ size กับ สี มันโชว์ซ้ำในสิ่งเดิม
  const uniqueColors = product.variants 
    ? [...new Set(product.variants.map(v => JSON.stringify({ name: v.color, code: v.code })))].map(str => JSON.parse(str)) 
    : []
  const uniqueSizes = product.variants 
    ? [...new Set(product.variants.map(v => v.size))] 
    : []

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
                            src={img1} alt={product.name} />
                        </div>
                        </Col>
                        
                        <Col xs={6} className="h-100">
                        <div className="h-100" 
                        style={{overflow: 'hidden', minHeight: '100%'}}>
                        {/* ให้รูปมันไม่ยืด */}
                            <img className="w-100 h-100 object-fit-cover"
                            src={img2} alt={product.name} />
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
                        {product.category_name || 'New Arrivals'}
                    </span>

                    <h1 className="fs-3 fw-normal m-0" 
                    style={{ letterSpacing: '0.5px' }}>
                        {product.name}
                    </h1>

                    <span className="fs-5 fw-bold mt-2">${product.base_price}</span>
                </div>

                {/* เลือกสี */}
                <div className="d-flex flex-column gap-2">

                    <span className="fw-semibold" 
                    style={{ fontSize: '13px' }}>
                    Color:&nbsp; {selectedColor || 'Brown'}
                    </span>

                    {/* ตัวเลือก */}
                    <div className="d-flex gap-2">
                        {uniqueColors.map((color, index) => (
                            <div 
                                key={index}
                                className={`border ${selectedColor === color.name ? 'border-dark' : 'border-secondary'}`}
                                style={{ 
                                    width: '24px', 
                                    height: '24px', 
                                    backgroundColor: color.name.startsWith('#') ? color.name : '#8B5A2B', 
                                    cursor: 'pointer',
                                    outline: selectedColor === color.name ? '1px solid black' : 'none'
                                }}
                                onClick={() => setSelectedColor(color.name)}
                            ></div>
                        ))}
                        {uniqueColors.length === 0 && (
                            <div className="border border-dark" 
                            style={{ width: '24px', height: '24px', backgroundColor: '#8B5A2B', cursor: 'pointer' }}
                            ></div>
                        )}
                    </div>
                </div>

                {/* เลือก size */}
                <div className="d-flex flex-column gap-2">

                    <span className="fw-semibold" style={{ fontSize: '13px' }}>
                    Size:&nbsp; {selectedSize || 'XS'}
                    </span>
                    
                    {/* ตัวเลือก */}
                    <div className="d-flex gap-3">
                        {uniqueSizes.map((size) => (
                            <Button 
                                key={size}
                                variant="outline-dark" 
                                className={`rounded-0 px-2 py-1 fw-bold ${selectedSize === size ? '' : 'border-0'}`} 
                                style={{ 
                                    fontSize: '12px', 
                                    backgroundColor: selectedSize === size ? '#D9D9D9' : 'transparent' 
                                }}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size}
                            </Button>
                        ))}
                        {uniqueSizes.length === 0 && (
                            <>
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
                            </>
                        )}
                    </div>
                </div>

                {/* ปุ่ม */}
                <div className="d-flex flex-column gap-2 mt-2 use-42dot">
                    <Button as={Link} to={`/shippingbagpage/${product.product_id}`}
                    variant="dark" className="rounded-0 py-2.5 fw-bold text-decoration-none text-center" 
                    style={{ fontSize: '12px', letterSpacing: '1px' }}>
                        ADD TO BAG
                    </Button>
  
                    <Button as={Link} to="/" 
                    variant="outline-dark" className="rounded-0 py-2.5 fw-bold text-decoration-none text-center" 
                    style={{ fontSize: '12px', letterSpacing: '1px', backgroundColor: 'white' }}>
                        SAVE ITEM
                    </Button>
                </div>

                {/* รายละเอียดสินค้า */}
                <div className="d-flex flex-column gap-2" style={{ fontSize: '13px' }}>
                    <div>
                        <span><strong>Product Code:</strong></span> &nbsp;
                        <span>{product.variants && product.variants[0] ? product.variants[0].code : 'Aa813'}</span>
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