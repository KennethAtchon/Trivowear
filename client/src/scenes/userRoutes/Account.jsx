import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../state/auth';
import constants from "../../constants.json";
import { MdPersonOutline} from "react-icons/md";
import Address from './Address';
import Orders from './Orders';
import Settings from './Settings';

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, token } = useSelector((state) => state.auth);
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [username, setUsername] = useState('User');
  const [currentView, setCurrentView] = useState('Account');


  const fetchData = useCallback(async () => {
    try {
      const userResponse = await fetch(`${constants.backendUrl}/api/users/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!userResponse.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await userResponse.json();
      console.log(userData);
      const userEmail = userData.email;
      setUsername(userData.username);
  
      const ordersResponse = await fetch(`${constants.backendUrl}/api/orders?filters[email][$eq]=${userEmail}&fields[0]=products&fields[1]=shippingAddress&fields[2]=createdAt&fields[3]=phone`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!ordersResponse.ok) {
        throw new Error('Failed to fetch orders');
      }
      const ordersData = await ordersResponse.json();
  
      // Extract and aggregate unique shipping addresses
      console.log(ordersData)
      const uniqueAddresses = new Set();
      const formattedOrders = ordersData.data.map(order => {
        const { shippingAddress } = order.attributes;
        const formattedAddress = `${shippingAddress.line1}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.postal_code}, ${shippingAddress.country}`;
        uniqueAddresses.add(formattedAddress);
  
        return {
          id: order.id,
          products: order.attributes.products.map(product => `Product ID: ${product.id}, Count: ${product.count}`).join('; '),
          date: new Date(order.attributes.createdAt).toLocaleDateString(),
        };
      });
  
      setShippingAddresses([...uniqueAddresses]);
      setOrderHistory(formattedOrders);
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [token]); // Include dependencies
  
  useEffect(() => {
    if (!isAuth) {
      navigate('/signin');
      return;
    }
  
    fetchData();
  }, [isAuth, navigate, fetchData]);
  

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  const renderComponent = () => {
    switch (currentView) {
      case'Address':
        return <Address addresses={shippingAddresses} username={username} />;
      case'Orders':
        return <Orders orders={orderHistory} />;
      case'Settings':
        return <Settings />;
      default:
        return <Settings />;
    }
  };

  return (
    <div className='h-auto my-10 px-4'>
      <div className='text-4xl font-bold text-center pt-4 mb-8'>
        My Account
      </div>
      <div className='h-full pt-8 flex flex-col items-center md:items-start md:flex-row md:justify-center gap-12 mb-20'>

        <div className='h-auto pb-8 w-[260px] bg-[#F3F5F7] rounded-lg flex flex-col items-center '>


          <div className='border h-16 w-16 border-black rounded-full flex items-center justify-center mt-8'> < MdPersonOutline className='text-5xl' /> </div>
          <div className=' text-xl mt-2' style={{ fontFamily: 'Inter, sans-serif' }}> {username}</div>

          <div id="navlinks" className=" w-full mt-10 flex flex-col gap-y-4 px-4">

            <div 
            className={`text-lg pb-1 cursor-pointer transition-all duration-300 ${currentView === 'Account' ? 'border-b-2 border-black' : 'border-b-2 border-transparent'}`}
            onClick={() => setCurrentView('Account')}> Account </div>

            <div onClick={() => setCurrentView('Address')} 
            className={`text-lg pb-1 cursor-pointer transition-all duration-300 ${currentView === 'Address' ? 'border-b-2 border-black' : 'border-b-2 border-transparent'}`}
            > Address</div>

            <div onClick={() => setCurrentView('Orders')} 
            className={`text-lg pb-1 cursor-pointer transition-all duration-300 ${currentView === 'Orders' ? 'border-b-2 border-black' : 'border-b-2 border-transparent'}`}> Orders </div>

            <div className='text-lg cursor-pointer' onClick={handleLogout}> Logout</div>

          </div>


        </div>

        <div className='md:w-[830px] w-auto'>
        {renderComponent()}
        </div>

      </div>

    </div>
  );
};

export default Account;

