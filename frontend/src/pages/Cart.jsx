import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";
import {
  getCartProducts,
  removeFromCart,
  updateQuantity,
} from "../redux/slices/Cart/GetCart";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
const Cart = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.cartItems);
  const subtotal = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const handleDecrement = async (productId, quantity) => {
    const res = await dispatch(
      updateQuantity({
        productId: productId,
        quantity: Math.max(1, quantity - 1),
      })
    );
    dispatch(getCartProducts());
  };
  const handleIncrement = async (productId, quantity) => {
    const res = await dispatch(
      updateQuantity({
        productId: productId,
        quantity: quantity + 1,
      })
    );
    if (!updateQuantity.fulfilled.match(res)) {
      toast.error("Out of stock");
    }
    dispatch(getCartProducts());
  };
  useEffect(() => {
    dispatch(getCartProducts());
  }, [dispatch, products.length]);
  const shipping = 100;
  const total = subtotal + shipping;
  const removeItem = async (id) => {
    const resultAction = await dispatch(removeFromCart(id));
    if (removeFromCart.fulfilled.match(resultAction)) {
      toast.success("Product removed from cart");
    } else {
      toast.error("Failed to remove product from cart");
    }

    dispatch(getCartProducts());
  };
  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Add some products to your cart and they will show up here
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {products.map((item) => (
                  <li key={item._id} className="p-6">
                    <div className="flex items-center">
                      <img
                        src={item.images[0]}
                        alt={item.farmName}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="ml-6 flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-lg font-medium text-gray-900">
                            {item.farmName}
                          </h3>
                          <p className="text-lg font-medium text-gray-900">
                            ₹{item.price * item.quantity}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.description}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Price: ₹{item.price}/packet
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Packet Size: {item.size} {item.unitOfSize}
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center border rounded-md">
                            <button
                              onClick={() =>
                                handleDecrement(item.product, item.quantity)
                              }
                              className="p-2 hover:bg-gray-100"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-2">{item.quantity}</span>
                            <button
                              onClick={() =>
                                handleIncrement(item.product, item.quantity)
                              }
                              className="p-2 hover:bg-gray-100"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => dispatch(removeItem(item.product))}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">₹{shipping}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-medium text-gray-900">
                      Total
                    </span>
                    <span className="text-lg font-medium text-gray-900">
                      ₹{total}
                    </span>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 flex items-center justify-center"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  to="/shop"
                  className="w-full text-green-600 py-3 px-4 rounded-md border border-green-600 hover:bg-green-50 flex items-center justify-center mt-4"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
