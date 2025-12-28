"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export type SelectOption = { value: string; label: string };

export function Select({
  label,
  value,
  onChange,
  options,
  className,
  id,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  className?: string;
  id?: string;
}) {
  const autoId = React.useId();
  const selectId = id ?? autoId;

  return (
    <label className={cn("block", className)} htmlFor={selectId}>
      <div className="mb-1.5 text-xs font-medium text-white/70">{label}</div>
      <select
        id={selectId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "h-11 w-full rounded-xl border border-white/15 bg-white/5 px-3 text-sm text-white/90",
          "transition focus:border-white/30 focus:bg-white/7.5 focus:outline-none"
        )}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#0b1220]">
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}


