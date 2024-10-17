import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { mockData } from '../constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const reverseMockData = () => {
  return [...mockData].reverse();
};
