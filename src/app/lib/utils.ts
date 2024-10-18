import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { mockData } from '../constants';
import { APIResponse } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const reverseMockData = () => {
  return [...mockData].reverse();
};

export const responseSchema = (code: number, data: any): APIResponse => {
  return { status: code, data: data };
};
