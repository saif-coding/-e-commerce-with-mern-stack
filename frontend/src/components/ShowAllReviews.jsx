import React, { useContext, useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { ProductContext } from "../context/ProductContext";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function ShowAllReviews({ slug, id }) {
  const navigate = useNavigate();
  const { reviewsData, oneRevie, getReviews } = useContext(ProductContext);
  const starCounts = [1, 2, 3, 4, 5].map((star) => ({
    stars: star,
    count: reviewsData.filter((r) => r.rating === star).length,
  }));

  const handleClick = () => {
    navigate(`/reviewlist`, {
      state: { id: id },
    });
  };

  useEffect(() => {
    getReviews();
  }, [id]);
  const totalRating = reviewsData.reduce(
    (acc, review) => acc + review.rating,
    0
  );
  const averageRating =
    reviewsData.length > 0 ? (totalRating / reviewsData.length).toFixed(1) : 0;

  return (
    <>
      <div className="flex mb-10 ">
        {reviewsData.length > 0 ? (
          <div className="w-full max-w-xl mx-auto bg-white rounded-lg border border-gray-400 p-6 shadow-sm">
            {oneRevie.map((item, i) => (
              <div key={i}>
                {/* Header */}
                <div className="flex items-center gap-4">
                  {/* User Avatar */}
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-xl font-semibold text-red-600">
                    {item.userId.name.slice(0, 1) || "M"}
                  </div>

                  {/* User Info */}
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {item.userId.name || "Mike Zee"}
                    </h3>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      United States
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <div className="mt-4">
                  {/* Rating & Time */}
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="flex text-yellow-500">
                      {[1, 2, 3, 4, 5].map((_, i) => (
                        <FaStar
                          className={`${
                            i < reviewsData[0].rating
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                          key={i}
                        />
                      ))}
                    </div>
                    <span className="font-medium text-gray-700 ml-1">
                      {reviewsData[0].rating}
                    </span>
                    <span>· {moment(item.createdAt).fromNow()}</span>
                  </div>

                  {/* Review Text */}
                  <p className="mt-3 text-gray-700 leading-relaxed">
                    {item.comment}
                  </p>
                </div>
                <button
                  onClick={() => handleClick()}
                  className="px-4 py-2 rounded-lg capitalize font-semibold mt-3 cursor-pointer hover:bg-gray-200 border"
                >
                  show more reviews
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full max-w-xl mx-auto bg-white rounded-lg border border-gray-400 p-6 shadow-sm">
            <div className="max-w-md mx-auto rounded-lg p-5">
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 10c0 3.866-3.582 7-8 7s-8-3.134-8-7 3.582-7 8-7 8 3.134 8 7z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 14v.01M12 10v.01"
                  />
                </svg>
                <h3 className="text-gray-600 font-medium text-sm">
                  No reviews have been submitted yet.
                </h3>
                <p className="text-xs text-gray-400">
                  Once someone leaves a review, it will appear here.
                </p>
              </div>
            </div>
          </div>
        )}
        <div className=" w-96 mx-auto bg-white p-6 rounded-lg border border-gray-400 shadow-sm">
          <div className=" flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                Reviews
                <p className="text-sm text-gray-600 mb-4">
                  {reviewsData.length} reviews for this Product
                </p>
              </h2>
            </div>
            <h1 className=" font-bold text-2xl">{averageRating}</h1>
          </div>
          <div className="space-y-2">
            {starCounts
              .slice()
              .reverse()
              .map((item) => {
                const percentage = (item.stars / 5) * 100;
                return (
                  <div
                    key={item.stars}
                    className="flex items-center gap-2 text-sm"
                  >
                    <div
                      className={`w-12 ${
                        item.count > 0
                          ? "text-black font-semibold"
                          : "text-gray-300"
                      }`}
                    >
                      {item.stars} Star{item.stars > 1 ? "s" : ""}
                    </div>

                    <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className={`h-full ${
                          item.count > 0 ? "bg-yellow-500" : "bg-gray-200"
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <div
                      className={`w-8 text-right ${
                        item.count > 0 ? "text-gray-800" : "text-gray-400"
                      }`}
                    >
                      ({item.count})
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowAllReviews;
