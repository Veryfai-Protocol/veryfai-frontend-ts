import { Task } from '../types/webllm';
import { responseSchema } from '../utils';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const updateTask = async (task: any, id: string) => {
//   const url = `/api/task`;
//   const token = authUser()?.access_token;
//   const payload = { data: task, token, id };
//   try {
//     const response = await fetch(url, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload),
//     });
//     const data = await response.json();
//     if (response.status <= 201) {
//       return responseSchema(response.status, data);
//     }
//     return responseSchema(response.status, data.error);
//   } catch (error) {
//     return responseSchema(500, error);
//   }
// };
