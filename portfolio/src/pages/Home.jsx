import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import SkillsSection from "../components/SkillsSection";
import ProjectsSection from "../components/ProjectsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import useScrollReveal from "../hooks/useScrollReveal";

function Home() {
  useScrollReveal();

  return (
    <>
      <div id="home">
        <Hero />
      </div>

      <div id="about" className="fade-in">
        <AboutSection />
      </div>

      <div id="skills" className="fade-in">
        <SkillsSection />
      </div>

      <div id="projects" className="fade-in">
        <ProjectsSection />
      </div>

      <div id="contact" className="fade-in">
        <ContactSection />
      </div>

      <Footer />
    </>
  );
}

export default Home;