import {QuestionInterface} from "./QuestionInterface";
import QuestionTypeEnum from "../enums/QuestionTypeEnum";
import _ from 'lodash';
import rules from '../assets/rules';

export class RuleModel extends QuestionInterface {
    type = QuestionTypeEnum.RULE;

    rule = null;
    duration = null;

    constructor() {
        const rule = _.sample(rules);

        super(rule.title);

        this.setRule(rule.rule);
        this.setDuration(rule.rounds);
    }

    setRule(rule) {
        this.rule = rule;
    }

    getRule() {
        return this.rule;
    }

    setDuration(duration) {
        this.duration = duration;
    }

    getDuration() {
        return this.duration;
    }
}
