"use client";

import { ReactNode } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

type ProvidersProps = {
  children: ReactNode;
};

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL ?? "",
);

export default function Providers({ children }: ProvidersProps) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
