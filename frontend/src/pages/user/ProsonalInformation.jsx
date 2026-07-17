import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const PersonalInformation = () => {
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
                style={{ minWidth: '340px' , fontFamily: "'42dot Sans', sans-serif", fontWeight: 'regular' , fontSize: '13px' }} >
                SAVE PROFILE
              </Button>
            </div>


          </div>

        </div>



      </div>



    </div>
  )
}

export default PersonalInformation