export const EventBus = {
    events: {},
  
    on(event, listener) {
      if (!this.events[event]) this.events[event] = [];
      this.events[event].push(listener);
      console.log("on", this.events);
    },
  
    off(event, listener) {
      if (!this.events[event]) return;
      this.events[event] = this.events[event].filter(l => l !== listener);
    },
  
    emit(event, data) {
      console.log("event---", event, data);
      if (!this.events[event]) return;
      this.events[event].forEach(listener => listener(data));
      console.log("emit", this.events, event, data);
    }
  };
  