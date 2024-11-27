import React, { useState, useEffect } from "react";

const ArticleSection = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=30mS33uUBWOVAYffuOfb9rpPZhDzpDjS"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        const data = await response.json();
        const formattedArticles = data.results
          .slice(0, 5)
          .map((article, index) => ({
            id: index + 1,
            title: article.title,
            image: article.multimedia?.[0]?.url || "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64",
            category: article.section,
            url: article.url
          }));
        setArticles(formattedArticles);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto py-6 text-center">
        <div className=" border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto py-6 text-center text-red-600">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-6">
      <h2 className="text-sm font-bold uppercase text-black mb-6 text-left">In Case You Miss It</h2>
      <div className="space-y-6">
        {articles.map((article, index) => (
          <div key={article.id}>
            <div className="flex items-center justify-between bg-white transition-colors duration-300">
              <div className="flex-1 pr-4">
                <span className="text-sm font-medium text-black mb-1 block capitalize">
                  {article.category}
                </span>
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-600"
                >
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 transition-colors duration-200 hover:text-blue-600">
                    {article.title}
                  </h3>
                </a>
              </div>
              <div className="flex-shrink-0">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-[90px] h-[90px] object-cover"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64";
                    e.target.alt = "Fallback image";
                  }}
                />
              </div>
            </div>
            {index < articles.length - 1 && (
              <div className="h-px bg-gray-200 my-4 w-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleSection;