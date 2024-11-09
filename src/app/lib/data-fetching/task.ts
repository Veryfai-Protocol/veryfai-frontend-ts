/* eslint-disable @typescript-eslint/no-explicit-any */
import { COOKIE_KEYS } from '../enums';
import { Task } from '../types/webllm';
import { responseSchema } from '../utils';
import { getCookie } from 'cookies-next/client';

const API_URL = process.env.NEXT_PUBLIC_BASE_API;

export const getPendingTask = async () => {
  const url = `${API_URL}/tasks/pending`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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

export const createTask = async (task: Task) => {
  const url = `${API_URL}/tasks`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateTask = async (task: any, id: string) => {
  const url = `${API_URL}/tasks/${id}/complete`;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
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

export const getArticleFromGoogle = async (
  url: string,
  query: string,
  headers: any
) => {
  try {
    const response = await fetch(`${url}?query=${'How to cook'}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ query: query }),
    });
    const data = await response.json();
    console.log('Serper search response:');
    return data.organic.map(
      (a: { title: any; link: any; position: any; snippet: any }) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        a.title, a.link, a.position, a.snippet;
      }
    );
  } catch (error) {
    console.error(
      'Error fetching Serper search results:',
      JSON.stringify(error)
    );
    return [];
  }
};

export const submitTask = async (
  payload: any,
  requestId: string,
  taskId: string
) => {
  const url = `${API_URL}/requests/${requestId}/tasks/${taskId}/submit-response`;
  const token = getCookie(COOKIE_KEYS.AccessToken);
  console.log(payload);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ response: payload }),
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

export const getTask = async (taskType: string) => {
  const url = `${API_URL}/verifiers/get-task?verifier_type=${taskType}`;
  // const url = 'https://dev-api.veryfaiapi.info/veryfai/requests/14/tasks';
  const token = getCookie(COOKIE_KEYS.AccessToken);
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
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

export const sendHeartBeat = async () => {
  const url = `${API_URL}/heartbeat?verifier_type=limited`;
  const token = getCookie(COOKIE_KEYS.AccessToken);
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
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

export const stopHeartBeat = async () => {
  const url = `${API_URL}/shutdown`;
  const token = getCookie(COOKIE_KEYS.AccessToken);
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
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
