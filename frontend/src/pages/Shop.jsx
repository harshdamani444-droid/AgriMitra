import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/slices/Product/GetAllProductsSlice";
import { useNavigate } from "react-router-dom";
import { addToCart, getCartProducts } from "../redux/slices/Cart/GetCart";
import { toast } from "react-toastify";
import { Pagination, Stack } from "@mui/material";
import { CROP_CATEGORY } from "../assets/constants"; // Assuming you have a constants file for categories
import { Autocomplete, TextField } from "@mui/material";
import useDebounce from "../hooks/useDebounce";

const Shop = () => {
  const categories = CROP_CATEGORY;
  // const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  // console.log(debouncedSearch);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, totalPages, loading } = useSelector(
    (state) => state.products
  );
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    sort: "",
    page: 1,
  });
  const demoProducts = [{}, {}, {}, {}, {}, {}, {}, {}];

  useEffect(() => {
    // setFilters((prev) => ({
    //   ...prev,
    //   search: debouncedSearch,
    //   page: 1,
    // }));
    dispatch(getProducts({ ...filters, search: debouncedSearch }));
  }, [dispatch, filters, debouncedSearch]);

  const handlePageChange = (event, value) => {
    setFilters({ ...filters, page: value });
  };
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

        <div className="flex flex-wrap mb-6 gap-4">
          <input
            type="text"
            placeholder="Search by name"
            className="p-2 border rounded-md h-10 flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            type="number"
            placeholder="Min Price"
            className="p-2 border rounded-md h-10"
            value={filters.minPrice}
            onChange={(e) =>
              setFilters({ ...filters, minPrice: e.target.value, page: 1 })
            }
          />
          <input
            type="number"
            placeholder="Max Price"
            className="p-2 border rounded-md h-10"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: e.target.value, page: 1 })
            }
          />

          <select
            className="p-2 border rounded-md h-10"
            value={filters.sort}
            onChange={(e) =>
              setFilters({ ...filters, sort: e.target.value, page: 1 })
            }
          >
            <option value="">Sort by Price</option>
            <option value="price">Low to High</option>
            <option value="-price">High to Low</option>
          </select>
        </div>
        <div className="w-full md:w-1/3 lg:w-1/4 h-10 mb-20">
          <label className="">Category</label>
          <Autocomplete
            options={categories}
            value={filters.category}
            onChange={(event, newValue) =>
              setFilters({ ...filters, category: newValue })
            }
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
          />
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {demoProducts.map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
              >
                {/* Image Skeleton */}
                <div className="w-full h-48 bg-gray-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer"></div>
                </div>

                {/* Content Skeleton */}
                <div className="p-4">
                  <div className="h-6 bg-gray-300 w-3/4 mb-2 rounded"></div>
                  <div className="h-4 bg-gray-300 w-1/2 mb-2 rounded"></div>
                  <div className="h-4 bg-gray-300 w-1/4 mb-4 rounded"></div>

                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-300 w-1/3 rounded"></div>
                    <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
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
                  <p className="text-gray-600">{product.description}</p>
                  <p className="text-gray-600">{product?.category}</p>

                  <div className="flex justify-between items-center">
                    <span className="font-bold text-green-600">
                      ₹{product.price}/packet
                      <span className="flex flex-col font-bold text-green-600">
                        Packet Size: {product.size} {product.unitOfSize}
                      </span>
                    </span>

                    <button
                      onClick={() => handleAddToCart(product._id)}
                      className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
                    >
                      <ShoppingCart className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Stack spacing={2} sx={{ marginTop: 3, alignItems: "center" }}>
        <Pagination
          count={totalPages} // Total pages from backend
          page={filters.page}
          onChange={handlePageChange}
          variant="outlined"
          // shape="rounded"
          size="large"
        />
      </Stack>
    </div>
  );
};

export default Shop;
