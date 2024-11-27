import React, { useState, useEffect } from "react";
import { BounceLoader } from "react-spinners";
import axios from "axios";

const SectionBottom = () => {
  const urlSection = `https://api.nytimes.com/svc/topstories/v2/food.json?api-key=30mS33uUBWOVAYffuOfb9rpPZhDzpDjS`;

  const [load, setLoad] = useState(false);
  const [articles, setArticles] = useState({ results: [] });

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoad(false);
        const response = await axios.get(urlSection);
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoad(true);
      }
    };

    fetchArticles();
  }, [urlSection]);

  const articlesLoad = articles.results;

  if (!load) {
    return (
      <BounceLoader
        className="mx-auto my-36"
        color="gray"
        size={180}
        aria-label="Loading Spinner"
      />
    );
  }

  return (
    <div className="section-container px-4 md:px-8">
      <h2 className="text-sm font-bold mb-4 text-left">FOOD</h2>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex flex-col gap-4">
          {articlesLoad.slice(0, 3).map((article, index) => (
            <div
              key={index}
              className="border-b border-gray-300 pb-2 mb-2 text-sm text-gray-700"
            >
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-gray-800 hover:underline"
              >
                {article.title}
              </a>
              <p>{article.abstract}</p>
            </div>
          ))}
        </div>

        {/* Colonna Centrale */}
        <div className="flex-1 flex justify-center">
          {articlesLoad[3]?.multimedia?.[0]?.url && (
            <img
              src={articlesLoad[3].multimedia[0].url}
              alt={articlesLoad[3].title}
              className="max-w-full h-auto object-cover"
            />
          )}
        </div>

        {/* Colonna di destra */}
        <div className="flex-1 flex flex-col gap-4">
          {articlesLoad.slice(4, 7).map((article, index) => (
            <div key={index} className="text-gray-700">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-gray-800 hover:underline"
              >
                {article.title}
              </a>
              {article.byline && (
                <p className="text-sm text-gray-500">{article.byline}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionBottom;
