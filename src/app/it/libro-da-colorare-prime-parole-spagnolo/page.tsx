import type { Metadata } from "next";
import EuroPage, { euroMetadata } from "@/components/EuroPage";

export const metadata: Metadata = euroMetadata("it", "es");

export default function Page() {
  return <EuroPage lang="it" ed="es" />;
}
