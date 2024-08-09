// Checkout.js
import React from 'react';
import TextField from '@mui/material/TextField';

const Checkout = () => {
  return (
    <div id="divider" className='bg-red-100 h-[1635px] py-20 flex flex-row'>
      <div id="container" className='flex-1 bg-green-100 mr-20'>
        
        <div id="contactform" className='p-2 border border-black px-4'>
          <div id="title" className='text-[20px] font-bold mt-4 mb-6' style={{ fontFamily: 'Poppins, sans-serif'}}>Contact Infomation
          </div>
          
          <div className='flex flex-row gap-x-4 '>
            <div className='flex-1'>
              <p className='mb-2'>FIRST NAME</p>
              <TextField
                id="outlined-multiline-flexible"
                label="First name"
                fullWidth
                size="small"
              />
            </div>

            <div className='flex-1'> 
              <p className='mb-2'>LAST NAME</p>
              <TextField
                id="outlined-multiline-flexible"
                label="Last Name"
                fullWidth
                size="small" 
              />              
            </div>
          </div>

          <div>
          <p className='mt-3 mb-2'>PHONE NUMBER</p>
              <TextField
                id="outlined-multiline-flexible"
                label="Phone number"
                fullWidth
                size="small"
                
              /> 
          </div>
           
          <div>
          <p className='mt-3 mb-2'>EMAIL ADDRESS</p>
              <TextField
                id="outlined-multiline-flexible"
                label="Your Email"
                fullWidth
                size="small"
                
              /> 
          </div>

          <div>
          <p className='mt-3 mb-2'>PASSWORD</p>
          <TextField
            id="outlined-password"
            label="Password"
            type="password" // This makes the input text unreadable
            fullWidth
            size="small"
            variant="outlined"
          />

          </div>


        </div>
        <div id="shipping"></div>  
        <div id="placeorder"></div>      
      </div>

      <div id="ordersummary" className='w-[415px] bg-blue-100'>

      </div>

    </div>
  );
};

export default Checkout;
