import * as webllm from '@mlc-ai/web-llm';
import {
  getServerStatus,
  restartTimer,
  setServerStatus,
  stopTimer,
} from './utils';
import { getPendingTask, updateTask } from './data-fetching/task';
import { SERVER_STATUS } from './enums';

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

export function setLabel(text: string) {
  const div = document.getElementById('status');
  if (div) {
    const label = div.appendChild(document.createElement('span'));
    label.className = 'text-white text-xs';
    label.innerText = text;
  }
}

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
async function mainStreaming(task: any) {
  stopTimer();
  const selectedModel = process.env.NEXT_PUBLIC_MODEL ?? '';
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
  const tasks = await getPendingTask();
  if (
    tasks.status <= 201 &&
    tasks.data.pending_tasks &&
    tasks.data.pending_tasks.length > 0
  ) {
    const task = tasks.data.pending_tasks[0];
    setServerStatus([...getServerStatus(), SERVER_STATUS.Received]);

    mainStreaming(task);
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
