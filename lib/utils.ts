/**
 * lib/utils.ts
 *
 * This file contains shared utility helper functions used across the project.
 * Keeping utilities in a dedicated /lib folder is a common Next.js convention.
 *
 * WHY DO WE NEED cn()?
 * -----------------------------------------------------------------------
 * When building React components, you often need to combine CSS class strings
 * conditionally. For example:
 *
 *   const isActive = true;
 *   const className = "base-class " + (isActive ? "active-class" : "");
 *
 * This gets messy fast. The cn() function solves this elegantly.
 *
 * WHAT DOES cn() DO?
 * -----------------------------------------------------------------------
 * It combines two powerful libraries:
 *
 * 1. clsx — Merges multiple class strings and conditional objects cleanly.
 *    Example: clsx("px-4", isLarge && "px-8", { "text-red-500": hasError })
 *    → "px-4 px-8 text-red-500" (if isLarge is true and hasError is true)
 *
 * 2. tailwind-merge (twMerge) — Resolves Tailwind class conflicts intelligently.
 *    Without it, "px-4 px-8" would apply BOTH paddings (last one wins in CSS,
 *    but only by specificity — fragile). twMerge strips the duplicate and keeps
 *    only "px-8", which is the intended override.
 *
 * USAGE EXAMPLE:
 * -----------------------------------------------------------------------
 *   import { cn } from "@/lib/utils";
 *
 *   // In a component:
 *   <button className={cn("base-button-styles", variant === "primary" && "bg-blue-500", className)}>
 *
 * This pattern is used in the Button component to allow callers to pass
 * extra classes without accidentally breaking the base styles.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn - Class Name utility function
 * @param inputs - Any number of class strings, arrays, or conditional objects
 * @returns A single merged, deduplicated class string safe for use with Tailwind
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
