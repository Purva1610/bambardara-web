import { useState } from "react";
import "../style/forgotpassword.css";
import backgroundVideo from "../assets/mountains1-optimized.mp4";

function ForgotPassword({ onBackToLogin }) {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    console.log("Reset password for:", email);

    setMessage(
      "If this email is registered, a password reset link will be sent."
    );
  };

  return (

    <div className="forgot-container">
      <video
        className="forgot-background-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="forgot-video-overlay"></div>

      {/* LEFT */}

      <div className="forgot-welcome">

        <div className="forgot-welcome-content">

         
          <p className="forgot-label">
            CUSTOMER RELATIONSHIP MANAGEMENT
          </p>

          <h1>
            Forgot Your
            <br />
            Password?
          </h1>

          <p>
            Don't worry! Enter your registered email
            address and we'll help you recover your account.
          </p>

        </div>

      </div>


      {/* RIGHT */}

      <div className="forgot-section">

        <div className="forgot-card">

          <h2>
            Reset Password
          </h2>

          <p className="forgot-subtitle">
            Enter your registered email address
            and we'll send you a password reset link.
          </p>


          {message && (
            <div className="success-message">
              ✓ {message}
            </div>
          )}


          {error && (
            <div className="error-message">
              ! {error}
            </div>
          )}


          <form onSubmit={handleSubmit}>

            <div className="forgot-input">

              <label htmlFor="forgot-email">
                Email Address
              </label>

              <input
                id="forgot-email"
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </div>


            <button
              type="submit"
              className="reset-button"
            >
              Send Reset Link
              <span>→</span>
            </button>

          </form>


          <button
            type="button"
            className="back-button"
            onClick={onBackToLogin}
          >
            ← Back to Login
          </button>

        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;