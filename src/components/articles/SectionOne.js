import React, { useState, useEffect } from "react";
import axios from "axios";

const ArticleLayout = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [articles, setArticles] = useState([]);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=30mS33uUBWOVAYffuOfb9rpPZhDzpDjS");
        setArticles(response.data.results);
        setCurrentArticle(response.data.results[0]);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch articles");
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!currentArticle) return <div className="text-center p-4">No article found</div>;

  return (
    <article className="max-w-7xl mx-auto px-2 sm:px-6">
      <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
        <div className="flex-1 mb-6 md:mb-0">
          <a 
            href={currentArticle.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`block text-xl font-bold mb-4 text-gray-800 transition-colors duration-300 ${isHovered ? "text-blue-600" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {currentArticle.title}
          </a>
          
          <p className="text-gray-700 leading-relaxed mb-4 text-sm line-clamp-5">
            {currentArticle.abstract}
          </p>

          <div className="mt-8 pt-4 border-t border-gray-200">
            {articles[1] && (
              <a
                href={articles[1].url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-md font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300 cursor-pointer"
              >
                {articles[1].title}
              </a>
            )}
          </div>
        </div>

        <div className="w-full md:w-[520px] sm:w-full relative flex flex-col space-y-2">
          <div className="relative overflow-hidden shadow-md group">
            <img
              src={currentArticle.multimedia?.[0]?.url || ""}
              alt={currentArticle.multimedia?.[0]?.caption || "Article image"}
              className="w-full max-w-[520px] h-[300px] md:h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
              onError={(e) => {
                e.target.src = "";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0"></div>
          </div>

          <div className="mt-2 text-gray-700 text-right">
            <p className="text-xs font-medium">{currentArticle.byline || "Unknown Author"}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleLayout;