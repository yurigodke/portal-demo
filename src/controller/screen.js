import { Storage } from "./storage";

export class Screen {
  constructor() {
    this.id = Math.random().toString(16).slice(2);
    this.watchFunc = null;
    this.watchInterval = null;
    this.storage = new Storage();

    window.addEventListener("mouseout", this.startWatch);
    window.addEventListener("mouseover", this.stopWatch);
    window.addEventListener("resize", this.checkWatch);
  }

  checkWatch = () => {
    if (!this.watchFunc) {
      return;
    }

    this.watchFunc();
  }

  startWatch = () => {
    if (!this.watchFunc) {
      return;
    }
    
    this.watchInterval = setInterval(this.watchFunc, 200);
  }

  stopWatch = () => {
    if (!this.watchInterval) {
      return;
    }

    clearInterval(this.watchInterval);
    this.watchInterval = null;
  }

  watchPosition = (func) => {
    this.watchFunc = func;
  }
}