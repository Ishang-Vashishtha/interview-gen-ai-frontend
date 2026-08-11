import React, { useState } from "react";
import "../auth.form.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const { loading, handleRegister, handleVerifyRegisterOtp } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("register");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      if (step === "register") {
        const data = await handleRegister({ username, email, password });
        setStep("verify");
        setMessage(data?.message || "OTP sent to your email.");
        return;
      }

      await handleVerifyRegisterOtp({ email, otp });
      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  if (loading) {
    return (
      <main>
        <h1>Loading.......</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handelSubmit}>
          {step === "register" ? (
            <>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  placeholder="Enter a username"
                />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="Enter a email address"
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="password"
                />
              </div>
              <button className="button primary-button">Send OTP</button>
            </>
          ) : (
            <>
              <p>
                We sent a verification code to <strong>{email}</strong>.
              </p>
              <div className="input-group">
                <label htmlFor="otp">OTP</label>
                <input
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                  type="text"
                  id="otp"
                  name="otp"
                  value={otp}
                  placeholder="Enter the 6 digit code"
                />
              </div>
              <button className="button primary-button">Verify OTP</button>
            </>
          )}
        </form>
        {message ? <p>{message}</p> : null}
        {error ? <p>{error}</p> : null}
        <p>
          Already have an account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
