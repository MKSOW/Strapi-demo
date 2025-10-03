import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/Home.css";

function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    api
      .get("/articles?filters[publishedAt][$notNull]=true&populate=*")
      .then((res) => {
        console.log("Réponse API :", res.data);
        setArticles(res.data.data);
      })
      .catch((err) => console.error("Erreur API:", err));
  }, []);

  return (
    <div className="home-container">
      <h1>Articles publiés</h1>
      <div className="articles-grid">
        {articles.map((article) => {
          const coverImage = article.coverImage?.url;
          const author = article.author?.username || "Inconnu";

          return (
            <div key={article.documentId} className="article-card">
              {coverImage && (
                <img
                  src={`http://localhost:1337${coverImage}`}
                  alt={article.title}
                  className="article-image"
                />
              )}
              <h2 className="article-title">{article.title}</h2>
              <p className="article-meta">
                ✍️ {author} <br />
                📅{" "}
                {article.publishedAt
                  ? new Date(article.publishedAt).toLocaleDateString("fr-FR")
                  : "Date inconnue"}
              </p>
              <Link to={`/article/${article.slug}`} style={{ color: "blue" }}>
                Lire l’article →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
