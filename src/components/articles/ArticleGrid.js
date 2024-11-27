import React from "react";
import { useGlobalContext } from "../../context";
import { Link } from "react-router-dom";

const Article = ({
  section,
  published_date,
  title,
  byline,
  multimedia,
  abstract,
  url,
  showDate
  
}) => {
  const { formatSection } = useGlobalContext();



  const formatDate = (date) => {
    if (!date) return "Unknown Date";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <div className="flex flex-col justify-start items-start w-full pl-4 pr-0 m-0">

      {section && (
        <p className="text-xs font-bold bg-white text-black p-1 uppercase">
          
        </p>
      )}


      {multimedia && multimedia[0] && (
        <div className="mt-2 w-full">
          <img
            className="w-full h-48 object-cover"
            src={multimedia[0].url}
            alt={title}
          />
          {byline && (
            <p className="mt-2 self-end text-xs font-bold">{byline}</p>
          )}
        </div>
      )}


      <h2 className="font-extrabold text-md w-full mx-auto mt-4 text-left">
        <Link to={url} target="_blank" rel="noreferrer">
          {title}
        </Link>
      </h2>


      {abstract && (
        <div className="mt-4 text-justify w-full mx-auto pb-[10px]">
          <p className="text-sm"></p>
        </div>
      )}


      <div className="flex flex-row justify-between items-center mt-2">
        {showDate && published_date && (
          <p className="font-bold text-xs">
            
          </p>
        )}
      </div>
    </div>
  );
};

export default Article;
