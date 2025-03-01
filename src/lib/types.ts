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
