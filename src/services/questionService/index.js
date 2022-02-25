import QuestionModel from "../../models/QuestionModel";
import {ActionModel} from "../../models/ActionModel";
import QuestionTypeEnum from "../../enums/QuestionTypeEnum";
import TruthOrDareModel from "../../models/TruthOrDareModel";
import _ from 'lodash';

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
    generateRandomQuestionType() {
        const questionTypes = [QuestionTypeEnum.ACTION, QuestionTypeEnum.TRUTH_OR_DARE, QuestionTypeEnum.SINGLE_QUESTION];
        switch (_.sample(questionTypes)) {
            case QuestionTypeEnum.ACTION:
                return new ActionModel();
            case QuestionTypeEnum.TRUTH_OR_DARE:
                return new TruthOrDareModel()
            case QuestionTypeEnum.SINGLE_QUESTION:
            default:
                return new QuestionModel('Test', 'Test Question ' + Math.round(Math.random() * 10000 + 1));
        }
    }
}
