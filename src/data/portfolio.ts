export const portfolioData = {
  aboutMe: {
    name: "Nguyen Quoc Duy",
    handle: "duyaivy",
    title: "Full Stack Developer",
    institution: "Da Nang University of Science and Technology",
    status: "3rd-year student",
    focus: "React / Next.js / Node.js / APIs",
    availability: "Open",
    bio: "A Full Stack Developer focused on building complete web/app products, from polished React to Next.js and React Native interfaces to reliable backend APIs, databases, and deployment workflows.",
    mission:
      "I turn ideas into fast, practical products with thoughtful UI, stable backend logic, clean data flow, and a focus on real user experience.",
    resumeUrl: "/resume.pdf",
    email: "duyaivy.dev@gmail.com",
    phone: "+84 123 456 789",
    socials: [
      { name: "GitHub", url: "https://github.com/duyaivy" },
      { name: "LinkedIn", url: "https://linkedin.com/in/duyaivy" },
      { name: "Facebook", url: "https://facebook.com/duyaivy" }
    ],
    avatar: "/avatar.jpg",
    backgroundWord: "duyaivy"
  },
  experiences: [
    {
      period: "Nov 2025 - Feb 2025",
      organization: "AIAIVN",
      organizationUrl: "https://www.aiaivn.com/",
      role: "Intern Frontend Developer",
      description: `As an Intern at AIAIVN, I had the opportunity to learn and work with modern technologies while participating in real-world projects. During my internship, I was involved in projects such as HeriStepAI GPS, HeriStepAI Beacon, and Website Payment, contributing to development tasks, problem-solving, and system improvement. This role strengthened my technical skills, gave me hands-on experience, and improved teamwork and professional working practices.`
    },
    {
      period: "2024 - Present",
      organization: "Google Developer Groups On Campus - DUT",
      organizationUrl: "https://www.facebook.com/gdgoc.dut/",
      role: "Frontend Developer",
      description: `I am a member of a Community Technology Club, a nonprofit organization developing technology products to support learning and benefit the student community. In the club, I share technical knowledge, participate in coding internal projects, and help create mini-games such as lucky wheel and flip card to enhance engagement and club activities.`
    },
    {
      period: "2025",
      organization: "Freelance Projects",
      role: "Full Stack Developer / Content Creator",
      description: `I provided support for student assignments and projects, including converting Figma designs to HTML/CSS/JS, coding exercises in OOP and data structures, and assisting with project development. Additionally, I created SEO content for e-commerce websites.`
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
      { name: "Express", icon: "/icons/tech/express.svg" },
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
      { name: "Figma", icon: "/icons/tech/figma.svg" },
      { name: "Vercel", icon: "/icons/tech/vercel.svg" },
      { name: "AWS", icon: "/icons/tech/aws.svg" },
      { name: "Nginx", icon: "/icons/tech/nginx.svg" },
      { name: "VS Code", icon: "/icons/tech/vscode.svg" }
    ]
  },
  projects: [
    {
      id: 1,
      name: "SmartFood AI",
      period: "Dec 2025 - May 2026",
      overview: `SmartFood AI is a full-stack nutrition tracking project that connects a mobile app, backend APIs, AI ingredient classification, and an IoT smart scale. It helps users record meals, calculate calories and nutrition values, follow weight goals, and receive meal suggestions based on personal diet targets. The project covers the full product flow from mobile UI and data management to backend services, deployment, and AI-assisted food analysis.`,
      teamSize: "4 contributors",
      role: "Fullstack developer, AI ingredient classification",
      tech: [
        { name: "React Native", icon: "/icons/tech/react.svg" },
        { name: "Expo", icon: "/icons/tech/expo.svg" },
        { name: "Moti", icon: "/icons/tech/motion.svg" },
        { name: "Zustand", icon: "/icons/tech/zustand.svg" },
        { name: "TanStack Query", icon: "/icons/tech/tanstack-query.svg" },
        { name: "Tailwind CSS", icon: "/icons/tech/tailwindcss.svg" },
        {
          name: "Firebase Push Notification",
          icon: "/icons/tech/firebase.svg"
        },
        { name: "ExpressJS", icon: "/icons/tech/express.svg" },
        { name: "JWT", icon: "/icons/tech/jwt.svg" },
        { name: "MQTT", icon: "/icons/tech/mqtt.svg" },
        { name: "Redis", icon: "/icons/tech/redis.svg" },
        { name: "PostgREST", icon: "/icons/tech/postgresql.svg" },
        { name: "Supabase", icon: "/icons/tech/supabase.svg" },
        { name: "Cloudinary", icon: "/icons/tech/cloudinary.svg" }
      ],
      image: "/smartfood_ai.jpg",
      demoLink: "https://github.com/duyaivy/smart-food",
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
        },

      ]
    },
    {
      id: 2,
      name: "VietFood Restaurant",
      period: "Jan 2026 - Apr 2026",
      overview: `VietFood is a restaurant management platform for customer ordering, real-time service tracking, and business operations. Customers can browse menus, place orders, follow dish status, use an AI chatbot for support, and complete payments through VNPay. Admin users can manage menu items, staff, revenue, orders, notifications, multilingual content, SEO, and customer insights from a centralized dashboard.`,
      teamSize: "2 contributors",
      role: "Fullstack developer, deployment",
      tech: [
        { name: "Next.js", icon: "/icons/tech/nextjs.svg" },
        { name: "React.js", icon: "/icons/tech/react.svg" },
        { name: "Zustand", icon: "/icons/tech/zustand.svg" },
        { name: "Shadcn UI", icon: "/icons/tech/shadcnui.svg" },
        { name: "React i18n", icon: "/icons/tech/reacti18n.svg" },
        { name: "Lucide React", icon: "/icons/tech/lucide-react.svg" },
        { name: "Next Theme", icon: "/icons/tech/nextjs.svg" },
        { name: "Socket.io", icon: "/icons/tech/socketio.svg" },
        { name: "Tailwind CSS", icon: "/icons/tech/tailwindcss.svg" },
        {
          name: "Python Django REST Framework",
          icon: "/icons/tech/python.svg"
        },
        { name: "OpenAI", icon: "/icons/tech/openai.svg" },
        { name: "Redis", icon: "/icons/tech/redis.svg" },
        { name: "JWT", icon: "/icons/tech/jwt.svg" },
        { name: "Google Cloud Translate", icon: "/icons/tech/google-cloud.svg" }
      ],
      image: "/vietfood.jpg",
      demoLink: "https://restaurant.duyaivy.id.vn/",
      githubLinks: [{
        label: "Frontend",
        type: "fe" as const,
        url: "https://github.com/duyaivy/RestaurantFE"
      },
      {
        label: "Backend",
        type: "be" as const,
        url: "https://github.com/duyaivy/RestaurantBE"
      }]
    },
    {
      id: 3,
      name: "MiniSweeper AI",
      period: "Mar 2026",
      overview: `MiniSweeper AI is a Minesweeper game project that explores AI-assisted and automated gameplay. It combines classic game mechanics with rule-based reasoning and machine learning models to predict safe moves, suggest hints, and complete boards automatically. The project focuses on practical AI decision-making in an interactive real-time game environment.`,
      teamSize: "Personal project",
      role: "Game + AI developer",
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
  contact: {
    email: "duyaivy.dev@gmail.com",
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
export const theatreOfDreams = {
  bannerImage: portfolioData.theatreOfDreams.bannerImage,
  theme: "Manchester United: Never Gonna Stop",
  inspirationalMessage: portfolioData.theatreOfDreams.personalNote
};
