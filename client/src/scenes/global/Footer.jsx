import React from "react";
import broovielogo from "../../assets/broovielogonew.png";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

function Footer() {
  const navigate = useNavigate();
  return (
    <>
    <div className="h-[550px] w-full bg-[#D9D9D9]">

      <div className="h-[380px] mx-40 my-20">

        <div className="h-[300px] w-full flex flex-row justify-between">

          <div className="h-auto w-auto  text-base">
            <div className="text-lg"><b>Product</b></div>
            <div className="mt-2 flex flex-col gap-y-1 text-[#0A142F] ">
              <p>Employee database</p>
              <p>Payroll</p>
              <p>Absences</p>
              <p>Time tracking</p>
              <p>Shift planner</p>
              <p>Recruiting</p>
            </div>
          </div>

          <div className="h-auto w-auto  text-base">
            <div className="text-lg"><b>Information</b></div>
            <div className="mt-2 flex flex-col gap-y-1 text-[#0A142F] ">
              <p>FAQ</p>
              <p>Blog</p>
              <p>Support</p>
            </div>
          </div>

          <div className="h-auto w-auto text-base">
            <div className="text-lg"><b>Company</b></div>
            <div className="mt-2 flex flex-col gap-y-1 text-[#0A142F] ">
              <p>About us</p>
              <p>Careers</p>
              <p>Absences</p>
              <p>Contact us</p>
              <p>Lift Media</p>
            </div>
          </div>

          <div id="subscribe" className="h-[260px] w-[340px]">
            <div className="w-full h-full bg-[#D0D1D5] px-11 pt-6">

              <div className="mb-6">
                <b>Subscribe</b>
              </div>
              <div id="emailform" className="h-12 bg-[#0081FE] mb-5 rounded-lg flex flex-row">
                <div className="bg-white h-full w-full">
                  <div className="mt-3 ml-2 text-[#0A142F]" >
                    Email Address...
                  </div>

                </div>
                <div className=" h-full w-16">
                <FaArrowRight className="text-white text-xl mt-4 ml-4"/>
                </div>

              </div>
              <div className="text-[12px]">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae, expedita. Consequuntur neque maxime iusto nemo. Ex est quidem a. Cumque adipisci vitae minus illum vel necessitatibus placeat modi odit quia.
              </div>


            </div>
          </div>

        </div>

        <div className="h-[80px]  w-full border-[#0A142F] border-t flex flex-row justify-between">

          <div className=" h-auto mt-[25px] w-auto ">
            <div id="image" className=" h-[50px] w-[120px]">
              <img
                src={broovielogo} // Replace with the actual path to your logo image
                alt="Broovie Logo"
                onClick={() => navigate("/")}
                className=" cursor-pointer"
              />
          </div>

          </div>
          <div className="h-auto w-auto mt-[40px] flex flex-row text-[#0A142F] gap-x-10 text-lg">
            <p><b>Terms</b></p>
            <p><b>Privacy</b></p>
            <p><b>Cookies</b></p>
          </div>
          <div className=" h-auto w-auto mt-[40px] flex flex-row gap-x-3.5">
            <div className="h-9 w-9 border border-[#000000] rounded-full pl-2.5 pt-2.5">
              <FaLinkedinIn/>
            </div>
            <div className="h-9 w-9 border border-[#000000] rounded-full pl-2 pt-2">
              < FaFacebookF />
            </div>
            <div className="h-9 w-9 border border-[#000000] rounded-full pl-2.5 pt-2.5">
              <FaTwitter/>
            </div>
          </div>

        </div>

      </div>


    </div>

    
    </>
  );
}

export default Footer;


