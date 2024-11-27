import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiMenu, FiX, FiChevronRight, FiChevronDown } from "react-icons/fi";
import { FaTimes, FaUser } from "react-icons/fa";
import { useGlobalContext } from "../context";


const TopNavbar = () => {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState("");
  const [nav, setNav] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(false);
  };

  const { sections, formatSection } = useGlobalContext();
  const navigate = useNavigate()

  const topMenuItems = ["U.S.", "INTERNATIONAL", "CANADA", "ESPAñOL", "中文"];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const handleSearch = (e) => {
    e.preventDefault();
    
    if (search) {
      setSearch('');
      navigate(`/search/${search}`);
      toggleMobileMenu();
    }
  };

  const toggleAccountMenu = () => {
    setIsAccountMenuOpen(!isAccountMenuOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };



  return (
    <nav className="w-full bg-white" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto">
        
        <div className="px-4 py-3 flex items-center justify-between border-b-0">
          <div className="flex items-center space-x-4 flex-grow md:flex-grow-0">
            {isMobile && (
              <button
                onClick={toggleMobileMenu}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors md:hidden"
                aria-label="Toggle menu"
              >
                <FiMenu className="w-6 h-6" />
              </button>
            )}
            {!isMobile && (
              <div className="relative flex items-center space-x-2">
                <button
                  onClick={toggleSearch}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label={isSearchOpen ? "Close search" : "Open search"}
                >
                  <FiSearch className="w-4 h-4" />
                </button>
                {isSearchOpen && (
                  <form onSubmit={handleSearch} className="w-full flex items-center space-x-2">
                    <div className="relative flex-grow">
                      <input
                        type="text"
                        className="w-[182px] h-[31px] pl-2 pr-4 py-2 rounded-[3px] border border-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="SEARCH"
                        onSubmit={handleSearch}
                        autoFocus
                        onChange={(e) => setSearch(e.target.value)}
                        aria-label="SEARCH"
                      />
                    </div>
                    <button
                      type="submit"
                      onClick={() => setNav(!nav)}
                      className="ml-2 bg-slate-300 text-xs p-2 rounded text-white font-bold"
                    >
                      GO
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* TOP MENU VERSIONE DESKTOP E LOGO VERSIONE MOBILE */}
          {!isTablet && (
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center space-x-6 w-1/2">
              {!isMobile ? (
                topMenuItems.map((item, index) => (
                  <button
                    key={index}
                    className="text-xs text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    {item}
                  </button>
                ))
              ) : (
                <Link to="/" className="flex items-center">
                <img
                  src="/Title.png"
                  alt="Title Logo"
                  className="h-9 w-auto"
                />
                </Link>
              )}
            </div>
          )}


          <div className="flex items-center space-x-4 ml-4">
            {!isTablet && (
              <button className="text-[10px] bg-[#326891] text-white font-semibold rounded-[3px] hover:bg-opacity-90 transition-colors hidden lg:block px-2 py-2">
                SUBSCRIBE FOR $0.50/WEEK
              </button>
            )}
            <div className="relative">
              <button
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
                onClick={toggleAccountMenu}
                aria-expanded={isAccountMenuOpen}
                aria-haspopup="true"
              >
                {isMobile ? (
                  <FaUser className="w-5 h-5" />
                ) : (
                  <>
                    <span className="text-[13px]">Account</span>
                    <FiChevronDown className="w-5 h-5" />
                  </>
                )}
              </button>

              {isAccountMenuOpen && (
                <div className="fixed top-0 right-0 h-[728px] w-[375px] bg-white shadow-xl transform transition-transform duration-300 z-50 overflow-y-auto max-h-screen">
                    
                    <div className="p-3">
                    <div className="flex justify-between items-center mb-8 overflow-y-auto">
                        <h2 className="text-2xl font-bold"></h2>
                        <button
                        onClick={toggleAccountMenu}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                        <FaTimes className="text-xl" />
                        </button>
                    </div>

                    {/* Contenuto Menù Account */}
                    <div className="px-2 py-2 border-gray-200 border-t">
                        <h4 className="text-lg font-bold text-gray-900">Good evening</h4>
                        <p className="mt-2 text-sm text-gray-600">
                        The email you logged in with isn't associated with a News subscription and has limited access to articles.
                        </p>
                        <button className="mt-3 w-full px-4 py-2 bg-black text-white rounded-[3px] hover:bg-blue-700 transition-colors">
                        <Link to="/error">Subscribe for more access</Link>
                        </button>
                        <p className="text-center mt-2 text-sm text-black font-bold">
                        Already subscribed? Try a different email
                        </p>
                        <div className="flex justify-between items-center cursor-pointer hover:bg-gray-50 py-6">
                        <span className="text-[13px] text-gray-900"><Link to="/error">Account Settings</Link></span>
                        <FiChevronRight className="w-5 h-5 text-gray-500" />
                        </div>
                        <div className="border-b border-gray-200 mt-2 pt-2">
                        <div className="flex justify-between items-center cursor-pointer hover:bg-gray-50 py-2">
                            <span className="text-[13px] font-bold text-gray-900">YOUR CONTENT</span>
                        </div>
                        <div className="flex justify-between items-center cursor-pointer hover:bg-gray-50 py-2">
                            <span className="text-[13px] text-black"><Link to="/error">Saved Articles</Link></span>
                            <FiChevronRight className="w-5 h-5 text-gray-500" />
                        </div>
                        <div className="flex justify-between items-center cursor-pointer hover:bg-gray-50 py-2 border-t border-gray-200">
                            <span className="text-[13px] text-black"><Link to="/error">Newsletters</Link></span>
                            <FiChevronRight className="w-5 h-5 text-gray-500" />
                        </div>
                        <div className="flex justify-between items-center cursor-pointer hover:bg-gray-50 py-2">
                            <span className="text-[13px] font-bold text-black"><Link to="/error">GET SUPPORT</Link></span>
                        </div>
                        <div className="border-t border-gray-200 pt-2">
                            <div className="flex justify-between items-center cursor-pointer hover:bg-gray-50 py-2">
                            <span className="text-[13px] text-black"><Link to="/error">Help Center</Link></span>
                            <FiChevronRight className="w-5 h-5 text-gray-500" />
                            </div>
                            <div className="flex justify-between items-center cursor-pointer hover:bg-gray-50 py-4">
                            <span className="text-[13px] text-black font-bold underline"><Link to="/error">Log Out</Link></span>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                )}

            </div>
          </div>
        </div>

        {/* Mobile Menu */}

        {isMobileMenuOpen && isMobile && (
          <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center">
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {/* Search Bar in Mobile Menu */}
              <div className="mt-4 flex flex-col items-center">
              <form
                onSubmit={handleSearch}
                
                autoFocus
                onChange={(e) => setSearch(e.target.value)}
                className="flex flex-col items-center w-full max-w-lg gap-4"
                
              >
              {/* Contenitore della barra di ricerca e del bottone */}
              <div className="flex w-full items-center gap-2">
                <div className="relative flex-grow">
                <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="SEARCH"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search"
                onKeyDown={(e) => {
                  if (e.key === "Enter") { 
                    e.preventDefault();
                    handleSearch(e); 
                    toggleMobileMenu(); 
                  }
                }}
              />
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <button
                  type="submit"
                  className="px-2 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-800 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSearch(e);
                    toggleMobileMenu();
                  }}
                >
                  GO
                </button>
              </div>
                {/* Sezione News */}
                <div className="mt-4 w-full">
                  <ul className="flex flex-col items-start font-bold gap-5">
                    {sections.map((section, index) => (
                      <li
                        key={index}
                        onClick={toggleMobileMenu}
                        className="w-full pb-2 capitalize text-md item-start border-b border-gray-300"
                      >
                        {section === "home" ? (
                          <Link to={"/"}>{formatSection(section)}</Link>
                        ) : (
                          <Link to={`section/${section}`}>{formatSection(section)}</Link>
                        )}
                      </li>
                    ))}
                    <li>
                      <Link to={"/feed"} onClick={toggleMobileMenu}>
                        <h4 className="font-bold text-center">Feed</h4>
                      </Link>
                    </li>
                  </ul>
                </div>
              </form>
            </div>


            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopNavbar;
