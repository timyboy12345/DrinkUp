import {CardInterface} from "@/models/Board/CardInterface";
import truths from '../../assets/truths';
import dares from '../../assets/dares';
import _ from "lodash";
import CardTypeEnum from "@/enums/CardTypeEnum";

export class TruthOrDareCard extends CardInterface {
    type = CardTypeEnum.TRUTH_OR_DARE;

    constructor() {
        super();

        this.truth = _.sample(truths);
        this.dare = _.sample(dares);
    }
}
