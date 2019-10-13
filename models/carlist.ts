import { Car } from "./car";
import { CarLink } from "./carlink";

export class CarList {
    first: CarLink;
    last: CarLink;
    length: number;

    constructor(){
        this.length = 0;
    }

    AddCar(car: Car){
        var link = new CarLink(car);
        if(this.first == null){
            this.first = link;
            this.last = link;
        } else {
            this.last.nextLink = link;
            link.previousLink = this.last;
            this.last = link;
        }
        this.length++;
    }

    SwapLinkWithNext(link: CarLink){
        const next = link.nextLink;
        const after = next.nextLink;
        const before = link.previousLink;

        if(this.first = link) this.first = next;
        else before.nextLink = next;

        if(this.last == next) this.last = link;
        else  after.previousLink = link;

        next.nextLink = link;
        next.previousLink = before;
        link.nextLink = after;
        link.previousLink = next;
        
        return next;
    }   
}