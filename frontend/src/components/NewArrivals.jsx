import React from "react";

function NewArrivals() {
  return (
    <div className="w-full px-4 py-10 bg-gray-50">
      <h1 className="text-3xl font-medium text-slate-800 text-center mb-2 font-poppins">
        New Arrivals
      </h1>
      <p className="text-slate-600 mb-10 font-poppins text-center">
        Explore the latest additions to our collection.
      </p>{" "}
      <div className="max-w-5xl mx-auto">
        <div className=" gap-y-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center">
          <div className="flex flex-col bg-white border border-gray-500 shadow-md rounded-2xl p-2 w-72">
            <img
              className="w-72 h-48 object-cover rounded-2xl"
              src="https://images.unsplash.com/photo-1657560566744-06d0b69f6647?q=80&w=600&auto=format&fit=crop"
              alt="image"
            />
            <div className="p-4 text-sm">
              <p className="text-slate-600">$ 29.00</p>
              <p className="text-slate-800 text-base font-medium my-1.5">
                Chris Jordan
              </p>
              <p className="text-slate-500">
                Looks amazing out of the box. I barely had to customize
                anything.
              </p>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <button className="bg-slate-100 text-slate-600 py-2">
                  Add to cart
                </button>
                <button className="bg-slate-800 text-white py-2">
                  Buy now
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-white border border-gray-500 shadow-md rounded-2xl p-2  w-72">
            <img
              className="w-72 h-48 object-cover rounded-2xl"
              src="https://images.unsplash.com/photo-1657560566744-06d0b69f6647?q=80&w=600&auto=format&fit=crop"
              alt="image"
            />
            <div className="p-4 text-sm">
              <p className="text-slate-600">$ 29.00</p>
              <p className="text-slate-800 text-base font-medium my-1.5">
                Chris Jordan
              </p>
              <p className="text-slate-500">
                Looks amazing out of the box. I barely had to customize
                anything.
              </p>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <button className="bg-slate-100 text-slate-600 py-2">
                  Add to cart
                </button>
                <button className="bg-slate-800 text-white py-2">
                  Buy now
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-white border border-gray-500 shadow-md rounded-2xl p-2  w-72">
            <img
              className="w-72 h-48 object-cover rounded-2xl"
              src="https://images.unsplash.com/photo-1657560566744-06d0b69f6647?q=80&w=600&auto=format&fit=crop"
              alt="image"
            />
            <div className="p-4 text-sm">
              <p className="text-slate-600">$ 29.00</p>
              <p className="text-slate-800 text-base font-medium my-1.5">
                Chris Jordan
              </p>
              <p className="text-slate-500">
                Looks amazing out of the box. I barely had to customize
                anything.
              </p>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <button className="bg-slate-100 text-slate-600 py-2">
                  Add to cart
                </button>
                <button className="bg-slate-800 text-white py-2">
                  Buy now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewArrivals;
