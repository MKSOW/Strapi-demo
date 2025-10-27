import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/Article.css";
import { renderBlocks } from "../utils/renderBlocks";

function Article() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    api
      .get(
        `/articles?filters[slug][$eq]=${slug}&populate[author]=true&populate[coverImage]=true&populate[comments]=true`
      )
      .then((res) => {
        const data = res.data.data[0];
        if (data) {
          setArticle(data);
          setComments(data.comments || []);
        }
      })
      .catch((err) => console.error("Erreur API:", err));
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authorName || !content) return;

    try {
      await api.post("/comments", {
        data: {
          content,
          authorName,
          article: article.documentId,
        },
      });

      setContent("");
      setAuthorName("");

      const res = await api.get(
        `/articles?filters[documentId][$eq]=${article.documentId}&populate=comments`
      );
      setComments(res.data.data[0]?.comments || []);
    } catch (err) {
      console.error("Erreur lors de l'ajout du commentaire:", err);
    }
  };

  if (!article) return <p>Chargement...</p>;

  const coverImage = article.coverImage?.url;
  const author = article.author?.username || "Inconnu";

  return (
    <div className="article-container">
      {coverImage && (
        <img
          src={`http://localhost:1337${coverImage}`}
          alt="cover"
          className="article-cover"
        />
      )}
      <h1 className="article-title">{article.title}</h1>
      <p className="article-meta">
        ✍️ {author} <br />
        📅 {new Date(article.publishedAt).toLocaleDateString("fr-FR")}
      </p>

      {/* ✅ Ici on appelle la fonction de rendu */}
      <div className="article-content">{renderBlocks(article.content)}</div>

      <h2>Commentaires</h2>
      <ul className="comments-list">
        {comments.length > 0 ? (
          comments.map((c) => (
            <li key={c.id || c.documentId}>
              <b>{c.authorName}:</b> {c.content}
            </li>
          ))
        ) : (
          <p>Aucun commentaire pour le moment</p>
        )}
      </ul>

      <h3>Ajouter un commentaire</h3>
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          placeholder="Votre nom"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          required
        />
        <textarea
          placeholder="Votre commentaire"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default Article;
