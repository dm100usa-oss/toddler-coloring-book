import type { Metadata } from "next";
import FreePage, { freeMetadata } from "@/components/FreePage";

export const metadata: Metadata = freeMetadata("it", "en");

export default function Page() {
  return <FreePage lang="it" ed="en" />;
}
