import React, { useState } from "react";
import "./Login.scss";
import newRequest from "../../utils/newRequest";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
  
      if (err.response) {
        console.log("Server Response:", err.response.data);
        console.log("Status Code:", err.response.status);
        console.log("Status Text:", err.response.statusText);
  
        // Handle the specific error messages from the server
        if (err.response.data.error === 'Wrong password or username!') {
          setError("Invalid password. Please try again.");
        } else if (err.response.status === 404) {
          setError("User not found. Please check your username.");
        } else {
          setError("An error occurred. Please try again later.");
        }
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };
  
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <input
          name="username"
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="login-button">Login</button>
        {error && <p className="error-message">{error}</p>}
        <p>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;