"use client";
import Link from "next/link";
import { FacebookIcon, InstagramIcon, TwitterXIcon } from "../ui/soical-icons";

import { Logo } from "../nav/logo";
import { ContactInfo, getWhatsAppUrl } from "@/constants/contact-info";


const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-retro-border py-8 mt-12">
      

        {/* Bottom copyright */}
        <div className="text-center border-t border-retro-border pt-4 text-xs text-muted-foreground">
          <p>
            © {year} "footer.brand. "footer.copyright"
          </p>
        </div>
   
    </footer>
  );
};

export default Footer;
