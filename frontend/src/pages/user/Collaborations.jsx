import React from 'react'

const Collaborations = () => {
  return (
    <>
        <div className='container text-center'
        style={{ maxWidth: '700px' }}>

            <p className='fs-4 fw-semibold'>aespa Becomes Brand Ambassador for SALA in Korea</p>
            <p className='text-muted' 
            style={{ lineHeight: '1.6' }}>
                Following aespa's third anniversary, aespa has officially been named the ambassador for SALA. Renowned for their outstanding talent and captivating presence, the group unveiled a stunning new campaign, showcasing a fresh and sophisticated image that perfectly reflects SALA's modern identity.
            </p>
        </div>

        {/* รอรูปภาพก่อน */}
        <div className='container text-center py-2'
        style={{width: '700px'}}>
            <img className='img-fluid w-100 object-fit-cover'
            src="https://pbs.twimg.com/media/Gtp3FJJaEAAD0dk.jpg" alt="" />
        </div>

        <div className='container text-center py-4'
        style={{ maxWidth: '700px' }}>
            <p>A Celebration of Modern Elegance <br />
                SALA unveils a new chapter through its collaboration with aespa, bringing together <br />
                contemporary fashion and one of the most influential K-pop groups of today. Built on a shared <br />
                vision of confidence, individuality, and modern sophistication, this partnership reflects a new <br />
                generation that embraces authenticity while redefining style on the global stage.
            </p>
        </div>

        {/* รูปภาพ */}
        <div className='container' 
        style={{ maxWidth: '700px' }}>
            <div className='row g-4 justify-content-center'>
                
                <div className='col-6'>
                    <img className='img-fluid w-100 object-fit-cover'
                    style={{ aspectRatio: '1/1.4' }}
                    src="https://pbs.twimg.com/media/HCfDzjfbQAEs5Fm.jpg" alt="" />
                </div>

                <div className='col-6'>
                    <img className='img-fluid w-100 object-fit-cover'
                    style={{ aspectRatio: '1/1.4' }}
                    src="https://files.vogue.co.th/uploads/IMG_2734.webp" alt="" />
                </div>

                <div className='col-6'>
                    <img className='img-fluid w-100 object-fit-cover'
                    style={{ aspectRatio: '1/1.4' }}
                    src="https://pbs.twimg.com/media/G_QJdvkXwAA8hkc.jpg" alt="" />
                </div>

                <div className='col-6'>
                    <img className='img-fluid w-100 object-fit-cover'
                    style={{ aspectRatio: '1/1.4' }}
                    src="https://pbs.twimg.com/media/HEOLChgbAAAOtQL.jpg" alt="" />
                </div>
            </div>
        </div>

        <div className='container text-center py-5'
        style={{ maxWidth: '700px' }}>
            <p>As the official ambassador of SALA Korea, aespa will represent the brand across a variety of <br />
            campaigns and creative initiatives, introducing SALA's vision of modern elegance to audiences <br />
             around the world. Their distinctive identity and global influence make them the perfect embodiment of <br />
              the brand's commitment to innovation, sophistication, and self-expression.</p>
        </div>
    </>
  )
}

export default Collaborations