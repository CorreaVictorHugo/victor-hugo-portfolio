export interface Project {
  slug: string;
  index: string;
  title: string;
  category: string;
  year: string;
  client: string;
  description: string;
  challenge: string;
  solution: string;
  outcome: string;
  cover?: string;
  coverSmall?: string;
  coverWidth?: number;
  coverHeight?: number;
  coverAlt: string;
  gallery: { src: string; alt: string; width: number; height: number }[];
  url?: string;
  repository?: string;
  placeholder: boolean;
  tone: 'sage' | 'clay';
}
