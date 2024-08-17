import React, { useState } from 'react';
import constants from '../../constants.json';
import { useSelector } from 'react-redux';
//8c2f8d25f33f48873be321b6bc24b6900f3652a962d43f8f4bec7da36012a75af4e6d1e9aabca12372336b3412b26ff7365649d840d2389c1c0520670668cb2b353a02a05e58b60fa0e00292f0b8ff1d637c3fb48e580064d4dca7bb0595747cc00baa82c5753d75e1f13f4d6b2bcbfaa3e87738fb6e4ee01b4b9565bf6dd1f0
const Settings = () => {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');
    const { token } = useSelector((state) => state.auth);

    const handleSaveChanges = async () => {
        try {
            // Replace with the user's token, which should be obtained from your authentication state

            const response = await fetch(`${constants.backendUrl}/api/users/me`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,  // Ensure you have the user's token
                },
                body: JSON.stringify({
                    displayName,
                    email,
                    password: newPassword,  // Strapi typically uses 'password' for updates
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update user data');
            }
    
            const updatedUser = await response.json();
            console.log('User updated:', updatedUser);
            // Optionally update local state with the new data or provide user feedback
        } catch (error) {
            console.error('Error updating user:', error);
            // Handle error, maybe set an error message in state to display in the UI
        }
    };

    return (
        <div className='w-[350px] md:w-auto flex items-center justify-center'>
            <div className="w-full max-w-md bg-white ">
                <h2 className="text-2xl font-bold mb-6">Settings</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="displayName">
                        Display Name
                    </label>
                    <input
                        id="displayName"
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter your display name"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="oldPassword">
                        Old Password
                    </label>
                    <input
                        id="oldPassword"
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter your old password"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                        New Password
                    </label>
                    <input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter your new password"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="repeatNewPassword">
                        Repeat New Password
                    </label>
                    <input
                        id="repeatNewPassword"
                        type="password"
                        value={repeatNewPassword}
                        onChange={(e) => setRepeatNewPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Repeat your new password"
                    />
                </div>

                <button
                    onClick={handleSaveChanges}
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default Settings;
