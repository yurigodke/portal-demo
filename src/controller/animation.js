import { Canvas } from "./canvas"
import { Storage } from "./storage";

export class Animation {
  fps = 30;

  constructor(position, siteId) {
    this.intAnimate = 1000 / this.fps;

    this.position = position;
    
    this.canvas = new Canvas('mainDraw', position.getUsableSize());

    this.storage = new Storage(this.intAnimate, siteId);

    setInterval(this.mainAnimate, this.intAnimate);
  }

  updateContainers = () => {
    this.canvas.updateSize(this.position.getUsableSize())
  }

  mainAnimate = () => {
    let centerData = this.position.getCenterPosition();

    this.storage.saveData(centerData)

    const othersPoints = this.storage.getOthersPoints();
    const othersPointsValues = Object.values(othersPoints);

    const othersPointsLocal = othersPointsValues.map(pointItem => {
      return this.position.convertToLocal(pointItem.globalCenter);
    });

    this.canvas.clean();

    this.canvas.circle(centerData.localCenter.x, centerData.localCenter.y)

    othersPointsLocal.forEach(anotherPointItem => {
      this.canvas.line(centerData.localCenter, anotherPointItem);
    })
  }
}