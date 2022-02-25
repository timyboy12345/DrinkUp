import QuestionTypeEnum from "../enums/QuestionTypeEnum";
import {QuestionInterface} from "./QuestionInterface";
import _ from 'lodash';

export default class TruthOrDareModel extends QuestionInterface {
    type = QuestionTypeEnum.TRUTH_OR_DARE;

    truth = null;
    dare = null;
    chosenPlayerId = null;

    constructor() {
        super('Truth or Dare');

        this.truth = 'This is Truth';
        this.dare = 'Do you Dare';
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
