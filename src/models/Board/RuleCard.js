import {CardInterface} from "@/models/Board/CardInterface";
import CardTypeEnum from "@/enums/CardTypeEnum";
import _ from "lodash";
import rules from "@/assets/rules";

export class RuleCard extends CardInterface {
    type = CardTypeEnum.RULE;

    constructor() {
        super();

        this.rule = _.sample(rules);
    }
}
