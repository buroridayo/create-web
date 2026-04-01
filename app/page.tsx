import BackgroundWrapper from "@/components/BackgroundWrapper";
import LayoutGrid from "@/components/LayoutGrid";
import PageHeader from "@/components/PageHeader";
import { LAYOUT_TITLES } from "@/constants/layouts";

export default function Home() {
  return (
    <BackgroundWrapper>
      <PageHeader />
      <LayoutGrid items={LAYOUT_TITLES} />
    </BackgroundWrapper>
  );
}
