import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../state/auth';
import { Container, Typography, List, ListItem, Button, Paper } from '@mui/material';
import constants from "../../constants.json";

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, token } = useSelector((state) => state.auth);
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [username, setUsername] = useState('User');

  const fetchData = async () => {
    try {
      const userResponse = await fetch(`${constants.backendUrl}/api/users/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!userResponse.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await userResponse.json();
      console.log(userData)
      const userEmail = userData.email;
      setUsername(userData.username)

      const ordersResponse = await fetch(`${constants.backendUrl}/api/orders?filters[email][$eq]=${userEmail}&fields[0]=products&fields[1]=shippingAddress&fields[2]=createdAt`, {
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
      const formattedOrders = ordersData.data.map(order => {
        const { shippingAddress } = order.attributes;
        const formattedAddress = `${shippingAddress.line1}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.postal_code}, ${shippingAddress.country}`;
        uniqueAddresses.add(formattedAddress);

        return {
          id: order.id,
          products: order.attributes.products.map(product => `Product ID: ${product.id}, Count: ${product.count}`).join('; '),
          date: new Date(order.attributes.createdAt).toLocaleDateString(),
        };
      });

      setShippingAddresses([...uniqueAddresses]);
      setOrderHistory(formattedOrders);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (!isAuth) {
      navigate('/signin');
      return;
    }

    fetchData();
  }, [isAuth, navigate, token]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Container maxWidth="md" sx={{ padding: '20px', paddingTop: '100px' }}>
      <Typography variant="h4" gutterBottom>
        Hi, {username}!
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
              <ListItem key={index}>
                Order #{order.id} - {order.products} - Created on: {order.date}
              </ListItem>
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
