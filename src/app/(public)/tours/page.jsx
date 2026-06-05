import { TourPackages } from '../../../components/Home/Tourpackages';
import { PageWrapper } from '../../../components/PageWrapper';

export const metadata = {
  title: "Sri Lanka Tour Packages | Ella Travels & Udawalawa Safari",
  description: "Browse our premium holiday packages. From scenic Ella travels to exciting Udawalawa tours, select the perfect itinerary for your Sri Lanka trip.",
  keywords: [
    "Sri Lanka Tour Packages",
    "Ella Travels tour booking",
    "Udawalawa Tours safari packages",
    "SL Travels custom tour",
    "Sri Lanka Tourism packages",
    "Sri Lanka travelling itinerary"
  ],
};

export default function ToursPage() {
  return (
    <PageWrapper>
      <TourPackages />
    </PageWrapper>
  );
}
