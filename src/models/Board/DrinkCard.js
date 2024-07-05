import {CardInterface} from "@/models/Board/CardInterface";
import CardTypeEnum from "@/enums/CardTypeEnum";

export class DrinkCard extends CardInterface {
    type = CardTypeEnum.DRINK;

    constructor() {
        super();

        const max = 7;
        const min = 1;
        const minCeil = Math.ceil(min);
        const maxFloored = Math.floor(max);

        this.count = Math.floor(Math.random() * (maxFloored - minCeil) + minCeil);
    }
}
