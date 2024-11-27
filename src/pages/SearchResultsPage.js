import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import axios from "axios";

const SearchResultsPage = () => {
  const { content } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const searchURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${content}&api-key=30mS33uUBWOVAYffuOfb9rpPZhDzpDjS`;

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get(searchURL);
        setArticles(response.data.response.docs || []);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [searchURL]);

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Date(date).toLocaleDateString("en-EN", options);
  };

  if (loading) {
    return (
      <BounceLoader
        className="mx-auto my-36"
        color="gray"
        size={180}
        aria-label="Loading Spinner"
      />
    );
  }

  if (error || articles.length === 0) {
    return (
      <div className="max-w-[1000px] mx-auto mt-2">
        <h2 className="ml-2">
          Showing results for:{" "}
          <span className="text-xl font-bold capitalize">{content}</span>
        </h2>
        <p className="font-bold text-center mt-3 text-xl p-10">
          No search results found
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[840px] mx-auto ">
      <div className="w-full h-[145px] flex items-center pl-4">
      <h2 className="ml-2 border border-gray-300 px-4 py-2 flex items-center space-x-2">
        <svg
          className="w-5 h-5 text-gray-500"
          xmlns=""
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="10" cy="10" r="7" />
          <line x1="16" y1="16" x2="21" y2="21" />
        </svg>
        <span className="text-md font-semibold text-gray-800">
          Showing results for:{" "}
          <span className="text-lg font-bold capitalize text-black">
            {content}
          </span>
        </span>
      </h2>
      </div>

      <div className="space-y-6 mt-4">
        {articles.map((article, index) => (
          <article
            key={index}
            className="bg-white flex flex-col md:flex-row border-b border-gray-300 py-4 px-2 sm:px-4"
            role="article"
          >
            <div className="flex-1 pl-4 pr-8">
              <span className="uppercase text-sm text-gray-600 font-medium mb-2">
                {article.section_name || "General"}
              </span>
              {/* Titolo */}
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                <a
                  href={article.web_url} 
                  target="_blank"          
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600"
                >
                  {article.headline?.main}
                </a>
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-5 overflow-hidden">
                {article.abstract || article.lead_paragraph}
              </p>
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <div className="mr-4">
                  <span>{article.byline?.original}</span>
                </div>
                <div>
                  <span>{formatDate(article.pub_date)}</span>
                </div>
              </div>
            </div>

            <img
              src={
                article.multimedia?.[0]?.url
                  ? `https://www.nytimes.com/${article.multimedia[0].url}`
                  : "https://images.unsplash.com/photo-1633613286991-611fe299c4be"
              }
              alt={article.headline?.main || "Article image"}
              className="w-full md:w-[205px] h-[195px] object-cover md:ml-4 mt-4 md:mt-0"
              onError={(e) => {
                e.target.onerror = null;
              }}
            />
          </article>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;
