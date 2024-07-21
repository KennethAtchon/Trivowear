import React from 'react';
import ShoppingList from './ShoppingList';
import { Box, Typography } from '@mui/material';

const ShopAll = () => {
  const filters = ''; // No filters for Shop All page

  return (
    <Box mt={20}>
      <Typography variant="h4" align="center" gutterBottom>
        Shop All Products
      </Typography>
      <ShoppingList filters={filters} />
    </Box>
  );
};

export default ShopAll;
