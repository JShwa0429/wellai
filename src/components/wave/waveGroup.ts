import { Wave } from './wave';

export class WaveGroup {
  totalWaves: number;
  totalPoints: number;
  color: string[];
  waves: Wave[];
  constructor() {
    this.totalWaves = 5;
    this.totalPoints = 8;

    this.color = [
      'rgba(255,114,114, 0.2)',
      'rgba(255,114,114, 0.3)',
      'rgba(255,114,114, 0.2)',
      'rgba(255,114,114, 0.3)',
      'rgba(255,114,114, 0.2)',
    ];

    this.waves = [];

    for (let i = 0; i < this.totalWaves; i++) {
      const wave = new Wave(document.body.clientWidth, document.body.clientHeight, i, this.totalPoints, this.color[i]);
      this.waves[i] = wave;
    }
  }

  resize(stageWidth: number, stageHeight: number) {
    for (let i = 0; i < this.totalWaves; i++) {
      const wave = this.waves[i];
      wave.resize(stageWidth, stageHeight);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.totalWaves; i++) {
      const wave = this.waves[i];
      wave.draw(ctx);
    }
  }
}
