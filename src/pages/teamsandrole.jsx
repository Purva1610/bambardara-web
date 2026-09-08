import { useEffect, useState } from "react";
import "../style/teamsandroles.css";

function TeamsAndRoles() {
  const [activeDepartment, setActiveDepartment] = useState("All");
  const [activeRole, setActiveRole] = useState("All");
  const [search, setSearch] = useState("");
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [managedMember, setManagedMember] = useState(null);
  const [roles, setRoles] = useState([
    "Project Manager",
    "Operations Manager",
    "Farm Manager",
    "Finance Lead",
    "Marketing Lead",
    "Team Member",
  ]);
  const [newMember, setNewMember] = useState({
    name: "",
    department: "Construction",
    role: "",
    access: "Viewer",
  });
  const [newRole, setNewRole] = useState({ name: "", access: "Viewer" });

  const [members, setMembers] = useState(() => {
    const savedMembers = localStorage.getItem("teams-members");

    if (savedMembers) {
      try {
        return JSON.parse(savedMembers);
      } catch {
        localStorage.removeItem("teams-members");
      }
    }

    return [
    {
      id: 1,
      name: "Aarav Sharma",
      department: "Construction",
      role: "Project Manager",
      access: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Mehta",
      department: "Hospitality",
      role: "Operations Manager",
      access: "Manager",
      status: "Active",
    },
    {
      id: 3,
      name: "Rahul Patil",
      department: "Farm Ops",
      role: "Farm Manager",
      access: "Manager",
      status: "Active",
    },
    {
      id: 4,
      name: "Sneha Joshi",
      department: "Finance",
      role: "Finance Lead",
      access: "Manager",
      status: "Active",
    },
    {
      id: 5,
      name: "Vikram Desai",
      department: "Marketing",
      role: "Marketing Lead",
      access: "Editor",
      status: "Active",
    },
    ];
  });

  useEffect(() => {
    localStorage.setItem("teams-members", JSON.stringify(members));
  }, [members]);

  const [departments, setDepartments] = useState([
    {
      name: "Construction",
      progress: 82,
      members: 18,
    },
    {
      name: "Hospitality",
      progress: 74,
      members: 14,
    },
    {
      name: "Farm Ops",
      progress: 68,
      members: 11,
    },
    {
      name: "Finance",
      progress: 91,
      members: 8,
    },
    {
      name: "Marketing",
      progress: 76,
      members: 12,
    },
  ]);

  const accessProgressImpact = {
    Viewer: -2,
    Editor: 0,
    Manager: 2,
    Admin: 4,
  };

  const changeProgress = (departmentName, amount) => {
    setDepartments((currentDepartments) =>
      currentDepartments.map((department) => {
        if (department.name !== departmentName) {
          return department;
        }

        return {
          ...department,
          progress: Math.min(100, Math.max(0, department.progress + amount)),
        };
      })
    );
  };

  const changeProgressForAccess = (departmentName, access, multiplier = 1) => {
    changeProgress(
      departmentName,
      (accessProgressImpact[access] || 0) * multiplier
    );
  };

  const addMember = (event) => {
    event.preventDefault();

    const member = {
      id: Date.now(),
      name: newMember.name.trim(),
      department: newMember.department,
      role: newMember.role.trim(),
      access: newMember.access,
      status: "Active",
    };

    setMembers([...members, member]);
    changeProgressForAccess(member.department, member.access);
    setNewMember({
      name: "",
      department: "Construction",
      role: "",
      access: "Viewer",
    });
    setIsAddMemberOpen(false);
  };

  const saveManagedMember = (event) => {
    event.preventDefault();
    const previousMember = members.find(
      (member) => member.id === managedMember.id
    );

    setMembers((currentMembers) =>
      currentMembers.map((member) =>
        member.id === managedMember.id ? managedMember : member
      )
    );

    if (previousMember.department === managedMember.department) {
      changeProgressForAccess(
        managedMember.department,
        managedMember.access,
        1
      );
      changeProgressForAccess(
        previousMember.department,
        previousMember.access,
        -1
      );
    } else {
      changeProgressForAccess(
        previousMember.department,
        previousMember.access,
        -1
      );
      changeProgressForAccess(
        managedMember.department,
        managedMember.access,
        1
      );
    }

    setManagedMember(null);
  };

  const addRole = (event) => {
    event.preventDefault();
    const roleName = newRole.name.trim();

    if (!roles.some((role) => role.toLowerCase() === roleName.toLowerCase())) {
      setRoles((currentRoles) => [...currentRoles, roleName]);
    }

    setActiveRole(roleName);
    setNewRole({ name: "", access: "Viewer" });
    setIsAddRoleOpen(false);
  };

  const filteredMembers = members.filter((member) => {
    const matchesDepartment =
      activeDepartment === "All" ||
      member.department === activeDepartment;

    const matchesSearch =
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.role.toLowerCase().includes(search.toLowerCase());

    const matchesRole = activeRole === "All" || member.role === activeRole;

    return matchesDepartment && matchesSearch && matchesRole;
  });

  return (
    <div className="teams-page">

      {/* HEADER */}
      <div className="teams-header">
        <div>
          <h1>Teams & Roles</h1>
          <p>Manage departments, members and access permissions</p>
        </div>
      </div>

      {/* DEPARTMENT PROGRESS */}
      <section className="department-section">

        <div className="section-title">
          <div>
            <h2>Department Progress</h2>
            <p>Real-time department activity</p>
          </div>

          <span className="live-indicator">
            <span></span> LIVE
          </span>
        </div>

        <div className="department-grid">

          {departments.map((department) => (
            <div
              className="department-card"
              key={department.name}
            >

              <div className="department-top">
                <div>
                  <h3>{department.name}</h3>
                  <p>{department.members} active members</p>
                </div>

                <strong>{department.progress}%</strong>
              </div>

              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{
                    width: `${department.progress}%`,
                  }}
                >
                  <span className="active-dot"></span>
                </div>
              </div>

              <div className="progress-footer">
                <span>Active</span>
                <span>Target 100%</span>
              </div>

            </div>
          ))}

        </div>
      </section>

      {/* ROLE ACCESS */}
      <section className="roles-section">

        <div className="roles-header">

          <div>
            <h2>Role Access</h2>
            <p>Manage team members and their permissions</p>
          </div>

          <div className="roles-actions">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search members..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              className="add-member-btn"
              type="button"
              onClick={() => setIsAddMemberOpen(true)}
            >
              + Add Member
            </button>
          </div>

        </div>

        {/* DEPARTMENT FILTER */}

        <div className="department-filter">

          <button
            className={activeDepartment === "All" ? "filter-active" : ""}
            onClick={() => setActiveDepartment("All")}
          >
            All
          </button>

          {departments.map((department) => (
            <button
              key={department.name}
              className={
                activeDepartment === department.name
                  ? "filter-active"
                  : ""
              }
              onClick={() =>
                setActiveDepartment(department.name)
              }
            >
              {department.name}
            </button>
          ))}

        </div>

        <div className="role-filter" aria-label="Filter by role">
          <button
            className={activeRole === "All" ? "filter-active" : ""}
            type="button"
            onClick={() => setActiveRole("All")}
          >
            All Roles
          </button>

          {roles.map((role) => (
            <button
              key={role}
              className={activeRole === role ? "filter-active" : ""}
              type="button"
              onClick={() => setActiveRole(role)}
            >
              {role}
            </button>
          ))}

          <button
            className="add-role-btn"
            type="button"
            onClick={() => setIsAddRoleOpen(true)}
          >
            + Add Role
          </button>
        </div>

        {/* TABLE */}

        <div className="members-table">

          <div className="table-header">
            <span>Name</span>
            <span>Department</span>
            <span>Role</span>
            <span>Access Level</span>
            <span>Status</span>
            <span>Action</span>
          </div>

          {filteredMembers.map((member) => (

            <div className="member-row" key={member.id}>

              <div className="member-name">
                <div className="avatar">
                  {member.name.charAt(0)}
                </div>

                <div>
                  <strong>{member.name}</strong>
                  <small>Team Member</small>
                </div>
              </div>

              <span>{member.department}</span>

              <span>{member.role}</span>

              <span>
                <span
                  className={`access-badge ${member.access.toLowerCase()}`}
                >
                  {member.access}
                </span>
              </span>

              <span>
                <span
                  className={`status-badge ${member.status.toLowerCase()}`}
                >
                  <span></span>
                  {member.status}
                </span>
              </span>

              <button
                className="manage-btn"
                type="button"
                onClick={() => setManagedMember({ ...member })}
              >
                Manage
              </button>

            </div>

          ))}

          {filteredMembers.length === 0 && (
            <div className="no-members">
              No members found
            </div>
          )}

        </div>

      </section>

      {isAddMemberOpen && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsAddMemberOpen(false);
            }
          }}
        >
          <form className="add-member-modal" onSubmit={addMember}>
            <div className="modal-header">
              <div>
                <h2>Add team member</h2>
                <p>Create a profile and assign their access level.</p>
              </div>
              <button
                className="modal-close-btn"
                type="button"
                aria-label="Close add member form"
                onClick={() => setIsAddMemberOpen(false)}
              >
                x
              </button>
            </div>

            <label>
              Full name
              <input
                required
                type="text"
                placeholder="e.g. Anika Rao"
                value={newMember.name}
                onChange={(event) =>
                  setNewMember({ ...newMember, name: event.target.value })
                }
              />
            </label>

            <label>
              Department
              <select
                value={newMember.department}
                onChange={(event) =>
                  setNewMember({
                    ...newMember,
                    department: event.target.value,
                  })
                }
              >
                {departments.map((department) => (
                  <option key={department.name} value={department.name}>
                    {department.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Role
              <select
                required
                value={newMember.role}
                onChange={(event) =>
                  setNewMember({ ...newMember, role: event.target.value })
                }
              >
                <option value="" disabled>
                  Select a role
                </option>
                {roles.map((role) => (
                  <option key={role}>{role}</option>
                ))}
              </select>
            </label>

            <label>
              Access level
              <select
                value={newMember.access}
                onChange={(event) =>
                  setNewMember({ ...newMember, access: event.target.value })
                }
              >
                <option>Viewer</option>
                <option>Editor</option>
                <option>Manager</option>
                <option>Admin</option>
              </select>
            </label>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                type="button"
                onClick={() => setIsAddMemberOpen(false)}
              >
                Cancel
              </button>
              <button className="save-member-btn" type="submit">
                Add member
              </button>
            </div>
          </form>
        </div>
      )}

      {managedMember && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setManagedMember(null);
            }
          }}
        >
          <form className="add-member-modal" onSubmit={saveManagedMember}>
            <div className="modal-header">
              <div>
                <h2>Manage member</h2>
                <p>Update this member's team details and permissions.</p>
              </div>
              <button
                className="modal-close-btn"
                type="button"
                aria-label="Close manage member form"
                onClick={() => setManagedMember(null)}
              >
                x
              </button>
            </div>

            <label>
              Full name
              <input
                required
                type="text"
                value={managedMember.name}
                onChange={(event) =>
                  setManagedMember({
                    ...managedMember,
                    name: event.target.value,
                  })
                }
              />
            </label>

            <label>
              Department
              <select
                value={managedMember.department}
                onChange={(event) =>
                  setManagedMember({
                    ...managedMember,
                    department: event.target.value,
                  })
                }
              >
                {departments.map((department) => (
                  <option key={department.name} value={department.name}>
                    {department.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Role
              <select
                required
                value={managedMember.role}
                onChange={(event) =>
                  setManagedMember({
                    ...managedMember,
                    role: event.target.value,
                  })
                }
              >
                {roles.map((role) => (
                  <option key={role}>{role}</option>
                ))}
              </select>
            </label>

            <label>
              Access level
              <select
                value={managedMember.access}
                onChange={(event) =>
                  setManagedMember({
                    ...managedMember,
                    access: event.target.value,
                  })
                }
              >
                <option>Viewer</option>
                <option>Editor</option>
                <option>Manager</option>
                <option>Admin</option>
              </select>
            </label>

            <label>
              Status
              <select
                value={managedMember.status}
                onChange={(event) =>
                  setManagedMember({
                    ...managedMember,
                    status: event.target.value,
                  })
                }
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </label>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                type="button"
                onClick={() => setManagedMember(null)}
              >
                Cancel
              </button>
              <button className="save-member-btn" type="submit">
                Save changes
              </button>
            </div>
          </form>
        </div>
      )}

      {isAddRoleOpen && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsAddRoleOpen(false);
            }
          }}
        >
          <form className="add-member-modal" onSubmit={addRole}>
            <div className="modal-header">
              <div>
                <h2>Add role</h2>
                <p>Create a role option for your team members.</p>
              </div>
              <button
                className="modal-close-btn"
                type="button"
                aria-label="Close add role form"
                onClick={() => setIsAddRoleOpen(false)}
              >
                x
              </button>
            </div>

            <label>
              Role name
              <input
                required
                type="text"
                placeholder="e.g. Site Supervisor"
                value={newRole.name}
                onChange={(event) =>
                  setNewRole({ ...newRole, name: event.target.value })
                }
              />
            </label>

            <label>
              Default access level
              <select
                value={newRole.access}
                onChange={(event) =>
                  setNewRole({ ...newRole, access: event.target.value })
                }
              >
                <option>Viewer</option>
                <option>Editor</option>
                <option>Manager</option>
                <option>Admin</option>
              </select>
            </label>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                type="button"
                onClick={() => setIsAddRoleOpen(false)}
              >
                Cancel
              </button>
              <button className="save-member-btn" type="submit">
                Add role
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}

export default TeamsAndRoles;