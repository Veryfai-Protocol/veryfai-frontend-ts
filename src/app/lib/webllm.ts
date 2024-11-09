import * as webllm from '@mlc-ai/web-llm';
import {
  getServerStatus,
  restartTimer,
  setServerStatus,
  stopTimer,
} from './utils';
import { getTask, submitTask, updateTask } from './data-fetching/task';
import { SERVER_STATUS } from './enums';
import { initLlm, performFactCheck } from './llm';

export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        type: 'module',
        scope: '/checker/',
      });
      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed');
      } else if (registration.active) {
        console.log('Service worker active');
        new webllm.ServiceWorkerMLCEngineHandler();
      }
      return true;
    } catch (error) {
      console.error(`Registration failed with ${error}`);
      setServerStatus(['> Environment setup failed']);
      return false;
    }
  }
};

export const registerSync = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const registration: any = await navigator.serviceWorker.ready;
  try {
    if (registration.sync) {
      await registration.sync.register('taskSync');
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const initProgressCallback = (report: webllm.InitProgressReport) => {
  const status = getServerStatus();
  if (!status.includes(SERVER_STATUS.Model)) {
    setServerStatus([...status, SERVER_STATUS.Model]);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function mainStreaming(task: any) {
  stopTimer();
  const selectedModel = 'Llama-3.2-3B-Instruct-q4f16_1-MLC';
  try {
    const engine: webllm.MLCEngineInterface =
      await webllm.CreateServiceWorkerMLCEngine(selectedModel, {
        initProgressCallback: initProgressCallback,
      });

    setServerStatus([...getServerStatus(), SERVER_STATUS.Executing]);

    const request: webllm.ChatCompletionRequest = {
      messages: [{ role: 'user', content: task.content }],
      temperature: 1.5,
      max_tokens: 256,
    };
    try {
      const reply0 = await engine.chat.completions.create(request);
      setServerStatus([...getServerStatus(), SERVER_STATUS.Submitting]);
      await updateTask(
        {
          completion_metadata: {
            content: reply0.choices[0].message.content || '',
          },
        },
        task.id
      );
      setServerStatus([SERVER_STATUS.Done]);
      restartTimer();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setServerStatus(['Failed to submit']);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log(error);
    setServerStatus(['Model setup failed']);
  }
}

export const startListeningForTask = async () => {
  const tasks = await getTask('limited');
  console.log(tasks.data);
  if (tasks.status <= 201 && tasks.data && tasks.data.data) {
    const task = tasks.data.data;

    setServerStatus([...getServerStatus(), SERVER_STATUS.Received]);
    // mainStreaming(task);
    stopTimer();
    if (task.response_type !== 0) return;
    const llmService = await initLlm();
    setServerStatus([...getServerStatus(), SERVER_STATUS.Executing]);
    console.log(task);
    const response = await performFactCheck(task, llmService);
    const data = response.length > 0 ? response[0] : {};
    console.log(response, '---------response');
    setServerStatus([...getServerStatus(), SERVER_STATUS.Submitting]);
    await submitTask(data, task.request_id, task.id);
    setServerStatus([SERVER_STATUS.Done]);
    restartTimer();
  } else {
    const status = getServerStatus().includes(SERVER_STATUS.Nothing);
    if (!status) return;
    setServerStatus([...getServerStatus(), SERVER_STATUS.Nothing]);
  }
};

export async function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration().then((registration) => {
      registration?.unregister().then(() => {
        setTimeout(() => {
          window.location.replace(window.location.href);
          setServerStatus([SERVER_STATUS.NotConnected]);
        }, 3000);
      });
    });
  }
}
