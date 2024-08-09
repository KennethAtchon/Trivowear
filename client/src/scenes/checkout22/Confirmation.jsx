import React from 'react';
import { Box, Alert, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Confirmation = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/');
  };

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
      <Button 
        variant="contained" 
        color="primary" 
        sx={{ marginTop: '20px' }} 
        onClick={handleContinueShopping}
      >
        Want to keep shopping?
      </Button>
    </Box>
  );
};

export default Confirmation;
