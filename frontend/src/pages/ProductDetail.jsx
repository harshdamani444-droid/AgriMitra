import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CircleMinus,
  CirclePlus,
  Plus,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import { getProductDetails } from "../redux/slices/Product/ProductDetailSlice";
import Carousel from "react-material-ui-carousel";
import { addToCart, getCartProducts } from "../redux/slices/Cart/GetCart";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const location = useLocation();
  const id = location.state?.id;
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.productDetails);
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => {
    if (product.quantity <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const handleAddToCart = async () => {
    const resultAction = await dispatch(
      addToCart({
        productId: product._id,
        quantity,
      })
    );
    if (addToCart.fulfilled.match(resultAction)) {
      toast.success("Product added to cart");
    } else {
      toast.error("Failed to add product to cart");
    }
    dispatch(getCartProducts());
  };
  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Carousel>
          {product?.images?.map((item, i) => (
            <img
              className="CarouselImage"
              key={i}
              src={item}
              alt={`${i} Slide`}
            />
          ))}
        </Carousel>
        <div>
          <h1 className="text-4xl font-bold mb-4">{product?.farmName}</h1>
          <p className="text-xl text-gray-700 mb-6">{product?.description}</p>
          <span className="text-3xl font-bold text-green-600 mb-4 block">
            ₹{product?.price}/{product?.unitOfSize}
          </span>
          <div className="flex space-x-4 mt-6 mb-4">
            <div className="flex items-center space-x-3 border border-gray-300 rounded-lg p-2 w-fit">
              <button
                onClick={decreaseQuantity}
                className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition"
              >
                <CircleMinus className="h-5 w-5 text-gray-600" />
              </button>

              <input
                readOnly
                type="number"
                value={quantity}
                className="w-12 text-center border-none outline-none bg-transparent text-lg font-semibold"
              />

              <button
                onClick={increaseQuantity}
                className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition"
              >
                <CirclePlus className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <button
              onClick={() => handleAddToCart()}
              className="bg-green-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-green-700"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>
          </div>
          <p className="text-lg text-gray-600 mb-2">
            Quantity: {product?.quantity}
          </p>
          <p className="text-lg text-gray-600 mb-2">
            Category: {product?.category}
          </p>
          <p className="text-lg text-gray-600 mb-2">
            Size: {product?.size} {product?.unitOfSize}
          </p>
          <p className="text-lg text-gray-600 mb-2">
            Rating: {product?.rating} ⭐
          </p>
          <p className="text-lg text-gray-600 mb-2">
            Farm Name: {product?.farmName}
          </p>
          <p className="text-lg text-gray-600 mb-2">
            Farmer ID: {product?.farmer}
          </p>
          <div className="bg-gray-100 p-4 rounded-lg mt-4">
            <h2 className="text-xl font-semibold mb-2">Address</h2>
            <p>
              {product?.address?.houseNo}, {product?.address?.street}
            </p>
            <p>
              {product?.address?.city}, {product?.address?.state} -{" "}
              {product?.address?.pinCode}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
