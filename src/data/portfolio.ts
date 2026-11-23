/**
 * ============================================================
 *  PORTFOLIO CONTENT — edit everything about you in this file.
 * ============================================================
 *  - Leave a link as "" (empty) and the site shows a tidy
 *    "Coming soon" state instead of a broken link.
 *  - Paste a full URL (https://...) to switch a button on.
 */
import studyPlannerImg from "@/assets/project-studyplanner.webp";
import certAiAgentWebinarImg from "@/assets/certificates/cert-ai-agent-webinar.jpg.asset.json";
import certAiAgentWebinarPdf from "@/assets/certificates/cert-ai-agent-webinar.pdf.asset.json";
import certCprImg from "@/assets/certificates/cert-hands-only-cpr.jpg.asset.json";
import certCprPdf from "@/assets/certificates/cert-hands-only-cpr.pdf.asset.json";
import certSihImg from "@/assets/certificates/cert-sih-internal-hackathon.jpg.asset.json";
import certSihPdf from "@/assets/certificates/cert-sih-internal-hackathon.pdf.asset.json";
import certKalamImg from "@/assets/certificates/cert-dr-kalam-young-achiever.jpg.asset.json";
import certKalamPdf from "@/assets/certificates/cert-dr-kalam-young-achiever.pdf.asset.json";
import certSmartMoveImg from "@/assets/certificates/cert-smart-move-hackathon-new.jpg.asset.json";
import certGeminiImg from "@/assets/certificates/cert-gemini-certified-student.jpg.asset.json";
import certGeminiPdf from "@/assets/certificates/cert-gemini-certified-student.pdf.asset.json";
import certIbmImg from "@/assets/certificates/cert-ibm-ai-fundamentals.jpg.asset.json";
import certIbmPdf from "@/assets/certificates/cert-ibm-ai-fundamentals.pdf.asset.json";
import certMatlabImg from "@/assets/certificates/cert-matlab-onramp.jpg.asset.json";
import certMatlabPdf from "@/assets/certificates/cert-matlab-onramp.pdf.asset.json";
import certProjectExpoImg from "@/assets/certificates/cert-project-expo-kpriet.jpg.asset.json";
import certProjectExpoPdf from "@/assets/certificates/cert-project-expo-kpriet.pdf.asset.json";
import certAnsysImg from "@/assets/certificates/cert-ansys-structural-dynamics.jpg.asset.json";
import certAnsysPdf from "@/assets/certificates/cert-ansys-structural-dynamics.pdf.asset.json";
import certIh5Img from "@/assets/certificates/cert-international-hackathon-5.jpg.asset.json";
import certIh5Pdf from "@/assets/certificates/cert-international-hackathon-5.pdf.asset.json";
import certAdaptionImg from "@/assets/certificates/cert-adaption-ai-workshop.jpg.asset.json";
import certAdaptionPdf from "@/assets/certificates/cert-adaption-ai-workshop.pdf.asset.json";
import cert3dConductionImg from "@/assets/certificates/cert-ansys-3d-conduction.jpg.asset.json";
import cert3dConductionPdf from "@/assets/certificates/cert-ansys-3d-conduction.pdf.asset.json";
import resumePdf from "@/assets/resume.pdf.asset.json";
import resumePreviewImg from "@/assets/resume-preview.jpg.asset.json";

