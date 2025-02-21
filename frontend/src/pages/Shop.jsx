import React, { useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/slices/Product/GetAllProductsSlice";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, getCartProducts } from "../redux/slices/Cart/GetCart";
import { toast } from "react-toastify";

// const products = [
//   {
//     id: 1,
//     name: "Organic Seeds Pack",
//     price: 299,
//     description: "High-quality organic seeds for better yield",
//     image:
//       "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&q=80",
//   },
//   {
//     id: 2,
//     name: "Garden Tools Set",
//     price: 1499,
//     description: "Complete set of essential gardening tools",
//     image:
//       "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80",
//   },
//   {
//     id: 3,
//     name: "Organic Fertilizer",
//     price: 599,
//     description: "Natural fertilizer for healthy crops",
//     image:
//       "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80",
//   },
//   // Add more products as needed
// ];
const Shop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleAddToCart = async (id) => {
    const resultAction = await dispatch(
      addToCart({
        productId: id,
        quantity: 1,
      })
    );
    if (addToCart.fulfilled.match(resultAction)) {
      toast.success("Product added to cart");
    } else {
      toast.error("Failed to add product to cart");
    }
    dispatch(getCartProducts());
  };
  const handleProductClick = (id) => {
    // Redirect to product detail page
    navigate("/shop/product", { state: { id } });
  };
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Farm Shop</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              onClick={() => handleProductClick(product._id)}
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{product.farmName}</h3>
                <p className="text-gray-600 ">{product.description}</p>
                <p className="text-gray-600">{product?.category}</p>

                <div className="flex justify-between items-center">
                  <span className="font-bold text-green-600">
                    ₹{product.price}/{product.unitOfSize}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
