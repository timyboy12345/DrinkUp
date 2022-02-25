import QuestionTypeEnum from "../enums/QuestionTypeEnum";

export class QuestionInterface {
    title = null;
    type = QuestionTypeEnum.BASE;
    chosenPlayerId = null;
    chosenPlayerIds = null;

    constructor(title) {
        this.title = title;
    }

    selectQuestion(playerData) {
        // Extend this function in other question types
    }

    getTitle() {
        return this.title;
    }

    setTitle(title) {
        this.title = title;
    }

    getQuestionType() {
        return this.type;
    }

    setPlayerId(id) {
        this.chosenPlayerId = id;
    }

    getPlayerId() {
        return this.chosenPlayerId;
    }

    setPlayerIds(arr) {
        this.chosenPlayerIds = arr;
    }

    getPlayerIds() {
        return this.chosenPlayerIds;
    }
}
