import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import News from "./pages/News";
import Weather from "./pages/Weather";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Error from "./pages/Error";
import Profile from "./pages/Profile";
import ProductDetail from "./pages/ProductDetail";
import ForgotPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import CompleteProfile from "./pages/CompleteProfile";
import { useDispatch } from "react-redux";
import { getUser } from "./redux/slices/authSlice";
import { useEffect } from "react";
import { getCartProducts } from "./redux/slices/Cart/GetCart";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ChatBot from "./pages/ChatBot";
import FertilityPrediction from "./components/FertilityPrediction";
import CropPrediction from "./components/CropPrediction";
import FertilizerPrediction from "./components/FertilizerPrediction";
import Payment from "./components/Payment";
import FarmerDashboard from "./pages/FarmerDashboard";
import NewProduct from "./pages/NewProduct";
import Chat from "./pages/Chat";
import MLPrediction from "./pages/MLPrediction";
import CropYieldPrediction from "./components/CropYieldPrediction";
import ImagePrediction from "./components/MangoPrediction";
import MangoPrediction from "./components/MangoPrediction";
import CottonPrediction from "./components/CottonPrediction";
import RicePrediction from "./components/RicePrediction";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    dispatch(getCartProducts());
  }, [dispatch]);
  return (
    <Router>
      <ToastContainer
        position="top-right" // Change position if needed
        autoClose={1000} // Close after 3 seconds
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover:true
        draggable
      />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/product" element={<ProductDetail />} />
            <Route path="/news" element={<News />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:id" element={<ResetPassword />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<Error />} />
            <Route path="/chat" element={<ChatBot />} />
            <Route path="/fertility" element={<FertilityPrediction />} />
            <Route path="/crop" element={<CropPrediction />} />
            <Route path="/fertilizer" element={<FertilizerPrediction />} />
            <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
            <Route path="/farmer/products/new" element={<NewProduct />} />
            <Route path="/chats" element={<Chat />} />
            <Route path="/ml-models" element={<MLPrediction />} />
            <Route path="/crop-yield" element={<CropYieldPrediction />} />
            <Route path="/mango-prediction" element={<MangoPrediction />} />
            <Route path="/cotton-prediction" element={<CottonPrediction />} />
            <Route path="/rice-prediction" element={<RicePrediction />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
