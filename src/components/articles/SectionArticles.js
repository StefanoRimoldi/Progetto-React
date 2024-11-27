import React from "react";
import { Link } from "react-router-dom";

const SectionArticles = ({ articles, sectionName }) => {

  const sectionArticles = articles.filter(article => article.section === sectionName);

  if (sectionArticles.length === 0) {
    return null;
  }

  return (
    <div className="section">
      <h2 className="section-title">{sectionName}Articles</h2>
      

      {sectionArticles.map((article, index) => (
        <div key={index} className="article">
          <div className="text-content">
            <Link to={article.url} className="article-title">
              <h3>{article.title}</h3>
            </Link>
            <p>{article.abstract}</p>
            <p><i>{article.byline}</i></p>
          </div>
          {article.multimedia && article.multimedia[0]?.url && (
            <img
              src={article.multimedia[0].url}
              alt={article.title}
              className="article-image"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default SectionArticles;
