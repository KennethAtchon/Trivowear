import React, { useState } from 'react';
import { FaCheck } from "react-icons/fa";
import Cart from './Cart';
import Checkout from './Checkout';
import Confirmation from './Confirmation';
import './MainCheckout.css'; // Import the CSS file

const MainCheckout = () => {
    const [successful, setSuccess] = useState([false, false, false]);
    const [activeStep, setActiveStep] = useState(0);
    const [spinning, setSpinning] = useState([false, false, false]);

    const getStepStyles = (index) => {
        if (index === activeStep) {
            return { bgColor: 'bg-black', textColor: 'text-white', lineColor: 'bg-black', labelColor: 'text-black', lineAnimation: '' };
        } else if (successful[index]) {
            return { bgColor: 'bg-[#45B26B]', textColor: 'text-white', lineColor: 'bg-green-500', labelColor: 'text-green-500', lineAnimation: 'line-animation' };
        } else {
            return { bgColor: 'bg-gray-500', textColor: 'text-white', lineColor: 'bg-transparent', labelColor: 'text-gray-500', lineAnimation: '' };
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

    const stepLabels = ["Shopping Cart", "Checkout Details", "Order complete"];
    const stepTitle = ["Cart", "Checkout", "Complete"];

    return (
        <div id="main-checkout-container" className='w-full h-auto flex flex-col items-center'>
            <div id="Slider" className='h-auto w-[830px] mt-12 flex flex-col'>
                <div className='font-bold text-[54px] text-center' style={{ fontFamily: 'Poppins, sans-serif' }}>{stepTitle[activeStep]}</div>

                <div className='flex flex-row h-[70px] gap-x-6 mt-6'>
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
                                    <div className={`text-[16px] flex items-center font-bold ${styles.labelColor}`}>
                                        {stepLabels[index]}
                                    </div>
                                </div>
                                <div id="line" className={`${styles.lineColor} ${styles.lineAnimation} w-full h-[4px] rounded-lg`}></div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* <button
                onClick={handleNextStep}
                className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg'
            >
                Next Step
            </button> */}

            <div id="maincomponent" className='h-auto w-[1120px] bg-green-100 mt-4 mb-16'>
                {/* Render the component based on the active step */}
                {activeStep === 0 && <Cart handleNextStep={handleNextStep}/>}
                {activeStep === 1 && <Checkout />}
                {activeStep === 2 && <Confirmation />}
            </div>
        </div>
    );
};

export default MainCheckout;
