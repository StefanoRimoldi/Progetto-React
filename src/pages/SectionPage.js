import React from "react";
import { useGlobalContext } from "../context";
import { useParams } from "react-router-dom";
import Article from "../components/articles/OneArticle";
import { BounceLoader } from "react-spinners";
import { useFetchData } from "../Hooks/useFetchData";
import { Link } from "react-router-dom";
import "../pages/homepage.css"

const SectionPage = () => {
  const { nameSection } = useParams();

  const urlSection = `https://api.nytimes.com/svc/topstories/v2/${nameSection}.json?api-key=30mS33uUBWOVAYffuOfb9rpPZhDzpDjS`;

  const { formatSection } = useGlobalContext();
  const { load, articles } = useFetchData(urlSection);

  const articlesLoad = articles.results;

  if (load) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-4 myfont">
        <h2 className="font-bold ml-2 mt-2 text-xl md:text-2xl lg:text-3xl capitalize">
          {formatSection(nameSection) + " News"}
        </h2>

        {/* Layout a due colonne */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 mt-6">
          <div className="left-column space-y-6">
            {articlesLoad.slice(0, 3).map((article, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white p-6 border-b border-gray-300"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-bold"><Link to={article.url} target="_blank" rel="noreferrer">{article.title}</Link></h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {article.abstract}
                  </p>
                </div>
                <div className="flex-shrink-0 md:w-1/2">
                  <img
                    src={article.multimedia?.[0]?.url || "/placeholder.jpg"}
                    alt={article.title}
                    className="w-full h-auto"
                  />
                  <p className="text-xs text-gray-500 mt-2 text-right">
                    {article.byline || "Author Unknown"}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="right-column space-y-6">
            {articlesLoad.slice(3, 6).map((article, index) => (
              <Article key={index} {...article} showDate={false} />
            ))}
          </div>
        </div>

        {/* Section grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
          {articlesLoad.slice(6).map((article, index) => (
            <Article key={index} {...article} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <BounceLoader
        className="mx-auto my-36"
        color="gray"
        size={180}
        aria-label="Loading Spinner"
      />
    );
  }
};

export default SectionPage;
