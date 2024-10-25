import { responseSchema } from '../utils';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const checkFact = async (inputValue: string) => {
  const url = `${API_URL}/send-fact-check-task`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input_statement: inputValue }),
    });
    const data = await response.json();
    if (response.status <= 201) {
      return responseSchema(response.status, data);
    }
    return responseSchema(response.status, data.error);
  } catch (error) {
    return responseSchema(500, error);
  }
};

export const submitForm = async (payload: { name: string; email: string }) => {
  const url = `${API_URL}/api/submit-email`;
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
    return responseSchema(500, error);
  }
};
