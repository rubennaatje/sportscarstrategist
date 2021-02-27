import { User } from '../user';

export class Chat {
  private messages: ChatMessage[];

  constructor() {
    this.messages = [];
  }

  public addChatMessage(message: ChatMessage) {
    this.messages.push(message);
  }

  public addChatMessageWithUser(
    message: string,
    visibility: Visibility,
    user: User
  ): ChatMessage {
    let actualmessage = {} as ChatMessage;
    actualmessage.chatSender = {
      chassis: user.entry.car.chassis.name,
      teamname: '',
      user: user.username,
      class: user.entry.category,
      entryNumber: user.entry.entryNumber,
    };
    actualmessage.text = message;
    actualmessage.visibility = visibility;
    actualmessage.time = Date.now();
    this.messages.push(actualmessage);

    return actualmessage;
  }

  public getMessages(user: User): ChatMessage[] {
    return this.messages.filter((message) => {
      switch (message.visibility) {
        case 'all':
          return true;
        case 'class':
          return message.chatSender.class === user.entry.category;
        case 'team':
          return message.chatSender.entryNumber === user.entry.entryNumber;
        case 'entry':
          return message.chatSender.entryNumber === user.entry.entryNumber;
        case 'chassis':
          return message.chatSender.chassis === user.entry.car.chassis.name;
      }
    });
  }
}

export interface ChatMessage {
  time: number;
  text: string;
  chatSender: ChatSender;
  visibility: Visibility;
}

export interface ChatSender {
  entryNumber: number | string;
  teamname: string;
  user: string;
  class: string;
  chassis: string;
}

export type Visibility = 'all' | 'class' | 'chassis' | 'team' | 'entry';
