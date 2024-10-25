import * as webllm from '@mlc-ai/web-llm';
import { startTimer, stopTimer } from './utils';
import { getPendingTask, updateTask } from './data-fetching/task';

export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('sw.js', {
        type: 'module',
        scope: '/',
      });
      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed');
      } else if (registration.active) {
        console.log('Service worker active');
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

function setLabel(id: string, text: string) {
  const label = document.getElementById(id);
  if (label == null) {
    throw Error('Cannot find label ' + id);
  }
  label.innerText = text;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function mainStreaming(task: any) {
  stopTimer();
  const initProgressCallback = (report: webllm.InitProgressReport) => {
    setLabel('init-label', report.text);
  };
  const selectedModel = 'SmolLM-135M-Instruct-q0f16-MLC';

  const engine: webllm.MLCEngineInterface =
    await webllm.CreateServiceWorkerMLCEngine(selectedModel, {
      initProgressCallback: initProgressCallback,
    });
  setLabel('init-label', 'Executing...');

  const request: webllm.ChatCompletionRequest = {
    messages: [{ role: 'user', content: task.content }],
    temperature: 1.5,
    max_tokens: 256,
  };

  const reply0 = await engine.chat.completions.create(request);
  setLabel('init-label', 'Submitting result...');
  await updateTask(
    {
      completion_metadata: { content: reply0.choices[0].message.content || '' },
    },
    task.id
  );

  console.log(reply0);

  console.log(reply0.usage);
  setLabel('init-label', 'Execution Complete');
  startTimer();
}

export const startListeningForTask = async () => {
  setLabel('init-label', 'Looking for task...');
  const tasks = await getPendingTask();
  if (
    tasks.status <= 201 &&
    tasks.data.pending_tasks &&
    tasks.data.pending_tasks.length > 0
  ) {
    const task = tasks.data.pending_tasks[0];
    setLabel('init-label', 'Task received');
    mainStreaming(task);
  } else {
    setLabel('init-label', 'No available Task');
  }
};

export async function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('sw.js', {
        type: 'module',
      })
      .then((registration) => {
        registration.unregister().then(() => {});
      })
      .catch((error) => {
        console.error(`Registration failed with ${error}`);
      });
  }
}
