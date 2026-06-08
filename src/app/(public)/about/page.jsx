import About from '../../../views/About';
import { PageWrapper } from '../../../components/PageWrapper';

export const metadata = {
  title: "About Us | Udawalawe Safari & Tours | Sri Lanka Travels",
  description: "Learn about Udawalawe Safari & Tours, our story, our team, and how we deliver unforgettable wildlife safaris and holiday experiences across Sri Lanka.",
  keywords: [
    "About Udawalawe Tours",
    "Sri Lanka Travels team",
    "Ella Travels company",
    "Udawalawa Tours agent",
    "Srilanka Tourism guide",
    "Sri Lanka tour operator"
  ],
};

export default function AboutPage() {
  return (
    <PageWrapper>
      <About />
    </PageWrapper>
  );
}
