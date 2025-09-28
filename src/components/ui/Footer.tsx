import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="py-10 bg-gray-50 sm:pt-16 lg:pt-20 border-t border-gray-200">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12 gap-x-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900">EliteStore</h2>
            <p className="text-base leading-relaxed text-gray-600 mt-5">
              Premium products crafted with quality and care. Your one-stop
              destination for lifestyle essentials.
            </p>

            {/* Socials */}
            <ul className="flex items-center space-x-3 mt-6">
              {[
                {
                  href: "#",
                  svg: (
                    <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z" />
                  ),
                },
                {
                  href: "#",
                  svg: (
                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
                  ),
                },
                {
                  href: "#",
                  svg: (
                    <>
                      <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path>
                      <circle cx="16.806" cy="7.207" r="1.078"></circle>
                    </>
                  ),
                },
              ].map((icon, i) => (
                <li key={i}>
                  <a
                    href={icon.href}
                    className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-8 h-8 hover:bg-blue-600"
                  >
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {icon.svg}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Company
            </p>
            <ul className="mt-6 space-y-3">
              {["About", "Features", "Works", "Career"].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="text-base text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Help
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Customer Support",
                "Delivery Details",
                "Terms & Conditions",
                "Privacy Policy",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="text-base text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links (new) */}
          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Quick Links
            </p>
            <ul className="mt-6 space-y-3">
              {["Shop", "Categories", "Trending", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="text-base text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <hr className="mt-12 mb-6 border-gray-200" />
        <p className="text-sm text-center text-gray-600">
          © {new Date().getFullYear()}, All Rights Reserved by EliteStore
        </p>
      </div>
    </footer>
  );
};

export default Footer;
