export type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "link";

export type GithubLinkType = "mobile" | "ai" | "be" | "fe" | "desktop";

export interface GithubLink {
  label: string;
  url: string;
  type?: GithubLinkType;
}

export interface IProject {
  title: string;
  description: string;
  tech: string[];
  image: string;
  links: {
    github: GithubLink[];
    live: string;
  };
}

export interface IExperience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface ISkill {
  category: string;
  items: string[];
}
