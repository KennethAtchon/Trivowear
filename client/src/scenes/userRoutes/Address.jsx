import React from 'react';

const Card = ({ address, username }) => {
    return (
        <div className="bg-white max-w-[340px] shadow-md rounded-lg p-4">
            <div>Shipping Address</div>
            <div className='mt-2'>{username}</div>
            <div>{address}</div>
        </div>
    )
}

const Address = ({ addresses, username }) => {

    return (
        <div>
            <div className='text-xl mb-4'>Address</div>
            <div className='grid gap-6' style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))' }}>
                {addresses.map((address, index) => (
                    <Card key={index} address={address} username={username} />
                ))}
            </div>
        </div>
    )
}

export default Address;
