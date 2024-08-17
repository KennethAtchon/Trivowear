import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";
import Cart from './Cart';
import Checkout from './Checkout';
import Confirmation from './Confirmation';
import './MainCheckout.css'; // Import the CSS file

/**
 * MainCheckout component: handles the checkout process with multiple steps.
 *
 * @return {JSX.Element} The JSX element representing the MainCheckout component.
 */
const MainCheckout = () => {
    const location = useLocation();

    const query = new URLSearchParams(location.search);

    // Read parameters from URL
    const activeStepParam = query.get('activeStep');
    const successfulParam = query.get('successful');

    console.log(activeStepParam)

    const [successful, setSuccess] = useState([false, false, false]);
    const [activeStep, setActiveStep] = useState(0);
    const [spinning, setSpinning] = useState([false, false, false]);

    useEffect(() => {
        if (activeStepParam) {
            setActiveStep(Number(activeStepParam));
        }
        if (successfulParam) {
            const successArray = successfulParam.split(',').map(item => item === 'true');
            setSuccess(successArray);
        }
    }, [activeStepParam, successfulParam]);

    const getStepStyles = (index) => {
        if (index === activeStep) {
            return { bgColor: 'bg-black', textColor: 'text-white', lineColor: 'bg-black', labelColor: 'text-black', lineAnimation: '' };
        } else if (successful[index]) {
            return { bgColor: 'bg-[#45B26B]', textColor: 'text-white', lineColor: 'bg-green-500', labelColor: 'text-green-500', lineAnimation: 'line-animation' };
        } else {
            return { bgColor: 'bg-gray-500', textColor: 'text-white', lineColor: 'bg-gray-500', labelColor: 'text-gray-500', lineAnimation: '' };
        }
    };

    const handleNextStep = () => {
        if (activeStep < 2) {
            setSuccess(prev => {
                const newSuccess = [...prev];
                newSuccess[activeStep] = true;
                return newSuccess;
            });
            setSpinning(prev => {
                const newSpinning = [...prev];
                newSpinning[activeStep] = true;
                return newSpinning;
            });
            setActiveStep(prev => prev + 1);

            // Remove spinning effect after animation ends
            setTimeout(() => {
                setSpinning(prev => {
                    const newSpinning = [...prev];
                    newSpinning[activeStep] = false;
                    return newSpinning;
                });
            }, 500); // Duration of the animation (500ms)
        }
    };

    const handlePrevStep = () => {
        if (activeStep > 0) {
            setActiveStep(prev => prev - 1);
        }
    };



    const stepLabels = ["Shopping Cart", "Checkout Details", "Order complete"];
    const stepTitle = ["Cart", "Checkout", "Complete"];

    return (
        <div id="main-checkout-container" className='w-full h-auto flex flex-col items-center'>
            <div id="Slider" className='h-auto w-full md:max-w-[90%] lg:max-w-[830px] mt-12 flex flex-col'>
    <div className='font-bold text-4xl sm:text-[54px] text-center' style={{ fontFamily: 'Poppins, sans-serif' }}>
        {stepTitle[activeStep]}
    </div>

    <div className='flex flex-row h-[70px] gap-x-4 sm:gap-x-6 mt-6'>
        {[0, 1, 2].map((step, index) => {
            const styles = getStepStyles(index);
            return (
                <div key={index} className='flex-1 flex flex-col justify-between'>
                    <div className='flex flex-row items-center'>
                        <div className={`flex justify-center items-center w-10 h-10 ${styles.bgColor} ${styles.textColor} rounded-full text-[16px] mr-4`}>
                            {successful[index] ? (
                                <FaCheck className={spinning[index] ? 'spin' : ''} />
                            ) : (
                                index + 1
                            )}
                        </div>
                        <div className={`text-[14px] sm:text-[16px] flex items-center font-bold ${styles.labelColor}`}>
                            {stepLabels[index]}
                        </div>
                    </div>
                    <div id="line" className={`${styles.lineColor} ${styles.lineAnimation} w-full h-[4px] rounded-lg`}></div>
                </div>
            );
        })}
    </div>
</div>


            <div id="maincomponent" className='h-auto w-auto mt-4 mb-16 '>
                {/* Render the component based on the active step */}
                {activeStep === 0 && <Cart handleNextStep={handleNextStep}/>}
                {activeStep === 1 && <Checkout handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} />}
                {activeStep === 2 && <Confirmation />}
            </div>
        </div>
    );
};

export default MainCheckout;
