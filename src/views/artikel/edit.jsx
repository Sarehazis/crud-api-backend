import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";

export default function ArtikelEdit() {
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetching detail artikel saat halaman pertama kali dimuat
  const fetchDetailArtikel = async () => {
    try {
      const response = await api.get(`/api/artikels/${id}`);
      console.log("Response:", response.data); // Debugging untuk melihat data
      setJudul(response.data.data.judul || ""); // Jika tidak ada judul, set ke string kosong
      setIsi(response.data.data.isi || ""); // Jika tidak ada isi, set ke string kosong
    } catch (error) {
      console.error("Error fetching article:", error);
    }
  };

  useEffect(() => {
    fetchDetailArtikel();
  }, []);

  // Fungsi untuk mengupdate artikel
  const updateArtikel = async (e) => {
    e.preventDefault();

    const data = {
      judul: judul, // Pastikan judul tidak kosong
      isi: isi, // Pastikan isi tidak kosong
    };

    try {
      await api.put(`/api/artikels/${id}`, data); // Kirim data sebagai JSON
      navigate("/artikels");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data); // Menyimpan error response
        console.error("Error response from backend:", error.response.data); // Log response dari backend
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Edit Artikel</div>
            <div className="card-body">
              <form onSubmit={updateArtikel}>
                <div className="mb-3">
                  <label htmlFor="judul" className="form-label">
                    Judul
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="judul"
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                  />
                  {errors.judul && (
                    <div className="alert alert-danger">{errors.judul}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="isi" className="form-label">
                    Isi
                  </label>
                  <textarea
                    className="form-control"
                    id="isi"
                    value={isi}
                    onChange={(e) => setIsi(e.target.value)}
                  />
                  {errors.isi && (
                    <div className="alert alert-danger">{errors.isi}</div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary">
                  Simpan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
