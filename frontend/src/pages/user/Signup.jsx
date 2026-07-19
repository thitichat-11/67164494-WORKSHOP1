import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';



const Signup = () => {


  //เอาพวกที่ต้องเก็บมาไว้ใน formdata
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    birthdate: '',
    phonenumber: '',
    username: '',
    email: '',
    password: ''
  })


  const navigate = useNavigate()


  // handler กลางตัวเดียว ใช้ได้กับทุกช่อง เพราะอิงจาก name ของ input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post('http://localhost:5000/api/signup', formData);
      alert(response.data.message);
      navigate('/signin'); // เปลี่ยนเส้นทางไปยังหน้า signin  หลังจากสมัครสมาชิกสำเร็จ

    } catch (error) {

      console.error('Signup Failed:', error.response?.data?.message || error.message)
      alert(error.response?.data?.message || 'Signup failed. Please try again.');

    }
  }



  return (
    <Form onSubmit={handleSubmit} className='w-full max-w-2xl items-start gap-4 p-4 mx-auto'>

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
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
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
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
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
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
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
            name="phonenumber"
            value={formData.phonenumber}
            maxLength={10}
            onChange={(e) => {
              // เอา regex เดิมมาเก็บลง state แทนการแก้ e.target.value ตรงๆ
              const onlyNums = e.target.value.replace(/[^0-9]/g, '');
              setFormData({ ...formData, phonenumber: onlyNums });
            }}
            aria-describedby="PhonenumberHelpBlock"
            required
            style={{ border: '0.5px solid rgba(0, 0, 0, 0.2)' }}
          />
        </div>

      </div>




      {/* กล่อง username */}
      <div className='mt-2'>

        <Form.Label htmlFor="inputusername" className="m-0 text-sm font-medium">
          USERNAME <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          id="inputusername"
          aria-describedby="usernameHelpBlock"
          required
          name="username"
          value={formData.username}
          onChange={handleChange}
          style={{
            border: '0.5px solid rgba(0, 0, 0, 0.2)',
          }}
        />

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
          name="email"
          value={formData.email}
          onChange={handleChange}
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
          name="password"
          value={formData.password}
          onChange={handleChange}
          style={{
            border: '0.5px solid rgba(0, 0, 0, 0.2)',
          }}
        />
        <p style={{ fontSize: 14, }}>Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one symbol.</p>

      </div>


      <Button
        type="submit"
        style={{
          width: '100%',
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



    </Form>
  )
}

export default Signup