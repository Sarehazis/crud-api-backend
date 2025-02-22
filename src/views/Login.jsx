// Import hooks
import { useState } from "react";

// Import hook useNavigate dari react-router-dom
import { useNavigate } from "react-router-dom";

// Import axios
import axios from "axios";

function Login() {
  // Define state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Define state validation
  const [validation, setValidation] = useState([]);

  // Define navigate using useNavigate()
  const navigate = useNavigate();

  // Function "loginHandler"
  const loginHandler = async (e) => {
    e.preventDefault();

    // Initialize formData
    const formData = new FormData();

    // Append data to formData
    formData.append("email", email);
    formData.append("password", password);

    try {
      // Send data to the server
      const response = await axios.post(
        "http://localhost:8000/api/login",
        formData
      );

      // Set token in localStorage
      localStorage.setItem("token", response.data.token);

      // Redirect to dashboard
      navigate("/dashboard"); // Use navigate instead of history.push()
    } catch (error) {
      // Handle error and set validation state
      setValidation(error.response.data);
    }
  };

  return (
    <div className="container" style={{ marginTop: "120px" }}>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-body">
              <h4 className="fw-bold">HALAMAN LOGIN</h4>
              <hr />
              {validation.message && (
                <div className="alert alert-danger">{validation.message}</div>
              )}
              <form onSubmit={loginHandler}>
                <div className="mb-3">
                  <label className="form-label">ALAMAT EMAIL</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan Alamat Email"
                  />
                </div>
                {validation.email && (
                  <div className="alert alert-danger">
                    {validation.email[0]}
                  </div>
                )}
                <div className="mb-3">
                  <label className="form-label">PASSWORD</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan Password"
                  />
                </div>
                {validation.password && (
                  <div className="alert alert-danger">
                    {validation.password[0]}
                  </div>
                )}
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    LOGIN
                  </button>
                </div>
              </form>

              {/* Link to Register Page */}
              <div className="mt-3">
                <p>
                  Belum punya akun?{" "}
                  <button
                    className="btn btn-link"
                    onClick={() => navigate("/register")}
                  >
                    Daftar di sini
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
