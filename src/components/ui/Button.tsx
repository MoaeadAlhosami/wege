"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-xl font-medium",
        "transition-[transform,box-shadow,background-color,border-color] duration-200 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1220]",
        "disabled:cursor-not-allowed disabled:opacity-60",
        // subtle 3D press
        "active:translate-y-[1px] motion-reduce:transition-none motion-reduce:active:translate-y-0",
        size === "sm" ? "h-9 px-3 text-sm" : "h-11 px-4 text-sm",
        variant === "primary" &&
          cn(
            "text-white",
            "border border-white/10",
            "bg-gradient-to-b from-white/20 to-white/5",
            "shadow-[0_14px_30px_-18px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.20)]",
            "hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.22)]",
            "hover:bg-gradient-to-b hover:from-white/24 hover:to-white/7.5",
            "active:shadow-[0_10px_20px_-18px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.18)]"
          ),
        variant === "secondary" &&
          cn(
            "border border-white/14 bg-white/6 text-white/90",
            "shadow-[0_12px_24px_-18px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.12)]",
            "hover:bg-white/10 hover:border-white/20"
          ),
        variant === "ghost" &&
          cn(
            "text-white/85",
            "hover:bg-white/10",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
          ),
        className
      )}
    />
  );
}


