import { ClientProviders } from '../components/ClientProviders';
import '../index.css';

export const metadata = {
  title: "Udawalawe Safari & Tours | Sri Lanka Tours & Ella Travels",
  description: "Experience premium wild safari tours and tailor-made holidays in Sri Lanka. Book your Udawalawa tours, Ella travels, SL travels, vehicle rentals, and explore top Sri Lankan tourist destinations.",
  keywords: [
    "SL Travels",
    "Ella Travels",
    "Udawalawa Tours",
    "Sri Lanka Tours",
    "Srilanka Tourism",
    "Sri Lanka Travelling",
    "Udawalawe Safari Booking",
    "Ella Day Tours",
    "Sri Lanka Travel Agent",
    "Sri Lanka Vacation Packages",
    "Ceylon Travels",
    "Sri Lanka Driver Hire"
  ],
  authors: [{ name: "Udawalawe Safari & Tours" }],
  creator: "Udawalawe Safari & Tours",
  publisher: "Udawalawe Safari & Tours",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://www.udawalawetours.com",
  },
  openGraph: {
    title: "Udawalawe Safari & Tours | Sri Lanka Tours & Travels",
    description: "Book customized holiday tours in Sri Lanka, wild safari packages, and private vehicle drivers. Experience Ella travels, Udawalawa tours, and SL travels.",
    url: "https://www.udawalawetours.com",
    siteName: "Udawalawe Safari & Tours",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Udawalawe Safari & Tours | Sri Lanka Tours & Travels",
    description: "Book customized holiday tours in Sri Lanka, wild safari packages, and private vehicle drivers. Experience Ella travels, Udawalawa tours, and SL travels.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const travelAgencySchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "Udawalawe Safari & Tours",
  "alternateName": ["SL Travels", "Ella Travels", "Udawalawa Tours", "Lanka Tours", "Sri Lanka Tours"],
  "image": "https://www.udawalawetours.com/images/udawalawe_tours_hq(2).png",
  "url": "https://www.udawalawetours.com",
  "telephone": "+94706000344",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Udawalawa National Park Road",
    "addressLocality": "Udawalawa",
    "addressRegion": "Sabaragamuwa Province",
    "postalCode": "70190",
    "addressCountry": "LK"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 6.4429,
    "longitude": 80.8524
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  },
  "sameAs": [
    "https://www.facebook.com/udawalawesafariandtours",
    "https://www.instagram.com/udawalawesafariandtours"
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(travelAgencySchema) }}
        />
      </head>
      <body className="antialiased">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
