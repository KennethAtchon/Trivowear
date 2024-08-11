import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        About Us
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        Welcome to our company! We are passionate about delivering high-quality products and services
        that exceed our customers' expectations. Our team is dedicated to continuous improvement and
        innovation, and we strive to be leaders in our industry.
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph>
          Our mission is to provide exceptional value to our customers by offering innovative solutions
          and unparalleled customer service. We are committed to creating a positive impact on our
          community and the environment.
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom>
          Our Values
        </Typography>
        <Typography variant="body1" paragraph>
          We believe in integrity, transparency, and excellence. These core values guide everything we
          do and help us build strong, long-lasting relationships with our customers and partners.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
