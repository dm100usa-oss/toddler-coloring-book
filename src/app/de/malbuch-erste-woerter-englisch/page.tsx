import type { Metadata } from "next";
import EuroPage, { euroMetadata } from "@/components/EuroPage";

export const metadata: Metadata = euroMetadata("de", "en");

export default function Page() {
  return <EuroPage lang="de" ed="en" />;
}
