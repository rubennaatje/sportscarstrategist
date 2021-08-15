export class Gear {
  public minRPM: number;
  public length: number;
  private speed: number;

  public constructor(minRPM = 4000, length = 10) {
    this.minRPM = minRPM;
    this.length = length;
  }

  public getMinRPM() {
    return this.minRPM;
  }

  public getLength() {
    return this.length;
  }

  public setMinRPM(minRPM: number) {
    this.minRPM = minRPM;
  }

  public setLength(length: number) {
    this.length = length;
  }

  public getSpeed() {
    return this.speed;
  }

  public updateRPM(RPM: number, milliseconds: number) {
    // speed * tiresize * gear
    const currentRPM = 1;
    this.speed = currentRPM * length;
    return currentRPM;
  }
}
