export const GameLoop = (func: (number: number) => void) => {
  /**
Length of a tick in milliseconds. The denominator is your desired framerate.
e.g. 1000 / 20 = 20 fps,  1000 / 60 = 60 fps
*/
  const tickLengthMs = 1000 / 200;

  /* gameLoop related variables */
  // timestamp of each loop
  let previousTick = Date.now();
  // number of times gameLoop gets called
  let actualTicks = 0;

  let realLoop = function () {
    const now = Date.now();

    actualTicks++;
    if (previousTick + tickLengthMs <= now) {
      const delta = (now - previousTick) / 1000;
      previousTick = now;

      update(delta);
      if (delta > 0.1)
        console.log(
          'delta',
          delta,
          '(target: ' + tickLengthMs + ' ms)',
          'node ticks',
          actualTicks
        );
      actualTicks = 0;
    }

    if (Date.now() - previousTick < tickLengthMs - 16) {
      setTimeout(realLoop);
    } else {
      setImmediate(realLoop);
    }
  };

  /**
Update is normally where all of the logic would go. In this case we simply call
a function that takes 10 milliseconds to complete thus simulating that our game
had a very busy time.
*/
  const update = function (delta) {
    func(delta);
  };

  realLoop();
};
