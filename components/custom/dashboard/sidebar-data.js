import {
  // BookOpen,
  // Bot,
  // Command,
  // Frame,
  // LifeBuoy,
  // Map,
  // PieChart,
  ListIcon,
  // Send,
  // Settings2,
  SquareTerminal,
  // NetworkIcon,
  // GalleryVerticalIcon,
  // File,
  // FileLock,
  // FileInput,
  // SpellCheck,
  // Users,
  // FileText,
  // Coins,
  // Building2,
  // UserCircle,
  // Wallet,
  // BookA,
  // BookUp2,
  // ListFilter,
  // DiamondPlusIcon,
  Package,
  ForkKnifeCrossedIcon,
  // Settings,
  // ShoppingBasket,
  // ShoppingCart,
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
        // {
        //   title: "Dashboard",
        //   url: "/dashboard",
        //   icon: SquareTerminal,
        //   isActive: true,
        //   items: [],
        // },
        {
          title: "Inventory",
          url: "/dashboard/inventory",
          icon: Package,
        },
        // {
        //   title: "Orders",
        //   url: "/dashboard/orders",
        //   icon: ShoppingCart,
        // },
        {
          title: "Listings",
          url: "/dashboard/listings",
          icon: ListIcon,
        },
        // {
        //   title: "Messages",
        //   url: "/dashboard/messages",
        //   icon: Send,
        // },
      
      ],
    },
    {
      // title: "Configuration",
      title: "",
      items: [

        // {
        //   title: "Profile",
        //   url: "/dashboard/profile",
        //   icon: UserCircle,
        // },
        // {
        //   title: "Settings",
        //   url: "/dashboard/settings",
        //   icon: Settings,
        // },

      ],
    },
  ],
  navSecondary: [
    // {
    //   title: "Resources",
    //   url: "/resources",
    //   icon: BookOpen,
    // },
   
  ],
};
