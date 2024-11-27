import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaUser, FaBox, FaGift, FaTruck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";


const Footer = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const navigate = useNavigate();
  const { sections, formatSection, fetchArticles } = useGlobalContext();


  const footerColumns = [
    {
      title: "News",
      links: [
        { label: "Homepage", path: "/" },
        { label: "U.S.", path: "/error" },
        { label: "World", path: "/section/world" },
        { label: "Politics", path: "/section/politics" },
        { label: "NewYork", path: "/error" },
        { label: "Education", path: "/section/education" },
        { label: "Sports", path: "/section/sports" },
        { label: "Business", path: "/section/business" },
        { label: "Tech", path: "/error" },
        { label: "Science", path: "/section/science" },
        { label: "Weather", path: "/section/weather" },
        { label: "The Great Read", path: "/error" },
        { label: "Obituaries", path: "/section/obituaries" },
        { label: "Headway", path: "/section/headway" },
        { label: "Visual Investigation", path: "/error" },
        { label: "The Magazine", path: "/section/magazine" },
      ],
    },
    {
      title: "Arts",
      links: [
        { label: "Book Reviews", path: "/section/books" },
        { label: "Best Seller Book List", path: "/error" },
        { label: "Dance", path: "/error" },
        { label: "Movies", path: "/section/movies" },
        { label: "Music", path: "/error" },
        { label: "Pop Culture", path: "/section/error" },
        { label: "Television", path: "/section/arts/" },
        { label: "Theater", path: "/section/theater" },
        { label: "Visual Arts", path: "section/arts" },
      ],
    },
    {
      title: "Lifestyle",
      links: [
        { label: "Health", path: "/section/health" },
        { label: "Well", path: "/section/well" },
        { label: "Food", path: "/error" },
        { label: "Restaurant Reviews", path: "/error" },
        { label: "Love", path: "/section/love" },
        { label: "Travel", path: "/section/travel" },
        { label: "Style", path: "/section/style" },
        { label: "Fashion", path: "/section/fashion" },
        { label: "Real Estate", path: "/section/realestate" },
        { label: "T Magazine", path: "/section/t-magazine" },
      ],
    },
    {
      title: "Opinion",
      links: [
        { label: "Today's Opinion", path: "/section/opinion" },
        { label: "Columnists", path: "/section/opinion" },
        { label: "Editorials", path: "/error" },
        { label: "Guest Essay", path: "/error" },
        { label: "Op-Docs", path: "/error" },
        { label: "Letters", path: "/error" },
        { label: "Sunday Opinion", path: "/error" },
        { label: "Opinion Video", path: "/error" },
        { label: "Opinion Audio", path: "/error" },
      ],
    },
    {
      title: "More",
      links: [
        { label: "Audio", path: "/error" },
        { label: "Games", path: "/error" },
        { label: "Cooking", path: "/error" },
        { label: "Wirecutter", path: "/error" },
        { label: "The Athletic", path: "/error" },
        { label: "Jobs", path: "/section/jobs" },
        { label: "Video", path: "/error" },
        { label: "Graphics", path: "/error" },
        { label: "Trending", path: "/error" },
        { label: "Live Events", path: "/error" },
        { label: "Corrections", path: "/section/corrections" },
        { label: "Reader Center", path: "/section/reader-center" },
        { label: "Times Machine", path: "/section/times-machine" },
        { label: "The Learning Network", path: "/section/learning" },
        { label: "School of the NYT", path: "/error" },
        { label: "inEducation", path: "/section/education" },
      ],
    },
    {
      title: "Account",
      links: [
        { label: "Subscribe", path: "/error", icon: <FaUser /> },
        { label: "Manage your account", path: "/error", icon: <FaBox /> },
        { label: "Home Delivery", path: "/error", icon: <FaTruck /> },
        { label: "Gift Subscriptions", path: "/error", icon: <FaGift /> },
      ],
    },
  ];
  
  const toggleSection = (title) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleLinkClick = (section) => {
    navigate(`/section/${section}`);
  };

  return (
    <footer className="bg-white text-gray-900 py-12 px-4 sm:px-12 lg:px-[75px] shadow-lg">
      <div className="max-w-7xl mx-auto border-t-2 border-gray-300">
        <div className="mb-4 flex justify-start">
          <img src='./Title.png' alt="Company Logo" className="h-12 w-auto" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          {footerColumns.map((column) => (
            <div
              key={column.title}
              className="space-y-4"
              role="region"
              aria-label={`${column.title} section`}
            >
              
              <div className="flex justify-between items-center cursor-pointer lg:cursor-auto" onClick={() => toggleSection(column.title)}>
                <h2 className="text-[13px] md:text-xs font-bold tracking-wider uppercase border-b border-gray-100 pb-2 transition-colors duration-300 hover:text-blue-600 w-full md:w-auto">
                  {column.title}
                </h2>
               
                <span className="lg:hidden">
                  {expandedSections[column.title] ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>

             
              <ul className="hidden lg:block space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="flex items-center space-x-2">
                    
                    {link.icon && <span>{link.icon}</span>}
                    <Link
                      to={link.path}
                      className="text-[12px] text-black hover:text-gray-800 transition-colors duration-300 block py-1 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-white rounded leading-[10px]"
                      onClick={() => handleLinkClick(link.path)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              
              {expandedSections[column.title] && (
                <ul className="lg:hidden space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="flex items-center space-x-2">
                      
                      {link.icon && <span>{link.icon}</span>}
                      <Link
                        to={link.path}
                        className="text-[12px] text-black hover:text-gray-800 transition-colors duration-300 block py-1 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-white rounded"
                        onClick={() => handleLinkClick(link.path)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
