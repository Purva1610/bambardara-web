import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3">
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-md-4 mb-3">
            <h5>About</h5>
            <p>
              We are committed to delivering quality services and solutions that
              help our clients succeed in their goals.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-light text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-light text-decoration-none">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="text-light text-decoration-none">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-md-4 mb-3">
            <h5>Contact</h5>
            <p>Email: info@example.com</p>
            <p>Phone: +91 12345 67890</p>
            <p>Address: Mumbai, India</p>
          </div>
        </div>

        <hr className="border-light" />
        <p className="text-center mb-0">
          &copy; {new Date().getFullYear()} MyCompany. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
