import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const ShippingPolicy = () => {
  return (
    <Container maxWidth="md">
      <Box mt={4} mb={4}>
        <Typography variant="h4" gutterBottom>
          Shipping Policy
        </Typography>

        <Typography variant="h6" gutterBottom>
          Order Processing
        </Typography>
        <Typography variant="body1" paragraph>
          Please allow [timeframe] to process your order. Expect an email within [timeframe] to let you know your order is on the way!
        </Typography>

        <Typography variant="h6" gutterBottom>
          Store Pickup
        </Typography>
        <Typography variant="body1" paragraph>
          Orders can be picked up daily from [time] at [Insert Address]. An email will be sent when your order is ready for pickup.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Local Delivery
        </Typography>
        <Typography variant="body1" paragraph>
          Local delivery is available for addresses within [insert distance] of our shop. Orders placed before [time] during store hours [insert store hours] will be delivered the same day. Orders placed outside of these hours will be delivered the next day we are open.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Flat Rate Shipping
        </Typography>
        <Typography variant="body1" paragraph>
          Orders are generally shipped within [timeframe] using [your shipping provider]. Flat rate shipping fee of [fee] applies to orders shipping to [locations outside local region].
        </Typography>

        <Typography variant="h6" gutterBottom>
          Domestic Shipping Rates and Estimates
        </Typography>
        <Typography variant="body1" paragraph>
          Shipping charges for your order will be calculated and displayed at checkout. We offer $X flat rate shipping to [list countries].
        </Typography>

        <Typography variant="h6" gutterBottom>
          International Shipping
        </Typography>
        <Typography variant="body1" paragraph>
          We offer international shipping to the following countries: [list of countries]. Shipping charges for your order will be calculated and displayed at checkout.
        </Typography>
        <Typography variant="body1" paragraph>
          Your order may be subject to import duties and taxes (including VAT), which are incurred once a shipment reaches your destination country. [Your Company] is not responsible for these charges.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Refunds, Returns, and Exchanges
        </Typography>
        <Typography variant="body1" paragraph>
          We accept returns up to X days after delivery, if the item is unused and in its original condition. In the event that your order arrives damaged, please email us at support@email.com with your order number and a photo of the item’s condition.
        </Typography>
      </Box>
    </Container>
  );
};

export default ShippingPolicy;
