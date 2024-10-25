
import * as webllm from "https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm/+esm";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
self.addEventListener('install', function(event) {
    event.waitUntil(self.skipWaiting()); // Activate worker immediately
});

self.addEventListener("activate", function (event) {
  new webllm.ServiceWorkerMLCEngineHandler();
  console.log("Web-LLM Service Worker Activated");
  event.waitUntil(self.clients.claim());
});

self.addEventListener('sync', function(event) {
  console.log(event, self.clients, '=====async')
  if (event.tag === 'taskSync') {
      event.waitUntil(start(event.target));
     
    // event.waitUntil(processRequest());
  }
});


const start=async(evt)=>{
  const event = new Event("build");
  evt.dispatchEvent(event)
  console.log('====fgfg')
}
