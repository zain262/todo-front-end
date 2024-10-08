import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RoleContext } from "../App";
import "./Login.css";

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setRole } = useContext(RoleContext);

  const nav = useNavigate();

  const login = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "https://todo-backend-teal-kappa.vercel.app/api/v1/user/login",
        {
          username: user,
          password: password,
        }
      );

      setRole(res.data.role);

      nav("/dashboard");
    } catch (err) {
      console.log(err);
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  const register = () => {
    nav("/register");
  };

  return (
    <div className="login-page">
      <p>Welcome! Please Log-in</p>
      {error && <p className="error-message">{error}</p>}{" "}
      <label>Username</label>
      <input
        type="text"
        onChange={(e) => setUser(e.target.value)}
        className="input-field"
      />
      <label>Password</label>
      <input
        className="input-field"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <button
          onClick={login}
          className="login-button-class"
          disabled={loading}
        >
          {loading ? "Logging In..." : "Log In"}
        </button>
        <button onClick={register} className="login-button-class">
          Register
        </button>
      </div>
    </div>
  );
}

export default Login;
