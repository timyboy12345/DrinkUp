import {CardInterface} from "@/models/Board/CardInterface";
import CardTypeEnum from "@/enums/CardTypeEnum";
import _ from "lodash";
import minigames from "@/assets/minigames";

export class MiniGameCard extends CardInterface {
    type = CardTypeEnum.MINI_GAME;

    constructor() {
        super();

        this.minigame = _.sample(minigames);
    }
}
