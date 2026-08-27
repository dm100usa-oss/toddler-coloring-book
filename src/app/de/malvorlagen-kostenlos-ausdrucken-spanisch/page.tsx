import type { Metadata } from "next";
import FreePage, { freeMetadata } from "@/components/FreePage";

export const metadata: Metadata = freeMetadata("de", "es");

export default function Page() {
  return <FreePage lang="de" ed="es" />;
}
