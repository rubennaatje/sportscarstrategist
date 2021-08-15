export class Vector2d {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public w: number = 1 // needed for matrix multiplication
  ) {}

  /**
   * @function zero set vector to zero
   */
  public zero(): void {
    this.x = 0;
    this.y = 0;
  }

  /**
   * @getter isZero check if vector is zero
   */
  public get isZero(): boolean {
    return this.x === 0 && this.y === 0;
  }

  /**
   * @getter length The length / magnitude of the vector
   */
  public get length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * @getter lengthSq The squared length of the vector
   */
  public get lengthSq(): number {
    return this.x * this.x + this.y * this.y;
  }

  /**
   * @getter Return new the vector with rounded values
   */
  public get rounded(): Vector2d {
    return new Vector2d(Math.round(this.x), Math.round(this.y));
  }

  public add(vector2: Vector2d) {
    this.x += vector2.x;
    this.y += vector2.y;
    return this;
  }

  public subtract(vector2: Vector2d) {
    this.x -= vector2.x;
    this.y -= vector2.y;
  }
}
