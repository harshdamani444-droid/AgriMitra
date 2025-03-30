import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CreditCard, Truck, MapPin } from "lucide-react";
import Payment from "../components/Payment";

const Checkout = () => {
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.cartItems);
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const total = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 100; // Fixed shipping cost
  const grandTotal = total + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center mb-8">
                <div
                  className={`flex items-center ${
                    step >= 1 ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  <div className="border-2 rounded-full p-2">
                    <Truck className="h-6 w-6" />
                  </div>
                  <span className="ml-2 font-medium">Shipping</span>
                </div>
                <div
                  className={`flex-1 h-px mx-4 ${
                    step >= 2 ? "bg-green-600" : "bg-gray-200"
                  }`}
                />
                <div
                  className={`flex items-center ${
                    step >= 2 ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  <div className="border-2 rounded-full p-2">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <span className="ml-2 font-medium">Payment</span>
                </div>
              </div>

              {step === 1 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">
                    Shipping Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        value={shippingInfo.fullName}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            fullName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        value={shippingInfo.phone}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        value={shippingInfo.address}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            address: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        value={shippingInfo.city}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            city: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        State
                      </label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        value={shippingInfo.state}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            state: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        PIN Code
                      </label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        value={shippingInfo.pincode}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            pincode: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700"
                  >
                    Continue to Payment
                  </button>
                </form>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <Payment shippingInfo={shippingInfo} />
                </div>
              )}
            </div>
          </div>

          <div className="md:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {products.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.images[0]}
                      alt={item.farmName}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.farmName}</h4>
                      <p className="text-gray-500">{item.description}</p>

                      <p className="text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-gray-900">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹{shipping}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
