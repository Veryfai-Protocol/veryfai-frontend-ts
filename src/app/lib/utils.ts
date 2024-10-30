import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { mockData } from './constants';
import { APIResponse } from './types';
import { startListeningForTask } from './webllm';

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

export const startTimer = () => {
  const timer = setInterval(startListeningForTask, 60000);
  localStorage.setItem('timer', JSON.stringify(timer));
  console.log('========started');
};

export const stopTimer = () => {
  const timer = localStorage.getItem('timer');
  if (!timer) return;
  const parseTimer = JSON.parse(timer);
  clearInterval(parseTimer);
  localStorage.removeItem('timer');
  console.log('========stopped');
};

export const getServerStatus = () => {
  const status = localStorage.getItem('serverStatus');
  if (!status) return [];
  return JSON.parse(status);
};

export const removeFromStatus = (value: string) => {
  const data = getServerStatus().filter((item: string) => item !== value);
  return data;
};

export const setServerStatus = (value: string[]) => {
  const data = JSON.stringify(value);
  localStorage.setItem('serverStatus', data);
  window.postMessage({ name: 'veryfaiMsg', data: value });
};

export const authUser = () => {
  const user = localStorage.getItem('user');
  if (!user) return;
  const parseUser = JSON.parse(user);
  return parseUser;
};
