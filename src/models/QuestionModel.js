import QuestionTypeEnum from "../enums/QuestionTypeEnum";

export default class QuestionModel {
    question = null;
    title = null;
    type = QuestionTypeEnum.SINGLE_QUESTION;

    constructor(title, question) {
        this.title = title;
        this.question = question;
    }

    getTitle() {
        return this.title;
    }

    getQuestion() {
        return this.question;
    }
}
