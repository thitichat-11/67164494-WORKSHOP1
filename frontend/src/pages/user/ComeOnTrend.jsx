import React from 'react'

const ComeOnTrend = () => {
  return (
    <>
        <div className='display-4 container text-center use-abril mt-4'>
            <span>COME</span> &nbsp;
            <span className=' text-danger'>ON</span> &nbsp;
            <span>TREND</span> &nbsp;
        </div>

        {/* รูปภาพ */}
        <div className='container my-5' 
        style={{ maxWidth: '800px' }}>

            <div style={{ display: 'grid', alignItems: 'start',
                gridTemplateColumns: 'repeat(2, 1fr)', // แบ่งเป็นคอลัมน์ซ้าย-ขวา
                gap: '40px 30px'                     // y 40 x 30
            }}>

                <div style={{ transform: 'translateY(0)' }}>
                    <img className='img-fluid w-100 object-fit-cover'
                    style={{ aspectRatio: '1/1.4' }}
                        src="https://www.pusspussmagazine.com/wp-content/uploads/2025/02/image00003.jpg" alt="" />
                </div>

                <div style={{ transform: 'translateY(80px) translateX(-10px)', zIndex: 1 }}>
                    <img className='img-fluid w-100 object-fit-cover'
                    style={{ aspectRatio: '1/1.4' }}
                        src="https://files.vogue.co.th/uploads/Winter_Aespa_Ralph_Lauren_Brand_Ambassador_-_COVER_VERTICAL.jpg" alt="" />
                </div>

                <div style={{ transform: 'translateY(-70px) translateX(50px)', zIndex: 1 }}>
                    <img className='img-fluid w-100 object-fit-cover'
                    style={{ aspectRatio: '1/1.4' }}
                        src="https://i.pinimg.com/736x/1c/67/cd/1c67cd0258983b097b438ebc048d7e7f.jpg" alt="" />
                </div>

                <div style={{ transform: 'translateY(60px) translateX(-10px)', zIndex: 1 }}>
                    <img className='img-fluid w-100 object-fit-cover'
                    style={{ aspectRatio: '1/1.4' }}
                        src="https://i.pinimg.com/736x/da/67/d8/da67d87da6a9da1801f7eae25f2394aa.jpg" alt="" />
                </div>
            </div>
        </div>


        <div className='py-5'> 
            <div className='container text-center use-akatab'>
                <p className='fw-bold fs-4'>THE ITEM</p>
            </div>

            <p className='text-center'>A signature piece for a uniquely curated wardrobe - one trend-setting item every week.</p>
        </div>
    </>
  )
}

export default ComeOnTrend