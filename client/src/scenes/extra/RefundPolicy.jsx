import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const RefundPolicy = () => {
  return (
    <Container maxWidth="md">
      <Box mt={4} mb={4}>
        <Typography variant="h4" gutterBottom>
          Return Policy
        </Typography>
        <Typography variant="body1" paragraph>
          Last updated August 13, 2024
        </Typography>
        <Typography variant="body1" paragraph>
          Thank you for your purchase. We hope you are happy with your purchase. However, if you are not completely satisfied with your purchase for any reason, you may return it to us for a full refund only. Please see below for more information on our return policy.
        </Typography>

        <Typography variant="h5" gutterBottom>
          Returns
        </Typography>
        <Typography variant="body1" paragraph>
          All returns must be postmarked within thirty (30) days of the purchase date. All returned items must be in new and unused condition, with all original tags and labels attached.
        </Typography>

        <Typography variant="h5" gutterBottom>
          Return Process
        </Typography>
        <Typography variant="body1" paragraph>
          To return an item, please email customer service at support@broovie.com to obtain a Return Merchandise Authorization (RMA) number. After receiving an RMA number, place the item securely in its original packaging and include your proof of purchase, then mail your return to the following address:
        </Typography>
        <Typography variant="body1" paragraph>
          Broovie<br/>
          Attn: Returns<br/>
          RMA #<br/>
          Massachusetts Hall, Cambridge, MA 02138<br/>
          Cambridge, MA 02138<br/>
          United States
        </Typography>
        <Typography variant="body1" paragraph>
          Please note, you will be responsible for all return shipping charges. We strongly recommend that you use a trackable method to mail your return.
        </Typography>

        <Typography variant="h5" gutterBottom>
          Refunds
        </Typography>
        <Typography variant="body1" paragraph>
          After receiving your return and inspecting the condition of your item, we will process your return. Please allow at least fourteen (14) days from the receipt of your item to process your return. Refunds may take 1-2 billing cycles to appear on your credit card statement, depending on your credit card company. We will notify you by email when your return has been processed.
        </Typography>

        <Typography variant="h5" gutterBottom>
          Exceptions
        </Typography>
        <Typography variant="body1" paragraph>
          For defective or damaged products, please contact us at the contact details below to arrange a refund or exchange.
        </Typography>

        <Typography variant="h5" gutterBottom>
          Questions
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions concerning our return policy, please contact us at:
        </Typography>
        <Typography variant="body1" paragraph>
          support@broovie.com
        </Typography>
      </Box>
    </Container>
  );
};

export default RefundPolicy;
