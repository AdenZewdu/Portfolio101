import { useEffect, useState } from "react";


const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function Hero() {
  const [profile, setProfile] = useState({
    name: "Aden",
    title: "Frontend Developer • IT Support • Data Analytics Enthusiast",
    bio: "Passionate about modern web development and data analytics.",
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/profile`)
      .then((res) => res.json())
      .then((data) => {
        setProfile({
          name: data.name || "Aden",
          title:
            data.title ||
            "Frontend Developer • IT Support • Data Analytics Enthusiast",
          bio:
            data.bio ||
            "Passionate about modern web development and data analytics.",
        });
      })
      .catch(() => {
        // Keep fallback text if backend is unavailable.
      });
  }, []);

  return (
    <section className="hero-backdrop flex min-h-[86vh] w-full flex-col items-center justify-center gap-7 text-center">
      <div className="hero-overlay"></div>

      <div className="relative z-10 flex max-w-[820px] flex-col items-center gap-4 px-5">
        <h1 className="mb-2 text-center text-5xl font-bold leading-tight text-white drop-shadow-lg md:text-6xl">
          {profile.name}
        </h1>

        <h2 className="mb-0 text-center text-xl font-medium leading-snug text-gray-100 drop-shadow-md md:text-2xl">
          {profile.title}
        </h2>

        <p className="mx-auto max-w-[680px] text-center text-base leading-8 !text-white drop-shadow-md md:text-lg">
          {profile.bio}
        </p>

        <div className="mt-3 flex flex-wrap justify-center gap-4">
          <button
            className="!rounded-lg !bg-[#111] !px-[22px] !py-3 !font-medium !text-white transition duration-200 hover:-!translate-y-0.5 hover:!bg-[#333] hover:!shadow-[0_6px_18px_rgba(0,0,0,0.15)] active:!scale-95"
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View Projects
          </button>

          <button
            className="!rounded-lg !border-2 !border-white !bg-transparent !px-[22px] !py-3 !font-medium !text-white transition duration-200 hover:-!translate-y-0.5 hover:!bg-white hover:!text-[#111] hover:!shadow-[0_6px_18px_rgba(0,0,0,0.15)] active:!scale-95"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;