import {CardInterface} from "@/models/Board/CardInterface";
import CardTypeEnum from "@/enums/CardTypeEnum";
import _ from "lodash";
import rules from "@/assets/rules";

export class SurpriseCard extends CardInterface {
    type = CardTypeEnum.SURPRISE;

    constructor() {
        super();

        // TODO: Implement Surprises
        this.rule = _.sample(rules);
    }
}
