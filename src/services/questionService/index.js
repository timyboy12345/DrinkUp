import {ActionModel} from "../../models/ActionModel";
import QuestionTypeEnum from "../../enums/QuestionTypeEnum";
import TruthOrDareModel from "../../models/TruthOrDareModel";
import _ from 'lodash';
import {RuleModel} from "../../models/RuleModel";

export default {
    /**
     * Generate a random game
     * @param amountOfQuestions
     * @return {Promise<[]>}
     */
    generateGame(amountOfQuestions = 10) {
        const questions = [];

        for (let i = 0; i < amountOfQuestions; i++) {
            questions.push(this.generateRandomQuestionType());
        }

        return Promise.resolve(questions);
    },
    generateRandomQuestionType(options = {
        action: 70,
        truth_or_dare: 20,
        rule: 10
    }) {
        const questionTypes = [];

        for (let i = 1; i <= 100; i++) {
            if (options.action >= i) {
                questionTypes.push(QuestionTypeEnum.ACTION);
            }

            if (options.truth_or_dare >= i) {
                questionTypes.push(QuestionTypeEnum.TRUTH_OR_DARE);
            }

            if (options.rule >= i) {
                questionTypes.push(QuestionTypeEnum.RULE);
            }
        }

        switch (_.sample(questionTypes)) {
            case QuestionTypeEnum.ACTION:
                return new ActionModel();
            case QuestionTypeEnum.TRUTH_OR_DARE:
                return new TruthOrDareModel();
            case QuestionTypeEnum.RULE:
                return new RuleModel();
            default:
                return new RuleModel();
        }
    }
}
