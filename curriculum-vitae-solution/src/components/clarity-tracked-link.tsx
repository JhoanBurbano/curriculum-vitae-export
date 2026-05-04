"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { clarityEvent } from "@/lib/analytics/clarity";

type LinkProps = ComponentProps<typeof Link>;

type Props = LinkProps & {
  /** Nombre del evento en Clarity (snake_case recomendado). */
  clarityEventOnClick?: string;
};

export function ClarityTrackedLink({ clarityEventOnClick, onClick, ...rest }: Props) {
  return (
    <Link
      {...rest}
      onClick={(e) => {
        if (clarityEventOnClick) clarityEvent(clarityEventOnClick);
        onClick?.(e);
      }}
    />
  );
}
