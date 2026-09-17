export const portfolioData = {
  aboutMe: {
    name: "Nguyen Quoc Duy",
    handle: "duyaivy",
    title: "Full Stack Developer",
    institution: "Da Nang University of Science and Technology (DUT)",
    status: "Software Engineering • GPA 3.83 / 4.0",
    focus: "React.js / Next.js / Nest.js / Node.js",
    availability: "Open",
    bio: "Software Engineering student with hands-on experience through internship and team projects. Experienced in developing, debugging, testing, and deploying software in collaborative environments.",
    mission:
      "Interested in problem solving, continuous learning, and adapting to new technologies, with a focus on building reliable software and using AI tools effectively to support the development process.",
    resumeUrl: "/resume.pdf",
    email: "quocduy0322@gmail.com",
    phone: "0979.783.396",
    socials: [
      { name: "GitHub", url: "https://github.com/duyaivy" },
      { name: "LinkedIn", url: "https://linkedin.com/in/duyaivy" },
      { name: "Facebook", url: "https://www.facebook.com/quoc.duy.0322/" }
    ],
    avatar: "/avatar.jpg",
    backgroundWord: "duyaivy"
  },
  experiences: [
    {
      period: "Nov 2025 - Feb 2026",
      organization: "AIAIVN - Vietnam Artificial Intelligence JSC",
      organizationUrl: "https://www.aiaivn.com/",
      role: "Intern Frontend Developer",
      description: `Contributed to HeriStepAI GPS by fixing bugs and implementing features for real-world deployments in Hoi An and Da Nang New Year Marathon 2025–2026. Worked with HeriStepAI Beacon and supported deployment at Da Nang Museum of Cham Sculpture. Built Website Payment to support ticket purchasing flows redirected from HeriStepAI GPS, collaborating within an active software development workflow.`,
      bullets: [
        "Contributed to HeriStepAI GPS by fixing bugs and implementing features for real-world deployments in Hoi An and Da Nang New Year Marathon 2025–2026.",
        "Learned and worked with the existing HeriStepAI Beacon and supported project deployment at the Da Nang Museum of Cham Sculpture.",
        "Built Website Payment, a web application supporting ticket purchasing flow by redirecting users from the HeriStepAI GPS platform to complete payment.",
        "Worked within an existing software development workflow involving task coordination, bug fixing, feature development, testing, and deployment support."
      ]
    },
    {
      period: "Sep 2024 - Sep 2026",
      organization: "GDGoC DUT - Google Developer Groups On Campus DUT",
      organizationUrl: "https://www.facebook.com/gdgoc.dut/",
      role: "Frontend Developer — Student Community",
      description: `Shared technical knowledge and supported peer learning within the student technology community. Developed interactive mini-games such as Lucky Wheel and Memory Matching Game to increase engagement during club events and activities. Collaborated with club members on community technology projects and tech competitions.`,
      bullets: [
        "Shared technical knowledge and supported peer learning within the student technology community.",
        "Developed interactive mini games such as Lucky Wheel, Memory Matching Game to increase engagement during club events and activities.",
        "Collaborated with club members on technology projects for learning, community-oriented initiatives, and participation in hackathons and competitions."
      ]
    },
    {
      period: "2025",
      organization: "Freelance Projects",
      role: "Full Stack Developer / Content Creator",
      description: `I provided support for student assignments and projects, including converting Figma designs to HTML/CSS/JS, coding exercises in OOP and data structures, and assisting with project development. Additionally, I created SEO content for e-commerce websites.`,
      bullets: [
        "Supported student assignments and projects by converting Figma UI designs into responsive, clean HTML/CSS/JS and React interfaces.",
        "Implemented programming exercises and algorithmic solutions focusing on OOP and core data structures.",
        "Produced search-engine-optimized (SEO) content for e-commerce websites to enhance discoverability and reach."
      ]
    }
  ],
  techStack: {
    frontend: [
      { name: "HTML5", icon: "/icons/tech/html5.svg" },
      { name: "CSS", icon: "/icons/tech/css.svg" },
      { name: "JavaScript", icon: "/icons/tech/javascript.svg" },
      { name: "TypeScript", icon: "/icons/tech/typescript.svg" },
      { name: "React", icon: "/icons/tech/react.svg" },
      { name: "Next.js", icon: "/icons/tech/nextjs.svg" },
      { name: "Tailwind CSS", icon: "/icons/tech/tailwindcss.svg" },
      { name: "Motion", icon: "/icons/tech/motion.svg" },
      { name: "Zustand", icon: "/icons/tech/zustand.svg" },
      { name: "TanStack Query", icon: "/icons/tech/tanstack-query.svg" },
      { name: "Vite", icon: "/icons/tech/vite.svg" },
      { name: "Gsap", icon: "/icons/tech/gsap.svg" }
    ],
    backend: [
      { name: "Node.js", icon: "/icons/tech/nodejs.svg" },
      { name: "Express.js", icon: "/icons/tech/express.svg" },
      { name: "Nest.js", icon: "/icons/tech/nest.svg" },
      { name: "Python", icon: "/icons/tech/python.svg" },
      { name: "MongoDB", icon: "/icons/tech/mongodb.svg" },
      { name: "PostgreSQL", icon: "/icons/tech/postgresql.svg" },
      { name: "MySQL", icon: "/icons/tech/mysql.svg" },
      { name: "Redis", icon: "/icons/tech/redis.svg" },
      { name: "Supabase", icon: "/icons/tech/supabase.svg" },
      { name: "Firebase", icon: "/icons/tech/firebase.svg" }
    ],
    mobile: [
      { name: "React Native", icon: "/icons/tech/react.svg" },
      { name: "Expo", icon: "/icons/tech/expo.svg" }
    ],
    tools: [
      { name: "Git", icon: "/icons/tech/git.svg" },
      { name: "GitHub", icon: "/icons/tech/github.svg" },
      { name: "Docker", icon: "/icons/tech/docker.svg" },
      { name: "Nginx", icon: "/icons/tech/nginx.svg" },
      { name: "k6", icon: "/icons/tech/k6.svg" },
      { name: "AWS", icon: "/icons/tech/aws.svg" },
      { name: "Figma", icon: "/icons/tech/figma.svg" },
      { name: "Vercel", icon: "/icons/tech/vercel.svg" },
      { name: "VS Code", icon: "/icons/tech/vscode.svg" }
    ]
  },
  projects: [
    {
      id: 1,
      name: "ShortLink Tool",
      period: "Oct 2025 - Dec 2025",
      overview: `Scalable URL Shortener System built for high-throughput redirect performance:
• Base62 encoding with Key Generation Service (KGS) to eliminate collisions.
• Multi-layer Redis caching & rate limiting for fast HTTP 302 redirects.
• Asynchronous click analytics pipeline with background batch persistence.
• Fully containerized with Docker, Nginx reverse proxy, and GitHub Actions CI/CD.`,
      teamSize: "Personal project",
      role: "Fullstack developer / DevOps",
      tech: [
        { name: "React.js", icon: "/icons/tech/react.svg" },
        { name: "Nest.js", icon: "/icons/tech/nest.svg" },
        { name: "MongoDB", icon: "/icons/tech/mongodb.svg" },
        { name: "Redis", icon: "/icons/tech/redis.svg" },
        { name: "Docker", icon: "/icons/tech/docker.svg" },
        { name: "Nginx", icon: "/icons/tech/nginx.svg" },
        { name: "k6", icon: "/icons/tech/k6.svg" }
      ],
      image: "/shortlink.jpg",
      demoLink: "https://url.duyaivy.id.vn/",
      githubLinks: [
        {
          label: "Frontend",
          type: "fe" as const,
          url: "https://github.com/duyaivy/SHORTEN_URL_FRONTEND"
        },
        {
          label: "Backend",
          type: "be" as const,
          url: "https://github.com/duyaivy/SHORTEN_URL"
        }
      ]
    },
    {
      id: 2,
      name: "SmartFood AI",
      period: "Dec 2025 - Apr 2026",
      overview: `Full-stack nutrition platform combining AI food recognition, weight-based calorie estimation, and personalized meal recommendations:
• Cross-platform mobile app with push notifications and personalized targets.
• Backend APIs with authentication, Redis caching, and PostgreSQL persistence.
• Real-time MQTT communication integrated with an IoT smart scale.`,
      teamSize: "4 contributors",
      role: "Fullstack developer",
      tech: [
        { name: "React Native", icon: "/icons/tech/react.svg" },
        { name: "Expo", icon: "/icons/tech/expo.svg" },
        { name: "Express.js", icon: "/icons/tech/express.svg" },
        { name: "PostgreSQL", icon: "/icons/tech/postgresql.svg" },
        { name: "Redis", icon: "/icons/tech/redis.svg" },
        { name: "Firebase", icon: "/icons/tech/firebase.svg" },
        { name: "MQTT", icon: "/icons/tech/mqtt.svg" },
        { name: "Tailwind CSS", icon: "/icons/tech/tailwindcss.svg" }
      ],
      image: "/smartfood_ai.jpg",
      demoLink: "https://youtu.be/ZgGcTy55q7k",
      githubLinks: [
        {
          label: "Mobile App",
          type: "mobile" as const,
          url: "https://github.com/duyaivy/smart-food"
        },
        {
          label: "Backend",
          type: "be" as const,
          url: "https://github.com/duyaivy/smart-food-be"
        }
      ]
    },
    {
      id: 3,
      name: "VietFood Restaurant",
      period: "Mar 2026 - Jun 2026",
      overview: `Full-stack restaurant platform covering end-to-end dining and business management:
• Seamless customer ordering flow, table status, and VNPay online payment.
• Real-time order & kitchen status synchronization using Socket.IO and Redis.
• AI customer assistant with Vietnamese/English TTS playback and admin operations dashboard.`,
      teamSize: "2 contributors",
      role: "Fullstack developer",
      tech: [
        { name: "Next.js", icon: "/icons/tech/nextjs.svg" },
        { name: "React.js", icon: "/icons/tech/react.svg" },
        {
          name: "Django REST Framework",
          icon: "/icons/tech/python.svg"
        },
        { name: "Socket.IO", icon: "/icons/tech/socketio.svg" },
        { name: "Redis", icon: "/icons/tech/redis.svg" },
        { name: "OpenAI", icon: "/icons/tech/openai.svg" },
        { name: "Tailwind CSS", icon: "/icons/tech/tailwindcss.svg" }
      ],
      image: "/vietfood.jpg",
      demoLink: "https://restaurant.duyaivy.id.vn/",
      githubLinks: [
        {
          label: "Frontend",
          type: "fe" as const,
          url: "https://github.com/duyaivy/RestaurantFE"
        },
        {
          label: "Backend",
          type: "be" as const,
          url: "https://github.com/duyaivy/RestaurantBE"
        }
      ]
    },
    {
      id: 4,
      name: "MineSweeper AI",
      period: "Mar 2026",
      overview: `Interactive Minesweeper game exploring AI-assisted and automated gameplay:
• Classic game mechanics paired with machine learning and rule-based decision trees.
• Predicts safe moves, recommends hints, and solves board configurations in real time.`,
      teamSize: "Personal project",
      role: "Game and AI developer",
      tech: [
        { name: "Pygame", icon: "/icons/tech/python.svg" },
        { name: "XGBoost", icon: "/icons/tech/xgboost.svg" },
        { name: "Scikit-learn", icon: "/icons/tech/scikit-learn.svg" }
      ],
      image: "/minesweeper_ai.jpg",
      demoLink:
        "https://github.com/duyaivy/minesweeper-ai/blob/master/assets/demo.gif",
      githubLinks: [
        {
          label: "Game and AI",
          type: "desktop" as const,
          url: "https://github.com/duyaivy/minesweeper-ai"
        }
      ]
    }
  ],
  theatreOfDreams: {
    bannerImage: "/banner.jpg",
    quote:
      "Hard work will always overcome natural talent when natural talent does not work hard.",
    quoteAuthor: "Sir Alex Ferguson",
    personalNote:
      "That mindset follows me into software: stay disciplined, keep improving, and do the work even when the result is not immediate. I try to build products with the same attitude: clear purpose, strong execution, and no shortcuts."
  },
  certifications: [
    {
      title: "Academic Encouragement Scholarship DUT",
      period: "Semester 2, 2024–2025",
      issuer: "Da Nang University of Science and Technology",
      detail: "Semester GPA 9.26 / 10"
    },
    {
      title: "TOEIC Listening & Reading",
      period: "Jun 2026",
      issuer: "IIG / ETS",
      detail: "Score 815 / 990"
    },
    {
      title: "Google for Education - Gemini Certified Student",
      period: "Feb 2026",
      issuer: "Google for Education",
      detail: "Gemini Certified"
    }
  ],
  contact: {
    email: "quocduy0322@gmail.com",
    phone: "0979.783.396",
    github: "https://github.com/duyaivy",
    linkedin: "https://linkedin.com/in/duyaivy"
  }
};

// Individual exports for backward compatibility
export const personalInfo = portfolioData.aboutMe;
export const experiences = portfolioData.experiences;
export const skills = [
  {
    category: "Frontend",
    items: portfolioData.techStack.frontend
  },
  {
    category: "Backend",
    items: portfolioData.techStack.backend
  },
  {
    category: "Mobile",
    items: portfolioData.techStack.mobile
  },
  {
    category: "Tools & Others",
    items: portfolioData.techStack.tools
  }
];
export const projects = portfolioData.projects.map((p) => ({
  title: p.name,
  description: p.overview,
  tech: p.tech.map((tech) => tech.name),
  image: p.image,
  links: { github: p.githubLinks, live: p.demoLink }
}));
export const certifications = portfolioData.certifications;
export const theatreOfDreams = {
  bannerImage: portfolioData.theatreOfDreams.bannerImage,
  theme: "Manchester United: Never Gonna Stop",
  inspirationalMessage: portfolioData.theatreOfDreams.personalNote
};
