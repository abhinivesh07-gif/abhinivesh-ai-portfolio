import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { Marquee } from "@/components/portfolio/Marquee";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Education } from "@/components/portfolio/Education";
import { Achievements } from "@/components/portfolio/Achievements";
import { Certifications } from "@/components/portfolio/Certifications";
import { Resume } from "@/components/portfolio/Resume";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { CursorGlow } from "@/components/portfolio/CursorGlow";
import { profile, socials } from "@/data/portfolio";

const title = "Abhinivesh Purushothaman — AI/ML Student & Python Developer";
const description =
  "Portfolio of Abhinivesh Purushothaman, CSE (AI & ML) student at KPR Institute of Engineering and Technology. Building intelligent solutions and turning ideas into impact.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { property: "og:site_name", content: "Abhinivesh Purushothaman" },
      { name: "keywords", content: "Abhinivesh Purushothaman, AI ML student, Python developer, KPRIET, CSE AI and ML, portfolio, Coimbatore, Tiruppur" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Abhinivesh Purushothaman",
          jobTitle: "CSE (AI & ML) Student",
          description: profile.tagline,
          alumniOf: { "@type": "CollegeOrUniversity", name: profile.college },
          knowsAbout: ["Artificial Intelligence", "Machine Learning", "Python", "Data Science", "Web Development"],
          ...(socials.email ? { email: `mailto:${socials.email}` } : {}),
          sameAs: [socials.linkedin, socials.github].filter(Boolean),
          address: { "@type": "PostalAddress", addressLocality: "Tiruppur", addressRegion: "Tamil Nadu", addressCountry: "IN" },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <CursorGlow />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Achievements />
        <Certifications />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
