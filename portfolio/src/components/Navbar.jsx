import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    const scroll = () => {
      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scroll, 100);
    } else {
      scroll();
    }
  };

  return (
    <nav className="navbar">
      <button
        type="button"
        className="nav-logo-button"
        onClick={() => scrollToSection("home")}
      >
        Portfolio
      </button>

      <div className="links">
        <button
          type="button"
          className="nav-link-button"
          onClick={() => scrollToSection("home")}
        >
          Home
        </button>

        <button
          type="button"
          className="nav-link-button"
          onClick={() => scrollToSection("about")}
        >
          About
        </button>

        <button
          type="button"
          className="nav-link-button"
          onClick={() => scrollToSection("skills")}
        >
          Skills
        </button>

        <button
          type="button"
          className="nav-link-button"
          onClick={() => scrollToSection("projects")}
        >
          Projects
        </button>

        <button
          type="button"
          className="nav-link-button"
          onClick={() => scrollToSection("contact")}
        >
          Contact
        </button>
      </div>
    </nav>
  );
}

export default Navbar;