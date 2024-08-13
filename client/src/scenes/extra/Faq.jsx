import React from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqData = [
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy on all items. Products must be returned in their original condition."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship internationally. Shipping costs and times vary by destination."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, you'll receive a tracking number via email."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept major credit cards, PayPal, and other secure payment methods."
  },
  {
    question: "Can I change my order after placing it?",
    answer: "Orders can be modified within 1 hour of placement. Please contact our support team immediately."
  },
  {
    question: "How do I contact customer service?",
    answer: "You can reach our customer service team via email at support@example.com or through our contact form on the website."
  },
  {
    question: "Do you offer gift cards?",
    answer: "Yes, we offer digital gift cards. They can be purchased on our website."
  },
  {
    question: "What should I do if I receive a defective item?",
    answer: "Please contact our support team with your order details and a photo of the defect for a replacement or refund."
  },
  {
    question: "How can I subscribe to your newsletter?",
    answer: "You can subscribe to our newsletter by entering your email address in the subscription form at the bottom of our website."
  },
  {
    question: "Do you offer bulk discounts?",
    answer: "Yes, we offer discounts on bulk purchases. Please contact us for more details."
  }
];

const FAQ = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 8, mb:8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Frequently Asked Questions
      </Typography>
      {faqData.map((faq, index) => (
        <Accordion key={index} sx={{ mb: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography variant="h6">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default FAQ;
