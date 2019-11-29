import { Car } from "./models/car";

export class Game {
   
    private io: SocketIO.Server;
    private dataSend: {}[];
    private looper: any;
    cars: [Car];

    constructor(io: SocketIO.Server, cars: [Car]) {
        this.io = io;
        this.cars = cars;
        this.listen();
        this.update();
    }

    private listen(): void {
        this.io.on('connection', (socket) => {
            console.log('connection');

            const interval = setInterval(
                (function (scope) {
                    return function () {
                        socket.emit('newMessage', scope.dataSend);
                    };
                })(this),
                20
            );

            socket.on('disconnect', function () {
                clearInterval(interval);
            });
        });
    }

    private update(): void {

        this.looper = setInterval(
            (function (scope) {
                return function () {

                    scope.dataSend = [];
                    for (var c in scope.cars) {
                        const car = scope.cars[c];
                        if (car != null) {
                            car.Throttle(100);
                            scope.dataSend.push({ car2: car.chassis.name, category: car.category, laps: car.GetLaps(13626), lapdistance: car.GetDistanceOnLap(13626), percentage: car.GetPercentage(13626), speed: car.carPhysics.getVelocity('km/h'), car: car, carnumber: car.entryNumber });
                        }
                    }
                };
            })(this),
            20
        );
    }
}