export const profile = {
  name: "Abhinivesh Purushothaman",
  firstName: "Abhinivesh",
  initials: "AP",
  role: "CSE (AI & ML) Student | Aspiring AI/ML Engineer | Python Developer",
  heroRoles: ["AI/ML Enthusiast", "Developer", "Problem Solver"],
  college: "KPR Institute of Engineering and Technology",
  collegeCity: "Coimbatore, Tamil Nadu",
  location: "Tiruppur, Tamil Nadu, India",
  tagline: "Building Intelligent Solutions. Turning Ideas Into Impact.",
  headline: "Turning Curiosity Into Code & Ideas Into Innovation.",
  heroDescription:
    "Exploring Artificial Intelligence, Machine Learning, and Software Development to create meaningful digital experiences.",
  intro:
    "I'm a passionate Computer Science student specializing in Artificial Intelligence and Machine Learning. I enjoy exploring emerging technologies, developing innovative solutions, participating in hackathons, and continuously improving my technical skills. My goal is to build impactful technology that solves real-world problems.",
  /** Path or URL to your photo, e.g. "/images/abhinivesh.jpg". Empty shows your initials. */
  photo: "",
  /** Path or URL to your resume PDF, e.g. "/resume.pdf" (put the file in /public). */
  resumeUrl: resumePdf.url,
};

export const resume = {
  intro:
    "Explore my academic background, technical skills, certifications, projects and achievements.",
  pdfUrl: resumePdf.url,
  previewImage: resumePreviewImg.url,
  previewAlt: "Preview of Abhinivesh Purushothaman's resume",
  fileName: "Abhinivesh_Purushothaman_Resume.pdf",
};

export const socials = {
  /** e.g. "yourname@gmail.com" */
  email: "abhinivesh437@gmail.com",
  /** e.g. "https://www.linkedin.com/in/your-handle" */
  linkedin: "https://www.linkedin.com/in/abhinivesh-purushothaman-260b8b385/",
  /** e.g. "https://github.com/your-handle" */
  github: "https://github.com/abhinivesh07-gif",
};

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "certifications", label: "Certifications" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
] as const;

export const about = {
  paragraphs: [
    "I'm a Computer Science and Engineering student specializing in Artificial Intelligence and Machine Learning. I have a strong interest in programming, emerging technologies, and innovation. I enjoy learning new concepts, experimenting with ideas, and transforming them into practical solutions.",
    "I actively participate in hackathons, ideathons, technical competitions, and learning programs to improve my technical and problem-solving abilities.",
    "I believe in continuous learning, creativity, and building technology that makes a difference.",
  ],
  highlights: [
    {
      icon: "learner",
      title: "Continuous Learner",
      text: "Always picking up new concepts, tools and ideas — and putting them into practice.",
    },
    {
      icon: "innovation",
      title: "Innovation Enthusiast",
      text: "Drawn to hackathons and ideathons where bold ideas become working prototypes.",
    },
    {
      icon: "solver",
      title: "Problem Solver",
      text: "Breaking complex problems into clear, logical steps and practical solutions.",
    },
  ],
} as const;

export type SkillIcon =
  | "python" | "c" | "cpp" | "java" | "html" | "css" | "javascript" | "mysql" | "pandas"
  | "oop" | "problem" | "logic" | "database" | "ai" | "ml" | "datascience";

export const skillGroups: {
  title: string;
  icon: "code" | "globe" | "database" | "layers" | "sparkles";
  blurb: string;
  skills: { name: string; icon: SkillIcon }[];
}[] = [
  {
    title: "Programming Languages",
    icon: "code",
    blurb: "The foundation I build everything on.",
    skills: [
      { name: "Python", icon: "python" },
      { name: "C", icon: "c" },
      { name: "C++", icon: "cpp" },
      { name: "Java", icon: "java" },
    ],
  },
  {
    title: "Emerging Technologies",
    icon: "sparkles",
    blurb: "Where my curiosity is pointed.",
    skills: [
      { name: "Artificial Intelligence", icon: "ai" },
      { name: "Machine Learning", icon: "ml" },
      { name: "Data Science", icon: "datascience" },
    ],
  },
  {
    title: "Web Technologies",
    icon: "globe",
    blurb: "Shaping ideas into interfaces.",
    skills: [
      { name: "HTML", icon: "html" },
      { name: "CSS", icon: "css" },
      { name: "JavaScript", icon: "javascript" },
    ],
  },
  {
    title: "Data & Database",
    icon: "database",
    blurb: "Storing, querying and analysing data.",
    skills: [
      { name: "MySQL", icon: "mysql" },
      { name: "Pandas", icon: "pandas" },
    ],
  },
  {
    title: "Core Concepts",
    icon: "layers",
    blurb: "How I think about software.",
    skills: [
      { name: "Object-Oriented Programming", icon: "oop" },
      { name: "Problem Solving", icon: "problem" },
      { name: "Logical Thinking", icon: "logic" },
      { name: "Database Fundamentals", icon: "database" },
    ],
  },
];

