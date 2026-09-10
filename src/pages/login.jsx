import { useState } from "react";
import "../style/login.css";
import backgroundImage from "../assets/login.jpg";
import backgroundVideo from "../assets/waterfall.mp4";

function Login({ onForgotPassword, onLogin }) {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      email,
      password,
      rememberMe,
    });

    onLogin?.();
  };

  return (
    <div className="login-container">

      {/* ================= VIDEO BACKGROUND ================= */}

      <video
        className="login-background-video"
        autoPlay
        loop
        muted
        playsInline
        poster={backgroundImage}
      >
        <source
          src={backgroundVideo}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* ================= VIDEO OVERLAY ================= */}

      <div className="video-overlay"></div>


      {/* ================= LEFT SIDE ================= */}

      <div className="welcome-section">

        <div className="welcome-content">

          <p className="welcome-label">
            CUSTOMER RELATIONSHIP MANAGEMENT
          </p>

          <h1>
            Welcome To
            <br />
            Bambaddara!!
          </h1>

          <p className="welcome-description">
            Manage your business, customers, bookings
            and reports.
          </p>

        </div>

      </div>


      {/* ================= RIGHT SIDE ================= */}

      <div className="login-section">

        <div className="login-card">

          <div className="form-header">

            <h2>
              Welcome Back
            </h2>

            <p>
              Sign in to continue to your account
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            {/* EMAIL */}

            <div className="input-group">

              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />

            </div>


            {/* PASSWORD */}

            <div className="input-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="password-wrapper">

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="show-password"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  aria-pressed={showPassword}
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>


            {/* OPTIONS */}

            <div className="login-options">

              <label className="remember">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(e.target.checked)
                  }
                />

                <span>
                  Remember me
                </span>

              </label>


              <button
                type="button"
                className="forgot"
                onClick={onForgotPassword}
              >
                Forgot Password?
              </button>

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-btn"
            >
              Login
              <span>→</span>
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Login;