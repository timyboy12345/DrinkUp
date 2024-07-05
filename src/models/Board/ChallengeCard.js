import {CardInterface} from "@/models/Board/CardInterface";
import CardTypeEnum from "@/enums/CardTypeEnum";
import _ from "lodash";
import actions from "@/assets/actions";

export class ChallengeCard extends CardInterface {
    type = CardTypeEnum.CHALLENGE;

    constructor() {
        super();

        this.challenge = _.sample(actions);
    }
}
