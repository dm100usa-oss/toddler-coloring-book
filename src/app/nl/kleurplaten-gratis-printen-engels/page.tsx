import type { Metadata } from "next";
import FreePage, { freeMetadata } from "@/components/FreePage";

export const metadata: Metadata = freeMetadata("nl", "en");

export default function Page() {
  return <FreePage lang="nl" ed="en" />;
}
