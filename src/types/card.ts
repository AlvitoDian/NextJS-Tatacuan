export type SocialMediaLink = {
  platform: string;
  href: string;
};

export type MenuItem = {
  label: string;
  href: string;
  backgroundColor: string;
  textColor: string;
};

export type CardData = {
  backgroundColor: string;
  usernameTextColor: string;
  descriptionTextColor: string;
  username: string;
  description: string;
  profileImage: string;
  bannerImage: string;
  socialMedia: SocialMediaLink[];
  menu: MenuItem[];
};

export type CardPayload = Partial<CardData>;
