export interface IEngine {
  name: string;
  // everything is a score from 0(very very slow) to 100 (f1 level speeds)
  power: number;
  acceleration: number;
  topspeed: number;
}
