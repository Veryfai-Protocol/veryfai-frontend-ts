import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const dataR = payload.data;
  const url = `${API_URL}/tasks`;

  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${payload.token}`,
    },
    body: JSON.stringify(dataR),
  });
  const data = await response.json();
  const res = NextResponse.json(data, { status: response.status });

  return res;
}

export async function PUT(req: NextRequest) {
  const payload = await req.json();
  const dataR = payload.data;
  const url = `${API_URL}/tasks/${payload.id}/complete`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataR),
  });
  const data = await response.json();
  const res = NextResponse.json(data, { status: response.status });

  return res;
}
