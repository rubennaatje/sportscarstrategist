import { Session } from "./models/session";
import { Track } from "./models/track";
import { UserList } from "./models/userlist";
import { CarCollection } from "./models/carcollection";
import { Entry } from "./models/entry";

export class Game {

    private io: SocketIO.Server;
    private dataSend: {}[];
    private looper: any;
    private sessions: Session[];
    private sessioni: number;
    private track: Track;
    private users: UserList;
    cars: CarCollection;
    constructor(io: SocketIO.Server, cars: CarCollection,sessioni: number = 0) {
        this.io = io;
        this.listen();
        this.update();
        this.sessions = [];
        this.sessioni = sessioni;
        this.users = new UserList();
        this.cars = cars;
    }

    public AddSession(session: Session) {
        this.sessions.push(session);
    }

    private LiveSession(): Session {
        return this.sessions[this.sessioni];
    }

    private listen(): void {
        this.io.on('connection', (socket: SocketIO.Socket) => {
            console.log('connection', socket.id);
            
            this.io.to(`${socket.id}`).emit('entryAsk', socket.id);
            
            socket.on('entry', (data) => {
                this.users.AddUserById(socket.id);
                this.users.GetUser(socket.id).entry = this.cars.GetCarByEntryNumber(data.entryNumber);
                this.users.GetUser(socket.id).username = data.username;
                // User can now receive updates
                socket.join('game');
                socket.join(data.entryNumber);
            });

            // Interval for sending the data about his entry, will only be send to him. 
            const interval2 = setInterval(()=> {
                if(this.users.GetUser(socket.id) !== null)
                    socket.emit('teamUpdate', {data: this.users.GetUser(socket.id).entry, telemetry: this.users.GetUser(socket.id).entry.telemetry.speed});
                    console.log({data: this.users.GetUser(socket.id).entry, telemetry: this.users.GetUser(socket.id).entry.telemetry.speed});
            }, 500)

            socket.on('disconnect', () => {
                console.log('disconnected', socket.id);
                console.log(this.users.GetUser(socket.id));
                clearInterval(interval2);
                this.users.RemoveUser(socket.id);
            });

        });
        

        const interval = setInterval(
            (function (scope) {
                return function () {
                    scope.io.in('game').emit('updateCars', scope.LiveSession().GetCars());
                };
            })(this),
            500
        );
        
        const telemetryInterval = setInterval(() => {
            this.cars.handle((entry: Entry) => {
                // Q1W - some weird kid on the train that decided to suddenly touch my keyboard
                entry.RunTelemetry();
            });
        }, 1000);
       
    }


    private update(): void {
        this.looper = setInterval(
            (function (scope) {
                return function () {
                    if (scope.LiveSession() != null) {
                        scope.LiveSession().handle();
                    }
                };
            })(this),
            20
        );
    }
}