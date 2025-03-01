
export interface TestimonialType {
  name: string;
  role: string;
  content: string;
}

export interface FeatureType {
  title: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface SocialLinkType {
  name: string;
  url: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface NavLinkType {
  label: string;
  url: string;
}

export interface PodcastEpisodeType {
  title: string;
  audioUrl: string;
  description: string;
  pubDate: string;
}
