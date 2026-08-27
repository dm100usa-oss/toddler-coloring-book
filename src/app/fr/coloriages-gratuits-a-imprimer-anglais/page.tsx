import type { Metadata } from "next";
import FreePage, { freeMetadata } from "@/components/FreePage";

export const metadata: Metadata = freeMetadata("fr", "en");

export default function Page() {
  return <FreePage lang="fr" ed="en" />;
}
