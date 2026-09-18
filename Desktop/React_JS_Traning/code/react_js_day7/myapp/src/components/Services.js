import React from "react";

const Services = () => {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Our Services</h1>
      <div className="row">
        {/* Service 1 */}
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Web Development</h5>
              <p className="card-text">
                We build responsive and modern websites tailored to your business needs.
              </p>
            </div>
          </div>
        </div>

        {/* Service 2 */}
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Mobile Apps</h5>
              <p className="card-text">
                Our team creates user-friendly mobile applications for both Android and iOS.
              </p>
            </div>
          </div>
        </div>

        {/* Service 3 */}
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Digital Marketing</h5>
              <p className="card-text">
                We help you grow your online presence and reach more customers effectively.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
