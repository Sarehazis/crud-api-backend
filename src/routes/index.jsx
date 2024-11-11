import { Route, Routes } from "react-router-dom";
import Home from "../views/home.jsx";
import PostIndex from "../views/post/index.jsx";
import PostCreate from "../views/post/create.jsx";
import PostEdit from "../views/post/edit.jsx";
import ArtikelIndex from "../views/artikel/index.jsx";
import ArtikelEdit from "../views/artikel/edit.jsx";
import ArtikelCreate from "../views/artikel/create.jsx";

function RoutesIndex() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts" element={<PostIndex />} />
      <Route path="/posts/create" element={<PostCreate />} />
      <Route path="/posts/edit/:id" element={<PostEdit />} />
      {/* Artikel routing */}
      <Route path="/artikels" element={<ArtikelIndex />} />
      <Route path="/artikels/create" element={<ArtikelCreate />} />
      <Route path="/artikels/edit/:id" element={<ArtikelEdit />} />
    </Routes>
  );
}

export default RoutesIndex;
