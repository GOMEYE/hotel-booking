import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="bg-[#f6f9fc] text-gray-500/80 pt-4 px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-wrap justify-between gap-12 md:gap-6">
        <div className="max-w-80">
          <img
            src={assets.logo}
            alt="Logo"
            className="mb-4 h-8 md:h-9 invert"
          />

          <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
            Discover the world's most extraordinary places to stay, from
            boutique hotels to luxury villas and private islands.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <img
              src={assets.instagramIcon}
              alt="instagram icon"
              className="w-6"
            />
            <img src={assets.twitterIcon} alt="twitter icon" className="w-6" />
            <img
              src={assets.facebookIcon}
              alt="facebook icon"
              className="w-6"
            />
            <img
              src={assets.linkendinIcon}
              alt="linkedIn icon"
              className="w-6"
            />
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col gap-3">
          <p className="font-playfair text-lg text-gray-800">COMPANY</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <a href="#" className="hover:text-gray-800 transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800 transition-colors">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800 transition-colors">
                Press
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800 transition-colors">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800 transition-colors">
                Partners
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-playfair text-lg text-gray-800">Support</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <a href="#" className="hover:text-gray-800 transition-colors">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800 transition-colors">
                Safety Information
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800 transition-colors">
                Cancellation Options
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800 transition-colors">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800 transition-colors">
                Accessibility
              </a>
            </li>
          </ul>
        </div>

        <div className="max-w-80">
          <p className="font-playfair text-lg text-gray-800">Stay Updated</p>
          <p className="mt-3 text-sm">
            Subscribe to our newsletter for travel inspiration and special
            offers.
          </p>
          <form
            className="flex items-center mt-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email"
              className="bg-white rounded-l border border-r-0 border-gray-300 h-9 px-3 outline-none text-sm w-full max-w-48"
              required
            />
            <button
              type="submit"
              className="group flex items-center justify-center bg-black h-9 w-10 aspect-square rounded-r"
            >
              <img
                src={assets.arrowIcon}
                alt="arrow icon"
                className="w-3.5 invert transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>
          </form>
        </div>
      </div>

      <hr className="border-gray-300 mt-8" />

      <div className="flex flex-col md:flex-row justify-between items-center gap-2 py-5 text-xs">
        <p>&copy; {new Date().getFullYear()} Brand. All rights reserved.</p>
        <ul className="flex items-center gap-4">
          <li>
            <a href="#" className="hover:text-gray-800 transition-colors">
              Privacy
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-800 transition-colors">
              Terms
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-800 transition-colors">
              Sitemap
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
