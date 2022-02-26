import { Point } from './point';

export class Wave {
  stageWidth: number;
  stageHeight: number;
  centerX: number;
  centerY: number;
  index: number;
  totalPoints: number;
  color: string;
  points: Point[];
  pointGap: number;

  constructor(stageWidth: number, stageHeight: number, index: number, totalPoints: number, color: string) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.centerX = stageWidth / 2;
    this.centerY = stageHeight / 2;
    this.index = index;
    this.totalPoints = totalPoints;
    this.color = color;
    this.pointGap = this.stageWidth / this.totalPoints;
    this.points = [];
    this.init();
  }

  resize(stageWidth: number, stageHeight: number) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.centerX = stageWidth / 2;
    this.centerY = stageHeight / 2;
    this.init();
  }

  init() {
    this.points = [];

    for (let i = 0; i < this.totalPoints; i++) {
      const point = new Point(this.index + i, this.pointGap * i, this.centerY);
      this.points[i] = point;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = this.color;

    if (this.points[0]) {
      let prevX = this.points[0].x;
      let prevY = this.points[0].y;
      ctx.moveTo(prevX, prevY);

      for (let i = 1; i < this.totalPoints; i++) {
        if (i < this.totalPoints - 1) {
          this.points[i].update();
        }

        const cx = (prevX + this.points[i].x) / 2;
        const cy = (prevY + this.points[i].y) / 2;

        ctx.quadraticCurveTo(prevX, prevY, cx, cy);

        prevX = this.points[i].x;
        prevY = this.points[i].y;
      }

      ctx.lineTo(prevX, prevY);
      ctx.lineTo(this.stageWidth, this.stageHeight);
      ctx.lineTo(this.points[0].x, this.points[0].y);
      ctx.fill();
      ctx.closePath();
    }
    // this.point.update();
    // ctx.arc(this.point.x, this.point.y, 30, 0, 2 * Math.PI);
    // ctx.fill();
    //   setTimeout(() => ctx.fill(), 1000 / 60);
  }
}
