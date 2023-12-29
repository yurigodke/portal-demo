export class Canvas {
  constructor(canvaId, canvaSize) {
    this.container = document.getElementById(canvaId);
    this.ctx = this.container.getContext("2d");


    this.updateSize(canvaSize);
  }

  circle = (x, y) => {
    for (let i = 0; i < 5; i++) {
      const radius = 60 + (15 * i);
      const arcSize = Math.random() * 2;
      const angle = Math.random() * 10;
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius - 5, angle, angle + (arcSize * Math.PI));
      const gradient = this.ctx.createRadialGradient(x, y, radius - 5, x, y, radius + 5);
      gradient.addColorStop(0, "black");
      gradient.addColorStop(0.3, "green");
      gradient.addColorStop(0.7, "green");
      gradient.addColorStop(1, "black");
      this.ctx.strokeStyle = gradient;
      this.ctx.lineWidth = 10;
      this.ctx.stroke();
    }

  }

  line = (pointA, pointB) => {
    this.ctx.beginPath();
    this.ctx.moveTo(pointA.x, pointA.y);
    this.ctx.lineTo(pointB.x, pointB.y);
    const gradient = this.ctx.createLinearGradient(pointA.x, pointA.y, pointB.x, pointB.y);
    gradient.addColorStop(0, "transparent");
    gradient.addColorStop(0.3, "green");
    gradient.addColorStop(0.7, "green");
    gradient.addColorStop(1, "transparent");
    this.ctx.strokeStyle = gradient;
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }

  clean = () => {
    this.ctx.clearRect(0, 0, this.container.width, this.container.height);
  }

  updateSize = ({ width, height }) => {
    this.container.width = width;
    this.container.height = height;
  }
}