import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { type Locale } from "../locales";

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[200px] xl:px-[200px]">
    {children}
  </div>
);

interface PrivacyPageProps {
  locale: Locale;
  language: "en" | "ru";
}

export default function PrivacyPage({ locale, language }: PrivacyPageProps) {
  const hub = locale.sections.privacy.hub;

  return (
    <section className="py-20 min-h-screen">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2
            className="text-4xl font-extrabold mb-4 text-center"
            style={{
              color: "rgba(0, 0, 0, 1)",
              fontSize: "35px",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            {locale.sections.privacy.title}
          </h2>
          <p className="text-gray-400 text-sm text-center mb-8">
            {hub.intro}
          </p>

          <div className="grid gap-4 sm:grid-cols-2 mb-14">
            <a
              href="#general"
              className="block p-5 rounded-2xl border border-[#216477]/25 bg-white/40 hover:bg-white/70 transition-colors"
            >
              <h3 className="font-semibold text-[#1a2e34] text-lg mb-1">
                {hub.generalTitle}
              </h3>
              <p className="text-sm text-[#5a6f76]">{hub.generalDesc}</p>
            </a>
            <Link
              to="/privacy/almabreak"
              className="block p-5 rounded-2xl border border-[#216477]/25 bg-white/40 hover:bg-white/70 transition-colors"
            >
              <h3 className="font-semibold text-[#1a2e34] text-lg mb-1">
                {hub.almaBreakTitle}
              </h3>
              <p className="text-sm text-[#5a6f76]">{hub.almaBreakDesc}</p>
            </Link>
          </div>

          <div id="general" className="space-y-8 text-gray-300 leading-relaxed scroll-mt-24">
            <p className="text-gray-400 text-sm text-center mb-2">
              {locale.sections.privacy.lastUpdated}
            </p>
            <div>
              <p className="mb-4">{locale.sections.privacy.sections.introduction}</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-3 text-amber-400">
                {locale.sections.privacy.sections.dataCollection.title}
              </h3>
              <p>{locale.sections.privacy.sections.dataCollection.content}</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-3 text-amber-400">
                {locale.sections.privacy.sections.permissions.title}
              </h3>
              <div className="space-y-3">
                <div>
                  <strong className="text-amber-300">
                    {language === "en" ? "Camera:" : "Камера:"}
                  </strong>
                  <p className="ml-2 inline">
                    {locale.sections.privacy.sections.permissions.camera}
                  </p>
                </div>
                <div>
                  <strong className="text-amber-300">
                    {language === "en" ? "Internet:" : "Интернет:"}
                  </strong>
                  <p className="ml-2 inline">
                    {locale.sections.privacy.sections.permissions.internet}
                  </p>
                </div>
                <div>
                  <strong className="text-amber-300">
                    {language === "en" ? "Analytics:" : "Аналитика:"}
                  </strong>
                  <p className="ml-2 inline">
                    {locale.sections.privacy.sections.permissions.analytics}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-3 text-amber-400">
                {locale.sections.privacy.sections.dataUsage.title}
              </h3>
              <p>{locale.sections.privacy.sections.dataUsage.content}</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-3 text-amber-400">
                {locale.sections.privacy.sections.dataStorage.title}
              </h3>
              <p>{locale.sections.privacy.sections.dataStorage.content}</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-3 text-amber-400">
                {locale.sections.privacy.sections.userRights.title}
              </h3>
              <p>{locale.sections.privacy.sections.userRights.content}</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-3 text-amber-400">
                {locale.sections.privacy.sections.children.title}
              </h3>
              <p>{locale.sections.privacy.sections.children.content}</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-3 text-amber-400">
                {locale.sections.privacy.sections.changes.title}
              </h3>
              <p>{locale.sections.privacy.sections.changes.content}</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-3 text-amber-400">
                {locale.sections.privacy.sections.contact.title}
              </h3>
              <p>{locale.sections.privacy.sections.contact.content}</p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
