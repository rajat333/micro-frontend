// http://localhost:3005/event-bus.js
const listeners = {};
const queue = {};

export const EventBus = {
  on(event, cb) {
    if (!listeners[event]) listeners[event] = [];
    listeners[event].push(cb);

    // replay queued events
    if (queue[event]) {
      queue[event].forEach(data => cb(data));
      delete queue[event];
    }
  },
  emit(event, data) {
    if (listeners[event]) {
      listeners[event].forEach(cb => cb(data));
    } else {
      if (!queue[event]) queue[event] = [];
      queue[event].push(data);
    }
    console.log("queue in event bus---", queue, listeners);
  },
  off(event, cb) {
    if (!listeners[event]) return;
    listeners[event] = listeners[event].filter(c => c !== cb);
  }
};
