import { useEffect, useState } from "react";



const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";


function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState("Loading projects...");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setMessage("");
      })
      .catch(() => {
        setMessage("Could not load projects. Make sure the backend is running.");
      });
  }, []);

  return (
    <section className="projects">
      <h2>Selected Projects</h2>

      {message && <p>{message}</p>}

      <div className="project-grid">
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card"
          >

            {project.imageUrl && (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="admin-project-image"
              />
            )}
            <h3>{project.title}</h3>

            <p>{project.description}</p>

            <p className="project-tech">{project.tech}</p>

            <span className="project-link">View Project →</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;