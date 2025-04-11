import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  ListIcon,
  Send,
  Settings2,
  SquareTerminal,
  NetworkIcon,
  GalleryVerticalIcon,
  File,
  FileLock,
  FileInput,
  SpellCheck,
  Users,
  FileText,
  Coins,
  Building2,
  UserCircle,
  Wallet,
  BookA,
  BookUp2,
  ListFilter,
  DiamondPlusIcon,
  Package,
  ForkKnifeCrossedIcon,
} from "lucide-react";
export const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  adminMain: [
    {
      title: "Admin",
      items: [
        {
          title: "Dashboard",
          url: "/super",
          icon: SquareTerminal,
          isActive: true,
          items: [],
        },
        {
          title: "Categories",
          url: "/super/categories",
          icon: ListIcon,
          items: [], // Adding empty items array to maintain consistency
        },
        {
          title: "Caterers",
          url: "/super/caterers",
          icon: ForkKnifeCrossedIcon,
          items: [], // Adding empty items array to maintain consistency
        },
        
      ],
    },
  ],
  navMain: [
    {
      title: "Platform",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: SquareTerminal,
          isActive: true,
          items: [],
        },
        {
          title: "Menu",
          url: "/dashboard/menu",
          icon: ListFilter,
        },
        {
          title: "Orders",
          url: "/dashboard/orders",
          icon: Package,
        },
        // {
        //   title: "Messages",
        //   url: "/dashboard/messages",
        //   icon: Send,
        // },
      
      ],
    },
    {
      title: "Configuration",
      items: [

        {
          title: "Profile",
          url: "/dashboard/profile",
          icon: UserCircle,
        },
        {
          title: "Caterer",
          url: "/dashboard/caterer",
          icon: ForkKnifeCrossedIcon,
        },

      ],
    },
  ],
  navSecondary: [
    {
      title: "Resources",
      url: "/resources",
      icon: BookOpen,
    },
   
  ],
};
