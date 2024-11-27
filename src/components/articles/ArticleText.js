import React, { useState, useEffect } from "react";
import axios from "axios";

const ArticleComponent = () => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const words = text.split(" ").length;
    const readingTime = Math.ceil(words / wordsPerMinute);
    return readingTime;
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=30mS33uUBWOVAYffuOfb9rpPZhDzpDjS"
        );
        setArticle(response.data.results[0]);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch article");
        setLoading(false);
      }
    };

    fetchArticle();
  }, []);

  if (loading) {
    return (
      <div className="w-full">
        <div className="animate-pulse">
          <div className="bg-gray-200 h-40"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <div className="bg-red-100 border border-red-400 text-red-700 rounded" role="alert">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!article) return null;

  const readingTime = calculateReadingTime(article.abstract);

  return (
    <div className="w-full px-4 md:px-8">
      <article
        className="bg-white"
        role="article"
      >
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 uppercase tracking-wider">{article.section}</span>
          </div>

          <a 
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <h2
              className="text-md md:text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              tabIndex="0"
              aria-label={`Article title: ${article.title}`}
            >
              {article.title}
            </h2>
          </a>

          <p className="text-sm text-gray-700 leading-relaxed">{article.abstract}</p>

          <div className="space-y-2">
            <div 
              className="flex items-center"
              aria-label={`Written by ${article.byline}`}
            >
              <span className="text-sm text-gray-600 font-medium">
                {article.byline}
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              
              <span className="text-sm">{readingTime} MIN READ</span>
            </div>
          </div>

          <div className="space-y-6"></div>
        </div>
      </article>
    </div>
  );
};

export default ArticleComponent;