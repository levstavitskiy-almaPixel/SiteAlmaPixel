import { Link } from "react-router-dom";
import Container from "./Container";
import ScrollReveal from "./ScrollReveal";
import SocialLinks from "./SocialLinks";
import { useLanguage } from "../context/LanguageContext";
import { STUDIO } from "../data/studio";

export default function SiteFooter() {
  const { locale } = useLanguage();

  return (
    <footer className="relative z-10 py-14 panel-cream border-t border-[#216477]/15">
      <Container>
        <ScrollReveal className="text-center text-[#5a6f76] space-y-4">
          <p className="font-chiron-heading text-[#216477] text-lg">{locale.brand}</p>
          <SocialLinks className="justify-center" />
          <p>
            <a
              href={`mailto:${STUDIO.email}`}
              className="text-[#216477] hover:text-[#163f4a] transition-colors"
            >
              {STUDIO.email}
            </a>
          </p>
          <p>
            © {new Date().getFullYear()} {locale.brand}. {locale.footer.copyright}
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <Link
              to="/privacy"
              className="text-[#216477] hover:text-[#163f4a] transition-colors underline underline-offset-4"
            >
              {locale.footer.privacyLink}
            </Link>
            <Link
              to="/privacy/almabreak"
              className="text-[#216477] hover:text-[#163f4a] transition-colors underline underline-offset-4"
            >
              {locale.footer.privacyAlmaBreak}
            </Link>
          </p>
        </ScrollReveal>
      </Container>
    </footer>
  );
}
