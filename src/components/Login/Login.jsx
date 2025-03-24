import React, { useState } from "react";
import "./login.scss";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { loginApiCall } from "../../utils/Api";
import TextField from "@mui/material/TextField";

export default function Login() {
  const [error, setError] = useState({ emailErr: "", passwordErr: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleLogin = async (e) => {
    e.preventDefault();


    if (!email.length) {
      setError((prev) => ({ ...prev, emailErr: "Please enter your email." }));
      return;
    } else if (!emailRegex.test(email)) {
      setError((prev) => ({ ...prev, emailErr: "Invalid email format." }));
      return;
    }

    if (!password.length) {
      setError((prev) => ({ ...prev, passwordErr: "Please enter your password." }));
      return;
    }
    try {
      const response = await loginApiCall({ email, password });
      if (response.data.success) {

        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);

        navigate("/dashboard/notes");
      } else {
        setError((prev) => ({
          ...prev,
          passwordErr: "Invalid email or password.",
        }));
      }
    } catch (err) {
      console.error("Login error:", err);
      setError((prev) => ({
        ...prev,
        passwordErr: "Something went wrong. Please try again.",
      }));
    }
  };

  return (
    <div className="login-page">
      <div className="login-main-cnt">
        <div className="login-box">
          <h2 className="brand-name">Fundo</h2>
          <h3 className="login-title">Sign in</h3>
          <p className="login-subtext">Use your Fundo Account</p>
  
          <form onSubmit={handleLogin}>
            <TextField
              id="email"
              label="Email or phone*"
              variant="outlined"
              className="login-ip-field-cnt"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error.emailErr}
              helperText={error.emailErr}
            />
  
            <TextField
              id="password"
              label="Password*"
              variant="outlined"
              className="login-ip-field-cnt"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!error.passwordErr}
              helperText={error.passwordErr}
            />
            <a href="#" className="forgot-password">
              Forgot password?
            </a>
  
            <div className="login-bottom">
              <Link to="/signup" className="create-account">
                Create account
              </Link>
              <Button className="login-btn" variant="contained" type="submit">
                Login
              </Button>
            </div>
          </form>
        </div>
        <div className="footer">
          <span>English (United States)</span>
          <a href="#">Help</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>
    </div>
  );
  
}
