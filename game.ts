import { Car } from "./models/car";
import { Session } from "./models/session";

export class Game {

    private io: SocketIO.Server;
    private dataSend: {}[];
    private looper: any;
    private sessions: Session[];
    private sessioni: number;


    constructor(io: SocketIO.Server, sessioni: number = 0) {
        this.io = io;
        this.listen();
        this.update();
        this.sessions = [];
        this.sessioni = sessioni;
    }

    public AddSession(session: Session){
        this.sessions.push(session);
    }

    private LiveSession(): Session {
        return this.sessions[this.sessioni];
    }

    private listen(): void {
        this.io.on('connection', (socket) => {
            console.log('connection');

            const interval = setInterval(
                (function (scope) {
                    return function () {
                        socket.emit('updateCars', scope.dataSend);
                    };
                })(this),
                500
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
                    if(scope.LiveSession() != null){
                        scope.LiveSession().handle();
                        scope.dataSend = scope.LiveSession().GetCars();
                    }
                };
            })(this),
            20
        );
    }
}