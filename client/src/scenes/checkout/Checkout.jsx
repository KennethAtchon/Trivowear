
// Checkout.js
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  TextField,
  Alert,
  CircularProgress,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';
import { AddressElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import { FiPlus, FiMinus } from "react-icons/fi";
//import { RiCouponLine } from "react-icons/ri";
import constants from "../../constants.json";
import { decreaseCount, increaseCount,  } from "../../state/cart";
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { login } from '../../state/auth'; 
import { useNavigate } from "react-router-dom";

// Stripe initialization
const stripePromise = loadStripe("pk_test_51PeOOTHgfcgRayrrGL73KOBp2Ikk3Gu8joXHZbFPEfMNqLXFMuJVSndS7LeWqSf2VavJWwx0E39SEnRoJQjJ8NJO001jHB40lg");

const initialValues = {
  email: "",
  phone: "",
};


/**
 * A functional component that handles the checkout process for an e-commerce application.
 * It manages the state of the form values, cart, and shipping information, and provides functionality for handling payments and viewing the cart.
 *
 * @param {object} props - The component props.
 * @param {function} props.handleNextStep - A function to handle the next step in the checkout process.
 * @param {function} props.handlePrevStep - A function to handle the previous step in the checkout process.
 * @return {JSX.Element} The JSX element representing the checkout component.
 */
const Checkout = ({ handleNextStep, handlePrevStep }) => {
  const [formValues, setFormValues] = useState(initialValues);
  const cart = useSelector((state) => state.cart.cart);
  const { isAuth, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const cartShipping = useSelector((state) => state.cart.selectedShipping);
  const cartShippingPrice = useSelector((state) => state.cart.selectedShippingPrice);
  const [addressValues, setaddressValues] = useState(null);
  const [nameValues, setnameValues] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [isSignedGuest, setIsSignedGuest] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState('');

  console.log("cart: ", cart);

  // Calculate subtotal and total prices
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  // Calculate subtotal and total prices
  useEffect(() => {
    if (cart.length > 0) {
      // Calculate subtotal
      const calculatedSubtotal = cart.reduce((acc, item) => {
        const price = item.attributes.onSale ? item.attributes.discount : item.attributes.price;
        return acc + item.count * price;
      }, 0);
      setSubtotal(calculatedSubtotal);

      // Calculate total including shipping cost
      const shippingCost = cartShippingPrice || 0;
      setTotal(calculatedSubtotal + shippingCost);
    }
  }, [cart, cartShippingPrice]);

  const fetchData = useCallback(async () => {
    try {
      const userResponse = await fetch(`${constants.backendUrl}/api/users/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!userResponse.ok) {
        navigate('/');        
        //throw new Error('Failed to fetch user data');

      }
      const userData = await userResponse.json();
      const userEmail = userData.email;
      setFormValues({ ...formValues, email: userEmail });
  
      const ordersResponse = await fetch(`${constants.backendUrl}/api/orders?filters[email][$eq]=${userEmail}&fields[0]=shippingAddress`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!ordersResponse.ok) {
        throw new Error('Failed to fetch orders');
      }
      const ordersData = await ordersResponse.json();
  
      // Extract and aggregate unique shipping addresses
      const uniqueAddresses = new Set();
      ordersData.data.map(order => {
        const { shippingAddress } = order.attributes;
        const formattedAddress = `${shippingAddress.line1}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.postal_code}, ${shippingAddress.country}`;
        uniqueAddresses.add(formattedAddress);
  
      });
  
      setShippingAddresses([...uniqueAddresses]);
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [token]); // Include dependencies
  
  useEffect(() => {
    if (isAuth) {
    fetchData();
    }

  }, [isAuth, navigate, fetchData]);

  
  const handleSubmit = () => {

    // console.log(addressValues)
    // console.log(nameValues)
    // console.log(formValues)
    // console.log(isComplete)

    // if address value is not filled or the event is not complete
    if (!addressValues || !isComplete){

    // if the event is not complete, u can try to see if they picked a shipping address
    if(selectedAddress){
      // console.log("You have selected a shipping address but did u use the created feature?", isComplete)
      // console.log("selected address: ", selectedAddress)
      // console.log("Since you did not use the created feature, we will set the address values to be your selected value")
      setaddressValues(selectedAddress);

    }else{
      console.log("Please select a shipping address")
      return;      
    }


    } 



    if(!isAuth && !isSignedGuest) return;

    console.log("making payment")

    makePayment(formValues);

    //handleNextStep();
  };

  async function makePayment(values) {
    console.log(addressValues)
    setIsLoading(true);
    const stripe = await stripePromise;
    const requestBody = {
      email: values.email,
      phone: values.phone,
      products: cart.map(({ id, count, attributes }) => ({
        id,
        count,
        selectedProduct: JSON.stringify(attributes.selectedProduct),
      })),
      shippingAddress: addressValues,
      cartShipping: cartShipping
    };

    const response = await fetch(`${constants.backendUrl}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const session = await response.json();
    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  }

  const handleViewCart = () => {
    handlePrevStep();
  }

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    phone: Yup.string().required('Phone number is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const guestvalidationSchema = Yup.object({
    phone: Yup.string().required('Phone number is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
  });
 
  const handleGuestSignUp = (values) => {
    // unpack only email and phone
    const guestvalues = {email: values.email, phone: values.phone}
    setFormValues(guestvalues);
    setIsSignedGuest(true);
  }


  const handleSignUp = async (values, { setErrors, setStatus }) => {
    // console.log("values", values);

    if (isGuest) {
      console.log("Your a guest")
      handleGuestSignUp(values);
      return;
    }

    try {
      // Attempt to sign up the user
      const response = await fetch(`${constants.backendUrl}/api/auth/local/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.firstName + " " + values.lastName,
          email: values.email,
          password: values.password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setStatus({ success: 'Account created successfully!' });
        dispatch(login({ token: data.jwt, email: values.email }));
      } else {
        // If sign-up fails, attempt to sign in the user
        const signInResponse = await fetch(`${constants.backendUrl}/api/auth/local`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            identifier: values.email,
            password: values.password,
          }),
        });
  
        const signInData = await signInResponse.json();
  
        if (signInResponse.ok) {
          setStatus({ success: 'Signed in successfully!' });
          dispatch(login({ token: signInData.jwt, email: values.email }));
        } else {
          setErrors({ submit: signInData.message[0].messages[0].message });
        }
      }
    } catch (error) {
      console.log(error)
      setErrors({ submit: 'An error occurred. Please try again.' });
    }
    setFormValues(values);

  };
  


  return (

    <div id="divider" className='h-auto py-20 flex flex-col md:flex-row bg-green-700'>

      {isLoading && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress style={{ color: '#ffffff' }} />
        </div>
      )}

      
      <div id="container" className='ml-2 mr-6 lg:mr-10 w-auto md:w-[550px]'>
        
      <Formik
          initialValues={{ firstName: '', lastName: '', phone: '', email: '', password: '' }}
          validationSchema={
            isGuest ? guestvalidationSchema : validationSchema}
          onSubmit={handleSignUp}
        >
          {({ errors, touched, status }) => (
            <Form
              id="contactform"
              className={`p-2 border border-black px-4 pb-10 rounded-lg mb-10 ${!isAuth ? 'block' : 'hidden'} ${!isSignedGuest ? 'block' : 'hidden'}`}
            >
              <div id="title" className='text-[20px] font-bold mt-4 mb-3' style={{ fontFamily: 'Poppins, sans-serif' }}>
                Contact Information
              </div>
              {status?.success && <Alert severity="success">{status.success}</Alert>}
              {errors.submit && <Alert severity="error">{errors.submit}</Alert>}
                {!isGuest && (
              <div className='flex flex-row gap-x-4'>

                <Field name="firstName">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label="First name"
                      fullWidth
                      size="small"
                      margin="normal"
                      error={Boolean(touched.firstName && errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                  )}
                </Field>
                <Field name="lastName">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label="Last Name"
                      fullWidth
                      size="small"
                      margin="normal"
                      error={Boolean(touched.lastName && errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  )}
                </Field>
              </div>                  
                )}              

              <Field name="phone">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Phone number"
                    fullWidth
                    size="small"
                    margin="normal"
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                )}
              </Field>
              <Field name="email">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Your Email"
                    fullWidth
                    size="small"
                    margin="normal"
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                )}
              </Field>

              {!isGuest && (
              <Field name="password">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type="password"
                    fullWidth
                    size="small"
                    margin="normal"
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                )}
              </Field>                
              )}

              <Checkbox onClick={() => setIsGuest(!isGuest)}  color="default" /> {!isGuest ? 'Login as Guest' : 'Login as User'}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ fontFamily: 'Inter, sans-serif', backgroundColor: 'black', color: 'white', marginTop: '6px' }}
              >
                {!isGuest ? 'Sign Up/Login In' : 'Continue Without Account'}
              </Button>
            </Form>
          )}
      </Formik>

        <div id="pastshipping" className={` w-full h-auto mb-6 p-2 border border-black px-4 pb-6 rounded-lg ${isAuth ? 'flex flex-col gap-y-2' : 'hidden'}`}>
        <div className='w-full text-[20px] font-bold mt-4' style={{ fontFamily: 'Poppins, sans-serif' }}>Pick an Address or create new</div>
        <FormControl>
          <FormLabel id="address-radio-buttons-group-label" className='mb-4'>Shipping Addresses</FormLabel>
          <RadioGroup
            aria-labelledby="address-radio-buttons-group-label"
            name="address-radio-buttons-group"
            value={selectedAddress}
            onChange={handleAddressChange}
          >
            {shippingAddresses.map((address, index) => (
              <FormControlLabel
                key={index}
                value={address}
                control={<Radio />}
                label={
                  <div className="bg-white p-2">
                    <div>{address}</div>
                  </div>
                }
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>



        <div id="shipping" className=' p-2 border border-black px-4 pb-10 rounded-lg'>

          <div id="title" className='w-full text-[20px] font-bold mt-4 mb-6' style={{ fontFamily: 'Poppins, sans-serif'}}>Shipping Address
          </div>

          <Elements stripe={stripePromise}>
            <AddressElement
              options={{
                mode: 'shipping',
                // autocomplete: {
                //   mode: "google_maps_api",
                //   apiKey: "{YOUR_GOOGLE_MAPS_API_KEY}",
                // },
              }}
              onChange={(event) => {
                  setIsComplete(event.complete)                
                if (event.complete) {
                  // Extract potentially complete address
                  setaddressValues(event.value.address)
                  setnameValues(event.value.name)
                  
                }
              }}
            />
          </Elements>




        </div>

        <div id="placeorder" className='mt-8 flex flex-row justify-center items-center rounded-md bg-black p-2 py-3 cursor-pointer' onClick={handleSubmit}>
          <div className='text-white' style={{ fontFamily: 'Inter, sans-serif'}}>Place Order</div>
        </div>  
      </div>

      <div id="ordersummary" className='w-[415px] ml-8 mt-10 md:ml-0 md:mt-0'>
        <div className='rounded-lg p-4 border-black border'>
          <div className='text-[20px] mb-2' style={{ fontFamily: 'Poppins, sans-serif'}}>Order Summary</div>

          <div id="itemscontainer" className='h-[400px] flex flex-col justify-start gap-y-2 overflow-y-auto verticalscroll pr-2'>
            {cart.map((item) => (
              <div key={item.id} id="item" className='flex flex-row justify-between border-b pb-3'>
                <div className='h-24 w-80 flex flex-row'>
                  <div id="image" className='h-24 w-20 bg-blue-500 mr-2'>
                  {item && (
                      <img
                        alt={item.name}
                        className="w-full h-full object-fit"
                        src={`${constants.backendUrl}${item.attributes.images.data[0].attributes.url}`}
                      />
                    )}
                  </div>
                  <div id="productdesc" className='h-auto w-56 flex flex-col justify-between'>
                    <div className='text-[14px] font-semibold' style={{ fontFamily: 'Inter, sans-serif'}}>{item.attributes.name}</div>

                    <div className='text-[12px] text-[#6C7275] mb-3' style={{ fontFamily: 'Inter, sans-serif'}}>
                      {item.attributes.selectedProduct && (
                        <>
                          {Object.entries(item.attributes.selectedProduct).map(([key, value], index) => (
                            <div key={index}>
                              {key}: {value}
                            </div>
                          ))}
                        </>
                      )}
                    </div>

                    <div className="flex items-center border border-[#6C7275] p-1 rounded-lg w-20">
                    <FiMinus className="cursor-pointer" onClick={() => dispatch(decreaseCount({ id: item.id, 
                    selected: JSON.stringify(item.attributes.selectedProduct)
                  }))} />
                    <span className="mx-3">{item.count}</span>
                    <FiPlus className="cursor-pointer" onClick={() => dispatch(increaseCount({ id: item.id, 
                    selected: JSON.stringify(item.attributes.selectedProduct)
                  }))} />                
                    </div>
                  </div>              
                </div>

                <div id="quantity-price-subtotal" className='flex flex-row justify-end w-[325px]'>
                <div>${(item.attributes.onSale ? item.attributes.discount * item.count : item.attributes.price * item.count).toFixed(2)}</div>        
                </div>
              </div>
            ))}
          </div>
            {/* DO NOT REMOVE <div id='coupons' className='mt-5 flex flex-col gap-y-2 border-b border-[#EAEAEA] pb-3'>
              <div className='flex flex-row justify-between '>
              <div className="flex flex-row">
                <RiCouponLine className="ml-1 mr-2 text-xl "/>
                <div >CouponName</div>
              </div>

              <div className="flex flex-row">
              <div className='text-[#38CB89]' style={{ fontFamily: 'Inter, sans-serif'}}>-$25.00</div>    
              <div className='text-[#38CB89] cursor-pointer' style={{ fontFamily: 'Inter, sans-serif'}}>[Remove]</div>            
              </div>
                
              </div>
          </div> */}

          <div id='shipping' className='mt-2 flex flex-row justify-between border-b border-[#EAEAEA] pb-3'>
            <div style={{ fontFamily: 'Inter, sans-serif'}}>Shipping</div>
            <div style={{ fontFamily: 'Inter, sans-serif'}}>
            {cartShipping.replace(/Shipping$/, '')[0].toUpperCase() + cartShipping.replace(/Shipping$/, '').slice(1)}
              </div>
          </div>

          <div id='subtotal' className='mt-2 flex flex-row justify-between border-b border-[#EAEAEA] pb-3'>
            <div style={{ fontFamily: 'Inter, sans-serif'}}>Subtotal</div>
            <div style={{ fontFamily: 'Inter, sans-serif'}}>${subtotal.toFixed(2)}</div>
          </div>

          <div id='total' className='mt-3 flex flex-row justify-between '>
            <div className='text-[20px] font-bold' style={{ fontFamily: 'Inter, sans-serif'}}>Total</div>
            <div className='font-bold mt-1' style={{ fontFamily: 'Inter, sans-serif'}}>${total.toFixed(2)}</div>
          </div>

          <div id='checkout' className='mt-8 flex flex-row justify-center items-center rounded-md bg-black p-2 py-3 cursor-pointer' onClick={handleViewCart}>
            <div className='text-white' style={{ fontFamily: 'Inter, sans-serif'}}>View Cart</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
