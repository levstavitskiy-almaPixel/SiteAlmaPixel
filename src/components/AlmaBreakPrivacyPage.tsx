import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[200px] xl:px-[200px]">
    {children}
  </div>
);

interface AlmaBreakPrivacyPageProps {
  language: "en" | "ru";
}

const copy = {
  en: {
    back: "← All privacy policies",
    title: "Privacy Policy",
    app: "App: AlmaBreak",
    effective: "Effective date: July 20, 2026",
    updated: "Last updated: July 20, 2026",
    intro:
      'This Privacy Policy describes what data the AlmaBreak mobile app (the "App") processes, for what purposes, and how it is stored. By using the App, you agree to this Policy.',
    sections: [
      {
        title: "1. Who we are",
        body: [
          "AlmaBreak is a local Android app that limits the use of other apps by a daily time limit and by schedule.",
          "Privacy questions: support@alma-pixel.com",
        ],
      },
      {
        title: "2. What data is processed",
        body: [
          "The App may process the following data on your device:",
        ],
        list: [
          "Installed apps list — names, icons, and package identifiers so you can choose apps to restrict.",
          "App usage statistics (Usage Access / PACKAGE_USAGE_STATS) — time spent in selected apps for the current day to enforce the daily limit.",
          "Current foreground app (Accessibility Service) — to detect when a restricted app is open and, if needed, return you to the home screen.",
          "Your blocking settings — whether limits are enabled, minute limits, weekly schedule, and daily used-time counters.",
          "Subscription status — whether an active subscription exists for App features. Payments go through Google Play; the App does not receive or store card details.",
          "System permissions — notifications (block messages and background monitoring) and boot start (to restore monitoring after reboot when a subscription is active).",
        ],
        after:
          "The App does not create accounts, does not ask for name, phone, address, or photos, and does not collect precise location.",
      },
      {
        title: "3. How data is used",
        list: [
          "providing app-limiting features (limit and schedule);",
          "counting usage time and resetting daily limits;",
          "showing the block screen and notifications with the reason;",
          "checking and restoring a subscription via Google Play;",
          "running background monitoring while a subscription is active.",
        ],
        after: "Data is not used for advertising and is not sold to third parties.",
      },
      {
        title: "4. Where data is stored and whether it is shared",
        list: [
          "Blocking settings and local subscription status are stored locally on the device (SharedPreferences).",
          "The App has no own server for uploading your blocking rules or usage statistics.",
          "Purchases and subscription management are handled by Google Play Billing. Google’s privacy policy also applies: policies.google.com/privacy.",
        ],
      },
      {
        title: "5. Special Android permissions",
        subsections: [
          {
            title: "5.1. Usage Access",
            body: "Needed to count minutes spent in selected apps and apply the daily limit. Without this permission, the time limit cannot work.",
          },
          {
            title: "5.2. Accessibility Service",
            body: "Used only to detect when a restricted app opens and to perform blocking (return to Home and show the block screen). The App does not use Accessibility to read screen content, passwords, messages, or to control the device beyond the described blocking feature.",
          },
          {
            title: "5.3. Notifications and background work",
            body: "Notifications may show why an app was blocked and that monitoring is active. A background service updates statistics and checks limits while a subscription is active.",
          },
        ],
      },
      {
        title: "6. Subscription",
        body: [
          "Access to App features is provided via a monthly subscription through Google Play. Without an active subscription, blocking features are unavailable. You can cancel in Google Play → Subscriptions.",
        ],
      },
      {
        title: "7. Sharing with third parties",
        body: [
          "We do not sell or share your blocking data with ad networks. Sharing may occur only as needed for Google Play (subscription and payments) or if required by law.",
        ],
      },
      {
        title: "8. Retention and deletion",
        body: [
          "Data stays on the device while the App is installed or until you delete it. To remove local data:",
        ],
        list: [
          "clear the App’s data in Android settings; or",
          "uninstall the App from the device.",
        ],
        after:
          "Purchase history and subscription status in your Google account are managed through Google Play.",
      },
      {
        title: "9. Security",
        body: [
          "We aim to process only the minimum data needed for features to work. Because data is stored locally, security also depends on protecting your device (screen lock, system updates, and so on).",
        ],
      },
      {
        title: "10. Children",
        body: [
          "The App is not intended for children under 13 and is not aimed at collecting children’s data. If you believe a child provided data through a device, delete the App or clear its data and contact us.",
        ],
      },
      {
        title: "11. Changes to this Policy",
        body: [
          "We may update this Policy from time to time. The updated version will be posted on this page with a new “Last updated” date.",
        ],
      },
      {
        title: "12. Contact",
        body: [
          "Questions about this Privacy Policy: support@alma-pixel.com",
          "Developer: Alma Pixel",
        ],
      },
    ],
    note: "This Policy applies specifically to the AlmaBreak app. For Alma Pixel’s general privacy policy, see the main Privacy Policy page.",
  },
  ru: {
    back: "← Все политики конфиденциальности",
    title: "Политика конфиденциальности",
    app: "Приложение: AlmaBreak",
    effective: "Дата вступления в силу: 20 июля 2026 г.",
    updated: "Последнее обновление: 20 июля 2026 г.",
    intro:
      "Настоящая Политика конфиденциальности описывает, какие данные обрабатывает мобильное приложение AlmaBreak (далее — «Приложение»), для каких целей и как они хранятся. Используя Приложение, вы соглашаетесь с условиями этой Политики.",
    sections: [
      {
        title: "1. Кто мы",
        body: [
          "AlmaBreak — локальное Android-приложение для ограничения использования других приложений по дневному лимиту времени и по расписанию.",
          "По вопросам конфиденциальности: support@alma-pixel.com",
        ],
      },
      {
        title: "2. Какие данные обрабатываются",
        body: [
          "Приложение может обрабатывать следующие данные на вашем устройстве:",
        ],
        list: [
          "Список установленных приложений — названия, иконки и идентификаторы пакетов (package name), чтобы вы могли выбрать приложения для ограничений.",
          "Статистика использования приложений (через разрешение Usage Access / PACKAGE_USAGE_STATS) — время использования выбранных приложений за текущий день для проверки дневного лимита.",
          "Сведения о текущем открытом приложении (через службу специальных возможностей / Accessibility Service) — чтобы определить, открыто ли ограниченное приложение, и при необходимости вернуть вас на главный экран.",
          "Ваши настройки блокировки — включение ограничений, лимиты в минутах, расписание по дням недели, счётчик использованного времени за день.",
          "Статус подписки — информация о наличии активной подписки, необходимая для доступа к функциям Приложения. Оплата проходит через Google Play; платёжные реквизиты карты Приложение не получает и не хранит.",
          "Системные разрешения — уведомления (для сообщений о блокировке и фонового мониторинга), автозапуск после перезагрузки устройства (для восстановления мониторинга при активной подписке).",
        ],
        after:
          "Приложение не создаёт учётные записи, не запрашивает имя, телефон, адрес или фотографии и не собирает точную геолокацию.",
      },
      {
        title: "3. Для чего используются данные",
        list: [
          "предоставление функций ограничения приложений (лимит и расписание);",
          "подсчёт времени использования и сброс дневных лимитов;",
          "показ экрана и уведомления о причине блокировки;",
          "проверка и восстановление подписки через Google Play;",
          "работа фонового мониторинга при активной подписке.",
        ],
        after: "Данные не используются для рекламы и не продаются третьим лицам.",
      },
      {
        title: "4. Где хранятся данные и передаются ли они",
        list: [
          "Настройки блокировки и локальный статус подписки хранятся локально на устройстве (SharedPreferences).",
          "У Приложения нет собственного сервера для загрузки ваших правил блокировки или статистики использования.",
          "Покупки и управление подпиской обрабатываются сервисами Google Play Billing. На обработку платежей также распространяется политика конфиденциальности Google: policies.google.com/privacy.",
        ],
      },
      {
        title: "5. Специальные разрешения Android",
        subsections: [
          {
            title: "5.1. Доступ к статистике использования (Usage Access)",
            body: "Нужен, чтобы считать, сколько минут вы провели в выбранных приложениях, и применять дневной лимит. Без этого разрешения лимит по времени работать не сможет.",
          },
          {
            title: "5.2. Служба специальных возможностей (Accessibility Service)",
            body: "Используется только для обнаружения открытия ограниченного приложения и выполнения блокировки (возврат на Home и показ экрана блокировки). Приложение не использует Accessibility для чтения содержимого экрана, паролей, сообщений или управления устройством вне описанной функции блокировки.",
          },
          {
            title: "5.3. Уведомления и фоновая работа",
            body: "Могут показываться уведомления о причине блокировки и о том, что мониторинг активен. Фоновый сервис обновляет статистику и проверяет ограничения при активной подписке.",
          },
        ],
      },
      {
        title: "6. Подписка",
        body: [
          "Доступ к функциям Приложения предоставляется по месячной подписке через Google Play. Без активной подписки функции блокировки недоступны. Отменить подписку можно в настройках Google Play → Подписки.",
        ],
      },
      {
        title: "7. Передача данных третьим лицам",
        body: [
          "Мы не продаём и не передаём ваши данные блокировки рекламным сетям. Передача может происходить только в объёме, необходимом для работы Google Play (обработка подписки и платежей) или если этого требует закон.",
        ],
      },
      {
        title: "8. Хранение и удаление данных",
        body: [
          "Данные хранятся на устройстве, пока установлено Приложение или пока вы их не удалите. Чтобы удалить локальные данные:",
        ],
        list: [
          "очистите данные Приложения в настройках Android; или",
          "удалите Приложение с устройства.",
        ],
        after:
          "История покупок и статус подписки в аккаунте Google управляются через Google Play.",
      },
      {
        title: "9. Безопасность",
        body: [
          "Мы стремимся ограничивать обработку данных минимумом, необходимым для работы функций. Поскольку данные хранятся локально, безопасность также зависит от защиты вашего устройства (блокировка экрана, обновления системы и т.п.).",
        ],
      },
      {
        title: "10. Дети",
        body: [
          "Приложение не предназначено для детей младше 13 лет и не нацелено на сбор данных детей. Если вы считаете, что ребёнок предоставил данные через устройство, удалите Приложение или очистите его данные и свяжитесь с нами.",
        ],
      },
      {
        title: "11. Изменения Политики",
        body: [
          "Мы можем обновлять эту Политику время от времени. Обновлённая версия будет размещена на этой странице с новой датой «Последнее обновление».",
        ],
      },
      {
        title: "12. Контакты",
        body: [
          "По вопросам этой Политики конфиденциальности: support@alma-pixel.com",
          "Разработчик: Alma Pixel",
        ],
      },
    ],
    note: "Эта Политика относится именно к приложению AlmaBreak. Общая политика Alma Pixel — на основной странице конфиденциальности.",
  },
} as const;

