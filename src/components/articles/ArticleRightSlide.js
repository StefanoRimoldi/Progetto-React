import React, { useState } from "react";
import "../articles/RightSlideshow.css";

const ArticleRightSlide = ({ articles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxArticles = 4;
  const visibleArticles = 2;

  if (!articles || articles.length === 0) {
    return <div>No articles available</div>;
  }

  const filteredArticles = articles.slice(0, maxArticles);

  const nextArticle = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + visibleArticles) % filteredArticles.length
    );
  };

  const prevArticle = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - visibleArticles + filteredArticles.length) % filteredArticles.length
    );
  };

  return (
    <div className="slideshow-container">
      <div className="slideshow">
        {filteredArticles
          .slice(currentIndex, currentIndex + visibleArticles)
          .map((article, index) => (
            <div key={index} className="slideshow-item">
              <img
                src={article.multimedia && article.multimedia[0] ? article.multimedia[0].url : ""}
                alt={article.title}
                className="slideshow-image"
              />
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="slideshow-title-link">
                <h2 className="slideshow-title">{article.title}</h2>
              </a>
              <h2 className="slideshow-byline">{article.byline}</h2>
            </div>
          ))}
      </div>
      <div className="slideshow-controls">
        <button onClick={prevArticle} className="slideshow-prev">
          &#10094;
        </button>
        <button onClick={nextArticle} className="slideshow-next">
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default ArticleRightSlide;
