import { useState } from "react";
import { MdMarkEmailRead } from "react-icons/md";

const Subscribe = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="w-4/5 mx-auto my-20 text-center">
      <button className="text-4xl">
        <MdMarkEmailRead />
      </button>
      <h3 className="text-3xl font-semibold mt-4">Subscribe To Our Newsletter</h3>
      <p className="mt-2">
        and receive $20 coupon for your first order when you checkout
      </p>
      <div className="flex items-center w-3/4 mx-auto mt-6 p-2 bg-gray-200">
        <input
          className="flex-grow p-2 bg-transparent border-none focus:outline-none"
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <div className="h-6 w-px bg-gray-400 mx-2"></div>
        <button className="p-2 hover:cursor-pointer">Subscribe</button>
      </div>
    </div>
  );
};

export default Subscribe;
