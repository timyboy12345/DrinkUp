import QuestionModel from "../../models/QuestionModel";

export default {
    generateGame() {
        const questions = [];

        for (let i = 0; i < 5; i++) {
            questions.push(this.generateQuestion());
        }

        return Promise.resolve(questions);
    },
    generateQuestion() {
        return new QuestionModel('Test', 'Test Question ' + Math.round(Math.random() * 10000 + 1));
    }
}
