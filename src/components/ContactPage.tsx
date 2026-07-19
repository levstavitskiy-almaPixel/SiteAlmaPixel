import React from "react";
import { motion } from "framer-motion";
import { locales, type Locale } from "../locales";

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[200px] xl:px-[200px]">{children}</div>
);

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
          <h2 className="text-4xl font-bold mb-4 text-center" style={{ color: '#edc77b', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            {locale.sections.contact.title}
          </h2>
          <p className="text-gray-300 text-center mb-8">
            {locale.sections.contact.description}
          </p>

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  {locale.sections.contact.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  placeholder={language === 'en' ? 'Your name' : 'Ваше имя'}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  {locale.sections.contact.form.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                {locale.sections.contact.form.subject}
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder={language === 'en' ? 'Message subject' : 'Тема сообщения'}
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                {locale.sections.contact.form.message}
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
                placeholder={language === 'en' ? 'Tell us about your project or question...' : 'Расскажите о вашем проекте или вопросе...'}
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              {locale.sections.contact.form.submit}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              {locale.sections.contact.form.orDirect} <a href={`mailto:${locale.email}`} className="text-amber-400 hover:text-amber-300">{locale.email}</a>
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