export const projects: {
  title: string;
  category: string;
  subtitle: string;
  description: string;
  tech: string[];
  image: string;
  imageAlt: string;
  github: string;
  demo: string;
  githubLabel?: string;
  /**
   * Direct https link to the Android APK (e.g. a GitHub release or Google Drive file).
   * Leave "" to hide the "Download APK" button; paste a link and it appears automatically.
   */
  apk: string;
}[] = [
  {
    title: "Smart Study Planner",
    category: "Productivity",
    subtitle: "Plan smarter. Study better.",
    description:
      "A smart planning solution designed to help students organize academic tasks, manage schedules, and improve productivity.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: studyPlannerImg,
    imageAlt: "Glass calendar with task cards, a checklist and a clock",
    github: "https://github.com/abhinivesh07-gif/smart_study_planner",
    demo: "https://precious-choux-40b208.netlify.app",
    githubLabel: "View on GitHub",
    apk: "",
  },
];

/** Leave date/result empty to hide them. Fill in once confirmed, e.g. date: "Mar 2026". */
export const experience: {
  title: string;
  kind: string;
  icon: "rocket" | "lightbulb" | "flag" | "globe" | "users" | "puzzle";
  description: string;
  date: string;
  result: string;
}[] = [
  {
    title: "Hackathon Participation",
    kind: "Hackathons",
    icon: "rocket",
    description:
      "Building prototypes under time pressure with a team — from problem statement to working demo.",
    date: "",
    result: "",
  },
  {
    title: "International Hackathon 5.0",
    kind: "Hackathon",
    icon: "globe",
    description:
      "Took part in International Hackathon 5.0, collaborating on an idea and presenting a solution.",
    date: "",
    result: "",
  },
  {
    title: "Smart India Hackathon (SIH)",
    kind: "National Innovation",
    icon: "flag",
    description:
      "Engaging with Smart India Hackathon problem statements focused on real national challenges.",
    date: "",
    result: "",
  },
  {
    title: "Collaborative Team Projects",
    kind: "Teamwork",
    icon: "users",
    description:
      "Working with peers on team projects and hackathon builds, sharing roles and ideas.",
    date: "",
    result: "",
  },
  {
    title: "Innovation & Problem-Solving",
    kind: "Continuous",
    icon: "puzzle",
    description:
      "Technical competitions, learning programs and challenges that sharpen logical thinking.",
    date: "",
    result: "",
  },
];

export const achievements: {
  title: string;
  category: string;
  icon: "karate" | "throwball" | "trophy" | "medal" | "academic" | "quiz";
}[] = [
  { title: "Brown Belt – 1st Dan in Karate", category: "Martial Arts", icon: "karate" },
  { title: "Zonal-Level Throwball Winner", category: "Sports", icon: "trophy" },
  { title: "District-Level Throwball Runner-Up", category: "Sports", icon: "medal" },
  { title: "District-Level Throwball Player", category: "Sports", icon: "throwball" },
  { title: "Academic Excellence – School First in Grade 10", category: "Academics", icon: "academic" },
  { title: "District-Level Quiz Winner", category: "Quiz", icon: "quiz" },
];

