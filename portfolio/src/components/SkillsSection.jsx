import { useEffect, useState } from "react";


const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function SkillsSection() {
  const [skills, setSkills] = useState([]);
  const [message, setMessage] = useState("Loading skills...");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/skills`)
      .then((res) => res.json())
      .then((data) => {
        setSkills(data);
        setMessage("");
      })
      .catch(() => {
        setMessage("Could not load skills. Make sure the backend is running.");
      });
  }, []);

  return (
    <section className="skills">
      <h2>Skills</h2>

      {message && <p>{message}</p>}

      <div className="skills-grid">
        {skills.map((skill) => (
          <span key={skill.id} className="skill">
            {skill.name}
          </span>
        ))}
      </div>
    </section>
  );
}

export default SkillsSection;