import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


const PersonalInformation = () => {


  //ตัวรับข้อมูล
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phonenumber: '',
    birthdate: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ดึงข้อมูลมาแสดงตอนเปิดหน้า
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://localhost:5000/api/accounts/personal-information', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const user = response.data.user;

        setFormData({
          first_name: user.first_name || '',
          last_name: user.last_name || '',
          email: user.email || '',
          phonenumber: user.phonenumber || '',
          // MySQL ส่ง DATE มาเป็น ISO string เช่น "2000-01-01T00:00:00.000Z"
          // <input type="date"> ต้องการแค่ "2000-01-01" เลยต้อง split เอาส่วนหน้า
          birthdate: user.birthdate ? user.birthdate.split('T')[0] : ''
        });

      } catch (error) {
        console.error('Fetch Personal Info Error:', error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, []);


  //เมื่อแก้ข้อมูล (ทำของทรศแยก)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  //เปลี่ยนเบอร์
  const handlePhoneChange = (e) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
    setFormData({ ...formData, phonenumber: onlyNums });
  };



  // save
  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');

      const response = await axios.patch(
        'http://localhost:5000/api/accounts/personal-information',
        formData, // ส่งไปได้เลยทั้งก้อน backend รองรับแบบ partial update อยู่แล้ว
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message);

    } catch (error) {
      alert(error.response?.data?.message || 'Information saved successfully');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '60px' }}>Loading...</div>;
  }





  return (
    <div>


      <div>


        <h3>Personal Information</h3>

        <p>Keep your profile, contact details, and password current for faster checkout and account support.</p>


        <div className="w-full flex items-start gap-2 p-2">

          {/* ฝั่งซ้าย */}
          <div className="text-2xl">

            <i className="bi bi-person-circle"></i>

          </div>


          {/* ฝั่งขวา */}

          <div className="flex-1 flex flex-col w-full">

            <h4 className="text-xl font-medium tracking-wide leading-tight">
              PROFILE DETAILS
            </h4>

            <p className="text-gray-600 text-sm font-light leading-normal">
              These details appear across your account, orders, and customer care requests.
            </p>




            <div className="flex w-full gap-4 mt-2">

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





            <div className="flex w-full gap-4 mt-2">

              {/* กล่อง phone number */}
              <div className="w-1/2 flex flex-col gap-1"> {/* เพิ่ม flex flex-col เพื่อจัดระยะห่าง label กับ input */}
                <Form.Label htmlFor="inputphonenumber" className="m-0 text-sm font-medium">
                  PHONE NUMBER <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  id="inputphonenumber"
                  aria-describedby="phonenumberHelpBlock"
                  required
                  name="phonenumber"
                  value={formData.phonenumber}
                  maxLength={10}
                  onChange={handlePhoneChange}
                  style={{
                    border: '0.5px solid rgba(0, 0, 0, 0.2)',
                  }}
                />
              </div>


              {/* กล่อง birth date */}
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

            </div>

            <div className="w-full flex justify-end mt-20">
              <Button
                variant="dark"
                className="px-8 py-2.5 text-sm font-medium tracking-wide"
                onClick={handleSave}
                disabled={saving}
                style={{ minWidth: '340px', fontFamily: "'42dot Sans', sans-serif", fontWeight: 'regular', fontSize: '13px' }} >
                {saving ? 'SAVING...' : 'SAVE PROFILE'}
              </Button>
            </div>


          </div>

        </div>



      </div>



    </div>
  )
}

export default PersonalInformation