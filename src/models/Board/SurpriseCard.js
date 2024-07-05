import {CardInterface} from "@/models/Board/CardInterface";
import CardTypeEnum from "@/enums/CardTypeEnum";
import _ from "lodash";
import surprises from "@/assets/surprises";

export class SurpriseCard extends CardInterface {
    type = CardTypeEnum.SURPRISE;

    constructor() {
        super();

        this.surprise = _.sample(surprises);
    }
}
