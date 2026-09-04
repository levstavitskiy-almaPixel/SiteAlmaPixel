import React from "react";
import { motion } from "framer-motion";
import { type Locale } from "../locales";
import Container from "./Container";
import SocialLinks from "./SocialLinks";
import { STUDIO } from "../data/studio";

interface ContactPageProps {
  locale: Locale;
  language: 'en' | 'ru';
}

export default function ContactPage({ locale, language }: ContactPageProps) {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const subject = formData.get('subject') as string;
    
    const mailtoBody = encodeURIComponent(`Message:\n\n${message}\n\n---\nSender Info:\nName: ${name}\nEmail: ${email}`);
    const mailtoSubject = encodeURIComponent(`${subject || locale.sections.contact.form.subject} - ${name}`);
    const mailtoLink = `mailto:${locale.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
    
    window.location.href = mailtoLink;
  };

  return (
    <section className="py-20 min-h-screen">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-4xl font-chiron-heading mb-4 text-center text-[#216477]">
            {locale.sections.contact.title}
          </h2>
          <p className="text-[#5a6f76] text-center mb-8">
            {locale.sections.contact.description}
          </p>

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#1a2e34] mb-2">
                  {locale.sections.contact.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-white border border-[#216477]/25 rounded-lg text-[#1a2e34] placeholder-[#5a6f76]/70 focus:outline-none focus:ring-2 focus:ring-[#216477] focus:border-transparent transition-all"
                  placeholder={language === 'en' ? 'Your name' : 'Ваше имя'}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#1a2e34] mb-2">
                  {locale.sections.contact.form.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-white border border-[#216477]/25 rounded-lg text-[#1a2e34] placeholder-[#5a6f76]/70 focus:outline-none focus:ring-2 focus:ring-[#216477] focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-[#1a2e34] mb-2">
                {locale.sections.contact.form.subject}
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-3 bg-white border border-[#216477]/25 rounded-lg text-[#1a2e34] placeholder-[#5a6f76]/70 focus:outline-none focus:ring-2 focus:ring-[#216477] focus:border-transparent transition-all"
                placeholder={language === 'en' ? 'Message subject' : 'Тема сообщения'}
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#1a2e34] mb-2">
                {locale.sections.contact.form.message}
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="w-full px-4 py-3 bg-white border border-[#216477]/25 rounded-lg text-[#1a2e34] placeholder-[#5a6f76]/70 focus:outline-none focus:ring-2 focus:ring-[#216477] focus:border-transparent transition-all resize-none"
                placeholder={language === 'en' ? 'Tell us about your project or question...' : 'Расскажите о вашем проекте или вопросе...'}
              />
            </div>
            
            <button
              type="submit"
              className="hero-cta w-full text-white px-8 py-4 font-chiron-heading uppercase tracking-wider"
            >
              {locale.sections.contact.form.submit}
            </button>
          </form>
          
          <div className="mt-8 text-center space-y-4">
            <p className="text-[#5a6f76] text-sm">
              {locale.sections.contact.form.orDirect}{" "}
              <a href={`mailto:${STUDIO.email}`} className="text-[#216477] hover:text-[#163f4a]">
                {STUDIO.email}
              </a>
            </p>
            <SocialLinks className="justify-center" />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
