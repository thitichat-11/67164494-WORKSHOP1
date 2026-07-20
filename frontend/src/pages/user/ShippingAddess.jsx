import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState, useEffect } from 'react';



const ShippingAddress = () => {

  //ตัวรับข้อมูล
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phonenumber: '',
    birthdate: '',
    country_region: '',
    house_number_street: '',
    apartment_suite_unit: '',
    town_city: '',
    state_province: '',
    postcode_zip: ''
  });


  const [originalData, setOriginalData] = useState(null); // เก็บค่าตั้งต้นไว้ให้ปุ่ม Cancel เรียกกลับ


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

        const fetchedData = {
          first_name: user.first_name || '',
          last_name: user.last_name || '',
          email: user.email || '',
          phonenumber: user.phonenumber || '',
          birthdate: user.birthdate ? user.birthdate.split('T')[0] : '',
          country_region: user.country_region || '',
          house_number_street: user.house_number_street || '',
          apartment_suite_unit: user.apartment_suite_unit || '',
          town_city: user.town_city || '',
          state_province: user.state_province || '',
          postcode_zip: user.postcode_zip || '',
        };

        setFormData(fetchedData);
        setOriginalData(fetchedData);

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


  //รีกลับไปเป็นค่า address เดิม
  const handleCancel = () => {
    if (originalData) {
      setFormData(originalData);
    }
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
      alert(error.response?.data?.message || 'Data saving failed. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '60px' }}>Loading...</div>;
  }



  return (

    <div className='w-full max-w-2xl items-start gap-4 p-4 mx-auto'>

      <h4> SHIPPING ADDRESSES </h4>

      <div className="flex w-full gap-4 mt-4">

        {/* กล่อง First Name */}
        <div className="w-1/2 flex flex-col gap-1"> {/* เพิ่ม flex flex-col เพื่อจัดระยะห่าง label กับ input */}
          <Form.Label
            htmlFor="inputfirstname"
            className="m-0 text-sm font-medium">
            FIRST NAME <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="inputfirstname"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
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
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            aria-describedby="lastnameHelpBlock"
            required
            style={{
              border: '0.5px solid rgba(0, 0, 0, 0.2)',
            }}
          />
        </div>

      </div>


      <div className="flex w-full gap-4 mt-4">

        {/* กล่อง country */}
        <div className="w-1/2 flex-col gap-1">
          <Form.Label htmlFor="inputCONTRY" style={{ fontSize: 13 }}>
            COUNTRY / REGION   <span className="text-danger">*</span>
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            required
            id="inputCONTRY"
            name="country_region"
            value={formData.country_region}
            onChange={handleChange}
            style={{
              border: '0.5px solid rgba(0, 0, 0, 0.2)', fontSize: 13
            }}>
            <option value="1">THAILAND</option>
            <option value="2">SINGAPORE</option>
            <option value="3">MALAYSIA</option>
            <option value="4">JAPAN</option>
            <option value="5">KOREA</option>
          </Form.Select>
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
            onChange={handlePhoneChange}
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


      <div className="mt-6">
        <Form.Label htmlFor="inputHouseNumORStreetName" className="m-0 text-sm font-medium">
          HOUSE NUMBER AND STREET NAME <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          id="inputHouseNumORStreetName"
          name="house_number_street"
          value={formData.house_number_street}
          onChange={handleChange}
          aria-describedby="HouseNumORStreetNameHelpBlock"
          required //บังคับต้องใส่
          style={{
            border: '0.5px solid rgba(0, 0, 0, 0.2)', // เส้นขอบบาง 0.5px สีดำจางๆ 20%
          }}
        />
      </div>


      <div className="mt-6">
        <Form.Label htmlFor="inputApartmentORetc" className="m-0 text-sm font-medium">
          APARTMENT , SUITE , UNIT , ETC.  <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          id="inputApartmentORetc"
          name="apartment_suite_unit"
          value={formData.apartment_suite_unit}
          onChange={handleChange}
          aria-describedby="ApartmentORetcHelpBlock"
          required //บังคับต้องใส่
          style={{
            border: '0.5px solid rgba(0, 0, 0, 0.2)', // เส้นขอบบาง 0.5px สีดำจางๆ 20%
          }}
        />
      </div>




      <div className="flex w-full gap-4 mt-4">

        {/* กล่อง TOWN / CITY */}
        <div className="w-1/2 flex flex-col gap-1 mt-2">
          <Form.Label htmlFor="inputTown" className="m-0 text-sm font-medium">
            TOWN / CITY <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="inputTown"
            name="town_city"
            value={formData.town_city}
            onChange={handleChange}
            aria-describedby="TownHelpBlock"
            required
            style={{
              border: '0.5px solid rgba(0, 0, 0, 0.2)',
            }}
          />
        </div>

        {/* กล่อง STATE / PROVINCE */}
        <div className="w-1/2 flex flex-col gap-1 mt-2">
          <Form.Label htmlFor="inputState" className="m-0 text-sm font-medium">
            STATE / PROVINCE <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="inputState"
            name="state_province"
            value={formData.state_province}
            onChange={handleChange}
            aria-describedby="StateHelpBlock"
            required
            style={{
              border: '0.5px solid rgba(0, 0, 0, 0.2)',
            }}
          />
        </div>


      </div>






      <div className="flex w-full gap-4 mt-4">

        {/* กล่อง POSTCODE */}
        <div className="w-1/2 flex w-full flex-col gap-1 mt-2">
          <Form.Label htmlFor="inputPostcode" className="m-0 text-sm font-medium">
            POSTCODE / ZIP <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="inputPostcode"
            name="postcode_zip"
            value={formData.postcode_zip}
            onChange={handleChange}
            aria-describedby="PostcodeHelpBlock"
            required
            style={{
              border: '0.5px solid rgba(0, 0, 0, 0.2)',
            }}
          />
        </div>

        <div className="flex w-full items-end justify-end mt-4">

          <div className="flex flex-row gap-3">

            {/* ปุ่ม CANCEL */}
            <Button
              variant="outline-dark"
              className="text-xs font-light tracking-wider"
              onClick={handleCancel}
              style={{
                color: '#000000',
                borderColor: '#000000',
                borderWidth: '0.5px', // เส้นขอบบางเฉียบตามรูป
                borderRadius: '0px',  // ลบความโค้งมนออกให้เป็นสี่เหลี่ยมมุมฉาก
                width: '80px',       // ล็อกความกว้างปุ่มให้เท่ากัน
                height: '38px',       // ความสูงปุ่ม
                backgroundColor: '#ffffff',
                fontFamily: "'42dot Sans', sans-serif",
                fontWeight: 'regular',
                fontSize: '13px'
              }}
            >
              CANCEL
            </Button>

            {/* ปุ่ม SAVE */}
            <Button
              variant="dark"
              className="text-xs font-light tracking-wider text-white"
              onClick={handleSave}
              disabled={saving}
              style={{
                backgroundColor: '#000000',
                borderColor: '#000000',
                borderRadius: '0px',
                width: '80px',
                height: '38px',
                fontFamily: "'42dot Sans', sans-serif",
                fontWeight: 'regular',
                fontSize: '13px'
              }}
            >
              SAVE
            </Button>

          </div>

        </div>

      </div>



















    </div>

  )
}

export default ShippingAddress