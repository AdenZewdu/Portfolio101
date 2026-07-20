import { useEffect, useState } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function ManageSkills() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  });

  const loadSkills = () => {
    fetch(`${API_BASE_URL}/api/skills`)
      .then((res) => res.json())
      .then((data) => {
        setSkills(data);
        setMessage("");
      })
      .catch(() => {
        setMessage("Could not load skills. Make sure the backend is running.");
      });
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const resetForm = () => {
    setNewSkill("");
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newSkill.trim()) return;

    const url = editingId
      ? `${API_BASE_URL}/api/skills/${editingId}`
      : `${API_BASE_URL}/api/skills`;

    const method = editingId ? "PUT" : "POST";


    fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: JSON.stringify({ name: newSkill }),
    })
      .then((res) => res.json())
      .then(() => {
        resetForm();
        loadSkills();
      })
      .catch(() => {
        setMessage("Could not save skill.");
      });
  };

  const editSkill = (skill) => {
    setEditingId(skill.id);
    setNewSkill(skill.name);
  };

  const removeSkill = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this skill?"
    );

    if (!confirmed) return;

    fetch(`${API_BASE_URL}/api/skills/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    })
      .then(() => loadSkills())
      .catch(() => {
        setMessage("Could not remove skill.");
      });
  };

  return (
    <div>
      <h1 style={{ textAlign: "left" }}>Manage Skills</h1>

      <p
        style={{
          textAlign: "left",
          margin: "10px 0 35px",
          color: "#666",
          maxWidth: "100%",
        }}
      >
        Add, edit, and remove the technical skills displayed on your portfolio.
      </p>

      {message && <div className="error-message">{message}</div>}

      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a skill..."
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
        />

        <div className="admin-actions">
          <button type="submit">
            {editingId ? "Update Skill" : "Add Skill"}
          </button>

          {editingId && (
            <button type="button" className="secondary-btn" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="skills-grid">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="skill"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {skill.name}
        <button
          type="button"
          className="skill-edit-btn"
          onClick={() => editSkill(skill)}
        >
          Edit
        </button>

        <button
          type="button"
          className="skill-delete-btn"
          onClick={() => removeSkill(skill.id)}
        >
          X
        </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageSkills;