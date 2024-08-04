import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./scenes/home/Home";
import Navbar from "./scenes/global/Navbar";
import Footer from "./scenes/global/Footer";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import CartMenu from "./scenes/global/CartMenu";
import Checkout from "./scenes/checkout/Checkout";
import Confirmation from "./scenes/checkout/Confirmation";
import SearchPage from "./scenes/home/SearchPage";
import Shop from "./scenes/home/ShopAll";
import Account from './scenes/userRoutes/Account'
import SignIn from "./scenes/auth/SignIn"; // Import SignIn
import SignUp from "./scenes/auth/SignUp"; // Import SignUp

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
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout/success" element={<Confirmation />} />
          <Route path="searchpage" element={<SearchPage />} />
          <Route path="shop" element={<Shop />} /> {/* ShopAll route */}
          <Route path="signin" element={<SignIn />} /> {/* SignIn route */}
          <Route path="signup" element={<SignUp />} /> {/* SignUp route */}
          <Route path="/account" element={<Account />} />
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
