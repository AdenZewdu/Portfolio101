import { useEffect, useState } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  });

  const loadMessages = () => {
    fetch(`${API_BASE_URL}/api/messages`, {
      headers: getAuthHeaders(),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Could not load messages");
        return res.json();
      })
      .then((data) => {
        setMessages(data);
        setError("");
      })
      .catch(() => {
        setError("Could not load messages. Please log in again.");
      });
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const replyToMessage = (message) => {
    const subject = encodeURIComponent("Reply to your portfolio message");

    const body = encodeURIComponent(
      `Hi ${message.name},\n\n\n\n--- Original Message ---\n${message.message}`
    );

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${message.email}&su=${subject}&body=${body}`;

    window.open(gmailUrl, "_blank");

    fetch(`${API_BASE_URL}/api/messages/${message.id}/read`, {
      method: "PATCH",
      headers: getAuthHeaders(),
    })
      .then(() => loadMessages())
      .catch(() => {
        
      });
  };

  const deleteMessage = (id) => {
    if (!window.confirm("Delete this message?")) return;

    fetch(`${API_BASE_URL}/api/messages/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Could not delete message");
        loadMessages();
      })
      .catch(() => {
        setError("Could not delete message.");
      });
  };

  return (
    <div>
      <h1 style={{ textAlign: "left" }}>Messages</h1>

      <p
        style={{
          textAlign: "left",
          margin: "10px 0 35px",
          color: "#666",
          maxWidth: "100%",
        }}
      >
        View messages submitted from your portfolio contact form.
      </p>

      {error && <div className="error-message">{error}</div>}

      <div className="admin-project-list">
        {messages.length === 0 ? (
          <div className="empty-state">
            <h3>No Messages Yet</h3>
            <p>Contact form submissions will appear here.</p>
          </div>
        ) : (
          messages.map((item) => (
            <div key={item.id} className="admin-project-card">
              <div>
                <h3>{item.name}</h3>

                <p>
                  <strong>Email:</strong> {item.email}
                </p>

                <p>
                  <strong>Status:</strong> {item.isRead ? "Read" : "Unread"}
                </p>

                <p>
                  <strong>Message:</strong> {item.message}
                </p>

                <p>
                  <strong>Received:</strong>{" "}
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="admin-actions">
                <button type="button" onClick={() => replyToMessage(item)}>
                  Reply
                </button>

                <button
                  type="button"
                  className="danger-btn"
                  onClick={() => deleteMessage(item.id)}
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

export default Messages;