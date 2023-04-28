import React, { useState, useEffect } from "react";
import copy from "../assets/copy.svg";
import linkIcon from "../assets/link.svg";
import loader from "../assets/loader.svg";
import tick from "../assets/tick.svg";
import { useLazyGetSummaryQuery } from "../services/article";

interface Article {
  url: string;
  summary: string;
}

const Demo: React.FC = () => {
  const [article, setArticle] = useState<Article>({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState<Article[]>([]);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const [copied, setCopied] = useState<string>("");

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles") || "[]"
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await getSummary({
      articleUrl: article.url,
    });
    if (data?.summary) {
      const newArticle: Article = { ...article, summary: data.summary };

      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  const handleCopy = (copyUrl: string) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(""), 3000);
  };
  return (
    <section className="">
      <div className="">
        {/* INPUT */}
        <form onSubmit={handleSubmit} className="form_field">
          <div className="form_field_1">
            <img src={linkIcon} alt="Link" className="link_icon" />
            <input
              type="url"
              placeholder="Enter your URL"
              value={article.url}
              onChange={(e) => setArticle({ ...article, url: e.target.value })}
              required
              className="url_input"
            />
          </div>
          <button type="submit" className="submit_btn">
            ⎆
          </button>
        </form>
        {/* URL HISTORY */}
        <div className="history_cards">
          {allArticles.map((item, index) => (
            <div
              key={`link- ${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img src={copied === item.url ? tick : copy} alt="copy_icon" />
              </div>
              <p className="link_card_url">
                {/* {item.url.length > 30 ? item.url.substring(0, 80) + '...' : item.url} */}
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* DISPLAY RESULTS */}
      <div className="results_card">
        {isFetching ? (
          <div className="loader_wrapper">
            <img src={loader} alt="loader" className="loader_image" />
          </div>
        ) : error ? (
          <p className="error_msg">
            An error accrued... please try again
            <br />
            <span className="">{/* {error?.data?.error} */}</span>
          </p>
        ) : (
          article.summary && (
            <div className="article_summary">
              <h2 className="">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="summary_text">{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
