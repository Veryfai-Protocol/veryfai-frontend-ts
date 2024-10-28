import { APIResponse } from '../types';
import { responseSchema, sleep } from '../utils';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getFacts = async (task_id: string) => {
  const url = `${API_URL}/get-fact-check-results`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task_id }),
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

export const getFactCheckResult = async (task_id: string) => {
  let result: APIResponse = {} as APIResponse;
  for (let i = 0; i < 2; i++) {
    result = await getFacts(task_id);
    // if (typeof result.data === 'object' && !isObjEmpty(result.data)) {
    //   break;
    // }
    await sleep(1000);
  }
  return result;
};
