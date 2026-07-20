import { NavLink, useNavigate } from "react-router-dom";

function AdminLayout({ children }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>Portfolio</h2>

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "admin-link active" : "admin-link"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive ? "admin-link active" : "admin-link"
          }
        >
          Projects
        </NavLink>

        <NavLink
          to="/skills"
          className={({ isActive }) =>
            isActive ? "admin-link active" : "admin-link"
          }
        >
          Skills
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "admin-link active" : "admin-link"
          }
        >
          Profile
        </NavLink>

        <NavLink
          to="/messages"
          className={({ isActive }) =>
            isActive ? "admin-link active" : "admin-link"
          }
        >
          Messages
        </NavLink>

        <button type="button" className="logout-btn" onClick={logout}>
          Logout
        </button>
      </aside>

      <main className="admin-content">{children}</main>
    </div>
  );
}

export default AdminLayout;