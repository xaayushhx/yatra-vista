import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yatravista.com";
  const destinations = [
    "cabo-de-rama",
    "fontainhas-panaji",
    "assagao-vagator",
    "divar-chorao-islands",
    "ashvem-morjim",
    "ponda-western-ghats",
  ];
  const packages = [
    "pkg-goa-south-sanctuary",
    "pkg-goa-heritage-odyssey",
    "pkg-goa-north-riviera",
    "pkg-goa-yacht-backwaters",
  ];

  const destinationUrls = destinations.map((slug) => ({
    url: `${baseUrl}/destinations/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const packageUrls = packages.map((id) => ({
    url: `${baseUrl}/packages/${id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/ai-planner`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/destinations`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/packages`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...destinationUrls,
    ...packageUrls,
  ];
}
