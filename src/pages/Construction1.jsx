import React from "react";
import "../style/construction.css";

const projects = [
  {
    name: "Green Valley Residency",
    location: "Pune",
    manager: "Rahul Sharma",
    progress: 75,
    status: "In Progress",
  },
  {
    name: "Bambaddara Commercial Hub",
    location: "Mumbai",
    manager: "Amit Patil",
    progress: 55,
    status: "In Progress",
  },
  {
    name: "Sunrise Apartments",
    location: "Nashik",
    manager: "Priya Singh",
    progress: 100,
    status: "Completed",
  },
  {
    name: "City Center Mall",
    location: "Pune",
    manager: "Vikram Joshi",
    progress: 30,
    status: "Pending",
  },
];

function ConstructionDashboard() {
  return (
    <div className="construction-dashboard">

      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Construction Dashboard</h1>
          <p>
            Monitor construction projects, progress and team activities.
          </p>
        </div>

        <button className="add-project-btn">
          + Add Project
        </button>
      </div>

      {/* Statistics */}
      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon">🏗️</div>
          <div>
            <p>Total Projects</p>
            <h2>24</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔨</div>
          <div>
            <p>Active Projects</p>
            <h2>14</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div>
            <p>Completed</p>
            <h2>7</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div>
            <p>Pending Tasks</p>
            <h2>18</h2>
          </div>
        </div>

      </div>

      {/* Main Content */}
      <div className="dashboard-content">

        {/* Projects Table */}
        <div className="projects-card">

          <div className="card-header">
            <div>
              <h2>Construction Projects</h2>
              <p>Current project progress</p>
            </div>

            <button className="view-btn">
              View All
            </button>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Location</th>
                  <th>Manager</th>
                  <th>Progress</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {projects.map((project, index) => (
                  <tr key={index}>

                    <td>
                      <strong>{project.name}</strong>
                    </td>

                    <td>{project.location}</td>

                    <td>{project.manager}</td>

                    <td>
                      <div className="progress-container">
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${project.progress}%`,
                            }}
                          ></div>
                        </div>

                        <span>{project.progress}%</span>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`status ${project.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {project.status}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Project Overview */}
        <div className="side-card">

          <div className="card-header">
            <div>
              <h2>Project Overview</h2>
              <p>Overall construction progress</p>
            </div>
          </div>

          <div className="overall-progress">

            <div className="circle-progress">
              <span>68%</span>
            </div>

            <h3>Overall Progress</h3>

            <p>
              Construction projects are progressing well.
            </p>

          </div>

          <div className="overview-item">
            <span>Material Procurement</span>
            <strong>82%</strong>
          </div>

          <div className="overview-item">
            <span>Site Work</span>
            <strong>70%</strong>
          </div>

          <div className="overview-item">
            <span>Safety Compliance</span>
            <strong>94%</strong>
          </div>

        </div>

      </div>

      {/* Bottom Section */}
      <div className="bottom-grid">

        {/* Recent Activities */}
        <div className="activity-card">

          <div className="card-header">
            <div>
              <h2>Recent Activities</h2>
              <p>Latest project updates</p>
            </div>
          </div>

          <div className="activity">
            <div className="activity-dot"></div>

            <div>
              <strong>Green Valley Residency</strong>
              <p>Foundation work completed</p>
              <small>2 hours ago</small>
            </div>
          </div>

          <div className="activity">
            <div className="activity-dot"></div>

            <div>
              <strong>City Center Mall</strong>
              <p>New material delivery received</p>
              <small>5 hours ago</small>
            </div>
          </div>

          <div className="activity">
            <div className="activity-dot"></div>

            <div>
              <strong>Sunrise Apartments</strong>
              <p>Project marked as completed</p>
              <small>Yesterday</small>
            </div>
          </div>

        </div>

        {/* Team */}
        <div className="team-card">

          <div className="card-header">
            <div>
              <h2>Construction Team</h2>
              <p>Active team members</p>
            </div>
          </div>

          <div className="team-member">
            <div className="avatar">RS</div>

            <div>
              <strong>Rahul Sharma</strong>
              <p>Project Manager</p>
            </div>
          </div>

          <div className="team-member">
            <div className="avatar">AP</div>

            <div>
              <strong>Amit Patil</strong>
              <p>Site Engineer</p>
            </div>
          </div>

          <div className="team-member">
            <div className="avatar">PS</div>

            <div>
              <strong>Priya Singh</strong>
              <p>Site Supervisor</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default ConstructionDashboard;