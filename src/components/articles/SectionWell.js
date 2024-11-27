import React, { useState, useEffect } from "react";
import ArticleGrid from "./ArticleGrid";
import { BounceLoader } from "react-spinners";
import axios from "axios";

const SectionBottom = () => {
  const urlSection = `https://api.nytimes.com/svc/topstories/v2/food.json?api-key=30mS33uUBWOVAYffuOfb9rpPZhDzpDjS`;

  const [load, setLoad] = useState(false);
  const [articles, setArticles] = useState({ results: [] });
  const maxArticles = 6;

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

  if (load) {
    return (
      <div className="section-container px-4 md:px-8">
        
        <h2 className="text-sm font-bold mb-1 text-left">WELL</h2>
        <div className="grid grid-cols xs:grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4 divide-x divide-gray-300">
          {articlesLoad.slice(0, maxArticles).map((article, index) => (
            <ArticleGrid key={index} {...article} />
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

export default SectionBottom;
