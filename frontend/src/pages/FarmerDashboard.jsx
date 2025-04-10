import React, { useEffect, useState } from "react";
import { Package, ShoppingBag, Plus, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const FarmerDashboard = () => {
  useEffect(() => {
    fetchFarmerDetails();
    fetchOrders();
  }, []);

  const farmerId = useSelector((state) => state?.auth?.user?._id);
  useEffect(() => {
    if (farmerId) fetchProducts();
  }, [farmerId]);

  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [farmerDetails, setFarmerDetails] = useState(null);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  async function fetchOrders() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/order/farmer-orders`,
        {
          withCredentials: true,
        }
      );
      const data = response.data.data;
      // console.log(data);
      setOrders(data);
      setStatus(data.orderStatus);
      return data;
    } catch (error) {
      // console.error("Error fetching orders:", error);
      return null;
    }
  }

  async function fetchFarmerDetails() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/farmer-dashboard`,
        {
          withCredentials: true,
        }
      );
      const data = response.data.data;
      setFarmerDetails(data);
      return data;
    } catch (error) {
      // console.error("Error fetching farmer details:", error);
      return null;
    }
  }
  async function fetchProducts() {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/product/get-product-by-farmer/${farmerId}`
      );
      const data = response.data.data;
      // console.log(data);
      setProducts(data);

      return data;
    } catch (error) {
      // console.error("Error fetching products:", error);
      return [];
    }
  }
  const handleDeleteProduct = async (productId) => {
    try {
      // console.log(productId);
      const response = await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/product/delete-product-by-id/${productId}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        fetchProducts(); // Refresh the product list after deletion
      }
    } catch (error) {
      // console.error("Error deleting product:", error);
    }
  };
  const handleStatusChange = async (e, order) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/order/update-order`,
        {
          status: newStatus,
          orderId: order,
        },
        {
          withCredentials: true,
        }
      );
      // console.log("Status updated successfully:", response.data);
      toast.success("Status updated successfully!");
      fetchOrders(); // Refresh the order list after updating status
    } catch (error) {
      // console.error("Error updating status:", error);
      toast.error("Error updating status. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Farmer Dashboard
            </h1>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold">
                  {farmerDetails?.productsCount}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold">
                  {farmerDetails?.ordersCount}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Truck className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Pending Delivery</p>
                <p className="text-2xl font-bold">
                  {farmerDetails?.pendingDeliveryCount}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-2xl font-bold">
                  ₹ {farmerDetails?.totalEarnings}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("products")}
              className={`${
                activeTab === "products"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap pb-4 px-1 border-b-2 font-medium`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`${
                activeTab === "orders"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap pb-4 px-1 border-b-2 font-medium`}
            >
              Orders
            </button>
          </nav>
        </div>

        {/* Content Area */}
        {activeTab === "products" ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Your Products</h2>
              <Link
                to="/farmer/products/new"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Product
              </Link>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products?.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={product.images[0]}
                            alt={product.farmName}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.farmName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ₹{product.price}/{product.size}
                          {product.unitOfSize}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {product.quantity}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {product.category}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => {
                            handleDeleteProduct(product._id);
                          }}
                          className="ml-5 text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-6">Recent Orders</h2>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order._id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {order.consumer.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ₹{order.totalAmount}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-3 mt-2">
                          <select
                            id={`status-${order._id}`}
                            value={status}
                            onChange={(e) => handleStatusChange(e, order._id)}
                            className="px-2 py-1 rounded border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                          >
                            <option disabled>Change Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerDashboard;
