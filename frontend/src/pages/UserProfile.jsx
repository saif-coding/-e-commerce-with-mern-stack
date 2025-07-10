import React, { useContext } from "react";
import { UserContext } from "./../context/UserContext";
import { Link } from "react-router-dom";

function UserProfile() {
  const { singleUser } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 flex justify-center items-cente">
      <div className="w-full h-72 max-w-2xl bg-white shadow-lg rounded-2xl p-6 md:p-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar */}
          <img
            src={singleUser.avatar}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-md"
          />

          {/* Info */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">
              {singleUser.name}
            </h2>
            <p className="text-gray-600 mt-1">{singleUser.email}</p>
            <p className="text-sm text-gray-500 mt-1">
              Role: {singleUser.role || "User"}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Joined: {new Date(singleUser.createdAt).toLocaleDateString()}
            </p>
            <Link to={`/update/${singleUser._id}`}>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
                Edit Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
