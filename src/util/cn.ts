import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// cn namingas neaiskus, ir visur naudoji ES6, sitoj vietoje ES5 funkcija. Graziau buna kai visur vienodas stilius.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
