import QuestionTypeEnum from "../enums/QuestionTypeEnum";
import {QuestionInterface} from "./QuestionInterface";
import _ from 'lodash';

import truths from '../assets/truths';
import dares from '../assets/dares';

export default class TruthOrDareModel extends QuestionInterface {
    type = QuestionTypeEnum.TRUTH_OR_DARE;

    truth = null;
    dare = null;
    chosenPlayerId = null;

    constructor() {
        super('Truth or Dare');

        this.truth = _.sample(truths);
        this.dare = _.sample(dares);
    }

    selectQuestion(playerData) {
        this.setPlayerId(_.sample(playerData));
    }

    getTruth() {
        return this.truth;
    }

    getDare() {
        return this.dare;
    }
}
