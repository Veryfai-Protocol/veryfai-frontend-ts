import * as webllm from '@mlc-ai/web-llm';

export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('sw.js', {
        type: 'module',
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
  const registration: any = await navigator.serviceWorker.ready;
  try {
    if (registration.sync) {
      await registration.sync.register('taskSync');
    }
  } catch (error: any) {}
};

export async function mainStreaming() {
  const initProgressCallback = (report: webllm.InitProgressReport) => {
    setLabel('init-label', report.text);
  };
  const selectedModel = 'SmolLM-135M-Instruct-q0f16-MLC';

  const engine: webllm.ServiceWorkerMLCEngine =
    await webllm.CreateServiceWorkerMLCEngine(selectedModel, {
      initProgressCallback: initProgressCallback,
    });
  return engine;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const processRequest = async (task: any) => {
  // stop the listner from picking request task until current task is done
  const engine = await mainStreaming();
  const request: webllm.ChatCompletionRequest = {
    messages: [{ role: 'user', content: task }],
    n: 3,
    temperature: 1.5,
    max_tokens: 256,
  };
  const reply0 = await engine.chat.completions.create(request);
  const result = reply0.choices[0].message.content || '';
  // call api and send result
  // if successful
  return result;
};
