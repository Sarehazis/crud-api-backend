//import useState dan useEffect
import { useState, useEffect } from "react";

//import api
import api from "../../api";

//import Link
import { Link } from "react-router-dom";

// import navbar
import Navbar from "../../components/Navbar";

export default function PostIndex() {
  // State untuk menyimpan daftar post
  const [posts, setPosts] = useState([]);

  // Method untuk fetch data posts
  const fetchDataPosts = async () => {
    try {
      const response = await api.get("/api/posts");
      // console.log(response.data); // Untuk memastikan data yang diterima
      // Ambil array `data` dari `resource` di respons JSON
      setPosts(response.data.data.resource.data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Hook useEffect untuk memanggil fetchDataPosts
  useEffect(() => {
    fetchDataPosts();
  }, []);

  // Method deletePost untuk menghapus post
  const deletePost = async (id) => {
    try {
      await api.delete(`/api/posts/${id}`);
      fetchDataPosts();
    } catch (error) {
      console.error("Error deleting post:", error.response?.data || error);
      alert("Failed to delete post. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      {/* Tampilkan daftar post */}
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-12">
            <Link
              to="/posts/create"
              className="btn btn-md btn-success rounded shadow border-0 mb-3"
            >
              ADD NEW POST
            </Link>
            <div className="card border-0 rounded shadow">
              <div className="card-body">
                <table className="table table-bordered">
                  <thead className="bg-dark text-white">
                    <tr>
                      <th scope="col">Image</th>
                      <th scope="col">Title</th>
                      <th scope="col">Content</th>
                      <th scope="col" style={{ width: "15%" }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.length > 0 ? (
                      posts.map((post) => (
                        <tr key={post.id}>
                          <td className="text-center">
                            <img
                              src={post.image}
                              alt={post.title}
                              width="200"
                              className="rounded"
                            />
                          </td>
                          <td>{post.title}</td>
                          <td>{post.content}</td>
                          <td className="text-center">
                            <Link
                              to={`/posts/edit/${post.id}`}
                              className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2"
                            >
                              EDIT
                            </Link>
                            <button
                              onClick={() => deletePost(post.id)}
                              className="btn btn-sm btn-danger rounded-sm shadow border-0"
                            >
                              DELETE
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          <div className="alert alert-danger mb-0">
                            Data Belum Tersedia!
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
