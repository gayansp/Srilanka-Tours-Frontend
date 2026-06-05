import { Gallery } from '../../../components/Home/Gallery';
import { PageWrapper } from '../../../components/PageWrapper';

export const metadata = {
  title: "Sri Lanka Travel Gallery | Wildlife & Scenic Photos",
  description: "Browse beautiful photos of Sri Lankan wildlife and landscapes. See real pictures from Ella travels, Udawalawa tours, and SL travels safari experiences.",
  keywords: [
    "Sri Lanka Travel Gallery",
    "Ella Travels photos",
    "Udawalawa Tours photos",
    "SL Travels safari pictures",
    "Srilanka Tourism album",
    "Sri Lanka traveling snaps"
  ],
};

export default function GalleryPage() {
  return (
    <PageWrapper>
      <Gallery />
    </PageWrapper>
  );
}
