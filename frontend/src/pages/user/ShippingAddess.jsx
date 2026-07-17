import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



const ShippingAddress = () => {
  return (

    <div className='w-full max-w-2xl items-start gap-4 p-4 mx-auto'>

      <h4> SHIPPING ADDRESSES </h4>

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

        {/* กล่อง country */}
        <div className="w-1/2 flex-col gap-1">
          <Form.Label htmlFor="inputCONTRY" style={{ fontSize: 13 }}>
            COUNTRY / REGION   <span className="text-danger">*</span>
          </Form.Label>
          <Form.Select aria-label="Default select example" required
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