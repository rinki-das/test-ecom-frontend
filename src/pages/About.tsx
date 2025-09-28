import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
      {/* Container */}
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-8 md:p-12">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
          About <span className="text-blue-600">EliteStore</span>
        </h1>

        {/* Content */}
        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6 text-center">
          Welcome to <span className="font-semibold">EliteStore</span>, your
          one-stop destination for premium electronics, fashion, and home &
          living products. Our mission is to bring you high-quality items at the
          best prices while ensuring a smooth and enjoyable shopping experience.
        </p>

        {/* Grid section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="flex flex-col items-center text-center p-4 bg-gray-100 rounded-xl hover:shadow-md transition">
            <img
              src="https://img.icons8.com/fluency/96/online-store.png"
              alt="Wide Selection"
              className="w-16 h-16 mb-3"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              Wide Selection
            </h3>
            <p className="text-gray-500 text-sm mt-2">
              Browse from a diverse range of products curated just for you.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4 bg-gray-100 rounded-xl hover:shadow-md transition">
            <img
              src="https://img.icons8.com/fluency/96/delivery.png"
              alt="Fast Delivery"
              className="w-16 h-16 mb-3"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              Fast Delivery
            </h3>
            <p className="text-gray-500 text-sm mt-2">
              Enjoy quick, safe, and hassle-free delivery at your doorstep.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4 bg-gray-100 rounded-xl hover:shadow-md transition">
            <img
              src="https://img.icons8.com/fluency/96/customer-support.png"
              alt="24/7 Support"
              className="w-16 h-16 mb-3"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              24/7 Support
            </h3>
            <p className="text-gray-500 text-sm mt-2">
              Our friendly support team is here to help you anytime.
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-10 text-center text-gray-500 text-sm md:text-base">
          Thank you for choosing{" "}
          <span className="font-semibold">EliteStore</span>. We’re here to make
          your shopping smarter, faster, and better!
        </p>
      </div>
    </div>
  );
};

export default About;
