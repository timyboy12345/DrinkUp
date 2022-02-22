<template>
  <div class="w-screen h-screen flex flex-col items-center justify-center">
    <div v-if="!questionStore.isInitialized">Vragen worden geladen...</div>

    <div class="text-center flex flex-col items-center"
         v-if="questionStore.isInitialized && !questionStore.currentQuestion && questionStore.hasQuestionsLeft">
      <div @click="loadNextQuestion"
           class="w-40 h-40 border-2 ring-4 ring-transparent hover:ring-amber-500/20 border-amber-400 hover:bg-amber-200/10 transition duration-200 cursor-pointer rounded-full flex justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-amber-500" fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
        </svg>
      </div>

      <h3 class="opacity-70 mt-8">Druk op de knop om een vraag in te laden</h3>
    </div>

    <div v-if="questionStore.isInitialized && questionStore.currentQuestion" class="flex flex-col items-center">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold font-google mb-2">{{ questionStore.currentQuestion.getTitle() }}</h1>
        <h3 class="opacity-70">{{ questionStore.currentQuestion.getQuestion() }}</h3>
      </div>

      <DrinkUpButton @click="handleQuestionEnd" v-if="questionStore.hasQuestionsLeft">
        Volgende vraag
      </DrinkUpButton>

      <DrinkUpButton @click="handleQuestionEnd" v-else>
        Beïndig spel
      </DrinkUpButton>
    </div>

    <div v-if="questionStore.isInitialized && !questionStore.hasQuestionsLeft && !questionStore.currentQuestion"
         class="flex flex-col items-center">
      <h1 class="text-4xl font-bold font-google">Spel Afgelopen</h1>
      <h3 class="opacity-70 mb-4">Bekijk hieronder de resultaten</h3>

      <ul class="text-center mb-8">
        <li>Totaal aantal vragen: <span class="text-amber-400 font-bold">{{
            questionStore.previousQuestions.length
          }}</span></li>
        <li>Aantal challenges: <span class="text-amber-400 font-bold">{{
            questionStore.previousQuestions.length
          }}</span></li>
      </ul>

      <div class="flex flex-col md:flex-row gap-y-4 text-center md:gap-y-0 gap-x-4">
        <DrinkUpButton to="/">Terug naar het beginscherm</DrinkUpButton>
        <DrinkUpButton @click="resetGame">Nieuw spel starten</DrinkUpButton>
      </div>
    </div>
  </div>
</template>

<script>
import DrinkUpButton from "../components/DrinkUpButton.vue";
import {usePlayerStore} from "../store/players";
import {useQuestionStore} from "../store/question";
import {mapActions} from "pinia";

export default {
  components: {DrinkUpButton},
  methods: {
    ...mapActions(useQuestionStore, ['initQuestions', 'finishQuestion', 'nextQuestion']),
    loadNextQuestion() {
      this.nextQuestion();
    },
    handleQuestionEnd() {
      this.finishQuestion();
    },
    resetGame() {
      this.initQuestions(true);
    }
  },
  created() {
    // QuestionService.generateGame().then((questions) => {
    //   console.log(questions);
    //   this.questions = questions;
    // });
    this.initQuestions();
  },
  setup() {
    const playerStore = usePlayerStore();
    const questionStore = useQuestionStore();

    return {playerStore, questionStore};
  },
}
</script>
