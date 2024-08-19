'use strict';
// @ts-ignore
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

/*
Differentiate price and discount using onsale
Add the type of shipping they chose, 
add coupons (later)
*/

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
    async create(ctx) {
        // @ts-ignore
        const { email, phone, products, shippingAddress, cartShipping } = ctx.request.body;



        try {
            // Retrieve item information
            var shippingPrice = 0;
            const lineItems = await Promise.all(
                products.map(async (product) => {
                    const item = await strapi.service("api::item.item").findOne(product.id);
                    console.log('Fetched item:', item);
                    console.log(cartShipping)

                    // var shippingValue = item.shippingDetails.shippingDetails[cartShipping].shippingCost;
                    // if(shippingValue == "free"){
                    //     shippingPrice = 0;
                    // }else{ 
                    //     shippingPrice = parseFloat(shippingValue.replace('$', '')) * 100;
                    // }
                    shippingPrice = 0;

                    return {
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name: item.name
                            },
                            unit_amount: item.price * 100,
                        },
                        quantity: product.count,
                    };
                })
            );

            console.log('Line Items:', lineItems);
            console.log(shippingPrice)

            // Create Stripe Checkout Session
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                customer_email: email,
                mode: "payment",
                success_url: "http://localhost:3000/checkout/success?activeStep=2&successful=true,true,false",
                /* http://localhost:3000/checkout/success?activeStep=2&successful=true,true,false */
                cancel_url: "http://localhost:3000",
                line_items: lineItems,
                shipping_options: [
                    {
                        shipping_rate_data: {
                            type: 'fixed_amount',
                            fixed_amount: {
                                amount: shippingPrice, // Stripe expects amounts in the smallest currency unit (e.g., cents for USD)
                                currency: 'usd',
                            },
                            display_name: 'Standard Shipping', // Display name for the shipping option
                        },
                    },
                ],
            });

            await strapi.plugins['email'].services.email.send({
                to: email,
                from: 'mailgun@sandboxd398ed80cccf4ecf884880d9e711a3ef.mailgun.org',
                subject: 'Order Confirmation',
                text: `Thank you for your order! Your session ID is ${session.id}.`,
                html: `<p>Thank you for your order! Your session ID is <strong>${session.id}</strong>.</p>`,
            });
            

            await strapi
            .service("api::order.order")
            .create({ data: {  products: products, stripeSessionId: session.id, email: email, shippingAddress: shippingAddress, phone: phone } });

            return { id: session.id };

        } catch (error) {
            console.error('Error creating checkout session:', error);
            ctx.response.status = 500;
            return { error: { message: "There was a problem creating the charge", details: error.message } };
        }
    }
}));
