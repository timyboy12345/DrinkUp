import QuestionTypeEnum from "../enums/QuestionTypeEnum";
import {QuestionInterface} from "./QuestionInterface";

export default class QuestionModel extends QuestionInterface {
    question = null;
    type = QuestionTypeEnum.SINGLE_QUESTION;

    constructor(title, question) {
        super(title);
        this.question = question;
    }

    getQuestion() {
        return this.question;
    }
}
