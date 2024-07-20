import { useSelector } from "react-redux";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Payment from "./Payment";
import Shipping from "./Shipping";
import { loadStripe } from "@stripe/stripe-js";
import { Button, Container, Stepper, Step, StepLabel, Typography, CircularProgress } from "@mui/material";
import constants from "../../constants.json";

const stripePromise = loadStripe(
  "pk_test_51PeOOTHgfcgRayrrGL73KOBp2Ikk3Gu8joXHZbFPEfMNqLXFMuJVSndS7LeWqSf2VavJWwx0E39SEnRoJQjJ8NJO001jHB40lg"
);

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const [isLoading, setIsLoading] = useState(false);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);

    // Copy the billing address onto shipping address if they are the same
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }

    if (isSecondStep) {
      makePayment(values);
    }

    actions.setTouched({});
  };

  async function makePayment(values) {
    setIsLoading(true)
    const stripe = await stripePromise;
    const requestBody = {
      userName: [values.firstName, values.lastName].join(" "),
      email: values.email,
      products: cart.map(({ id, count }) => ({
        id,
        count,
      })),
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
          <StepLabel>Billing</StepLabel>
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
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {isSecondStep && (
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
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
        </Formik>
      )}
    </Container>
  );
};

const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("Required"),
      lastName: yup.string().required("Required"),
      country: yup.string().required("Required"),
      street1: yup.string().required("Required"),
      street2: yup.string(),
      city: yup.string().required("Required"),
      state: yup.string().required("Required"),
      zipCode: yup.string().required("Required"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: (schema) => schema.required("Required"),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: (schema) => schema.required("Required"),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: (schema) => schema.required("Required"),
      }),
      street1: yup.string().when("isSameAddress", {
        is: false,
        then: (schema) => schema.required("Required"),
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: (schema) => schema.required("Required"),
      }),
      state: yup.string().when("isSameAddress", {
        is: false,
        then: (schema) => schema.required("Required"),
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: false,
        then: (schema) => schema.required("Required"),
      }),
    }),
  }),
  yup.object().shape({
    email: yup.string().required("Required"),
    phoneNumber: yup.string().required("Required"),
  }),
];
export default Checkout;
