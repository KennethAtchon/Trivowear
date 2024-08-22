import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { FaYoutube, FaFacebookF, FaTwitter, FaTiktok, FaRegCopyright } from "react-icons/fa";


function Footer() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/shop/${category}`);
  };
  return (
    <>
    <div className="h-auto w-full bg-black overflow-auto text-white">

      <div className="h-auto mx-10 lg:mx-40 my-20 ">

        <div className=" w-full flex flex-wrap gap-4 md:gap-0 md:flex-row justify-between mb-10 text-white ">

          <div className="h-auto w-auto  text-base">
            <div className="text-lg"><b>Product</b></div>
              <div className="mt-2 flex flex-col gap-y-1  ">
                <div onClick={() => handleCategoryClick('appliances')} className="cursor-pointer hover:text-red-500">Appliances</div>
                <div onClick={() => handleCategoryClick('fitness')} className="cursor-pointer hover:text-red-500">Fitness</div>
                <div onClick={() => handleCategoryClick('kitchen')} className="cursor-pointer hover:text-red-500">Kitchen</div>
                <div onClick={() => handleCategoryClick('care')} className="cursor-pointer hover:text-red-500">Home Care</div>
              </div>
          </div>

          <div className="h-auto w-auto  text-base">
            <div className="text-lg"><b>Information</b></div>
            <div className="mt-2 flex flex-col gap-y-1 ">
              <p onClick={() => navigate('/policies/shipping')} className="cursor-pointer hover:text-red-500" >Shipping Policy</p>
              <p onClick={() => navigate('/policies/refund')} className="cursor-pointer hover:text-red-500">Refund Policy</p>
              <p onClick={() => navigate('/policies/faq')} className="cursor-pointer hover:text-red-500">FAQ</p>
            </div>
          </div>

          <div className="h-auto w-auto text-base">
            <div className="text-lg"><b>Company</b></div>
            <div className="mt-2 flex flex-col gap-y-1 ">
              <p onClick={() => navigate('/about')} className="cursor-pointer hover:text-red-500">About us</p>
              <p onClick={() => navigate('/contact')} className="cursor-pointer hover:text-red-500">Contact us</p>
            </div>
          </div>

          <div id="subscribe" className="relative h-[260px] w-[340px] ">
            <div className="w-full h-full bg-[#C33A3A] px-11 pt-6 rounded-2xl">

              <div className="mb-6">
                <b>Subscribe</b>
              </div>
              <div id="emailform" className="h-12 bg-[#0081FE] mb-5 rounded-lg flex flex-row">
                <div className="bg-white h-full flex-grow rounded-l-lg flex items-center">
                  <input 
                    type="email" 
                    placeholder="Email Address..." 
                    className="ml-2 w-full h-full bg-transparent outline-none text-[#0A142F] pl-2"
                  />
                </div>
                <button className="h-full w-16 bg-black flex items-center justify-center rounded-r-lg">
                  <FaArrowRight className="text-white text-xl"/>
                </button>
              </div>
              <div className="text-[12px]">
              Stay updated with our latest news, special offers, and exclusive content. Subscribe to our newsletter and never miss out on what’s happening!
              </div>


            </div>
            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center rounded-2xl">
            <span className="text-white text-2xl font-bold">Coming Soon</span>
          </div>

          </div>

        </div>

        <div className="h-auto  w-full border-white border-t flex flex-row justify-between flex-wrap">

          <div className=" h-auto mt-[25px] w-auto ">
          <footer className="h-[50px] flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <p className="reem-kufi-ink">Copyright</p>
              <FaRegCopyright />
              <p className="reem-kufi-ink">{new Date().getFullYear()}</p>
              <p className="font-bold reem-kufi-ink">Trivowear</p>
              <p className="reem-kufi-ink">All rights reserved.</p>
            </div>
          </footer>

          </div>
          <div className="h-auto w-auto mt-[40px] flex flex-row text-white gap-x-10 text-lg">
            <p onClick={() => navigate('/policies/terms')} className="cursor-pointer hover:text-red-500"><b>Terms</b></p>
            <p onClick={() => navigate('/policies/privacy')} className="cursor-pointer hover:text-red-500"><b>Privacy</b></p>
            {/* <p><b>Cookies</b></p> */}
          </div>
          <div className=" h-auto w-auto mt-[40px] flex flex-row gap-x-3.5">
            <div className="h-9 w-9 border border-white rounded-full p-2 cursor-pointer hover:text-red-500">
              <FaYoutube />
            </div>
            <div className="h-9 w-9 border border-white rounded-full pl-2 pt-2 cursor-pointer hover:text-blue-500">
              < FaFacebookF />
            </div>
            <div className="h-9 w-9 border border-white rounded-full pl-2.5 pt-2.5 cursor-pointer hover:text-[#1DA1F2]">
              <FaTwitter/>
            </div>
            <div className="h-9 w-9 border border-white rounded-full pl-2.5 pt-2 cursor-pointer hover:text-red-500">
              <FaTiktok/>
            </div>
          </div>

        </div>

      </div>


    </div>

    
    </>
  );
}

export default Footer;


