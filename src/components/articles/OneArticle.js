import React from "react";
import { useGlobalContext } from "../../context";
import { Link } from "react-router-dom";
import "../articles/article.css";

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
    <div className="flex flex-col justify-start items-start w-full p-0 m-0 border-b-2 border-gray-300">
      {section && (
        <p className="text-xs font-bold mt-2 bg-white text-black p-1 uppercase">
          {formatSection(section)}
        </p>
      )}

      {multimedia && multimedia[0] && (
        <div className="mt-2 w-full">
          <img
            className="w-full h-auto max-h-60 object-cover shadow-md"
            src={multimedia[0].url}
            alt={title}
          />
          {byline && (
            <p className="mt-2 self-end text-xs font-bold">{byline}</p>
          )}
        </div>
      )}

      <h2 className="font-extrabold text-lg w-full mx-auto mt-4 text-left">
        <Link to={url} target="_blank" rel="noreferrer">
          {title}
        </Link>
      </h2>

      {abstract && (
        <div className="mt-4 text-justify w-full mx-auto pb-[10px]">
          <p className="text-sm">{abstract}</p>
        </div>
      )}


      <div className="flex flex-row justify-between items-center mt-2">
        {showDate && published_date && (
          <p className="font-bold text-xs">
            {formatDate(published_date)}
          </p>
        )}
      </div>
    </div>
  );
};

export default Article;