export default function AlmaBreakPrivacyPage({
  language,
}: AlmaBreakPrivacyPageProps) {
  const t = copy[language];

  return (
    <section className="py-20 min-h-screen">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Link
            to="/privacy"
            className="inline-block mb-6 text-amber-400 hover:text-amber-300 transition-colors text-sm"
          >
            {t.back}
          </Link>

          <h1
            className="text-4xl font-extrabold mb-4 text-center"
            style={{
              color: "rgba(0, 0, 0, 1)",
              fontSize: "35px",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            {t.title}
          </h1>
          <p className="text-gray-400 text-sm text-center mb-2">{t.app}</p>
          <p className="text-gray-400 text-sm text-center mb-1">{t.effective}</p>
          <p className="text-gray-400 text-sm text-center mb-8">{t.updated}</p>

          <div className="space-y-8 text-gray-300 leading-relaxed">
            <p className="mb-4">{t.intro}</p>

            {t.sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-2xl font-semibold mb-3 text-amber-400">
                  {section.title}
                </h2>
                {"body" in section &&
                  section.body?.map((p) => (
                    <p key={p} className="mb-3">
                      {p.includes("support@alma-pixel.com") ? (
                        <>
                          {p.split("support@alma-pixel.com")[0]}
                          <a
                            href="mailto:support@alma-pixel.com"
                            className="text-amber-400 hover:text-amber-300 underline"
                          >
                            support@alma-pixel.com
                          </a>
                          {p.split("support@alma-pixel.com")[1]}
                        </>
                      ) : p.includes("policies.google.com/privacy") ? (
                        <>
                          {p.split("policies.google.com/privacy")[0]}
                          <a
                            href="https://policies.google.com/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-400 hover:text-amber-300 underline"
                          >
                            policies.google.com/privacy
                          </a>
                          {p.split("policies.google.com/privacy")[1]}
                        </>
                      ) : (
                        p
                      )}
                    </p>
                  ))}
                {"list" in section && section.list && (
                  <ul className="list-disc pl-5 space-y-2 mb-3">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {"subsections" in section &&
                  section.subsections?.map((sub) => (
                    <div key={sub.title} className="mb-4">
                      <h3 className="text-lg font-semibold mb-2 text-amber-300">
                        {sub.title}
                      </h3>
                      <p>{sub.body}</p>
                    </div>
                  ))}
                {"after" in section && section.after && (
                  <p className="mt-2">{section.after}</p>
                )}
              </div>
            ))}

            <div className="mt-8 p-4 rounded-xl bg-black/10 text-gray-400 text-sm">
              {t.note}{" "}
              <Link
                to="/privacy"
                className="text-amber-400 hover:text-amber-300 underline"
              >
                {language === "en" ? "Privacy Policy" : "Политика конфиденциальности"}
              </Link>
              .
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
