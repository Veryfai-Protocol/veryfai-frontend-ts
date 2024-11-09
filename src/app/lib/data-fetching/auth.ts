import { responseSchema } from '../utils';

const API_URL = process.env.NEXT_PUBLIC_BASE_API;

export const login = async (payload: {
  wallet_address: string;
  network: string;
}) => {
  const url = `${API_URL}/auth`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (response.status <= 201) {
      return responseSchema(response.status, data);
    }
    return responseSchema(response.status, data.error);
  } catch (error) {
    console.log({ error });
    return responseSchema(500, error);
  }
};
