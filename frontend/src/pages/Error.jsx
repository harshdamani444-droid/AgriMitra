import { Link } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";

const Error = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <AlertTriangle className="h-16 w-16 text-red-600 mx-auto" />
        <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
          Oops! Something went wrong
        </h1>
        <p className="mt-2 text-base text-gray-600">
          We are having trouble processing your request. Please try again later.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
          >
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
