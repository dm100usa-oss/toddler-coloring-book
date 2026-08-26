import type { Metadata } from "next";
import EuroPage, { euroMetadata } from "@/components/EuroPage";

export const metadata: Metadata = euroMetadata("de", "es");

export default function Page() {
  return <EuroPage lang="de" ed="es" />;
}
