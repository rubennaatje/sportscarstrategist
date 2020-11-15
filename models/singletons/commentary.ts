/**
 * The Singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
export class Commentary {
  private static instance: Commentary;
  strings: string[];
  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    this.strings = [];
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): Commentary {
    if (!Commentary.instance) {
      Commentary.instance = new Commentary();
    }

    return Commentary.instance;
  }

  /**
   * Finally, any singleton should define some business logic, which can be
   * executed on its instance.
   */
  public AddEvent(test: string) {
    this.strings.push(test);
    console.log(test);
  }
}
