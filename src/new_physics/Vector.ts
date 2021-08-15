export class Vector {
  public static add(vector1: Vector, vector2: Vector): Vector {
    return new Vector(vector1.x + vector2.x, vector1.y + vector2.y);
  }

  public static subtract(vector1: Vector, vector2: Vector): Vector {
    return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);
  }

  public static subtractValue(vector: Vector, value: number): Vector {
    return new Vector(vector.x - value, vector.y - value);
  }

  public static multiply(vector: Vector, value: number): Vector {
    return new Vector(vector.x * value, vector.y * value);
  }

  public static divide(vector: Vector, value: number): Vector {
    return new Vector(vector.x / value, vector.y / value);
  }

  public static equals(vector1: Vector, vector2: Vector): boolean {
    return vector1.x === vector2.x && vector1.y === vector2.y;
  }

  public static equalsRounded(
    vector1: Vector,
    vector2: Vector,
    roundingFactor: number = 12
  ): boolean {
    const vector = Vector.abs(Vector.subtract(vector1, vector2));
    if (vector.x < roundingFactor && vector.y < roundingFactor) {
      return true;
    }

    return false;
  }

  /**
   * Normalizes the vector if it matches a certain condition
   */
  public static normalize(vector: Vector): Vector {
    const length = vector.length;
    if (length > 2.220446049250313e-16) {
      // Epsilon
      return Vector.divide(vector, length);
    }

    return vector;
  }

  /**
   * Adjusts x and y so that the length of the vector does not exceed max
   */
  public static truncate(vector: Vector, max: number): Vector {
    if (vector.length > max) {
      return Vector.multiply(Vector.normalize(vector), max);
    }

    return vector;
  }

  /**
   * The vector that is perpendicular to this one
   */
  public static perp(vector: Vector): Vector {
    return new Vector(-vector.y, vector.x);
  }

  /**
   * returns the vector that is the reverse of this vector
   */
  public static reverse(vector: Vector): Vector {
    return new Vector(-vector.x, -vector.y);
  }

  public static abs(vector: Vector): Vector {
    return new Vector(Math.abs(vector.x), Math.abs(vector.y));
  }

  /**
   * The dot product of v1 and v2
   */
  public static dot(vector1: Vector, vector2: Vector): number {
    return vector1.x * vector2.x + vector1.y * vector2.y;
  }

  /**
   * The distance between this and the vector
   */
  public static distance(vector1: Vector, vector2: Vector): number {
    const ySeparation = vector2.y - vector1.y;
    const xSeparation = vector2.x - vector1.x;
    return Math.sqrt(ySeparation * ySeparation + xSeparation * xSeparation);
  }

  /**
   * The distance between this and the vector squared
   */
  public static distanceSq(vector1: Vector, vector2: Vector): number {
    const ySeparation = vector2.y - vector1.y;
    const xSeparation = vector2.x - vector1.x;
    return ySeparation * ySeparation + xSeparation * xSeparation;
  }

  /**
   * Returns positive if v2 is clockwise of this vector, negative if counterclockwise
   * (assuming the Y axis is pointing down, X axis to right like a Window app)
   */
  public static sign(vector1: Vector, vector2: Vector): number {
    if (vector1.y * vector2.x > vector1.x * vector2.y) {
      return -1;
    }

    return 1;
  }

  /**
   * Returns the angle between origin and the given vector in radians
   * @param vector
   */
  public static angle(vector: Vector): number {
    const origin = new Vector(0, -1);
    const radian = Math.acos(
      Vector.dot(vector, origin) / (vector.length * origin.length)
    );
    return Vector.sign(vector, origin) === 1 ? Math.PI * 2 - radian : radian;
  }

  public static random(maxX: number, maxY: number): Vector {
    const randX = Math.floor(Math.random() * maxX - maxX / 2);
    const randY = Math.floor(Math.random() * maxY - maxY / 2);
    return new Vector(randX, randY);
  }

  constructor(
    public x: number = 0,
    public y: number = 0,
    public w: number = 1 // needed for matrix multiplication
  ) {}

  /**
   * Check wether both x and y are zero
   */
  public zero(): void {
    this.x = 0;
    this.y = 0;
  }

  /**
   * Set x and y both to zero
   */
  public get isZero(): boolean {
    return this.x === 0 && this.y === 0;
  }

  /**
   * The length / magnitude of the vector
   */
  public get length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * The squared length of the vector
   */
  public get lengthSq(): number {
    return this.x * this.x + this.y * this.y;
  }

  /**
   * Return the vector with rounded values
   */
  public get rounded(): Vector {
    return new Vector(Math.round(this.x), Math.round(this.y));
  }

  public get magnitude(): number {
    // use pythagoras theorem to work out the magnitude of the vector
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}

export default Vector;
