import type { Metadata } from "next";
import EuroPage, { euroMetadata } from "@/components/EuroPage";

export const metadata: Metadata = euroMetadata("espana", "en");

export default function Page() {
  return <EuroPage lang="espana" ed="en" />;
}
