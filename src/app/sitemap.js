export default function sitemap() {
  const baseUrl = 'https://www.udawalawatours.com';
  const routes = [
    '',
    '/about',
    '/contact',
    '/destinations',
    '/gallery',
    '/tours',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}

 