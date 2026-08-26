import type { Metadata } from "next";
import EuroPage, { euroMetadata } from "@/components/EuroPage";

export const metadata: Metadata = euroMetadata("pl", "en");

export default function Page() {
  return <EuroPage lang="pl" ed="en" />;
}
