"use client";

import type { ComponentPropsWithoutRef } from "react";
import { clarityEvent } from "@/lib/analytics/clarity";

type AnchorProps = ComponentPropsWithoutRef<"a"> & {
  clarityEventOnClick: string;
};

export function ClarityTrackedAnchor({ clarityEventOnClick, onClick, ...rest }: AnchorProps) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        clarityEvent(clarityEventOnClick);
        onClick?.(e);
      }}
    />
  );
}
