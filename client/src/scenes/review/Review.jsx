import React from 'react';

const Review = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-12">
      <h1 className="text-4xl font-bold">Reviews</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Review 1</h2>
          <p className="mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
            voluptatem.
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Review 2</h2>
          <p className="mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
            voluptatem.
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Review 3</h2>
          <p className="mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
            voluptatem.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Review;