/** Fill in issuer, date, image (path/URL) and url once you have them. Empty fields are hidden. */
export const certifications: {
  title: string;
  issuer: string;
  /** Topics used by the filter chips — add or rename freely. */
  topics: string[];
  date: string;
  image: string;
  url: string;
}[] = [
  {
    title: "Ansys Course Completion – Structural Dynamics",
    topics: ["Engineering"],
    issuer: "Ansys",
    date: "Nov 2026",
    image: certAnsysImg.url,
    url: certAnsysPdf.url,
  },
  {
    title: "International Hackathon 5.0 – Round 1 Participation",
    topics: ["Hackathons"],
    issuer: "KIT – KalaignarKarunanidhi Institute of Technology",
    date: "Nov 2026",
    image: certIh5Img.url,
    url: certIh5Pdf.url,
  },
  {
    title: "From Problem Statement to AI Solution – Build with Adaption (Pre-Hackathon Workshop)",
    topics: ["AI & ML", "Hackathons"],
    issuer: "ECLearnix EdTech LLC",
    date: "Nov 2026",
    image: certAdaptionImg.url,
    url: certAdaptionPdf.url,
  },
  {
    title: "AI Fundamentals: Foundations for Understanding AI",
    topics: ["AI & ML"],
    issuer: "IBM SkillsBuild",
    date: "Nov 2026",
    image: certIbmImg.url,
    url: certIbmPdf.url,
  },
  {
    title: "MATLAB Onramp",
    topics: ["Programming & Tools"],
    issuer: "MathWorks",
    date: "Nov 2026",
    image: certMatlabImg.url,
    url: certMatlabPdf.url,
  },
  {
    title: "Gemini Certified Student",
    topics: ["AI & ML"],
    issuer: "Google for Education",
    date: "Nov 2026",
    image: certGeminiImg.url,
    url: certGeminiPdf.url,
  },
  {
    title: "Hands-Only CPR Participation Certificate",
    topics: ["Health & Safety"],
    issuer: "American Heart Association",
    date: "Oct 2026",
    image: certCprImg.url,
    url: certCprPdf.url,
  },
  {
    title: "Smart India Hackathon 2026 – Internal Hackathon Participation",
    topics: ["Hackathons"],
    issuer: "KPR Institute of Engineering and Technology",
    date: "Sep 2026",
    image: certSihImg.url,
    url: certSihPdf.url,
  },
  {
    title: "Dr. Kalam Young Achiever Award 2026",
    topics: ["Awards"],
    issuer: "World Youth Federation",
    date: "Sep 2026",
    image: certKalamImg.url,
    url: certKalamPdf.url,
  },
  {
    title: "Smart Move Hackathon – Participation",
    topics: ["Hackathons"],
    issuer: "KIT – KalaignarKarunanidhi Institute of Technology",
    date: "Sep 2026",
    image: certSmartMoveImg.url,
    url: certSmartMoveImg.url,
  },
  {
    title: "Project Expo – Coconut Shell Toy & DIY Waste Bulb",
    topics: ["Projects & Expos"],
    issuer: "KPR Institute of Engineering and Technology",
    date: "Sep 2026",
    image: certProjectExpoImg.url,
    url: certProjectExpoPdf.url,
  },
  {
    title: "Hack an AI Agent Live (When AI Trusts AI) – Webinar",
    topics: ["AI & ML"],
    issuer: "",
    date: "Sep 2026",
    image: certAiAgentWebinarImg.url,
    url: certAiAgentWebinarPdf.url,
  },
  {
    title: "Ansys Course Completion – 3D Conduction",
    topics: ["Engineering"],
    issuer: "Ansys",
    date: "Nov 2026",
    image: cert3dConductionImg.url,
    url: cert3dConductionPdf.url,
  },
];

export const education = [
  {
    status: "Current",
    degree:
      "Bachelor of Engineering – Computer Science and Engineering (Artificial Intelligence and Machine Learning)",
    institution: "KPR Institute of Engineering and Technology",
    place: "Coimbatore, Tamil Nadu",
    period: "",
    note: "Currently pursuing",
  },
  {
    status: "Previous",
    degree: "Higher Secondary & Secondary Education",
    institution: "Saradha Vidhyalaya Matric Higher Secondary School",
    place: "Tiruppur, Tamil Nadu",
    period: "",
    note: "School First in Grade 10",
  },
];
