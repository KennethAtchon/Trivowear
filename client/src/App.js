import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./scenes/home/Home";
import Navbar from "./scenes/global/Navbar";
import Footer from "./scenes/global/Footer";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import CartMenu from "./scenes/global/CartMenu";
import MainCheckout from "./scenes/checkout/MainCheckout";
import SearchPage from "./scenes/home/SearchPage";
import Shop from "./scenes/home/ShopAll";
import Account from './scenes/userRoutes/Account'
import SignIn from "./scenes/auth/SignIn"; // Import SignIn
import SignUp from "./scenes/auth/SignUp"; // Import SignUp
import About from './scenes/extra/About';
import Contact from './scenes/extra/Contact';
import FAQ from './scenes/extra/Faq';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="item/:itemId" element={<ItemDetails />} />
          <Route path="checkout" element={<MainCheckout />} />
          <Route path="checkout/success/:orderId" element={<MainCheckout />} />
          <Route path="searchpage" element={<SearchPage />} />
          <Route path="shop" element={<Shop />} /> 
          <Route path="shop/:category" element={<Shop />} /> 
          <Route path="signin" element={<SignIn />} /> 
          <Route path="signup" element={<SignUp />} /> 
          <Route path="/account" element={<Account />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
