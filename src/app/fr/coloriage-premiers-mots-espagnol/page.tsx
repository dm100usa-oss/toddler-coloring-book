import type { Metadata } from "next";
import EuroPage, { euroMetadata } from "@/components/EuroPage";

export const metadata: Metadata = euroMetadata("fr", "es");

export default function Page() {
  return <EuroPage lang="fr" ed="es" />;
}
