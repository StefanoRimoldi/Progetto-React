import React from "react";
import { FiExternalLink } from "react-icons/fi";
import { FaRegHandshake, FaAccessibleIcon, FaBriefcase, FaAd, FaUserShield, FaMapMarkedAlt, FaQuestionCircle, FaNewspaper } from "react-icons/fa";

const FooterBottom = () => {
  const items = [
    { text: "NYTCo", icon: <FaNewspaper />, ariaLabel: "NYT Company" },
    { text: "Contact Us", icon: <FiExternalLink />, ariaLabel: "Contact Information" },
    { text: "Accessibility", icon: <FaAccessibleIcon />, ariaLabel: "Accessibility Information" },
    { text: "Work with Us", icon: <FaBriefcase />, ariaLabel: "Career Opportunities" },
    { text: "Advertise", icon: <FaAd />, ariaLabel: "Advertising Information" },
    { text: "T Brand Studio", icon: <FaNewspaper />, ariaLabel: "Brand Studio" },
    { text: "Your Ad Choice", icon: <FaAd />, ariaLabel: "Advertisement Preferences" },
    { text: "Privacy Policy", icon: <FaUserShield />, ariaLabel: "Privacy Information" },
    { text: "Terms of Service", icon: <FaRegHandshake />, ariaLabel: "Service Terms" },
    { text: "Terms of Sale", icon: <FaRegHandshake />, ariaLabel: "Sale Terms" },
    { text: "Site Map", icon: <FaMapMarkedAlt />, ariaLabel: "Site Navigation" },
    { text: "Help", icon: <FaQuestionCircle />, ariaLabel: "Help Center" },
    { text: "Subscription", icon: <FaNewspaper />, ariaLabel: "Subscription Information" }
  ];

  return (
    <footer className="bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <nav className="flex flex-wrap justify-center gap-4 md:gap-6 mb-6" aria-label="Footer bottom navigation">
          {items.map((item, index) => (
            <button
              key={index}
              className="group flex items-center text-sm rounded-md px-2 py-1"
              aria-label={item.ariaLabel}
            >
              {item.icon && (
                <span className="mr-1 text-gray-400">
                  {item.icon}
                </span>
              )}
              <span className="relative">
                {item.text}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 transform scale-x-0"></span>
              </span>
            </button>
          ))}
        </nav>
        <div className="text-center">
          <button
            className="text-sm text-gray-600  px-4 py-2"
          >
            2024 The New York Times Company
          </button>
        </div>
      </div>
    </footer>
  );
};

export default FooterBottom;