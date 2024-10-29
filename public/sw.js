
import * as webllm from "https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm/+esm";

self.addEventListener('install', function(event) {
    event.waitUntil(self.skipWaiting()); // Activate worker immediately
   
});

self.addEventListener("activate", function (event) {
  new webllm.ServiceWorkerMLCEngineHandler();
  event.waitUntil(self.clients.claim());
    console.log("Web-LLM Service Worker Activated");
    console.log()
});

self.addEventListener('sync', function(event) {
  console.log(event, self.clients, '=====async')
  if (event.tag === 'taskSync') {

  }
});

