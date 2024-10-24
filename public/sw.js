import { processRequest } from "../src/app/lib/webllm";
import * as webllm from "https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm/+esm";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
self.addEventListener("activate", function (event) {
new webllm.ServiceWorkerMLCEngineHandler();
  console.log("Web-LLM Service Worker Activated");
});

self.addEventListener('sync', function(event) {
  if (event.tag === 'taskSync') {
    event.waitUntil(processRequest());
  }
});