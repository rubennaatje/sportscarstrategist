import { Entry } from '../entry';

export interface sendData {
  pos: number;
  car2: string;
  category: string;
  laps: number;
  lapdistance: number;
  percentage: number;
  speed: number;
  carnumber: string | number;
  fastestlap: {
    laptime: number;
    lapNr: number;
  };
  realdeal: any;
}
