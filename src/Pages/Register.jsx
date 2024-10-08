import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Register() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [conpassword, setConpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const nav = useNavigate();

  const login = async () => {
    setLoading(true);
    setError("");

    if (password !== conpassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "https://todo-backend-teal-kappa.vercel.app/api/v1/user/signup",
        {
          username: user,
          password,
        }
      );

      console.log(res);
      setLoading(false);
      setError("");

      nav("/dashboard");
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError(err.response?.data?.message || "User already exists.");
    }
  };

  return (
    <div className="login-page">
      <p>Register Below</p>
      {error && <p style={{ color: "red" }}>{error}</p>} <label>Username</label>
      <input
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        className="input-field"
      />
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
      />
      <label>Confirm Password</label>
      <input
        className="input-field"
        type="password"
        value={conpassword}
        onChange={(e) => setConpassword(e.target.value)}
      />
      <div>
        <button
          onClick={login}
          className="login-button-class"
          disabled={loading}
        >
          {loading ? "Loading.." : "Register"}
        </button>
      </div>
    </div>
  );
}

export default Register;
