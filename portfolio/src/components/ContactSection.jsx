import { useState } from "react";

function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${API_BASE_URL}/api/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Message failed");
        }

        return res.json();
      })
      .then(() => {
        setForm({
          name: "",
          email: "",
          message: "",
        });

        setStatus("Message sent successfully.");
      })
      .catch(() => {
        setStatus("Could not send message. Please try again.");
      });
  };

  return (
    <section className="contact">
      <h2>Contact Me</h2>

      <p>
        Have a project, question, or opportunity? Send me a message and I will
        get back to you.
      </p>

      {status && <p>{status}</p>}

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Your email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Your message"
          value={form.message}
          onChange={handleChange}
          required
        />

        <button type="submit">Send Message</button>
      </form>
    </section>
  );
}

export default ContactSection;