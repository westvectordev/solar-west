"use client";

import { type ReactNode } from "react";
import { useCookieConsent, type ConsentCategory } from "@/app/components/cookie-consent-provider";

type ConsentGateProps = {
  category: ConsentCategory;
  children: ReactNode;
  fallback?: ReactNode;
};

export default function ConsentGate({
  category,
  children,
  fallback = null,
}: ConsentGateProps) {
  const { hasConsent, ready } = useCookieConsent();

  if (!ready) {
    return null;
  }

  return hasConsent(category) ? <>{children}</> : <>{fallback}</>;
}
