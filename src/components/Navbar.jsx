import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  // Mendapatkan navigate dari useNavigate untuk digunakan pada tombol logout
  const navigate = useNavigate();

  // Fungsi logout yang menghapus token dari localStorage dan mengarahkan kembali ke halaman login
  const handleLogout = () => {
    // Menghapus token dari localStorage
    localStorage.removeItem("token");

    // Arahkan pengguna kembali ke halaman login
    navigate("/");
  };

  // Memeriksa apakah pengguna sudah login berdasarkan keberadaan token di localStorage
  const isAuthenticated = localStorage.getItem("token");

  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container">
        <Link to="/dashboard" className="navbar-brand">
          HOME
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/posts" className="nav-link active" aria-current="page">
                Posts
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/artikels"
                className="nav-link active"
                aria-current="page"
              >
                Artikel
              </Link>
            </li>
          </ul>

          {/* Menampilkan tombol logout hanya jika pengguna sudah login */}
          {isAuthenticated && (
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
