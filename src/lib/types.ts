
export type FeatureType = {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export type TestimonialType = {
  name: string;
  role: string;
  content: string;
  location?: string;
  image?: string;
  impact?: string;
};

// Updated PodcastEpisodeType to include imageUrl
export type PodcastEpisodeType = {
  title: string;
  description: string;
  pubDate: string;
  audioUrl: string;
  imageUrl?: string | null;
};

// Add missing SocialLinkType
export type SocialLinkType = {
  name: string;
  url: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

// Add missing NavLinkType
export type NavLinkType = {
  label: string;
  url: string;
};
