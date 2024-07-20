import React from "react";
import { Box, Typography, TextField } from "@mui/material";

const Payment = ({ values, touched, errors, handleBlur, handleChange }) => {
  return (
    <Box m={3}>
      {/* CONTACT INFO */}
      <Box mb={3}>
        <Typography variant="h6" mb={2}>
          Contact Info
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          label="Email"
          name="email"
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
          margin="normal"
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Phone Number"
          name="phoneNumber"
          value={values.phoneNumber}
          onBlur={handleBlur}
          onChange={handleChange}
          error={touched.phoneNumber && Boolean(errors.phoneNumber)}
          helperText={touched.phoneNumber && errors.phoneNumber}
          margin="normal"
        />
      </Box>
    </Box>
  );
};

export default Payment;
