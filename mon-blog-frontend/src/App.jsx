import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Article from "./pages/Article";

function App() {
  return (
    <div>
      <nav style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
        <Link to="/" style={{ marginRight: "15px" }}>Accueil</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:slug" element={<Article />} />
      </Routes>
    </div>
  );
}

export default App;
