import { useContext, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { ProductContext } from "../context/ProductContext";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";

const ReviewsLists = () => {
  const { reviewsData, getReviews } = useContext(ProductContext);

  const location = useLocation();
  const id = location.state?.id;

  useEffect(() => {
    getReviews(id);
  }, [id]);

  return (
    <div className=" w-full h-screen bg-black/80 pt-20">
      <div className="max-w-2xl bg-white  mx-auto p-4 space-y-4">
        <div className=" flex items-center gap-56">
          <Link to={`/all-products`}>
            {" "}
            <button
              type="button"
              class="flex items-center gap-2.5 border font-semibold border-gray-500/30 px-4 py-2 text-sm text-gray-800 rounded bg-white hover:text-pink-500/70 hover:bg-pink-500/10 hover:border-pink-500/30 active:scale-95 transition"
            >
              <svg
                width="16"
                height="13"
                viewBox="0 0 16 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 6.5H1M6.5 12 1 6.5 6.5 1"
                  stroke="#FDA4AF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Back
            </button>
          </Link>
          <h2 className="text-xl font-semibold text-gray-800">
            Customer Reviews ({reviewsData.length})
          </h2>
        </div>

        {reviewsData.length > 0 ? (
          reviewsData.map((review) => (
            <div
              key={review._id}
              className="border border-gray-200 rounded-md p-4 bg-white shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-800">
                  {review.userId?.name || "Anonymous"}
                </h4>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-sm">{review.comment}</p>
              <p className="text-xs text-gray-400 mt-1">
                {moment(review.createdAt).fromNow()}
              </p>
            </div>
          ))
        ) : (
          <div className="border border-gray-200 rounded-md p-6 text-center bg-white shadow-sm">
            <p className="text-gray-600 text-sm mb-1">No reviews yet.</p>
            <p className="text-xs text-gray-400">
              Once someone leaves a review, it will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsLists;
