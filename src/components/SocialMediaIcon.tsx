import { Instagram, Facebook, Twitter, Linkedin, Github } from "lucide-react";
import Link from "next/link";

export default function SocialMediaIcon({ platform = "", href = "" }) {
  const getIcon = () => {
    switch (platform) {
      case "Instagram":
        return <Instagram size={20} color="#E44B37" />;
      case "Facebook":
        return <Facebook size={20} color="#1877F2" />;
      case "Twitter":
        return <Twitter size={20} color="#1DA1F2" />;
      case "LinkedIn":
        return <Linkedin size={20} color="#0077B5" />;
      case "Github":
        return <Github size={20} color="#0077B5" />;
      default:
        return <Instagram size={20} color="#E44B37" />;
    }
  };
  return (
    <Link
      href={href}
      className="w-[40px] h-[40px] flex justify-center items-center bg-white rounded-full shadow-xl"
    >
      {getIcon()}
    </Link>
  );
}
