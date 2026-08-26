import type { Metadata } from "next";
import EuroPage, { euroMetadata } from "@/components/EuroPage";

export const metadata: Metadata = euroMetadata("pl", "es");

export default function Page() {
  return <EuroPage lang="pl" ed="es" />;
}
