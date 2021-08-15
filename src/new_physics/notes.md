# Car physics are hard mkay but if I do this it will give me confidence

# DONT AIM FOR SIMULATION, JUST FOR A BELIEVABlE OUTPUT.

ATM only using rear wheel drive, we'll be following the exact example as well.

So don't be shook when our toyota lmp1 is very slow, as in roadcar vette slow.

Our physics will simulate a car going in a straight line.

# What forces are at play here?

**tractive force**, force delivered by the engine via the rear wheels. the engine turns the wheels forward (applies torgue on the wheel to be precise). These wheels push backwards on the road and in reaction the roadservices pushes back in a forward direction. For now we'll just say that the tractive force is equivalent in magnitude to the variable EngineForce.

    Ftraction = u * Engineforce.
    u === vector of direction.

if this were the only force, the car could speed up to infinite speeds.
Obviously not the case. So there's different forces, resistance forces to be precise.

First one is **air resistance**, aka drag. Very important for our game, and it's proportional to the square of the velocity. the faster you go the more resistance.

    Fdrag = - Cdrag * v * |v|

    Cdrag is a constant, think about downforce. le mans kit vs hdf kit.

    v is the velocity vector

    the notation |v| refers to the magnitude of vector v.

So to get that clear:

the force of the drag = negative constant (drag, downforce, etc) multiplied by the velocity multiplied by the magnitude of the velocity.

that magnitude is more commonly known as the speed, speed is a scalar not a vector btw.

    speed = sqrt(v.x*v.x + v.y*v.y);
    fdrag.x = - Cdrag * v.x * speed;
    fdrag.y = - Cdrag * v.y * speed;

Next up is **rolling resistance**. This is caused by the tires on the road but also the friction in the axles for example.

We'll sorta guess this with a force proportional to the velocity using a constant again.

    Frr = - Crr * v

    Crr is a constant
    v is the velocity vector

To get that more clear: the Force of the rolling resistance is equal to the rollingresistance constant and the velocity vector.

At low speeds the rolling resistance is the main resistance force, at high speeds the drag will take over (quite quickly in race cars).

> At approx. 100 km/h (60 mph, 30 m/s) they are equal ([Zuvich]). This means Crr must be approximately 30 times the value of Cdrag

Don't know if this is right for racecars but we'll find out at some point, I hope.

The longtitudinal force is basically the vector sum of these three forces.

Flong = Ftraction + Fdrag + Frr

> Note that if you're driving in a straight line the drag and rolling resistance forces will be in the opposite direction from the traction force. So in terms of magnitude, you're subtracting the resistance force from the traction force. When the car is cruising at a constant speed the forces are in equilibrium and Flong is zero.

If you're driving in a straight line, the drag and rolling resitance forces will be in opposite direction from the traction force, as they work against the traction force. In terms of magnitude, you will subtract the resistance force from the traction force. When the car is driving at a constant speed, the forces are in equilibrium and flong is zero.

## Now what?

The **acceleration** (a) of the car (in meters per second squared) is determined by the net force of the car (in Newton) an the car's mass M (in kilogram) via Newton's second law:

        a = F / M

Acceleration is force divided by the mass.

The car's **velocity** (in meters per second) is determined by integrating hte acceleration over time. This sounds more complicated than it is, usually the following equation does the trick. This is known as the Euler method for numerical integration.

        v = v + (dt * a)

        dt is the deltatime increment in seconds between updates.
        v is the velocity (or previous velocity)
        a is the previously calculated acceleration

basically: velocity is the old velocity with the acceleration multiplied by the deltatime added to it.

The car's position is in turn determined by integrating the velocity over time:

        p = p + dt * v

