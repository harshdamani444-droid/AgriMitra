import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Rating,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

const AddRatingModal = ({ open, handleClose, productId, setReviewUpdate }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("Nice Product");

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a rating before submitting.");
      return;
    }
    const reviewData = {
      productId,
      rating,
      review,
    };
    try {
      const resopnse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/ratings/create-rating`,
        reviewData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (resopnse.status === 201) {
        toast.success("Review submitted successfully!");
        setReviewUpdate((prev) => !prev);
        handleClose();

        setRating(0);
      }
    } catch (error) {
      toast.error("Failed to submit review. Please try again.");
      return;
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Rate This Product</DialogTitle>
      <DialogContent>
        <div className="flex flex-col space-y-4">
          <Rating
            name="product-rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
          />
          <TextField
            fullWidth
            label="Write a review"
            multiline
            rows={3}
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRatingModal;
