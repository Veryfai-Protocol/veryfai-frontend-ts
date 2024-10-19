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

export const responseSchema = (code: number, data: unknown): APIResponse => {
  return { status: code, data: data };
};

export const isObjEmpty = (obj: unknown) => {
  if (Object.keys(obj || {}).length === 0) {
    return true;
  }
  return false;
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
