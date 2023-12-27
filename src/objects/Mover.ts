import { Vector } from '../core';

interface IMover {
  position: Vector;
  velocity: Vector;
  acceleration: Vector;
  radius: number;
  mass: number;
}

export class Mover implements IMover {
  position: Vector;
  velocity: Vector;
  acceleration: Vector;
  radius: number;
  mass: number;

  constructor({
    position = new Vector(),
    velocity = new Vector(),
    acceleration = new Vector(),
    radius = 10,
    mass = 1,
  }: Partial<IMover>) {
    this.position = position;
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.radius = radius;
    this.mass = mass;
  }
  update(c: CanvasRenderingContext2D) {
    this.draw(c);

    if (this.position.x + this.radius > innerWidth || this.position.x - this.radius < 0) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.position.y + this.radius > innerHeight || this.position.y - this.radius < 0) {
      this.velocity.y = -this.velocity.y;
    }

    this.position.add(this.velocity);
  }
  draw(c: CanvasRenderingContext2D) {
    c.save();
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = 'red';
    c.fill();
    c.closePath();
    c.restore();
  }
}
