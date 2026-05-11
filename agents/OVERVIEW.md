# AI Prompt — Portfolio Web Generation

```
## CONTEXT & ROLE

You are a **full-stack developer** and frontend/UI expert. Your task is to **refactor and rebuild a personal portfolio website** using **React + Next.js**, fully responsive across devices, visually appealing, and minimal. while keeping an elegant UI and modern interactions.

---

## OBJECTIVE

- **Consolidate all project information into a single data file** that can be easily updated.
- Build a **clean, modern, fully responsive portfolio website in English** with the following structure and Use these names for each section :
  1. About Me
  2. Experience
  3. Tech Stack
  4. What I Build
  5. My Theatre of Dreams
  6. Contact Me

- Use **UI/UX best practices**, responsive layouts, animations where appropriate.
- Remove the traditional navbar; implement a **single corner button** (desktop & mobile) that opens a menu for section navigation.
- Use **mock images and placeholder content** where necessary.

---

## DATA FILE STRUCTURE

- Consolidate all content in a single file (e.g., `/data/portfolioData.js` or `.ts`) with sections:
``` ts
export const portfolioData = {
  aboutMe: {
    name: "Nguyễn Quốc Duy",
    title: "Full Stack Developer (Strong Frontend)",
    description: "3rd-year student at Đại học Bách Khoa, Đại học Đà Nẵng. Passionate about building clean, responsive, and modern web applications. Skilled in React, Next.js, React Native, Node.js, Express.js, and Python.",
    avatarUrl: "https://via.placeholder.com/150", // mock avatar, replace later
    logoUrl: "https://via.placeholder.com/50" // placeholder logo
  },

  experiences: [
    {
      period: "Jan 2024 - Present",
      organization: "SmartFood AI Lab",
      role: "Frontend Engineer Intern",
      description: "Developed interactive and responsive components using React, Next.js, and TailwindCSS. Collaborated on state management with Zustand and React Query for efficient data fetching."
    },
    {
      period: "Jun 2023 - Dec 2023",
      organization: "Freelance Web Development",
      role: "Full Stack Developer",
      description: "Built multiple portfolio and business websites using React, Node.js, Express, and MongoDB. Focused on clean UI/UX and responsive design."
    },
    {
      period: "Jan 2023 - May 2023",
      organization: "University IT Club",
      role: "Frontend Lead",
      description: "Led a small team to design and implement the university event management portal using Next.js and TailwindCSS."
    }
  ],

  techStack: {
  frontend: [
    { name: "HTML", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "JavaScript", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Styled Components", iconUrl: "https://styled-components.com/logo.png" },
    { name: "React", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "Zustand", iconUrl: "https://raw.githubusercontent.com/pmndrs/zustand/main/logo.svg" },
    { name: "TanStack Query", iconUrl: "https://tanstack.com/query/v4/assets/logo.svg" },
    { name: "TanStack Router", iconUrl: "https://tanstack.com/router/v1/assets/logo.svg" },
    { name: "TypeScript", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "TailwindCSS", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
    { name: "Framer Motion", iconUrl: "https://www.framer.com/favicon-32x32.png" }
  ],

  backend: [
    { name: "Node.js", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Express.js", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { name: "Python", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "MongoDB", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "PostgreSQL", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "Supabase", iconUrl: "https://cdn.worldvectorlogo.com/logos/supabase-2.svg" },
    { name: "AWS", iconUrl: "https://cdn.worldvectorlogo.com/logos/aws-2.svg" },
    { name: "Redis", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
    { name: "Firebase", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    { name: "Nginx", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" }
  ],

  mobile: [
    { name: "React Native", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Expo", iconUrl: "https://raw.githubusercontent.com/expo/expo/main/website/static/favicon.png" }
  ],

  tools: [
    { name: "Figma", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "Jira", iconUrl: "https://w7.pngwing.com/pngs/667/31/png-transparent-jira-software-issue-tracking-software-development-software-project-management-computer-icons-software-angle-text.png" },
    { name: "Docker", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "VS Code", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
    { name: "Antigravity", iconUrl: "https://via.placeholder.com/32" }, // placeholder
    { name: "Git", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "GitHub", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" }
  ]
},

  projects: [
    {
      id: 1,
      name: "SmartFood Recommendation System",
      overview: "An intelligent meal recommendation platform that integrates smart scale data and user preferences to suggest daily meals.",
      teamSize: 3,
      position: "Frontend Developer",
      demoImage: "https://via.placeholder.com/400x300",
      techStack: ["React", "Next.js", "TailwindCSS", "Node.js", "Express", "PostgreSQL"],
      demoLink: "#"
    },
    {
      id: 2,
      name: "University Event Portal",
      overview: "Event management portal for university clubs to organize and track events, allowing students to register and receive notifications.",
      teamSize: 2,
      position: "Full Stack Developer",
      demoImage: "https://via.placeholder.com/400x300",
      techStack: ["Next.js", "React", "MongoDB", "Express.js", "TailwindCSS"],
      demoLink: "#"
    },
    {
      id: 3,
      name: "Personal Portfolio",
      overview: "A responsive portfolio site to showcase personal projects, experience, and skills with interactive components and animations.",
      teamSize: 1,
      position: "Full Stack Developer",
      demoImage: "https://via.placeholder.com/400x300",
      techStack: ["React", "Next.js", "TailwindCSS", "Framer Motion"],
      demoLink: "#"
    }
  ],

  theatreOfDreams: {
    bannerUrl: "https://i.pinimg.com/736x/5b/fe/cf/5bfecfc360b1b7a3a0ff1724d2b70e01.jpg",
    quote: "Hard work will always overcome natural talent when natural talent does not work hard. — Sir Alex Ferguson",
    description: "Beyond the IDE, I live by the 'Theatre of Dreams' spirit. Being a Manchester United fan has ingrained in me a 'Never Say Die' attitude that I carry into every line of code. To me, software development is like a championship season: it requires discipline, constant growth, and the belief that a strong team wins trophies. I don’t just ship features; I strive for the kind of excellence that belongs on the world's biggest stage.",
    optionalImage: "https://i.pinimg.com/736x/7b/4b/ee/7b4bee88b81457408b5f611cd749c7d6.jpg" // Ronaldo image
  },

  contact: {
    formFields: ["name", "email", "subject", "message"],
    footerLinks: [
      { name: "Gmail", url: "mailto:example@gmail.com" },
      { name: "GitHub", url: "https://github.com/example" },
      { name: "LinkedIn", url: "https://linkedin.com/in/example" }
    ]
  }
};
```


---

## SECTION REQUIREMENTS

### 1. About Me

- Content: Name: **Nguyễn Quốc Duy**, 3rd-year student at **Đại học Bách Khoa, Đại học Đà Nẵng**, **Full Stack Developer (strong frontend)**.
- UI: Minimalistic design, profile image (circle or square), short bio, responsive layout.
- Optional: logo in corner (use placeholder image from external link, user can replace later).
- Keep text concise, visually clean, not overcrowded.

---

### 2. Experience

- Existing UI is acceptable, but AI should **enrich content** with mock experiences.
- Each experience should include:
  - Time period
  - Organization name
  - Role / Position
  - Brief summary of responsibilities and accomplishments
- Display as cards or timeline with responsive layout.

---

### 3. Tech Stack

- Organize clearly into:
  - Frontend
  - Backend
  - Mobile
  - Tools
- Include **icon + label** for each tech (use placeholder links for icons).
- Base content on this info:
```
Core Technologies (1+ year): HTML5, CSS3, JS/TypeScript, responsive design, Flexbox, Grid, accessibility
React Ecosystem (6+ months): React Hooks, Context API, React Router, TanStack Query, Zod, Vite, TailwindCSS, ShadcnUI
Performance & SEO: code splitting, lazy loading, image optimization, semantic HTML, meta tags, Core Web Vitals
UI/UX Implementation: pixel-perfect Figma designs, responsive interfaces, Framer Motion
Backend & APIs: Node.js (Express), CRUD operations, MongoDB, MySQL, PostgreSQL, Postman, Swagger
Cloud & DevOps: Docker, Nginx, AWS EC2/S3, Render, Vercel, PM2, Ubuntu
Development Tools: Git, VS Code, Figma, Agile/Scrum
```
- Layout should be **visually clear**, responsive, and modern.

---

### 4. What I Build

- Use **react-pageflip** for a **flipbook effect** with smooth page flip animation.
- Features:
  - First pages: **table of contents** with project number, name, main technology.
  - Clicking a project in TOC flips to the project’s pages.
  - Each project displayed over **two pages**:
    - Left page: Name, overview, team size, position
    - Right page: Demo image, tech stack icons + labels, demo link
  - Add **scroll animation**: book zooms in as user scrolls (use CSS or JS animation).
- Fully responsive, smooth transitions.

---

### 5. My Theatre of Dreams

- Background: **Old Trafford stadium** image.
- Left side: **Parallax effect** for banner (image slides from bottom to top as scroll occurs) — use:  
  `https://i.pinimg.com/736x/5b/fe/cf/5bfecfc360b1b7a3a0ff1724d2b70e01.jpg`
- Right side: **Quote**:  
  `"Hard work will always overcome natural talent when natural talent does not work hard." — Sir Alex Ferguson`
- Personal note below:  
  `"Beyond the IDE, I live by the 'Theatre of Dreams' spirit. Being a Manchester United fan has ingrained in me a 'Never Say Die' attitude that I carry into every line of code. To me, software development is like a championship season: it requires discipline, constant growth, and the belief that a strong team wins trophies. I don’t just ship features; I strive for the kind of excellence that belongs on the world's biggest stage."`
- Optional: include **Ronaldo image** on right for artistic effect:  
  `https://i.pinimg.com/736x/7b/4b/ee/7b4bee88b81457408b5f611cd749c7d6.jpg`

---

### 6. Contact Me

- Form fields: Name, Email, Subject, Message
- Footer: Gmail, GitHub, LinkedIn links (use mock URLs)
- Responsive layout for desktop & mobile
- Minimalistic styling consistent with **red & black color scheme**

---

## DESIGN & LAYOUT NOTES

- **Minimal navbar**: a single corner button opens section menu (desktop & mobile)
- **Color scheme**: Red & Black (consistent across all sections)
- Use **modern responsive layouts**, smooth animations, and polished UI
- **All text in English**, except name
- Images can be **mocked**, except where specific banners are required
- Use **TailwindCSS** or existing CSS solution for styling
- Make sure the code is **ready-to-run**, editable, fully responsive

---

## EXPECTED OUTPUT

1. `/data/portfolioData.ts` — all content centralized
2. `/pages/index.tsx` — main landing page with all sections
3. `/components/*` — reusable components: AboutMeCard, ExperienceCard, TechStackItem, Flipbook, Banner, ContactForm
4. `/styles/*` — TailwindCSS / CSS files implementing red & black theme
5. All sections use **mock data**, **no backend calls**
6. Fully responsive, visually appealing, minimalistic UI
7. Smooth animations for flipbook, parallax banner, and scroll interactions
```