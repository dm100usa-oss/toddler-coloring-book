import type { Metadata } from "next";
import EuroPage, { euroMetadata } from "@/components/EuroPage";

export const metadata: Metadata = euroMetadata("it", "en");

export default function Page() {
  return <EuroPage lang="it" ed="en" />;
}
