"use client";
import Link from "next/link";
import { FacebookIcon, InstagramIcon, TwitterXIcon } from "../ui/soical-icons";
import { useTranslations } from "@/components/providers/translations-context";
import { Logo } from "../nav/logo";
import { ContactInfo, getWhatsAppUrl } from "@/constants/contact-info";

// Footer data structure
const footerData = {
  socialLinks: [
    { icon: FacebookIcon, label: "footer.social.facebook", url: ContactInfo.SOCIAL_URLS.FACEBOOK },
    { icon: TwitterXIcon, label: "footer.social.twitter", url: ContactInfo.SOCIAL_URLS.TWITTER },
    { icon: InstagramIcon, label: "footer.social.instagram", url: ContactInfo.SOCIAL_URLS.INSTAGRAM },
  ],
  categories: [
   
    {
      id: "sellers",
      titleKey: "footer.categories.sellers",
      links: [
        { href: "/seller/onboarding", labelKey: "footer.links.sellerOnboarding" },
        { href: "/seller/benefits", labelKey: "footer.links.sellerBenefits" },
      ],
    },
    {
      id: "company",
      titleKey: "footer.categories.company",
      columnSpan: { mobile: 2, desktop: 1 },
      links: [
        { href: "/about", labelKey: "footer.links.about" },
        { href: getWhatsAppUrl(), labelKey: "footer.links.contact", isExternal: true },
      ],
    },
    {
      id: "legal",
      titleKey: "footer.categories.legal",
      columnSpan: { mobile: 2, desktop: 1 },
      links: [
        { href: "/terms", labelKey: "footer.links.terms" },
        { href: "/privacy", labelKey: "footer.links.privacy" },
      ],
    },
  ],
};

const Footer = () => {
  const { t } = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-retro-border py-8 mt-12">
      <div className="container mx-auto px-4">
        {/* Top section with brand and socials */}
        <div className="flex flex-col items-center mb-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <div className="relative flex items-center justify-center mr-2">
              <Logo />
            </div>
          </div>

          <div className="flex gap-4">
            {footerData.socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                aria-label={t(social.label)}
                className="retro-button-icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Middle section with simplified links */}
        <div className="grid grid-cols-2 md:grid-cols-3 sm:grid-cols-4 gap-6 mb-8 text-sm font-mono">
          {footerData.categories.map((category) => (
            <div 
              key={category.id}
              className={category.columnSpan ? `col-span-${category.columnSpan.mobile} sm:col-span-${category.columnSpan.desktop}` : ""}
            >
              <h3 className="font-bold mb-2">
                {t(category.titleKey)}
              </h3>
              <ul className="space-y-2">
                {category.links.map((link, index) => (
                  <li key={index}>
                    {link.isExternal ? (
                      <a
                        href={link.href}
                        className="hover:text-retro-primary transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t(link.labelKey)}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="hover:text-retro-primary transition-colors"
                      >
                        {t(link.labelKey)}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom copyright */}
        <div className="text-center border-t border-retro-border pt-4 text-xs text-muted-foreground">
          <p>
            © {year} {t("footer.brand")}. {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
