import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes.
 * Combines clsx for conditional classes with tailwind-merge to handle class conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Checks if a value is not null or undefined.
 */
export function exists<T>(value: T | null | undefined): value is T {
  return value != null;
}
