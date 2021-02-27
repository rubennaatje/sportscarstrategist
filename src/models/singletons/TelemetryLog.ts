import loki from 'lokijs';
import { Telemetry } from '../telemetry';
import { TimedLap } from '../timedlap';

/**
 * The Singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */

// implement the autoloadback referenced in loki constructor
export class TelemetryLog {
  private static instance: TelemetryLog;
  private db: Loki;
  private telemetry: Collection<ITelemetryLog>;
  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    this.db = new loki('telemetry.json', {
      autoload: true,
      autoloadCallback: () => {
        this.databaseInitialize();
      },
      autosave: true,
      autosaveInterval: 4000,
    });
  }

  private databaseInitialize() {
    this.telemetry = this.db.getCollection('telemetry');
    if (this.telemetry === null) {
      this.telemetry = this.db.addCollection('telemetry');
    }
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): TelemetryLog {
    if (!TelemetryLog.instance) {
      TelemetryLog.instance = new TelemetryLog();
    }

    return TelemetryLog.instance;
  }

  public saveTelemetry(telemetryItem: TimedLap) {
    const item = telemetryItem.ToJSON();

    this.telemetry.insert(item);
  }

  public getTelemetry(carnumber, lap) {
    return this.telemetry.findOne({ carNumber: carnumber, lapNR: lap });
  }

  public getUpdate() {
    let entryCount = this.telemetry?.count();
    console.log('number of entries in database : ' + entryCount);
  }

  /**
   * Finally, any singleton should define some business logic, which can be
   * executed on its instance.
   */
}

export interface ITelemetryLog {
  lapNR: number;
  startTimeS: number;
  laptimeS: number;
  telemetry: {
    speed: {
      pos: number;
      time: number;
      val: number;
      delta: number;
    }[];
  };
  carNumber: string | number;
}
