import { Gear } from './Gear';

export class GearBox {
  gears: Gear[];

  gearNumber: number;

  currentRPM: rpm;

  speed: speedMPS;

  MIN_GEAR_RPM: rpm = 2000;

  MAX_GEAR_RPM: rpm = 20000;

  OPTIMAL_RPM_CHANGE: rpm = 18000;

  public constructor() {
    this.gears = new Array(7);
    let Step_in: number = 18000;
    let multiplier: number = 1;
    this.gears[0] = new Gear(4000, 2.37);
    this.gears[1] = new Gear(4300, 3.23);
    this.gears[2] = new Gear(4400, 2.19);
    this.gears[3] = new Gear(4500, 1.71);
    this.gears[4] = new Gear(4600, 1.39);
    this.gears[5] = new Gear(4700, 1.16);
    this.gears[6] = new Gear(4800, 0.93);
    this.gearNumber = 0;
    this.currentRPM = 4000;
  }

  public getGear(index: number): Gear {
    return this.gears[index];
  }

  public getCurrentGear(): Gear {
    return this.gears[this.gearNumber];
  }

  public getSpeedInKPH(): number {
    return this.speed;
  }

  public getCurrentGearNumber(): number {
    return this.gearNumber + 1;
  }

  public getSpeedInMPS(): speedKMPH {
    return this.speed / 3.6;
  }

  public update(milliseconds: number) {
    if (
      this.currentRPM >= this.OPTIMAL_RPM_CHANGE &&
      this.gearNumber < this.gears.length - 1
    ) {
      this.gearNumber++;
      this.currentRPM = <number>(
        (this.speed * this.gears[this.gearNumber].getLength())
      );
    }

    if (
      this.gears[this.gearNumber].getMinRPM() > this.currentRPM &&
      this.gearNumber > 0
    ) {
      this.gearNumber--;
      this.currentRPM = <number>(
        (this.getSpeedInKPH() * this.gears[this.gearNumber].getLength())
      );
    }

    this.currentRPM = this.gears[this.gearNumber].updateRPM(
      this.currentRPM,
      milliseconds
    );
    this.speed = this.gears[this.gearNumber].getSpeed();
  }

  public getCurrentRPM(): number {
    return this.currentRPM;
  }

  public static main(args: String[]) {
    let gearbox: GearBox = new GearBox();
    for (let i: number = 0; i < 20; i++) {
      gearbox.update(1000);
    }
  }
}
