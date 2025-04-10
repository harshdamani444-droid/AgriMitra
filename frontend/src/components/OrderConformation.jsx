import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Mail } from "lucide-react";

const OrderConfirmation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 6000); // 6 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          {/* Animated Check Mark */}
          <div className="mb-8">
            <div className="relative mx-auto w-24 h-24">
              <div className="absolute inset-0 border-4 border-green-200 rounded-full animate-[ping_1s_ease-in-out]"></div>
              <div className="relative flex items-center justify-center w-24 h-24 bg-green-100 rounded-full">
                <Check className="h-12 w-12 text-green-600 animate-[bounce_0.5s_ease-in-out]" />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4 animate-[fadeIn_1s_ease-in-out]">
            Order Placed Successfully!
          </h1>

          {/* Order Details */}
          <div className="space-y-4 mb-8 animate-[fadeIn_1.5s_ease-in-out]">
            <p className="text-gray-600">
              Thank you for your purchase. We're preparing your order with care.
            </p>
            <div className="flex items-center justify-center text-gray-500 space-x-2">
              <Mail className="h-5 w-5" />
              <p>Order Invoice has been sent to your email</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-1 mb-6 overflow-hidden">
            <div
              className="bg-green-600 h-full rounded-full animate-[progressBar_6s_linear]"
              style={{ width: "100%" }}
            ></div>
          </div>

          {/* Redirect Message */}
          <p className="text-sm text-gray-500 animate-[fadeIn_2s_ease-in-out]">
            Redirecting to homepage in a few seconds...
          </p>
        </div>
      </div>

      {/* Add custom keyframes for animations */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes progressBar {
            from {
              width: 0%;
            }
            to {
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default OrderConfirmation;
