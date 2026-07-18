import React from 'react';
import { useParams, Link } from 'react-router-dom';

const OrderSuccess = () => {
    const { order_id } = useParams();

    return (
        <div className="flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-2xl font-bold mb-2">Thank you for your order ! </h1>
            <p className="text-gray-500 mb-6">Your order number is # {order_id}</p>
            <Link to="/" className="bg-black text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-gray-800 transition duration-200">
                Back to Home
            </Link>
        </div>
    );
};

export default OrderSuccess;