import type { Metadata } from "next";
import EuroPage, { euroMetadata } from "@/components/EuroPage";

export const metadata: Metadata = euroMetadata("canada", "es");

export default function Page() {
  return <EuroPage lang="canada" ed="es" />;
}
