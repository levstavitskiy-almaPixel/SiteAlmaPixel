import { Link } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import Container from "./Container";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "../context/LanguageContext";
import { formatNewsDate, useNews } from "../lib/news";
import { STUDIO } from "../data/studio";

function NewsCard({
  id,
  date,
  text,
  photo,
  telegramUrl,
  language,
}: {
  id: string;
  date: string;
  text: string;
  photo?: string;
  telegramUrl?: string;
  language: "en" | "ru";
}) {
  return (
    <article
      id={id}
      className="news-card rounded-2xl overflow-hidden bg-white/70 border border-[#216477]/12"
    >
      {photo ? (
        <img src={photo} alt="" className="w-full max-h-[420px] object-cover" />
      ) : null}
      <div className="p-5 md:p-6">
        <p className="text-xs uppercase tracking-[0.14em] text-[#216477] mb-3">
          {formatNewsDate(date, language)}
        </p>
        {text ? (
          <p className="text-[#1a2e34] whitespace-pre-wrap leading-relaxed">{text}</p>
        ) : null}
        {telegramUrl ? (
          <a
            href={telegramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-4 text-sm text-[#216477] underline underline-offset-4"
          >
            Telegram
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default function NewsPage() {
  const { language, locale } = useLanguage();
  const { posts, channelUrl, loaded } = useNews();

  return (
    <div className="min-h-screen w-full overflow-x-hidden font-chiron-body panel-cream">
      <SiteHeader variant="solid" />

      <section className="pt-28 pb-20 md:pt-32">
        <Container>
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-12">
            <p className="font-chiron-heading uppercase tracking-[0.18em] text-[#216477] text-sm mb-3">
              Telegram
            </p>
            <h1
              className="font-chiron-heading text-[#1a2e34]"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
            >
              {locale.sections.news.title}
            </h1>
            <p className="mt-4 text-[#5a6f76] text-base md:text-lg leading-relaxed">
              {locale.sections.news.description}
            </p>
          </ScrollReveal>

          {!loaded ? (
            <p className="text-center text-[#5a6f76]">{locale.sections.news.loading}</p>
          ) : posts.length === 0 ? (
            <div className="news-empty max-w-lg mx-auto text-center px-6 py-14 rounded-2xl border border-dashed border-[#216477]/25">
              <p className="text-[#1a2e34] font-chiron-heading text-xl mb-2">
                {locale.sections.news.empty}
              </p>
              <p className="text-[#5a6f76]">{locale.sections.news.fromTelegram}</p>
              <a
                href={channelUrl || STUDIO.socials.telegram}
                target="_blank"
                rel="noreferrer"
                className="hero-cta mt-8 inline-flex px-6 py-3 text-white text-sm font-chiron-heading uppercase tracking-wider"
              >
                Telegram
              </a>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto flex flex-col gap-6">
              {posts.map((post) => (
                <NewsCard key={post.id} {...post} language={language} />
              ))}
            </div>
          )}
        </Container>
      </section>

      <SiteFooter />
    </div>
  );
}

export function NewsPreview() {
  const { language, locale } = useLanguage();
  const { posts, loaded } = useNews(3);

  if (!loaded) return null;

  return (
    <section id="news" className="relative z-10 py-20 md:py-24 panel-cream">
      <Container>
        <ScrollReveal className="text-center mb-10">
          <h2
            className="font-chiron-heading section-title text-[#1a2e34] uppercase"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.4rem)" }}
          >
            {locale.sections.news.title}
          </h2>
          <p className="mt-3 text-[#5a6f76] max-w-xl mx-auto">
            {locale.sections.news.description}
          </p>
        </ScrollReveal>

        {posts.length === 0 ? (
          <p className="text-center text-[#5a6f76]">{locale.sections.news.empty}</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <NewsCard key={post.id} {...post} language={language} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            to="/news"
            className="hero-cta inline-flex px-7 py-3 text-white text-sm font-chiron-heading uppercase tracking-wider"
          >
            {locale.sections.news.allNews}
          </Link>
        </div>
      </Container>
    </section>
  );
}
