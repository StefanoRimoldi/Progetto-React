import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useFetchData = (url) => {
  const [articles, setArticles] = useState([]);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoad(false);

    axios
      .get(url)
      .then((res) => {
        setArticles(res.data);
        setLoad(true);
      })
      .catch((err) => {
        // console.log(err);
        navigate(`*`);
      });
  }, [navigate, url]);

  return { load, articles };
};
