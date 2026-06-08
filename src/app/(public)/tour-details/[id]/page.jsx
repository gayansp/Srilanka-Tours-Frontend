import { Tourdetails } from '../../../../components/Home/Tourdetails';
import { PageWrapper } from '../../../../components/PageWrapper';

export const metadata = {
  title: "Sri Lanka Tour Details | Explore Sri Lanka Tour Packages",
  description: "View comprehensive details for this curated Sri Lanka tour. Plan your customized travels, safaris, and train journeys across our beautiful destinations.",
};

export default function TourDetailsPage() {
  return (
    <PageWrapper>
      <Tourdetails />
    </PageWrapper>
  );
}
