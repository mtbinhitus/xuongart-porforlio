import { Mail, Home, LifeBuoy, Image, Video, Tag } from "react-feather";

export default [
  {
    id: "account",
    title: "Account",
    icon: <LifeBuoy size={20} />,
    navLink: "/account-page",
  },
  {
    id: "collection",
    title: "Collection",
    icon: <Image size={20} />,
    navLink: "/collection-page",
  },
  {
    id: "videos",
    title: "Videos",
    icon: <Video size={20} />,
    navLink: "/videos",
  },
  {
    id: "tags",
    title: "Tags",
    icon: <Tag size={20} />,
    navLink: "/tags",
  },
];
