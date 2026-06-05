export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/login', '/register', '/unauthorized'],
    },
    sitemap: 'https://www.udawalawetours.com/sitemap.xml',
  };
}
