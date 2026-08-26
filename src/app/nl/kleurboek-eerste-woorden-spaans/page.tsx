import type { Metadata } from "next";
import EuroPage, { euroMetadata } from "@/components/EuroPage";

export const metadata: Metadata = euroMetadata("nl", "es");

export default function Page() {
  return <EuroPage lang="nl" ed="es" />;
}
