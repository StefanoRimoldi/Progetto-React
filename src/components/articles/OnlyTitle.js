import React, { useState, useEffect } from "react";
import axios from "axios";

const OnlyTitle = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          "https://api.nytimes.com/svc/topstories/v2/opinion.json?api-key=30mS33uUBWOVAYffuOfb9rpPZhDzpDjS"
        );
        // Limite a 6 articoli
        const opinionArticles = response.data.results.slice(0, 6).map((article, index) => ({
          id: index + 1,
          title: article.title
        }));
        setArticles(opinionArticles);
        setLoading(false);
      } catch (err) {
        setError("Error fetching articles. Please try again later.");
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="max-w-md mx-auto py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="space-y-3">
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="border-b border-gray-200"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto py-8">
        <div className="text-red-600 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-4">
      <h2 className="text-sm uppercase font-bold text-gray-900 mb-6 text-left">Opinion</h2>
      <div className="flex flex-col space-y-4">
        {articles.map((article, index) => (
          <React.Fragment key={article.id}>
            <h3 className="text-sm font-semibold text-gray-800 hover:text-blue-600 cursor-pointer transition-colors duration-300">
              {article.title}
            </h3>
            {index < articles.length - 1 && (
              <div className="border-b border-gray-200"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default OnlyTitle;
