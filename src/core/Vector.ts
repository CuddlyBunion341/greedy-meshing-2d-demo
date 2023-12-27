/**
 * A simple 3D vector class
 */
export class Vector {
  public x: number;
  public y: number;
  public z: number;

  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  add(vector: Vector) {
    this.x += vector.x;
    this.y += vector.y;
    this.z += vector.z;
    return this;
  }

  sub(vector: Vector) {
    this.x -= vector.x;
    this.y -= vector.y;
    this.z -= vector.z;
    return this;
  }

  mult(n: number) {
    this.x *= n;
    this.y *= n;
    this.z *= n;
    return this;
  }

  div(n: number) {
    this.x /= n;
    this.y /= n;
    this.z /= n;
    return this;
  }

  mag() {
    return Math.hypot(this.x, this.y, this.z);
  }

  normalize() {
    const m = this.mag();
    if (m === 0) return this;
    return this.div(m);
  }

  limit(max: number) {
    const m = this.mag();
    if (m > max) {
      this.div(m) //normalize it
        .mult(max); //then rescale to max
    }
    return this;
  }

  /**
   * Calculates the angle a 2D vector makes with the positive x-axis.
   *
   * Note: 2D only
   * @returns the angle of the vector in radians
   */
  heading() {
    return Math.atan2(this.y, this.x);
  }

  copy() {
    return new Vector(this.x, this.y, this.z);
  }
}
