import type { Metadata } from "next";
import FreePage, { freeMetadata } from "@/components/FreePage";

export const metadata: Metadata = freeMetadata("pl", "en");

export default function Page() {
  return <FreePage lang="pl" ed="en" />;
}
