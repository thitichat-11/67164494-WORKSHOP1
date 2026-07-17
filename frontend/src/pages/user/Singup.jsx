import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



const Signup = () => {
  return (
    <div className='w-full max-w-2xl items-start gap-4 p-4 mx-auto'>

      <h2
        style={{ fontFamily: "'42dot Sans', sans-serif", fontWeight: 'regular' }}
        className="text-center">

        NEW CUSTOMERS

      </h2>



      <div className="flex w-full gap-4 mt-4">

        {/* กล่อง First Name */}
        <div className="w-1/2 flex flex-col gap-1"> {/* เพิ่ม flex flex-col เพื่อจัดระยะห่าง label กับ input */}
          <Form.Label htmlFor="inputfirstname" className="m-0 text-sm font-medium">
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


        {/* กล่อง Last Name */}
        <div className="w-1/2 flex flex-col gap-1">
          <Form.Label htmlFor="inputlastname" className="m-0 text-sm font-medium">
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





      <div className="flex w-full gap-4 mt-4">

        {/* กล่อง BIRTH DATE */}
        <div className="w-1/2 flex flex-col gap-1">
          <Form.Label htmlFor="inputbirthdate" className="m-0 text-sm font-medium">
            BIRTH DATE <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="date"
            id="inputbirthdate"
            aria-describedby="birthdateHelpBlock"
            required
            style={{
              border: '0.5px solid rgba(0, 0, 0, 0.2)',
            }}
          />
        </div>


        {/* กล่อง PHONE NUMBER */}
        <div className="w-1/2 flex flex-col gap-1 mt-2">
          <Form.Label htmlFor="inputPhonenumber" className="m-0 text-sm font-medium">
            PHONE NUMBER <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="inputPhonenumber"
            maxLength={10}
            aria-describedby="PhonenumberHelpBlock"
            required
            // ดักจับทุกครั้งที่มีการพิมพ์ ถ้าไม่ใช่เลข 0-9 ให้เคลียร์ทิ้งทันที
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, '');
            }}
            style={{
              border: '0.5px solid rgba(0, 0, 0, 0.2)',
            }}
          />
        </div>

      </div>


      {/* กล่อง email */}
      <div className='mt-2'>

        <Form.Label htmlFor="inputemail" className="m-0 text-sm font-medium">
          EMAIL <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          id="inputemail"
          aria-describedby="emailHelpBlock"
          required
          style={{
            border: '0.5px solid rgba(0, 0, 0, 0.2)',
          }}
        />

      </div>



      {/* กล่อง password */}
      <div className='mt-2'>

        <Form.Label htmlFor="inputpassword" className="m-0 text-sm font-medium">
          PASSWORD <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="password"
          id="inputpassword"
          aria-describedby="passwordHelpBlock"
          required
          style={{
            border: '0.5px solid rgba(0, 0, 0, 0.2)',
          }}
        />
        <p style={{ fontSize: 14, }}>Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one symbol.</p>

      </div>


      <Button
        style={{
          width: '100%' ,
          backgroundColor: 'black',
          borderColor: 'black',
          marginTop: '56px',
          marginBottom: '66px',
          fontSize: '16px',
          fontWeight: 'medium',
          letterSpacing: '1px',
          fontFamily: "'42dot Sans', sans-serif",
          border: '0.5px solid rgba(0, 0, 0, 0.2)'
        }}>
        SING UP
      </Button>



    </div>
  )
}

export default Signup