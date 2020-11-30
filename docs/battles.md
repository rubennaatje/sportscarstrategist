# Calculating Distances & Handling battles / overtakes

We need to combine this with the already existing methods to find a car close for battles.

Run after trackmediator move, here's what happens:

1. We sort the cars by on track position.

2. We either do it by telemetry

3. Save it into object

   1. Calculate time difference
      1. `difference = FD-PD = 50m` `time delta = difference/PS = 50/90 = 0.5s`
   2. Set entry number
   3. Set laps
   4. Set fastest lap (important for timed sessions)

   # Handle the battles

```
When a driver is within 6 seconds for 15 (& it's for position) this will also show up as an actual battle. 
```

When a car is within 6 seconds create a Battle object. These battle objects added / removed / kept every tick. if inside 6 seconds (no matter the order of the cars)

A = Car in front, B = Car behind

1. Check if car is within 2 seconds
   1. depending on how much dirty air A gives, drop the downforce level of B. This will give it more speed on the straight, but a bit less speed in the corners and while braking.
   2. Check if A is within 10 meters from B
      1. Is how far is the apex?
      2. Almost here?
      3. BattleNegotiator
         1. crash / mistake
         2. overtake
         3. time lost for both
         4. time lost for one
         5. back out and focus on exit
      4. far away?
         1. it's fine really lol.

```tsx
class carbattles {
    existingBattles: [];
    cars: Record<string | number, CarBattle>;
    
    HandleBattles(cars) {
        
    }
    
    CarInBattleWith(carInFront, carInBack) {
        // check if CarF exists in this.cars, if so add carInBack and save him in the list too. 
    }
}

class CarBattle {
    constructor(entry: Entry) {
        this.start = new Date();
        this.entries = [entry];
        
    }
    
    AddCar(car) {
        // Add car to list
    }
    
    RemoveCar(car) {
        // Remove car
        // If 1 car left destroy this battle.
    }
    
    handleBattle() {
        // Check algorithm mentioned above.
        return ; //cars still in the battle
    }
}

// bit of FP, why not.
export BattleNegotiator = (carF, carB, distance, distanceToCorner, corner, speed) => {
		// calculate defence level for carF
		// This is based on wether or not it's for position, the driver and his personality
		// and also most importantly the orders from it's team boss. 
		// will be put out in a number 0 is normal, -10 is a blue flag, -100 for a longer one
		// The almost exact same counts for CarB but then attacking, -100 would only be from team orders 
		// or during a yellow flag, SC, w/e
    // 
}

class BattleNegotiator {
    Negotiate(car1, car2) {
        
    }
}
```

# BattleNegotiator algorithm

1. Calculate defense level for carF
   1. This is based on wether or not it's for position, the driver and his personality and also most importantly the orders from it's team boss. What also counts is the session type, you don't want to be in the way on a slow lap in a lap based session.
   2. a number will be put out, 0 is normal, -10 is a blue flag, -100 for a longer one
   3. 10 might be for when it's not a blue flag
2. The almost exact same counts for CarB but then attacking
   1. -100 would only be from team orders or during a yellow flag, SC, w/e

Now now check the distance from the car.

1. are they both way ahead of the corner?
   1. do nothing
2. are they coming up to the braking point?
   1. use the defense level to set the braking point for carF
   2. use attack level to set the braking point for carB
   3. Check if CarB will brake later than carF
      1. Give by how far to both drivers and let them decide what to do (attack, move to inside, or defend, move to inside too)
   4. if blue flag move CarF braking point slightly back.
3. Are they past the braking point and right before turn in point?
   1. Are they alongside each other?
      1. One will back out (often the one on the outside)
      2. They both commit
         1. based on risk of corner
            1. crash
         2. slight contact maybe a puncture or bodywork damage
         3. car on outside gets forced off
         4. both continue next to each other
         5. both go wide and lose time