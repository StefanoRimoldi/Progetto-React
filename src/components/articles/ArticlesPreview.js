import { useState, useEffect } from "react";
import axios from "axios";

const ArticlesProva = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=30mS33uUBWOVAYffuOfb9rpPZhDzpDjS"
        );
        
      
        const shuffledArticles = response.data.results
          .sort(() => Math.random() - 0.5)
          .slice(0, 2);

        setArticles(shuffledArticles); 
        setLoading(false); 
      } catch (err) {
        setError(err.message); 
        setLoading(false); 
      }
    };

    fetchArticles(); 
  }, []); 

  if (loading) return <div className="text-center">Loading...</div>; 
  if (error) return <div className="text-center text-red-500">{error}</div>; 
  if (!articles.length) return <div className="text-center">No articles found</div>; 

  return (
    <div className="space-y-8 px-4 md:px-8">
      {articles.map((article, index) => (
        <div key={index}>
          <div className="max-w-[1000px] mx-auto" tabIndex={0}>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 space-y-4">
                <a 
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-bold text-gray-800"
                  tabIndex={0}
                >
                  {article.title}
                </a>
                <p className="text-gray-600 leading-relaxed" tabIndex={0}>
                  {article.abstract}
                </p>
              </div>
              
              <div className="w-full md:w-[520px] sm:w-[320px] relative flex flex-col space-y-2">
                <img
                  src={article.multimedia?.[0]?.url || ""}
                  alt={article.multimedia?.[0]?.caption || "Article image"}
                  className="w-[520px] max-w-auto min-h-auto object-contain"
                  loading="lazy"
                />
                <div 
                  className="flex items-center space-x-3 text-gray-500 justify-end mt-1"
                  tabIndex={0}
                >
                  <span className="text-xs font-medium">{article.byline}</span>
                </div>
              </div>
            </div>
          </div>
          {index === 0 && (
            <div className="max-w-[1000px] mx-auto my-8">
              <hr className="border-t-2 border-gray-300" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ArticlesProva;
