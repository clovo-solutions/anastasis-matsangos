import type { MetadataRoute } from 'next';
import { company } from '@/lib/company';

/**
 * Single-page site: one canonical entry. Section anchors are intentionally not
 * listed — fragment URLs are not separate documents and listing them invites
 * duplicate-content handling.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: company.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
