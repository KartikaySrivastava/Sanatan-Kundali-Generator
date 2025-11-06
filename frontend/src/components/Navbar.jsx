import{ useState } from "react";
import logo from "../assets/logo.png";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className="
        bg-white text-black 
        w-9/12 xl:w-11/12 2xl:w-9/12 
        z-50 h-16
        rounded-[60px] px-6 py-4 xl:py-2 
        flex justify-between items-center 
        backdrop-blur-xl shadow-xl 
        border-stone-50 border
        mx-auto mt-4 mb-16 
        fixed left-1/2 -translate-x-1/2
      "
    >
      {/* Left side: Logo + Project Name */}
      <div className="flex items-center space-x-2">
        <div className="rounded-full bg-orange-50 h-12 w-20 flex items-center justify-center">
          <img src={logo} alt="logo" className="h-12 w-16" />
        </div>
        <span className="font-bold font-serif text-lg">AstroGPT</span>
      </div>

      {/* Desktop Links (right side) */}
      <div className="hidden md:flex items-center space-x-6">
        <a href="#link1" className="hover:text-purple-800 font-serif transition-colors">
          Pooja
        </a>
        <a href="#link2" className="hover:text-purple-800 font-serif transition-colors">
          Horoscope
        </a>
        <a href="#link3" className="hover:text-purple-800 font-serif transition-colors">
          Pooja
        </a>
      </div>

      {/* Hamburger button (mobile) - toggles menu */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center justify-center p-2 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white
                     hover:bg-orange-700"
          aria-controls="mobile-menu"
          aria-expanded={isOpen ? "true" : "false"}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className={`h-6 w-6 transform transition-transform ${
              isOpen ? "rotate-90" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              // X icon when open
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              // Hamburger icon when closed
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu (slide-down) */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="
            md:hidden bg-orange-700 
            absolute top-16 left-0 w-full 
            rounded-b-[60px] shadow-xl
          "
        >
          <div className="flex flex-col items-center space-y-2 py-2">
            <a
              href="#link1"
              className="block px-3 py-2 rounded-md hover:bg-orange-800"
            >
              Link One
            </a>
            <a
              href="#link2"
              className="block px-3 py-2 rounded-md hover:bg-orange-800"
            >
              Link Two
            </a>
            <a
              href="#link3"
              className="block px-3 py-2 rounded-md hover:bg-orange-800"
            >
              Link Three
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
