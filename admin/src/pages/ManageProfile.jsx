import { useEffect, useState } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
});

function ManageProfile() {
  const [profile, setProfile] = useState({
    name: "",
    title: "",
    bio: "",
    about: "",
  });

  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/profile`)
      .then((res) => res.json())
      .then((data) => {
        setProfile({
          name: data.name || "",
          title: data.title || "",
          bio: data.bio || "",
          about: data.about || "",
        });
        setMessage("");
      })
      .catch(() => {
        setMessage("Could not load profile. Make sure the backend is running.");
      });
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${API_BASE_URL}/api/profile`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(profile),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Profile save failed");
        }

        return res.json();
      })
      .then(() => {
        setSaved(true);
        setMessage("");

        setTimeout(() => {
          setSaved(false);
        }, 2500);
      })
      .catch(() => {
        setMessage("Could not save profile. Please log in again.");
      });
  };

  return (
    <div>
      <h1 style={{ textAlign: "left" }}>Manage Profile</h1>

      <p
        style={{
          textAlign: "left",
          margin: "10px 0 35px",
          color: "#666",
          maxWidth: "100%",
        }}
      >
        Update the main text content shown on your public portfolio.
      </p>

      {saved && (
        <div className="success-message">
          Profile updated successfully!
        </div>
      )}

      {message && <div className="error-message">{message}</div>}

      <form className="admin-form profile-form" onSubmit={handleSubmit}>
        <div className="profile-field">
          <div className="profile-field-info">
            <label htmlFor="name">Name</label>
           
          </div>

          <input
            id="name"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Example: Aden Zewdu"
            required
          />
        </div>

        <div className="profile-field">
          <div className="profile-field-info">
            <label htmlFor="title">Professional Title</label>
            
          </div>

          <input
            id="title"
            name="title"
            value={profile.title}
            onChange={handleChange}
            placeholder="Example: Frontend Developer • IT Support"
            required
          />
        </div>

        <div className="profile-field">
          <div className="profile-field-info">
            <label htmlFor="bio">Short Bio</label>
            
          </div>

          <textarea
            id="bio"
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            rows="3"
            placeholder="A short one-sentence intro."
            required
          />
        </div>

        <div className="profile-field">
          <div className="profile-field-info">
            <label htmlFor="about">About Description</label>
            
          </div>

          <textarea
            id="about"
            name="about"
            value={profile.about}
            onChange={handleChange}
            rows="8"
            placeholder="Write a fuller About Me description here."
            required
          />
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default ManageProfile;