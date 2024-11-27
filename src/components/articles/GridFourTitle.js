import React from "react";
import { Link } from "react-router-dom";

const GridFourTitle = ({ articles }) => {
  if (!articles || articles.length < 4) {
    return null;
  }

  return (
    <div className="left-column-container grid grid-cols-2 px-4 md:px-8">
   
      <div className="article border-b pr-[10px]">
        <Link to={articles[9].url}>
          <h2 className="text-left font-bold text-md">{articles[9].title}</h2>
        </Link>
      </div>


  
      <div className="article border-b pl-[10px]">
        <Link to={articles[1].url}>
          <h2 className="text-left text-md font-bold">{articles[1].title}</h2>
        </Link>
        <h4 className="text-left text-sm pb-4">{articles[2].byline}</h4>
      </div>

      
      <div className="article pr-[10px]">
        <Link to={articles[2].url}>
          <h2 className="text-left text-md font-bold">{articles[2].title}</h2>
        </Link>
        <h4 className="text-left text-sm">{articles[2].byline}</h4>
      </div>

      
      <div className="article pl-[10px]">
        <Link to={articles[3].url}>
          <h2 className="text-left text-md font-bold">{articles[3].title}</h2>
        </Link>
        <h4 className="text-left text-sm">{articles[3].byline}</h4>
      </div>
    </div>
  );
};

export default GridFourTitle;
