import type { MetadataRoute } from "next";

const BASE_URL = "https://www.cromnia.com.tr";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/services", "/career", "/contact"];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
