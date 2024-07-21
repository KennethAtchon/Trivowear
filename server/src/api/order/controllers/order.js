'use strict';
// @ts-ignore
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
    async create(ctx) {
        // @ts-ignore
        const { userName, email, phoneNumber, products, billingAddress, shippingAddress } = ctx.request.body;

        try {
            // Retrieve item information
            const lineItems = await Promise.all(
                products.map(async (product) => {
                    const item = await strapi.service("api::item.item").findOne(product.id);
                    console.log('Fetched item:', item);

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

            // Create Stripe Checkout Session
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                customer_email: email,
                mode: "payment",
                success_url: "http://localhost:3000/checkout/success",
                cancel_url: "http://localhost:3000",
                line_items: lineItems
            });

            await strapi
            .service("api::order.order")
            .create({ data: { user_name: userName, products: products, stripeSessionId: session.id, email: email, billingAddress: billingAddress, shippingAddress: shippingAddress, phone_number: phoneNumber } });

            return { id: session.id };

        } catch (error) {
            console.error('Error creating checkout session:', error);
            ctx.response.status = 500;
            return { error: { message: "There was a problem creating the charge", details: error.message } };
        }
    }
}));
