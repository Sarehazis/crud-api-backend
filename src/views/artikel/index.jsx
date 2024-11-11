import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api"; // pastikan api sudah benar diatur

export default function ArtikelIndex() {
  const [artikel, setArtikel] = useState([]);

  // Fungsi untuk mengambil data artikel
  const fetchDataArtikel = async () => {
    try {
      const response = await api.get("/api/artikels");
      console.log(response.data); // untuk debugging
      // Mengambil data artikel dari response.data.resource.data
      setArtikel(response.data.data.resource.data || []); // Update state dengan data artikel
    } catch (error) {
      console.error("Error fetching artikel:", error);
    }
  };

  // Memanggil fetchDataArtikel saat komponen pertama kali dirender
  useEffect(() => {
    fetchDataArtikel();
  }, []);

  // Fungsi untuk menghapus artikel
  const deleteArtikel = async (id) => {
    try {
      await api.delete(`/api/artikels/${id}`);
      fetchDataArtikel(); // Memperbarui daftar setelah dihapus
    } catch (error) {
      console.error("Error deleting artikel:", error.response?.data || error);
      alert("Failed to delete artikel. Please try again.");
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div>
          <Link to="/artikels/create" className="btn btn-primary">
            Tambah Artikel
          </Link>
        </div>
        <div className="col-md-12">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>No</th>
                <th>Judul</th>
                <th>Isi</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {artikel.map((artikel, index) => (
                <tr key={artikel.id}>
                  <td>{index + 1}</td>
                  <td>{artikel.judul}</td>
                  <td>{artikel.isi}</td>
                  <td>
                    <Link
                      to={`/artikels/edit/${artikel.id}`}
                      className="btn btn-warning me-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteArtikel(artikel.id)}
                      className="btn btn-danger me-2"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
