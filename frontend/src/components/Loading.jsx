import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center absolute top-0 left-0 h-[100%] w-[100%] bg-black/80">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default Loading;
