import { Session } from './models/session';
import { UserList } from './models/userlist';
import { CarCollection } from './models/carcollection';
import { Entry } from './models/entry';
import { TrackMediator } from './models/trackmediator';
import { Chat } from './models/chat/chat';
import * as kleur from 'kleur';
import { CarState } from './models/enumerations/carstate';

export class Game {
  private io: SocketIO.Server;
  private looper: any;
  private sessions: Session[];
  private sessioni: number;
  private track: TrackMediator;
  private users: UserList;
  private chat: Chat;
  cars: CarCollection;
  constructor(
    io: SocketIO.Server,
    cars: CarCollection,
    track: TrackMediator,
    sessioni: number = 0
  ) {
    this.io = io;
    this.listen();
    this.update();
    this.sessions = [];
    this.sessioni = sessioni;
    this.users = new UserList();
    this.cars = cars;
    this.track = track;
    this.chat = new Chat();
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
        console.log(data);
        this.users.AddUserById(socket.id);
        this.users.GetUser(socket.id).entry = this.cars.GetCarByEntryNumber(
          data.entryNumber
        );
        this.users.GetUser(socket.id).username = data.username;
        // User can now receive updates
        socket.join('game');
        socket.join(data.entryNumber);
      });

      // Interval for sending the data about his entry, will only be send to him.
      const sendDataInterval = setInterval(() => {
        const user = this.users.GetUser(socket.id);
        if (user) {
          socket.emit('teamUpdate', {
            data: user.entry.ToJson(),
            telemetry: user.entry.car.ToJSON(),
          });
          console.log(
            kleur.bgYellow(
              kleur.black(
                this.json_filesize({
                  data: user.entry.ToJson(),
                  telemetry: user.entry.car.ToJSON(),
                })
              )
            )
          );
          console.timeEnd(kleur.bgBlue('teamUpdate'));
          console.time(kleur.bgBlue('teamUpdate'));

          const test = this.track.findCarsClose(
            this.users.GetUser(socket.id).entry
          );
          console.log(
            test.car.GetDistanceOnLap() - user.entry.car.GetDistanceOnLap()
          );
        }
      }, 250);

      socket.on('sendMessage', (message) => {
        console.log(message);
        this.cars.GetCarByEntryNumber(message.message).getout();
        this.io
          .in('game')
          .emit(
            'updateChat',
            this.chat.addChatMessageWithUser(
              message.message,
              message.visibility,
              this.users.GetUser(socket.id)
            )
          );
      });

      socket.on('carOrder', (message) => {
        if (message.order === 'getout') {
          this.users.GetUser(socket.id).entry.getout();
        }
      });

      socket.on('disconnect', () => {
        console.log('disconnected', socket.id);
        console.log(this.users.GetUser(socket.id));
        clearInterval(sendDataInterval);
        this.users.RemoveUser(socket.id);
      });
    });

    const interval = setInterval(() => {
      console.timeEnd(kleur.bgRed('updateCars'));
      console.time(kleur.bgRed('updateCars'));
      const dataToSend = this.LiveSession().GetCars();
      console.log(kleur.bgGreen(this.json_filesize(dataToSend)));
      this.io.in('game').emit('updateCars', dataToSend);
    }, 500);

    const telemetryInterval = setInterval(() => {
      this.cars.handle((entry: Entry) => {
        // Q1W - some weird kid on the train that decided to suddenly touch my keyboard
        if (entry.state === CarState.ON_TRACK) {
          entry.RunTelemetry();
        }
      });
    }, 250);
  }

  private update(): void {
    this.looper = setInterval(() => {
      if (this.LiveSession() != null) {
        this.LiveSession().handle();
      }
      this.track.handle();
      console.timeEnd(kleur.bgWhite(' '));
      console.time(kleur.bgWhite(' '));
    }, 50);
  }

  private json_filesize(value) {
    // returns object size in bytes
    return JSON.stringify(value).length / 1024 / 1024;
  }
}
