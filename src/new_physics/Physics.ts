import { Vector } from './Vector';

export class Physics {
  // keep
  velocity: Vector;
  acceleration: Vector;
  position: Vector;
  braking: boolean;

  private direction: Vector;

  private fLongtitudinalForce: Vector;
  private fTraction: Vector;
  private fRollingResistance: Vector;
  private fBraking: Vector;
  // Calculate this from engine
  private Engineforce: force;
  // 2d vector of direction

  // calculate this from speed.
  private fDrag: Vector;

  // constants
  // drag for the amount of drag, also calculatable.
  private cDrag: number;
  private cRR: number;
  // weight but without gravity
  private mass: number;
  private cBraking: number;

  constructor() {
    this.direction = new Vector(0, 0);
  }

  calculateDrag() {
    const magnitude = this.velocity.magnitude;
    this.fDrag.x = -this.cDrag * this.velocity.x * magnitude;
    this.fDrag.y = -this.cDrag * this.velocity.y * magnitude;
  }

  calculateRollingResistance() {
    this.fRollingResistance = Vector.multiply(this.velocity, this.cRR);
  }

  calculateLongtitudinalForce() {
    this.fLongtitudinalForce = Vector.add(
      Vector.add(this.fDrag, this.braking ? this.fBraking : this.fTraction),
      this.fRollingResistance
    );
  }

  calculateAcceleration() {
    this.acceleration = Vector.divide(this.fLongtitudinalForce, this.mass);
  }

  getVelocityMPS(delta: number) {
    this.velocity = Vector.add(
      this.velocity,
      Vector.multiply(this.acceleration, delta)
    );
  }

  setPosition(delta: number) {
    this.position = Vector.add(
      this.position,
      Vector.multiply(this.velocity, delta)
    );
  }

  setBraking() {
    this.fBraking = Vector.multiply(
      Vector.reverse(this.direction),
      this.cBraking
    );
  }

  private fMax: number;
  weightTransfer() {
    const weight = this.mass * 10;
    // this is where vague shit comes in.
    const cGFront = 10;
    const cGRear = 3;
    const lWheelbase = 3;

    let weightFront = (cGRear / lWheelbase) * weight;
    let weightRear = (cGFront / lWheelbase) * weight;

    const height = 5;
    const stuff = Vector.multiply(
      this.acceleration,
      (height / lWheelbase) * this.mass
    );
    weightFront = weightFront - stuff;
    weightFront = weightFront + stuff;
  }
}
