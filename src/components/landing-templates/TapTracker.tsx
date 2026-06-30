"use client";

import { useEffect } from "react";

interface TapTrackerProps {
  landingPageId: string | null;
  cardOrderId: string | null;
}

export function TapTracker({ landingPageId, cardOrderId }: TapTrackerProps) {
  useEffect(() => {
    fetch("/api/analytics/tap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        landingPageId,
        cardOrderId,
        deviceType: /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop",
        referrer: document.referrer || null,
      }),
    }).catch(() => {});
  }, [landingPageId, cardOrderId]);

  return null;
}