With these three forces we can simulate car acceleration fairly accurately. Together they also determine the top speed of the car for a given engine power. There is no need to put a maximum speed anywhere in the code, it's just something that follows from the equations. This is because the equations form a kind of negative feedback loop. If the traction force exceeds all other forces, the car accelerates. This means the velocity increases which causes the resitance forces to increase. The net force decreases and therefore the acceleration decreases. At some point the resistance forces and the engine force cancel each other out and the car has reached its top speed for that engine power.
![a](https://asawicki.info/Mirror/Car%20Physics%20for%20Games/Car%20Physics%20for%20Games_files/ctgraph.jpg)

_probably handy to create these graphs yourself._

in this diagram the X-axis denoted the car velocity in meters per second and force avlues are set out along the Y axis. The traction force, (engine force) dark blue, is set at an constant value, it's at the same value the whole time as it's not depending on the car velocity. The rolling resistance (purple line) is a linear function of velocity and the drag (yellow curve) is a quadratic function of velocity. At low speed the rolling resistance exceeds the drag. At 30 m/s these two functions cross. At higher speeds the drag is the larger resistance force. The sum of the two resistance forces is shown as a light blue curve. At 37 m/s this curve crosses the horizontal traction force line. This is the top speed for this particular value of the engine power (37 m/s = 133 km/h = 83 mph).

# Magic constants

At the moment we've already used two magic constants in our equations. Cdrag and crollingresistance, as we want a realistic game we don't to just give these a random value.

Air resistance is approximated by the following formula (Fluid Mechanics by Landau and Lifshitz, [Beckham] chapter 6, [Zuvich])

    Fdrag =  0.5 * Cd * A * rho * v2

    where Cd = coefficient of friction
    A is frontal area of car
    rho (Greek symbol )= density of air
    v = speed of the car

Air density (rho) is 1.29 kg/m3 (0.0801 lb-mass/ft3), frontal area is approx. 2.2 m2 (20 sq. feet), Cd depends on the shape of the car and determined via wind tunnel tests. Approximate value for a Corvette: 0.30. This gives us a value for Cdrag:

Cdrag = 0.5 _ 0.30 _ 2.2 \* 1.29
= 0.4257

We've already found that Crr should be approx. 30 times Cdrag. This gives us

Crr = 30 \* 0.4257
= 12.8

To be honest, I have my doubts about this last constant. I couldn't confirm its value anywhere. Be prepared to finetune this one to get realistic behaviour. (maybe check online where you can find these values)

# Braking

When braking , the traction force is replaced by a braking force, which is oriented in the opposite direction. The total longtitudeinal force is then the vector sum of these three forces.

    Flong =   Fbraking + Fdrag   + Frr

A simple model of braking:

      Fbraking = -u * Cbraking

      u =vector of direction.

In this model the braking force is a constant. Keep in mind to stop applying the braking force as soon as the speed is reduced to zero otherwise the car will end up going in reverse.

We should probably make that constant depending on the grip, brake condition.

# Weight transfer

An important effect when accelerating or braking hte effect of dynamic weight transfer, when braking hard the car will nosedive. During acceleration the car leans back. This is because just like the driver is pushed back in his seat when the pedal hits the metal, so is the car's centre of mass. The effect of this is that the weight on the rear wheels increases during acceleration and the front wheels conversely have less weight to bear.

The effect of weight transfer is important for driving games for two reasons normally

- ~~visual effect~~
- second of all, the weight distribution dramatically affects the maximum traction force per wheel. This is because there is a friction limit for a wheel that is proportional to the load on that wheel.
  this one is very relevant to our game.

equation:

    Fmax = mu * W

    mu is the friction coefficient of the tyre.
    For street tyres this may be 1.0
    for racing car tyres this can get as high as 1.5.

For a stationary vehicle the total weight of the car (W, which equals M \*g) is distributed over the front and rear wheels according to the distance of the rear and front axle to the CM (c and b respectively):

    Wf = (c/L)*W
    Wr = (b/L)*W

    Wf = weight front
    Wr = weight rear
    W = mass * gravity ( aka mass * 10)
    b = distnance from center of gravity to front axle (wheels)
    c is distance from cg to rear axle
    L is wheelbase (length)

![a](https://asawicki.info/Mirror/Car%20Physics%20for%20Games/Car%20Physics%20for%20Games_files/ctwd.jpg)

If the car is accelerating or decelerating at rate a, the weight on front (Wf) and rear axle (wr) can be calculated as follows:

    Wf = (c/L)*W - (h/L)*M*a
    Wr = (b/L)*W + (h/L)*M*a

    h is height of the center of gravity
    M is the car's masss
    a is the acceleration

basically: weight on front =
distance from center of gravity to front axle divided by the length of the wheelbase and that multiplied by mass and that multiplied by acceleration

Note that if the CG is further to the rear (c < b), then more weight falls on the rear axle and vice versa. Makes sense, doesn't it?

If you want to simplify this, you could assume that the static weight distribution is 50-50 over the front and rear axle. In other words, assume b = c = L/2.

     Wf = 0.5*W - (h/L)*M*a
     Wr = 0.5*W +(h/L)*M*a;

# Engine forces

When we said before that the engine delivers a certain (constant) amount of force, that was a bit of a simplification. An engine delivers an amount of **torque**. Torque is like a rotational equivalent of force. Torque is force times distance. if you apply a 10 newton force at 0.3 meters of the axis of rotation you've got a toruge of 10x0.3 = 3N.M.. That is the same torque as when you apply a 1N force at 3m from the axis. In both cases the leverage is the same.

The torque that an egine can delvier depends on the speed at whcih the engine is turning, commonly expressed as rpm (revolutions pe rminute). The relationship torque versus rpm ins not a linear relationship but is usally provided as a curve knwon as a torque curve (the exact shape and height of the curve is specific for each engine type, it is determined by engine tests). Here's an example for the 5.7 liter v8 engine foun din corvettes form 1997 to 2000: the LS1

![](https://asawicki.info/Mirror/Car%20Physics%20for%20Games/Car%20Physics%20for%20Games_files/cttorq.gif)

Note that the torque curve peaks at about 4400 rpm with a torgue of 450lb-ft (475N.m) and horsepower peaks at 5600rpm at 345 hp (257 kW). the cufrves are only defined in the range from, in this particular case, about 1000 to 6000 rpm, because that is the operatin grange of the engine. Any lower and the ngine will stall. Any higher (hinghinghinghing) and you'll damage the engine (so it's limited).

We're mostly intersted in the torque cuve but some people find the power curve also interesting. You can derive the horsepower from the torque in foot-pounds using the following equation

    hp = torque * rpm / 5252

Because of this relationship, the two curves will always cross at 5252 rpm. Check for yourself in the diagram above.

And here's the same curves in SI units: Newton meter for torque and kiloWatt for power. The curves are the same shape, but the relative scale is different (and because of that they don't cross either).

![](https://asawicki.info/Mirror/Car%20Physics%20for%20Games/Car%20Physics%20for%20Games_files/cttorqsi.gif)

Now, the torque from the engine (i.e. at the crankshaft) is converted via the gear and differential before it's applied to the rear wheels. The gearing multiplies the torque from the engine by a factor depending on the gear ratios.

Unfortunately, quite some energy is lost in the process. As much as 30% of the energy could be lost in the form of heat. This gives a so-called transmission efficiency of 70%. Let me just point out that I've seen this mentioned as a typical value, I don't have actual values for any particular car.

The torque on the rear axle can be converted to a force of the wheel on the road surface by dividing by the wheel radius. (Force is torque divided by distance).

By the way, if you want to work out the radius of a tyre from those cryptic tyre identfication codes, have a look at the The Wheel and Tyre Bible (http://www.carbibles.com ). It even provides a handy little calculator. For example, this tells us the P275/40ZR-18 rear tyres of a Corvette have an unloaded radius of 34 cm.

Here's an equation to get from engine torque to drive force: the longtitudinal force that the two rear wheels exert on the road surface.

Fdrive = u _ Tengine _ xg _ xd _ n / Rw

u is a unit vector which reflects the car's orientation
Tengine is the torque of the engine at a given rpm
xg is the gear ratio
xd is the differential ratio
n is transmission efficiency
Rw is wheel radius

An example:

Engine is running at 2500 rpm, looking this up on the curve gives engine torque of 448 Nm (=330 ft lbs)
Gear ratio (first gear): 2.66
Differential ratio: 3.42
Transmission efficiency: 0.7 (guess)
Wheel radius: 0.34 m (=13.4 inch)
Mass: 1500 kg (= 3300 lbs of weight) including the driver.

This gives us a potential drive force of `(448*2.66*3.42*0.7/0.34 = ) 8391 N` if the driver puts his foot down.

Meanwhile, in the static situation, the weight on the rear wheels is half the weight of the car and driver: `(1500 kg / 2 ) * 9.8 m/s2 = 7350 N (=1650 lbs).`

This means the maximum amount of traction the rear wheels can provide if `mu = 1.0 is 7350 N`. Push the pedal down further than that and the wheels will start spinning and lose grip and the traction actually drops below the maximum amount. So, for maximum acceleration the driver must exert an amount of force just below the friction threshold. The subsequent acceleration causes a weight shift to the rear wheels. The acceleration is:

    a = 7350 N / 1500 kg  = 4.9 m/s2  (=0.5 G)

Let's say that b = c = 1.25m and L is therefore 2.50 m, the CG is 1.0 m above ground level. After a brief moment the amount of shifted weight is then `(h/L)*M*a, that is (1.0/2.50)*1500*4.9 = 2940 N`.

This means `Wf = 7350 - 2940 N and Wr = 7350 + 2940 N`. The rear wheels now have extra weight which in this case is sufficient to allows the driver to put his foot all the way down.

# Gear ratios

The following gear ratios apply to an Corvette C5 hardtop (Source: http://www.idavette.net/facts/c5specs/ )
||||
|--- |--- |--- |
|First gear|g1|2.66|
|Second gear|g2|1.78|
|Third gear|g3|1.30|
|Fourth gear|g4|1.0|
|Fifth gear|g5|0.74|
|Sixth (!) gear|g6|0.50|
|Reverse|gR|2.90|
|Differential ratio|xd|3.42|

Max torque 475 N.m (350 lb ft) at 4400 rpm, mass = 1439 kg (ignoring the driver for now). In first gear at max torque this gives us a whopping 475*2.66*3.42\*0.7/0.33 = 9166 N of force. This will accelerate a mass of 1439 kg with 6.4 m/s2 (a=F/m) which equals 0.65 g.

The combination of gear and differential acts as a multiplier from the torque on the crankshaft to the torque on the rear wheels. For example, the Corvette in first gear has a multiplier of 2.66 _ 3.42 = 9.1. This means each Newton meter of torque on the crankshaft results in 9.1 Nm of torque on the rear axle. Accounting for 30% loss of energy, this leaves 6.4 N.m. Divide this by the wheel radius to get the force exerted by the wheels on the road (and conversely by the road back to the wheels). Let's take a 34 cm wheel radius, that gives us 6.4 N.m/0.34 m = 2.2 N of force per N.m of engine torque. Of course, there's no such thing as a free lunch. You can't just multiply torque and not have to pay something in return. What you gain in torque, you have to pay back in angular velocity. You trade off strength for speed. For each rpm of the wheel, the engine has to do 9.1 rpm. The rotational speed of the wheel is directly related to the speed of the car (unless we're skidding). One rpm (revolution per minute) is 1/60th of a revolution per second. Each revolution takes the wheel 2 pi R further, i.e. 2 _ 3.14 \* 0.34 = 2.14 m. So when the engine is doing 4400 rpm in first gear, that's 483 rpm of the wheels, is 8.05 rotations per second is 17.2 m/s, about 62 km/h.

In low gears the gear ratio is high, so you get lots of torque but no so much speed. In high gears, you get more speed but less torque. You can put this in a graph as a set of curves, one for each gear, as in the following example.

![](https://asawicki.info/Mirror/Car%20Physics%20for%20Games/Car%20Physics%20for%20Games_files/ctgrcrvs.gif)

Note that these curves assume a 100% efficient gearing. The engine's torque curve is shown as well for reference, it's the bottom one in black. The other curves show the torque on the rear axle for a given rpm of the axle (!), rather than the engine. As we've already seen, the rotation rate of the wheels can be related to car speed (disregarding slip for the moment) if we know the wheel radius. This means 1000 rpm of the rear axle is 36 m/s or 128 km/h car speed (80 mph). 2000 rpm is 256 km/h (160 mph). Etcetera.

Now beware, the torque that we can look up in the torque curves above for a given rpm, is the maximum torque at that rpm. How much torque is actually applied to the drive wheels depends on the throttle position. This position is determined by user input (the accelerator pedal) and varies from 0 to 100%. So, in pseudo-code, this looks something like this:

You could implement the function LookupTorqueCurve by using an array of torque/rpm value pairs and doing linear interpolation between the closest two points.

```js
const maxTorque = LookupTorqueCurve(rpm);
const engineTorque = throttlePosition * maxTorque;
```

This torque is delivered to the drive wheels via the gearbox and results in what I'll call the drive torque:

```js
const driveTorque =
  engine_torque * gear_ratio * differential_ratio * transmission_efficiency;
```

Or written more concisely as:

    Tdrive =  Tengine * xg * xd * n

Because Fdrive = Tdrive / Rw , this is the same as the equation for drive force we saw earlier.

Note that the gearbox increases the torque, but reduces the rate of rotation, especially in low gears.

## How do get the RPM?

So we need the rpm to calculate the engine's max torque and from there the engine's actual applied torque. In other words, now we need to know has fast the engine's crankshaft is turning.

The way I do it is to calculate this back from the drive wheel rotation speed. After all, if the engine's not declutched, the cranckshaft and the drive wheels are physically connected through a set of gears. If we know the rpm, we can calculate the rotation speed of the drive wheels, and vice versa!

```js
const rpm = wheel rotation rate * gear ratio * differential ratio * 60 / 2 pi
// The 60 / 2 pi is a conversion factor to get from rad/s to revolutions per minute.  There are 60 seconds in a minute and 2 pi radians per revolution.  According to this equation, the cranckshaft rotates faster than the drive wheels. For example, let's say the wheel is rotating at 17 rad/s.
```

The 60 / 2 pi is a conversion factor to get from rad/s to revolutions per minute. There are 60 seconds in a minute and 2 pi radians per revolution. According to this equation, the cranckshaft rotates faster than the drive wheels. For example, let's say the wheel is rotating at 17 rad/s.

Wheel rotates at 17 rad/s.
First gear ratio is 2.66, differential ratio is 3.42 so crankshaft is rotating at 153 rad/s.
That's 153\*60 = 9170 rad/minute = 9170/2 pi = 1460 rpm at the engine.

Because the torque curve isn't defined below a certain rpm, you may need to make sure the rpm is at least at some minimum va lue. E.g.

```js
if (rpm < 1000) {
  rpm = 1000;
}
```

This is needed to get the car into motion from a standstill. The wheels aren't turning so the rpm calculation would provide zero. At zero rpm, the engine torque is either undefined or zero, depending how your torque curve lookup is implemented. That would mean you'd never be able to get the car moving. In real life, you'd be using the clutch in this case, gently declutching while the car starts moving. So wheel rotation and engine rpm are more or less decoupled in this situation.

There are two ways to get the wheel rotation rate. The first one is the easiest, but a bit of a quick hack. The second one involves some more values to keep track of over time, but is more accurate and will allow for wheel spins, etcetera.

The easy way is to pretend the wheel is rolling and derive the rotation rate from the car speed and the wheel radius.

For example, let's say the car is moving at 20 km/h = 20,000 m / 3600 s = 5.6 m/s.
wheel radius is 0.33 m, so wheel angular velocity is 5.6/0.33 = 17 rad/s

Plug this into the previous equations to get the 1460 rpm, from which we can look up the engine torque on the torque curve.

The more advanced way is to let the simulation keep track of the rear wheel rotation rate and how it changes in time due to the torques that act on the rear wheels. In other words, we find the rotation rate by integrating the rotational acceleration over time. The rotational acceleration at any particular instant depends on the sum of all the torques on the axle and equals the net torque divided by the rear axles inertia (just like linear accelaration is force divided by mass). The net torque is the drive torque we saw earlier minus the friction torques that counteract it (braking torque if you're braking and traction torque from the contact with the road surface).

## Slip ratio and traction force

Calculating the wheel angular velocity from the car speed is only allowed if the wheel is rolling, in other words if there is no lateral slip between the tyre surface and the road. This is true for the front wheels, but for drive wheels this is typically not true. After all, if a wheel is just rolling along it is not transfering energy to keep the car in motion.

In a typical situation where the car is cruising at constant speed, the rear wheels will be rotating slighty faster than the front wheels . The front wheels are rolling and therefore have zero slip. You can calculate their angular velocity by just dividing the car speed by 2 pi times the wheel radius. The rear wheels however are rotating faster and that means the surface of the tyre is slipping with regard to the road surface. This slip causes a friction force in the direction opposing the slip. The friction force will therefore be pointing to the front of the car. In fact, this friction force, this reaction to the wheel slipping, is what pushes the car forwards. This friction force is known as traction or as the longtitudinal force. The traction depends on the amount of slip. The standardised way of expressing the amount of slip is as the so-called slip ratio:

![](https://asawicki.info/Mirror/Car%20Physics%20for%20Games/Car%20Physics%20for%20Games_files/cteq_sr.gif)

        where
       w (pronounced: omega) is wheel angular velocity (in rad/s)
      Rw is wheel radius (in m)
      vlong is car speed a.k.a. longtitudinal velocity (in m/s)

Note: there are a number of slightly different definitions for slip ratio in use. This particular definition also works for cars driving in reverse.

Slip ratio is zero for a free rolling wheel. For a car braking with locked wheels the slip ratio is -1, and a car accelerating forward has a positive slip ratio. It can even be larger than 1 of there's a lot of slip.

The relationship between longtitudinal (forward) force and slip ratio can be described by a curve such as the following:

![](https://asawicki.info/Mirror/Car%20Physics%20for%20Games/Car%20Physics%20for%20Games_files/ctsrcurve.gif)

Note how the force is zero if the wheel rolls, i.e. slip ratio = 0, and the force is at a peak for a slip ratio of approximately 6 % where the longtitudinal force slightly exceeds the wheel load. The exact curve shape may vary per tyre, per road surface, per temperature, etc. etc.

That means a wheel grips best with a little bit of slip. Beyond that optimum, the grip decreases. That's why a wheel spin, impressive as it may seem, doesn't actually give you the best possible acceleration. There is so much slip that the longtitudinal force is below its peak value. Decreasing the slip would give you more traction and better acceleration.

The longtitudinal force has (as good as) a linear dependency on load, we saw that earlier when we dicussed weight transfer. So instead of plotting a curve for each particular load value, we can just create one normalized curve by dividing the force by the load.

To get from normalized longtitudinal force to actual longtitudinal force, multiply by the load on the wheel.

    Flong = Fn, long * Fz

    where Fn, long is the normalized longtitudinal force for a given slip ratio and Fz is the load on the tyre.

For a simple simulation the longtitudinal force can be approximated by a linear function:

    Flong = Ct * slip ratio

where Ct is known as the traction constant, which is the slope of the slip ratio curve at the origin. Cap the force to a maximum value so that the force doesn't increase after the slip ratio passes the peak value. If you plot that in a curve, you get the following:

## Torque on the drive wheels

To recap, the traction force is the friction force that the road surface applies on the wheel surface. Obviously, this force will cause a torque on the axis of each drive wheel:

```js
const tractionTorque = traction force * wheel radius
```
