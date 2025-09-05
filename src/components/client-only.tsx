
"use client";

import React, { useState, useEffect } from "react";

// This component is a workaround for Next.js hydration errors.
// It ensures that the children are only rendered on the client-side,
// preventing mismatches between server-rendered and client-rendered HTML.
export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}
