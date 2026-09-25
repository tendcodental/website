import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "T&Co Dental, зъболекар в Пловдив",
    short_name: "T&Co Dental",
    description: "Спешен денонощен зъболекарски кабинет 24/7 в Пловдив. Запазете час онлайн.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#fbf9f5",
    theme_color: "#0f3328",
    lang: "bg",
    categories: ["health", "medical"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Запази час", url: "/zapazi-chas" },
      { name: "Контакти", url: "/kontakti" },
    ],
  };
}
