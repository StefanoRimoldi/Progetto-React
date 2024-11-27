import React, { useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import { useGlobalContext } from "../context";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    e.target.reset();
    if (search) {
      setSearch("");
      navigate(`/search/${search}`);
    }
  };

  const handleClose = () => {
    setIsDropdownOpen(false);
  }; // chiusura menu account 

  // Get today date and format it
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  const todayDate = new Date().toLocaleDateString("en-En", options);

  const { sections, formatSection } = useGlobalContext();

  if (nav === true) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "scroll";
  }

  return (
    <div
  className={`${
    nav ? "" : "top-0 max-w-[1200px] mx-auto border-b-2 border-double"
  }`}
>
  <div className="flex flex-col">

    <div
      className={`${
        nav
          ? "h-10"
          : "h-10 md:h-12 lg:h-16 transition-all duration-300 ease-in-out"
      } flex flex-row justify-start items-center mt-1`}
    >

      <div>
        <p
          style={{ textAlign: "left", marginLeft: "20px" }}
          className={nav ? "hidden" : "hidden text-[md] lg:block lg:mt-2"}
        >
          {todayDate}
        </p>
        <p
          style={{ textAlign: "left", marginLeft: "20px" }}
          className={nav ? "hidden" : "hidden text-[md] lg:block"}
        >
          Today's Paper
        </p>
      </div>


      <h1
        className={`z-0 absolute left-[10%] right-[10%] md:left-[25%] md:right-[25%] text-center font-ancient ${
          nav
            ? "hidden"
            : "text-2xl md:text-4xl lg:text-6xl transition-all duration-300"
        }`}
      >
        <Link to={"/"}>
          <img
            src="/Title.png"
            alt="The New York Times"
            className={`hidden md:block mx-auto max-w-full ${
              nav ? "max-h-[0]" : "max-h-[110px]"
            } w-auto h-auto object-contain transition-all duration-300 md:mb-10 lg:mb-0`}
          />
        </Link>
      </h1>


      <HiOutlineX
        className={
          nav
            ? "text-2xl md:text-3xl lg:text-4xl cursor-pointer absolute right-0 mr-2"
            : "hidden"
        }
        onClick={() => setNav(false)}
      />
    </div>


    <div
      className={`h-[35px] bg-[#f7f7f7] border-[#e2e2e2] flex items-center justify-between lg:h-[60px] lg:bg-white ${
        nav ? "h-4" : "transition-all duration-300"
      }`}
    >
      <p className="font-bold text-[0.7rem] ml-2 lg:hidden">{todayDate}</p>
      <p className="font-bold text-[0.5rem] mr-2 text-blue-500 lg:hidden">
        SUBSCRIBE FOR $0,50/A WEEK
      </p>
      <ul className="hidden lg:flex flex-row mx-auto place-content-center justify-center">
        {sections.map((section, index) => {
          return (
            <li
              key={index}
              className="capitalize rounded-md px-2 py-1 text-sm text-center hover:bg-slate-100 active:bg-slate-200"
            >
              {section === "home" ? (
                <Link to={"/"}>{formatSection(section)}</Link>
              ) : (
                <Link to={`section/${section}`}>
                  {formatSection(section)}
                </Link>
              )}
            </li>
          );
        })}
        <li className="rounded-md px-2 py-1 text-sm hover:bg-slate-100 active:bg-gray-700">
          <Link to={"/"}>Feed</Link>
        </li>
      </ul>
    </div>
  </div>
</div>

  );
};

export default Navbar;