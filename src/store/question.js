import {defineStore} from "pinia";
import {QuestionService} from "../services";

export const useQuestionStore = defineStore('questions', {
    state: () => ({
        questions: [],
        previousQuestions: [],
        activeQuestion: null,
        initialized: false
    }),
    getters: {
        currentQuestion: (state) => state.activeQuestion,
        getPreviousQuestions: (state) => state.previousQuestions,
        getQuestions: (state) => state.questions,
        hasQuestionsLeft: (state) => state.questions.length >= 1,
        isInitialized: (state) => state.initialized,
    },
    actions: {
        addQuestion(question) {
            this.questions.push(question);
        },
        finishQuestion(){
            this.previousQuestions.push(this.activeQuestion);
            this.activeQuestion = null;
        },
        nextQuestion(playerData) {
            this.activeQuestion = this.questions.pop();

            switch (this.activeQuestion.getQuestionType) {}
            this.activeQuestion.selectQuestion(playerData);
            return this.activeQuestion;
        },
        initQuestions(force = false) {
            if (this.initialized === false || force) {
                this.initialized = true;

                QuestionService.generateGame().then((questions) => {
                    console.log(questions);
                    this.questions = questions;
                });
            }
        }
    }
})
