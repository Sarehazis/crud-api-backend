// Import hooks
import { useState } from "react";
// Import hook useNavigate dari react-router-dom
import { useNavigate } from "react-router-dom";
// Import axios
import axios from "axios";

function Register() {
  // Define state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  // Define state validation
  const [validation, setValidation] = useState([]);

  // Define navigate using useNavigate()
  const navigate = useNavigate();

  // Function "registerHandler"
  const registerHandler = async (e) => {
    e.preventDefault();

    // Initialize formData
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", passwordConfirmation);

    try {
      // Send data to the server
      await axios.post("http://localhost:8000/api/register", formData);

      // If successful, redirect to the login page
      navigate("/"); // Use navigate instead of history.push()
    } catch (error) {
      // Handle error and set validation state
      setValidation(error.response.data);
    }
  };

  return (
    <div className="container" style={{ marginTop: "120px" }}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-body">
              <h4 className="fw-bold">HALAMAN REGISTER</h4>
              <hr />
              <form onSubmit={registerHandler}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">NAMA LENGKAP</label>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Masukkan Nama Lengkap"
                      />
                    </div>
                    {validation.name && (
                      <div className="alert alert-danger">
                        {validation.name[0]}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
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
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
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
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">KONFIRMASI PASSWORD</label>
                      <input
                        type="password"
                        className="form-control"
                        value={passwordConfirmation}
                        onChange={(e) =>
                          setPasswordConfirmation(e.target.value)
                        }
                        placeholder="Masukkan Konfirmasi Password"
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  REGISTER
                </button>
              </form>
              <div className="mt-3">
                <p>
                  Sudah punya akun?{" "}
                  <button
                    className="btn btn-link"
                    onClick={() => navigate("/")}
                  >
                    Login di sini
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

export default Register;
