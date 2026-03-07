import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.webtreize.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
