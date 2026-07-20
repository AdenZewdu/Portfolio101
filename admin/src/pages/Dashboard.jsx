import { useEffect, useState } from "react";

function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    messages: 0,
    profile: "Ready",
  });

  const [recentMessages, setRecentMessages] = useState([]);

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  });

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/api/projects").then((res) => res.json()),
      fetch("http://localhost:5000/api/skills").then((res) => res.json()),
      fetch("http://localhost:5000/api/messages", {
        headers: getAuthHeaders(),
      }).then((res) => res.json()),
      fetch("http://localhost:5000/api/profile").then((res) => res.json()),
    ])
      .then(([projects, skills, messages, profile]) => {
        setStats({
          projects: projects.length,
          skills: skills.length,
          messages: messages.length,
          profile: profile.name ? "Ready" : "Missing",
        });

        setRecentMessages(messages.slice(0, 4));
      })
      .catch(() => {
        setStats({
          projects: 0,
          skills: 0,
          messages: 0,
          profile: "Error",
        });
      });
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "left" }}>Dashboard</h1>

      <p
        style={{
          textAlign: "left",
          marginBottom: "35px",
          color: "#666",
          maxWidth: "100%",
          lineHeight: "1.6",
        }}
      >
        Welcome back, Aden!
        <br />
        <br />
        Manage your portfolio projects, skills, profile, and contact messages
        from this dashboard.
      </p>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Projects</h3>
          <h2>{stats.projects}</h2>
          <p>Portfolio projects</p>
        </div>

        <div className="dashboard-card">
          <h3>Skills</h3>
          <h2>{stats.skills}</h2>
          <p>Technical skills listed</p>
        </div>

        <div className="dashboard-card">
          <h3>Messages</h3>
          <h2>{stats.messages}</h2>
          <p>Contact requests</p>
        </div>

        <div className="dashboard-card">
          <h3>Profile</h3>
          <h2>{stats.profile}</h2>
          <p>Profile status</p>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Messages</h2>

        {recentMessages.length === 0 ? (
          <p style={{ textAlign: "left", margin: 0 }}>
            No messages received yet.
          </p>
        ) : (
          <ul>
            {recentMessages.map((message) => (
              <li key={message.id}>
                {message.name} sent a message: {message.message}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;