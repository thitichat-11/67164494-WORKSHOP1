import React, { useState } from 'react'
import SaLaPick from './SaLaPick'
import { Link } from 'react-router-dom'

const Signin = ({ isOpen = true, onClose = () => {} }) => {
  const [emailOrUsername, setEmailOrUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ emailOrUsername, password, rememberMe })
  }


  return (
    <> 
      <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
        

        <div style={{ pointerEvents: 'none', userSelect: 'none' }}>
          <SaLaPick />
        </div>


        <div style={{
          position: 'fixed',
          top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // ให้มืด
          backdropFilter: 'blur(3px)', // ให้เบลอ
          zIndex: 9999, fontFamily: 'serif',
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>

        {/* only พื้นขาว */}
        <div 
        style={{
        position: 'relative',
        padding: '48px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '450px',
        backgroundColor: '#D9D9D9',
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)',
        border: 'none'}}>
        

        <button onClick={onClose} type="button"
        style={{ 
        position: 'absolute',
        top: '20px', right: '20px', 
        fontSize: '18px', color: '#333',
        cursor: 'pointer', border: 'none', backgroundColor: 'transparent'
        }}>
            ✕
        </button>

        {/* โลโก้แบรนด์ */}
        <h2 className='fw-bold m-2'
        style={{ fontSize: '28px' }}>
            SALA
        </h2>
        
        <span className='use-42dot fw-medium'
        style={{ fontSize: '12px', marginBottom: '40px' }}>
            ALREADY HAVE AN ACCOUNT ?
        </span>

        {/* ฟอร์ม */}
        <form onSubmit={handleSubmit} 
        style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* username */}
            <div className='use-42dot'
            style={{ display: 'flex', flexDirection: 'column' }}>

                <div style={{ fontSize: '10px', letterSpacing: '0.5px', marginBottom: '5px'}}>
                    <label className='fw-semibold'>
                        USERNAME OR EMAIL ADDRESS &nbsp;
                    </label> 
                    <span style={{ color: '#d9534f' }}>
                        *
                    </span>   
                </div>

                <input onChange={(e) => setEmailOrUsername(e.target.value)} required
                type="text" value={emailOrUsername}
                className='m-2'
                style={{ backgroundColor: 'transparent',
                border: '1px solid #999', borderRadius: '4px',
                padding: '10px 12px', fontSize: '14px', outline: 'none'}}/>
            </div>
     
            {/* password */}
            <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                
                <div className='use-42dot' 
                style={{ fontSize: '10px', letterSpacing: '0.5px', marginBottom: '5px'}}>
                    <label className='fw-semibold'>
                        PASSWORD &nbsp;
                    </label>
                    <span style={{ color: '#d9534f' }}>
                        *
                    </span>
                </div>

                <input onChange={(e) => setPassword(e.target.value)} required
                type="password" value={password}
                style={{backgroundColor: 'transparent',
                border: '1px solid #999', borderRadius: '4px',
                padding: '10px 12px', fontSize: '14px', outline: 'none'}}/>
            </div>


            {/* remember meeee๋ *เสียงน้องชิ* */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '8px 0' }}>
                <input onChange={(e) => setRememberMe(e.target.checked)} checked={rememberMe}
                type="checkbox" id="remember"  
                style={{ accentColor: '#000', cursor: 'pointer',
                width: '13px', height: '13px'}} />

                <label className='use-42dot' htmlFor="remember"
                style={{ fontSize: '10px', cursor: 'pointer', letterSpacing: '0.5px', color: '#555', userSelect: 'none' }}>
                    REMEMBER ME
                </label>
            </div>


            {/* ปุ่ม  */}
            <button type="submit" className='fw-bold text-light use-42dot'
            style={{ width: '100%', 
            backgroundColor: '#000', border: 'none', 
            letterSpacing: '2px', padding: '12px 0', 
            fontSize: '12px', cursor: 'pointer' }}>
                SING IN
            </button>
        </form>


        <span style={{ fontSize: '11px', letterSpacing: '1px', margin: '24px 0' }}>
            OR
        </span>

        {/* ลิงก์ไปหน้าสมัครสมาชิก */}
        <Link to='' className='text-decoration-none text-dark fw-bold use-42dot'>   
            <button type="button"
            style={{ backgroundColor: 'transparent',
            color: '#000',  border: 'none',
            fontSize: '11px', letterSpacing: '1px', 
            cursor: 'pointer'}}>
                DON'T HAVE AN ACCOUNT ? SIGN UP
            </button>
        </Link>

          </div>
        </div>
      </div>
    </>
  )
}

export default Signin