import React, { useState, useEffect } from "react";
import axios from "axios";
import { BounceLoader } from "react-spinners";
import Article from "../components/articles/OneArticle.js";
import SectionOne from "../components/articles/SectionOne.js";
import GridFourTitle from "../components/articles/GridFourTitle.js";
import TitleSlide from "../components/articles/TitleSlide.js";
import ArticleRightSlide from "../components/articles/ArticleRightSlide.js";
import ArticlesPreview from "../components/articles/ArticlesPreview.js";
import InCaseYouMissIt from "../components/articles/InCaseYouMissIt.js";
import OnlyTitle from "../components/articles/OnlyTitle.js";
import ArticleText from "../components/articles/ArticleText.js";
import SectionWell from "../components/articles/SectionWell.js";
import SectionNews from "../components/articles/SectionNews.js";
import SectionFood from "../components/articles/SectionFood.js"
import "../pages/homepage.css";

const Homepage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlHome = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=30mS33uUBWOVAYffuOfb9rpPZhDzpDjS`;


  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get(urlHome);
        setArticles(data.results || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div>
        <BounceLoader
          className="mx-auto my-36"
          color="gray"
          size={180}
          aria-label="Loading Spinner"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>
          <strong>Errore:</strong> {error.message || "Qualcosa è andato storto."}
        </p>
      </div>
    );
  }

  return (
    <div className="homepage-bottomsection">
      <div className="homepage-topsection">
        {/* Colonna sinistra */}
        <div className="left-column">
          <SectionOne articles={articles} />
          <div className="divider"></div>
          <GridFourTitle articles={articles} />
          <div className="divider"></div>
          <ArticlesPreview articles={articles} />
          <div className="divider"></div>
          <ArticleText articles={articles} />
          <div className="divider"></div>
          <ArticlesPreview articles={articles} />
        </div>

        {/* Colonna destra */}
        <div className="right-column">
          {articles.length > 1 && (
            <div className="article half-width">
              <Article
                multimedia={articles[8]?.multimedia}
                title={articles[8]?.title}
                abstract={articles[8]?.abstract}
                url={articles[8]?.url}
                byline={articles[8]?.byline}
              />
            </div>
          )}
          <ArticleRightSlide articles={articles} />
          <div className="divider"></div>
          <OnlyTitle articles={articles} />
          <div className="divider"></div>
          <TitleSlide articles={articles} />
          <div className="divider"></div>
          <InCaseYouMissIt articles={articles} />
        </div>
      </div>
      <div className="divider"></div>
      <SectionWell articles={articles} />
      <div className="divider"></div>
      <SectionFood articles={articles} />
      <div className="divider"></div>
      <SectionNews articles={articles} />     
    </div>
  );
};

export default Homepage;
