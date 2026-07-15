import React from 'react'

const Collaborations = () => {
  return (
    <>
        <div className='container text-center'
        style={{ maxWidth: '700px' }}>

            <p className='fs-4 fw-semibold'>aespa Becomes Brand Ambassador for SALA in Korea</p>
            <p lassName='text-muted' 
            style={{ lineHeight: '1.6' }}>
                Following aespa's third anniversary, aespa has officially been named the ambassador for SALA. Renowned for their outstanding talent and captivating presence, the group unveiled a stunning new campaign, showcasing a fresh and sophisticated image that perfectly reflects SALA's modern identity.
            </p>
        </div>

        {/* รอรูปภาพก่อน */}
        <div>
            <img src="" alt="" />
        </div>

        <div className='container text-center mt-4'
        style={{ maxWidth: '700px' }}>
            <p>A Celebration of Modern Elegance <br />
                SALA unveils a new chapter through its collaboration with aespa, bringing together <br />
                contemporary fashion and one of the most influential K-pop groups of today. Built on a shared <br />
                vision of confidence, individuality, and modern sophistication, this partnership reflects a new <br />
                generation that embraces authenticity while redefining style on the global stage.
            </p>
        </div>

        {/* รูปภาพ */}
        <div>
            <img src="" alt="" />
        </div>

        <div className='container text-center mt-4'
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