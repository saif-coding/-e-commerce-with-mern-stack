import { useContext, useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { ProductContext } from "../context/ProductContext";
import Loading from "../components/Loading";
function Reviews({ id, popup }) {
  const { getReviews } = useContext(ProductContext);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (rating === 0 || comment.trim() === "") {
        setError("Please provide a rating and comment.");
        return;
      }

      const resut = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/reviews/add/${id}`,
        { rating, comment },
        { withCredentials: true }
      );
      if (resut.status === 201) {
        await getReviews();
        toast.success(resut.data.message);
        popup(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getReviews();
  }, [id]);

  if (loading) return <Loading />;
  return (
    <div className=" w-full h-[800px] bg-black/90 absolute flex ">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 border rounded shadow-md h-80 bg-white mt-28"
      >
        <h1 className="text-red-600 font-semibold mb-2">{error}</h1>
        <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>

        {/* Star Rating */}
        <div className="flex mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(null)}
            >
              <FaStar
                size={28}
                className="mr-1 transition-colors"
                color={star <= (hover || rating) ? "#facc15" : "#e5e7eb"}
              />
            </button>
          ))}
        </div>

        {/* Comment Box */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full p-2 border rounded focus:outline-none focus:ring"
          placeholder="Write your review here..."
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 bg-blue-600 cursor-pointer hover:bg-blue-800 text-white py-2 px-4 rounded"
        >
          Submit Review
        </button>
        <button
          onClick={() => popup(false)}
          type="submit"
          className="mt-4 ml-12 bg-gray-300 cursor-pointer hover:text-white hover:bg-gray-500 capitalize font-semibold  py-2 px-4 rounded"
        >
          cancel
        </button>
      </form>
    </div>
  );
}

export default Reviews;
