import React, { useState, useEffect } from "react";
import constants from "../../constants.json"; // Update this path

const Orders = ({ orders }) => {
    const [enrichedOrders, setEnrichedOrders] = useState([]);

    useEffect(() => {
        const fetchProductDetails = async () => {
            const enriched = await Promise.all(orders.map(async (order) => {
                const productIds = order.products.match(/Product ID: (\d+)/g).map(id => id.split(': ')[1]);
                const counts = order.products.match(/Count: (\d+)/g).map(count => parseInt(count.split(': ')[1]));
                
                const productDetails = await Promise.all(productIds.map(async (id) => {
                    const response = await fetch(
                        `${constants.backendUrl}/api/items/${id}?fields[0]=name&fields[1]=price`,
                        { method: "GET" }
                    );
                    return await response.json();
                }));

                const totalPrice = productDetails.reduce((sum, product, index) => 
                    sum + (product.data.attributes.price * counts[index]), 0);

                const productNames = productDetails.map((product, index) => 
                    `${product.data.attributes.name} (x${counts[index]})`
                ).join(", ");

                return {
                    ...order,
                    productNames,
                    totalPrice: totalPrice.toFixed(2)
                };
            }));

            setEnrichedOrders(enriched);
        };

        fetchProductDetails();
    }, [orders]);

    return (
        <div className='w-[400px] md:w-auto md:min-w-[500px] h-full'>
            <div className='text-xl mb-4'>Orders History</div>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2 text-left">ID</th>
                        <th className="border p-2 text-left">Date</th>
                        <th className="border p-2 text-left">Products</th>
                        <th className="border p-2 text-left">Price (Excl. Shipping) </th>
                    </tr>
                </thead>
                <tbody>
                    {enrichedOrders.map((order) => (
                        <tr key={order.id}>
                            <td className="border p-2">{order.id}</td>
                            <td className="border p-2">{order.date}</td>
                            <td className="border p-2">{order.productNames}</td>
                            <td className="border p-2">${order.totalPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default Orders;