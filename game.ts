import { Session } from './models/session';
import { UserList } from './models/userlist';
import { CarCollection } from './models/carcollection';
import { Entry } from './models/entry';
import { TrackMediator } from './models/trackmediator';
import { Chat } from './models/chat/chat';
import * as kleur from 'kleur';
import { CarState } from './models/enumerations/carstate';
import { TelemetryLog } from './models/singletons/TelemetryLog';
import cpuStat from 'cpu-stat';

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
        // this once, send info that won't change.
        const staticJson = {
          track: this.track.staticJson(),
        };

        socket.emit('staticInformation', staticJson);
      });

      // Interval for sending the data about his entry, will only be send to him.
      const sendDataInterval = setInterval(() => {
        const user = this.users.GetUser(socket.id);
        if (user) {
          socket.emit('teamUpdate', {
            data: user.entry.ToJson(),
            telemetry: user.entry.car.ToJSON(),
          });
          // console.timeEnd(kleur.bgBlue('teamUpdate ' + socket.id));
          // console.time(kleur.bgBlue('teamUpdate' + socket.id));
        }
      }, 1000);

      socket.on('sendMessage', (message) => {
        console.log(message);
        const entry = this.cars.GetCarByEntryNumber(message.message);
        entry?.car?.onTrack
          ? entry.car.pitIn
            ? entry?.getout()
            : entry?.getin()
          : entry?.getout();
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
        switch (message.carOrder) {
          case 'getout':
            this.users.GetUser(socket.id)?.entry?.getout();
            break;
          case 'getin':
            this.users.GetUser(socket.id)?.entry?.getin();
            break;
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
      // console.timeEnd(kleur.bgRed('updateCars'));
      // console.time(kleur.bgRed('updateCars'));
      const dataToSend = this.LiveSession().GetCars();
      // console.log(kleur.bgGreen(this.json_filesize(dataToSend)));
      this.io.in('game').emit('updateCars', dataToSend);
      this.track.getStandings();
      const memUsage = process.memoryUsage();
      console.log({ left: (memUsage.rss / (1024 * 1024)).toFixed(2) });
      //by default returns cpu usage percent for all cores over a period of the next 1000ms
      cpuStat.usagePercent(function (err, percent, seconds) {
        if (err) {
          return console.log(err);
        }

        //the percentage cpu usage over all cores
        console.log(percent);

        //the approximate number of seconds the sample was taken over
        console.log(seconds);
      });
    }, 250);

    const telemetryInterval = setInterval(() => {
      this.cars.handle((entry: Entry) => {
        if (entry.state === CarState.ON_TRACK) {
          entry.RunTelemetry();
        }
      });
      TelemetryLog.getInstance().getUpdate();
    }, 250);
  }

  private update(): void {
    this.looper = setInterval(() => {
      if (this.LiveSession() != null) {
        this.LiveSession().handle();
      }
      this.track.handle();
    }, 4);
  }

  private json_filesize(value) {
    ``;
    // returns object size in bytes
    return JSON.stringify(value).length / 1024 / 1024;
  }
}
