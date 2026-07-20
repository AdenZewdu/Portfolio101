import { useEffect, useState } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
});

function ManageProjects() {
  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("");
  const [link, setLink] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const loadProjects = () => {
    fetch(`${API_BASE_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setMessage("");
      })
      .catch(() => {
        setMessage("Could not load projects. Make sure the backend is running.");
      });
  };

  useEffect(() => {
    loadProjects();
  }, []);


  const [imageUrl, setImageUrl] = useState("");


  const resetForm = () => {
    setTitle("");
    setDescription("");
    setTech("");
    setLink("");
    setImageUrl("");
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !tech.trim()) return;

    const projectData = {
    title,
    description,
    tech,
    link: link || "#",
    imageUrl,
  };

    const url = editingId
      ? `${API_BASE_URL}/api/projects/${editingId}`
      : `${API_BASE_URL}/api/projects`;

    const method = editingId ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: JSON.stringify(projectData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Project save failed");
        }

        return res.json();
      })
      .then(() => {
        resetForm();
        loadProjects();
      })
      .catch(() => {
        setMessage("Could not save project. Please log in again.");
      });
  };

  const editProject = (project) => {
    setEditingId(project.id);

    setTitle(project.title);
    setDescription(project.description);
    setTech(project.tech);
    setLink(project.link);
    setImageUrl(project.imageUrl || "");
  };

  const deleteProject = (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    fetch(`${API_BASE_URL}/api/projects/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Project delete failed");
        }

        return res.json();
      })
      .then(() => loadProjects())
      .catch(() => {
        setMessage("Could not delete project. Please log in again.");
      });
  };

  return (
    <div>
      <h1 style={{ textAlign: "left" }}>Manage Projects</h1>

      <p
        style={{
          textAlign: "left",
          margin: "10px 0 35px",
          color: "#666",
          maxWidth: "100%",
        }}
      >
        Add, edit, and organize the projects displayed throughout your portfolio.
      </p>

      {message && <div className="error-message">{message}</div>}

      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          placeholder="Project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Project description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          placeholder="Technologies used"
          value={tech}
          onChange={(e) => setTech(e.target.value)}
        />

        <input
          placeholder="Project URL (GitHub, Live Demo, Tableau...)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

       <input
          placeholder="Project image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <div className="admin-actions">
          <button type="submit">
            {editingId ? "Update Project" : "Add Project"}
          </button>

          {editingId && (
            <button type="button" className="secondary-btn" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="admin-project-list">
        {projects.length === 0 ? (
          <div className="empty-state">
            <h3>No Projects Yet</h3>
            <p>Add your first project using the form above.</p>
          </div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="admin-project-card">
              <div>
                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="admin-project-image"
                  />
                )}

                <h3>{project.title}</h3>

                <p>
                  <strong>Description:</strong> {project.description}
                </p>

                <p>
                  <strong>Technologies:</strong> {project.tech}
                </p>

                <p>
                  <strong>Link:</strong>{" "}
                  {project.link === "#" ? "Not added yet" : project.link}
                </p>
              </div>

              <div className="admin-actions">
                <button type="button" onClick={() => editProject(project)}>
                  Edit
                </button>

                <button
                  type="button"
                  className="danger-btn"
                  onClick={() => deleteProject(project.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ManageProjects;