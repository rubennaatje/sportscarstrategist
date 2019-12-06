import { Entry } from "./entry";

export class User {
    id: string;
    username: string;
    entry: Entry;

    constructor(id: string){
        this.id = id;
    }
}