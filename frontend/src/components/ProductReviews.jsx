import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "@mui/material";

const ProductReviews = ({ review }) => {
  return (
    <div className="mt-6 p-4 border rounded-lg bg-gray-50">
      <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
      {review.length > 0 ? (
        review?.map((review, index) => (
          <div key={index} className="border-b py-3">
            <div className="flex items-center space-x-2">
              <Rating value={review.rating} readOnly />
              <span className="text-gray-700 font-medium">{review.review}</span>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No reviews yet.</p>
      )}
    </div>
  );
};

export default ProductReviews;
