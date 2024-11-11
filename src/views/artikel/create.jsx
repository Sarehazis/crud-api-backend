import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

export default function ArtikelCreate() {
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false); // State untuk loading
  const navigate = useNavigate();

  // Fungsi untuk menyimpan artikel
  const storeArtikel = async (e) => {
    e.preventDefault();

    // Validasi form sebelum mengirim data
    if (!judul || !isi) {
      setErrors({
        judul: ["Judul harus diisi!"],
        isi: ["Isi artikel harus diisi!"],
      });
      return;
    }

    const data = {
      judul: judul,
      isi: isi,
    };

    setLoading(true); // Mengaktifkan loading sebelum mengirim request

    try {
      // Mengirim request ke API
      await api.post("/api/artikels", data);
      navigate("/artikels"); // Jika berhasil, navigasi ke halaman artikel
    } catch (error) {
      // Menangani error dari backend
      if (error.response && error.response.data) {
        setErrors(error.response.data); // Menyimpan error response
        console.error("Error response from backend:", error.response.data); // Log response dari backend
      }
    } finally {
      setLoading(false); // Menonaktifkan loading setelah request selesai
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Create Artikel</h2>
            </div>
            <div className="card-body">
              <form onSubmit={storeArtikel}>
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
                    <span className="text-danger">{errors.judul[0]}</span>
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
                    <span className="text-danger">{errors.isi[0]}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading} // Menonaktifkan tombol saat loading
                >
                  {loading ? "Menyimpan..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
