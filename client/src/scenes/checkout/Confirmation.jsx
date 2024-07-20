import React from 'react';
import { Box, Alert, Typography } from '@mui/material';

const Confirmation = () => {
  return (
    <Box 
      sx={{
        marginTop: '30px',
        margin: '90px auto',
        width: '80%',
        height: '50vh',
      }}
    >
      <Alert severity="success">
        <Typography variant="h6" component="strong">Success</Typography>
        <Typography variant="body1">
          You have successfully made an Order — <strong>Congrats on Making your Purchase</strong>
        </Typography>
      </Alert>
    </Box>
  );
};

export default Confirmation;
