import { Task } from '../types/webllm';
import { authUser, responseSchema } from '../utils';

const API_URL = process.env.NEXT_PUBLIC_TASK_URL;

export const getPendingTask = async () => {
  const url = `${API_URL}/tasks/pending`;
  const token = authUser()?.access_token;
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

export const createTask = async (task: Task) => {
  const token = authUser()?.access_token;
  const payload = { data: task, token };
  try {
    const response = await fetch('/api/task', {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateTask = async (task: any, id: string) => {
  const url = `/api/task`;
  const token = authUser()?.access_token;
  const payload = { data: task, token, id };
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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

export const login = async () => {
  const url = `${API_URL}/login`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        wallet_address: '4562b3fc2c963f66afa6',
        network_symbol: 'eth',
        app_key: 'string',
      }),
    });
    const data = await response.json();
    if (response.status <= 201) {
      localStorage.setItem('user', JSON.stringify(data));
      return responseSchema(response.status, data);
    }
    return responseSchema(response.status, data.error);
  } catch (error) {
    return responseSchema(500, error);
  }
};
