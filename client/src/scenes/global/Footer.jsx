import React from "react";

function Footer() {
  return (
    <div className="mt-20 px-6 py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
        <div className="col-span-1 sm:col-span-2 md:col-span-1">
          <h4 className="text-xl font-bold mb-6 text-primary-500">BROOVIE</h4>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat
          </p>
        </div>

        <div className="col-span-1">
          <h4 className="text-xl font-bold mb-6">About Us</h4>
          <p className="text-gray-700 mb-4">Careers</p>
          <p className="text-gray-700 mb-4">Our Stores</p>
          <p className="text-gray-700 mb-4">Terms & Conditions</p>
          <p className="text-gray-700 mb-4">Privacy Policy</p>
        </div>

        <div className="col-span-1">
          <h4 className="text-xl font-bold mb-6">Customer Care</h4>
          <p className="text-gray-700 mb-4">Help Center</p>
          <p className="text-gray-700 mb-4">Track Your Order</p>
          <p className="text-gray-700 mb-4">Corporate & Bulk Purchasing</p>
          <p className="text-gray-700 mb-4">Returns & Refunds</p>
        </div>

        <div className="col-span-1 md:col-span-1">
          <h4 className="text-xl font-bold mb-6">Contact Us</h4>
          <p className="text-gray-700 mb-4">
            50 north Whatever Blvd, Washington, DC 10501
          </p>
          <p className="text-gray-700 mb-4">Email: mredwardroh@gmail.com</p>
          <p className="text-gray-700">(222)333-4444</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
