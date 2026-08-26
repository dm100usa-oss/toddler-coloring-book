import type { Metadata } from "next";
import EuroPage, { euroMetadata } from "@/components/EuroPage";

export const metadata: Metadata = euroMetadata("nl", "en");

export default function Page() {
  return <EuroPage lang="nl" ed="en" />;
}
