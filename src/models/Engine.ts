import { IEngine } from './interfaces/engine';

export class Engine implements IEngine {
  public name: string;
  public power: number;
  public acceleration: number;
  public topspeed: number;

  // gear stuff
  public gear: number;

  public getRpm(): number {
    return 0;
  }
}
