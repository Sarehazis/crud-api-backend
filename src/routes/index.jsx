import { Route, Routes } from "react-router-dom";
import PostIndex from "../views/post/index.jsx";
import PostCreate from "../views/post/create.jsx";
import PostEdit from "../views/post/edit.jsx";
import ArtikelIndex from "../views/artikel/index.jsx";
import ArtikelEdit from "../views/artikel/edit.jsx";
import ArtikelCreate from "../views/artikel/create.jsx";
import Login from "../views/Login.jsx";
import Dashboard from "../views/Dashboard.jsx";
import Register from "../views/Register.jsx";

function RoutesIndex() {
  return (
    <Routes>
      {/* Home routing */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard routing */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Auth routing */}

      {/* Post routing */}
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
