import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Button, Container, Stepper, Step, StepLabel, Typography, CircularProgress } from "@mui/material";
import constants from "../../constants.json";
import { AddressElement, Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe("pk_test_51PeOOTHgfcgRayrrGL73KOBp2Ikk3Gu8joXHZbFPEfMNqLXFMuJVSndS7LeWqSf2VavJWwx0E39SEnRoJQjJ8NJO001jHB40lg");

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;
  const [addressValues, setaddressValues] = useState(null);
  const [nameValues, setnameValues] = useState(null);

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.phoneNumber) {
      errors.phoneNumber = "Required";
    } else if (!phoneNumberRegex.test(values.phoneNumber)) {
      errors.phoneNumber = "Invalid phone number";
    }

    return errors;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();


    // see if address is complete
    if (isFirstStep) {
      if (!addressValues) return;
    }


    // this is for payment, it validates the payment, finds errors and stops the user from preceding
    //console.log(formValues)
    const validationErrors = validate(formValues);
    if (isSecondStep && Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (isSecondStep) {
      makePayment(formValues);
    }

    setTouched({});
    setActiveStep(activeStep + 1);
  };

  async function makePayment(values) {
    setIsLoading(true);
    const stripe = await stripePromise;
    const requestBody = {
      userName: nameValues,
      email: values.email,
      phoneNumber: values.phoneNumber,
      products: cart.map(({ id, count }) => ({
        id,
        count,
      })),
      billingAddress: addressValues,
      shippingAddress: addressValues
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

  return (
    <Container maxWidth="sm" className="mt-20">
      <Typography variant="h4" component="h1" gutterBottom>
        Checkout
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step>
          <StepLabel>Shipping</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }} className="h-[250px]">
          <CircularProgress />
        </div>
      ) : (
        <form onSubmit={handleFormSubmit}>
          {isFirstStep && (
            <Elements stripe={stripePromise}>
              <AddressElement
                options={{
                  mode: 'shipping',
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                  },
                }}
                onChange={(event) => {
                  if (event.complete) {
                    // Extract potentially complete address
                    setaddressValues(event.value.address)
                    setnameValues(event.value.name)
                    
                  }
                }}
              />
            </Elements>
          )}
          {isSecondStep && (
            <Payment
              values={formValues}
              errors={errors}
              touched={touched}
              handleBlur={(e) => setTouched({ ...touched, [e.target.name]: true })}
              handleChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })}
              setFieldValue={(field, value) => setFormValues({ ...formValues, [field]: value })}
            />
          )}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
            {!isFirstStep && (
              <Button
                variant="contained"
                onClick={() => setActiveStep(activeStep - 1)}
              >
                Back
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              {!isSecondStep ? "Next" : "Place Order"}
            </Button>
          </div>
        </form>
      )}
    </Container>
  );
};

const initialValues = {
  email: "",
  phoneNumber: "",
};

const phoneNumberRegex = /^(\+?\d{1,4}[\s-])?(?!0)\d{10}$/; 

export default Checkout;
