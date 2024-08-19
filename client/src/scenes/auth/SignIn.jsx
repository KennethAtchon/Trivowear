import React from 'react';
import { Box, Button, TextField, Typography, Alert, Link } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useDispatch } from 'react-redux'; // Import useDispatch
import { login } from '../../state/auth'; // Import the login action
import constants from '../../constants.json';

const validationSchema = Yup.object({
  identifier: Yup.string().required('Email or Username is required'),
  password: Yup.string().required('Password is required'),
});

/**
 * Handles user sign-in functionality, including form submission, error handling, and redirecting to the home page upon successful sign-in.
 *
 * @return {JSX.Element} The sign-in form component
 */
const SignIn = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const dispatch = useDispatch(); // Initialize useDispatch

  const handleSignIn = async (values, { setErrors, setStatus }) => {
    try {
      const response = await fetch(`${constants.backendUrl}/api/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (response.ok) {
        setStatus({ success: 'Signed in successfully!' });
        // Dispatch the login action with the received token
        dispatch(login({ token: data.jwt, email: values.email }));
        // Redirect to home or another page upon successful sign-in
        navigate('/');
      } else {
        setErrors({ submit: data.message[0].messages[0].message });
      }
    } catch (error) {
      setErrors({ submit: 'Wrong password/username. Please try again.' });
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="57vh"
      mx="auto"
      p={3}
      maxWidth={400}
    >
      <Typography variant="h4" gutterBottom>
        Sign In
      </Typography>
      <Formik
        initialValues={{ identifier: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSignIn}
      >
        {({ errors, touched, status }) => (
          <Form>
            {status?.success && <Alert severity="success">{status.success}</Alert>}
            {errors.submit && <Alert severity="error">{errors.submit}</Alert>}
            <Field name="identifier">
              {({ field, form }) => (
                <TextField
                  {...field}
                  label="Email or Username"
                  margin="normal"
                  fullWidth
                  error={Boolean(touched.identifier && errors.identifier)}
                  helperText={touched.identifier && errors.identifier}
                />
              )}
            </Field>
            <Field name="password">
              {({ field, form }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  margin="normal"
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
              )}
            </Field>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2 }}
            >
              Sign In
            </Button>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              Don't have an account?{' '}
              <Link href="/signup" underline="none" color="primary">
                Sign Up
              </Link>
            </Typography>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SignIn;
