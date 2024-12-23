import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { config } from "./config"

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs))
}

export function getImgUrl(url: string): string {
   return config.baseUrl + url
}