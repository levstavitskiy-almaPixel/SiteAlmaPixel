import { useEffect, useState } from "react";

export type NewsPost = {
  id: string;
  date: string;
  text: string;
  photo?: string;
  video?: string;
  telegramUrl?: string;
};

type NewsFile = {
  posts?: NewsPost[];
  channelUrl?: string;
};

export function useNews(limit?: number) {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [channelUrl, setChannelUrl] = useState<string>("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/news/posts.json", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : { posts: [] }))
      .then((data: NewsFile) => {
        if (cancelled) return;
        const list = Array.isArray(data.posts) ? data.posts : [];
        const sorted = [...list].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setPosts(typeof limit === "number" ? sorted.slice(0, limit) : sorted);
        setChannelUrl(data.channelUrl ?? "");
      })
      .catch(() => {
        if (!cancelled) setPosts([]);
      })
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, [limit]);

  return { posts, channelUrl, loaded };
}

export function formatNewsDate(iso: string, language: "en" | "ru") {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(language === "ru" ? "ru-RU" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
