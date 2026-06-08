import UserDash from '../../views/UserDash';
import { PageWrapper } from '../../components/PageWrapper';

export const metadata = {
  title: "Udawalawe Safari & Tours | Sri Lanka Travels & Ella Tours",
  description: "Plan your dream vacation with Udawalawe Safari & Tours. We offer customized Sri Lanka tours, Ella travels, national park safari bookings, and reliable vehicle rentals.",
  keywords: [
    "SL Travels",
    "Ella Travels",
    "Udawalawa Tours",
    "Sri Lanka Tours",
    "Srilanka Tourism",
    "Sri Lanka Travelling",
    "Udawalawe Safari Booking",
    "Ella Day Tours",
    "Ceylon Tours",
    "Sri Lanka driver hire"
  ],
};

export default function HomePage() {
  return (
    <PageWrapper>
      <UserDash />
    </PageWrapper>
  );
}
