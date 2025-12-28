"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      {...props}
      className={cn(
        "h-11 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-white/90",
        "placeholder:text-white/40 transition focus:border-white/30 focus:bg-white/7.5 focus:outline-none",
        className
      )}
    />
  );
});


