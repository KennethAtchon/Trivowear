import React from 'react';
import { Box, Button, TextField, Typography, Alert, Link } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useDispatch } from 'react-redux'; // Import useDispatch
import { login } from '../../state/auth'; // Import the login action
import constants from '../../constants.json';

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().required('Password is required'),
});



/**
 * Handles the sign up process for a new user.
 *
 * @return {JSX.Element} The sign up form component.
 */
const SignUp = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const dispatch = useDispatch(); // Initialize useDispatch

  const handleSignUp = async (values, { setErrors, setStatus }) => {
    try {
      const response = await fetch(`${constants.backendUrl}/api/auth/local/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (response.ok) {
        setStatus({ success: 'Account created successfully!' });
        // Dispatch the login action with the received token
        dispatch(login({ token: data.jwt, email: values.email }));
        // Redirect to home or another page upon successful signup
        navigate('/');
      } else {
        setErrors({ submit: data.message[0].messages[0].message });
      }
    } catch (error) {
      console.log(error);
      setErrors({ submit: 'An error occurred. Please try again.' });
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="55vh"
      mx="auto"
      p={3}
      mt={8}
      maxWidth={400}
    >
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSignUp}
      >
        {({ errors, touched, status }) => (
          <Form>
            {status?.success && <Alert severity="success">{status.success}</Alert>}
            {errors.submit && <Alert severity="error">{errors.submit}</Alert>}
            <Field name="username">
              {({ field, form }) => (
                <TextField
                  {...field}
                  label="Username"
                  margin="normal"
                  fullWidth
                  error={Boolean(touched.username && errors.username)}
                  helperText={touched.username && errors.username}
                />
              )}
            </Field>
            <Field name="email">
              {({ field, form }) => (
                <TextField
                  {...field}
                  label="Email"
                  margin="normal"
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
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
              Sign Up
            </Button>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              Already have an account?{' '}
              <Link href="/signin" underline="none" color="primary">
                Sign In
              </Link>
            </Typography>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SignUp;

