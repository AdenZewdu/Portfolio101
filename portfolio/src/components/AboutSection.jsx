import { useEffect, useState } from "react";


const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";


function AboutSection() {
  const [about, setAbout] = useState(
    "I am a frontend developer and IT support professional with an interest in building clean, responsive web experiences and practical digital solutions."
  );

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/profile`)
      .then((res) => res.json())
      .then((data) => {
        setAbout(
          data.about ||
            "I am a frontend developer and IT support professional with an interest in building clean, responsive web experiences and practical digital solutions."
        );
      })
      .catch(() => {
        // Keep fallback content if backend is unavailable.
      });
  }, []);

  return (
    <section className="about">
      <h2>About Me</h2>

      <p>{about}</p>
    </section>
  );
}

export default AboutSection;