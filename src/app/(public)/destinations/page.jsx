import { Destinations } from '../../../components/Home/Destination';
import { PageWrapper } from '../../../components/PageWrapper';

export const metadata = {
  title: "Sri Lanka Destinations | Visit Ella, Udawalawe & Scenic Spots",
  description: "Discover beautiful places to visit in Sri Lanka. Find Ella travels guide, Udawalawa tours national park locations, and plan your custom SL travels path.",
  keywords: [
    "Sri Lanka Destinations",
    "Ella Travels scenic spots",
    "Udawalawa Tours national park",
    "SL Travels sightseeing",
    "Srilanka Tourism landmarks",
    "Sri Lanka traveling guide"
  ],
};

export default function DestinationsPage() {
  return (
    <PageWrapper>
      <Destinations />
    </PageWrapper>
  );
}
