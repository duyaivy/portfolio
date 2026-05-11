import type { Metadata } from "next";

import NotFoundContent from "@/src/components/not-found-content";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The requested page could not be found on Nguyen Quoc Duy's full stack developer portfolio."
};

export default function NotFound() {
  return <NotFoundContent />;
}
