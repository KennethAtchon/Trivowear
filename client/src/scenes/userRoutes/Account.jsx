import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../state/auth'; // Import the logout action
import { Container, Typography, List, ListItem, Button, Paper } from '@mui/material';

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, token } = useSelector((state) => state.auth);
  const [shippingAddresses, setShippingAddresses] = useState([
    '123 Main St, Anytown, USA',
    '456 Oak Ave, Somewhere, USA',
  ]); // Dummy data for shipping addresses
  const [orderHistory, setOrderHistory] = useState([
    { id: '001', date: '2024-06-01' },
    { id: '002', date: '2024-06-15' },
  ]); // Dummy data for order history

  useEffect(() => {
    if (!isAuth) {
      navigate('/signin'); // Redirect to login if not authenticated
      return;
    }

    // // Fetch data from Strapi
    // const fetchData = async () => {
    //   try {
    //     const responseAddresses = await fetch('/api/shipping-addresses'); // Replace with your Strapi endpoint
    //     const addressesData = await responseAddresses.json();
    //     setShippingAddresses(addressesData);

    //     const responseOrders = await fetch('/api/order-history'); // Replace with your Strapi endpoint
    //     const ordersData = await responseOrders.json();
    //     setOrderHistory(ordersData);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };

    // fetchData();
  }, [isAuth, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <Container maxWidth="md" sx={{ padding: '20px', paddingTop: '100px' }}>
      <Typography variant="h4" gutterBottom>
        Hi, User!
      </Typography>
      <Paper sx={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Shipping Addresses
        </Typography>
        {shippingAddresses.length ? (
          <List>
            {shippingAddresses.map((address, index) => (
              <ListItem key={index}>{address}</ListItem>
            ))}
          </List>
        ) : (
          <Typography>No shipping addresses found.</Typography>
        )}
      </Paper>
      <Paper sx={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Order History
        </Typography>
        {orderHistory.length ? (
          <List>
            {orderHistory.map((order, index) => (
              <ListItem key={index}>Order #{order.id} - {order.date}</ListItem>
            ))}
          </List>
        ) : (
          <Typography>No orders found.</Typography>
        )}
      </Paper>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
};

export default Account;
