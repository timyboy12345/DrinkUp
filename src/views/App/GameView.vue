<template>
  <div class="mx-6 lg:mx-auto lg:max-w-4xl h-screen flex flex-col items-center justify-center">
    <div v-if="!questionStore.isInitialized">Vragen worden geladen...</div>

    <div class="text-center flex flex-col items-center"
         v-if="questionStore.isInitialized && !questionStore.currentQuestion && questionStore.hasQuestionsLeft">
      <div @click="loadNextQuestion"
           class="w-40 h-40 border-2 ring-4 ring-transparent hover:ring-amber-500/20 border-amber-400 hover:bg-amber-200/10 transition duration-200 cursor-pointer rounded-full flex justify-center items-center">
<!--        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-amber-500" fill="none" viewBox="0 0 24 24"-->
<!--             stroke="currentColor">-->
<!--          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"-->
<!--                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>-->
<!--        </svg>-->

        <svg class="w-20 h-20 text-amber-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
             viewBox="0 0 24 24">
          <path fill="currentColor"
                d="M15.111 1.43c-.765-.883-1.924-1.43-3.186-1.43-1.159 0-2.237.458-3.002 1.228-2.087-.234-3.923 1.315-3.923 3.299 0 .899.38 1.715.994 2.314.042 3.466 1.751 6.327 2 9.349.141 1.689-.282 4.186-.593 5.713-.284 1.399 2.165 2.097 4.616 2.097 2.455 0 4.913-.7 4.63-2.096-.311-1.528-.733-4.024-.595-5.713.251-3.022 1.961-5.885 2.001-9.353.586-.579.947-1.362.947-2.225 0-1.951-1.834-3.468-3.889-3.183zm-4.295 20.724c-.271-.014-.543-.035-.799-.067-.351-.044-.588-.099-.743-.146.35-1.781.706-4.151.562-5.886-.127-1.532-.561-2.945-.98-4.312-.323-1.058-.796-2.575-.954-3.943.587.097 1.168.053 1.719-.122.249 2.63 1.557 4.923 1.756 7.759.171 2.447-.129 5.123-.561 6.717zm4.026-15.936c-1.058.962.162 2.555.255 3.419.097.896-.49 1.572-1.415 1.572-.9 0-1.43-.721-1.358-1.572.067-.806 1.26-2.346.367-3.41-.888.261-1.888.058-2.588-.604-.358.467-.939.77-1.592.77-1.089 0-1.971-.835-1.971-1.865s.882-1.865 1.971-1.865c.381 0 .738.103 1.04.282.393-.874 1.308-1.487 2.374-1.487 1.19 0 2.192.765 2.488 1.804.322-.254.736-.408 1.189-.408 1.026 0 1.857.788 1.857 1.759.001 1.284-1.401 2.123-2.617 1.605z"/>
        </svg>
      </div>

      <h3 class="opacity-70 mt-8">Druk op de knop om een vraag in te laden</h3>
    </div>

    <div v-if="questionStore.isInitialized && questionStore.currentQuestion" class="flex flex-col items-center">
      <component @finish="handleQuestionEnd" :is="componentName"></component>
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

    <div class="absolute text-white opacity-50 bottom-6 left-6" v-if="questionStore.isInitialized && !questionStore.isFinished">
      Vraag {{ questionStore.getCurrentQuestion }} / {{ questionStore.getTotalQuestions }}
    </div>
  </div>
</template>

<script>
import DrinkUpButton from "../../components/DrinkUpButton.vue";
import {usePlayerStore} from "@/store/players";
import {useQuestionStore} from "@/store/question";
import {mapActions} from "pinia";
import QuestionTypeEnum from "../../enums/QuestionTypeEnum";
import TruthOrDare from '../../components/Questions/TruthOrDare.vue';
import Action from '../../components/Questions/Action.vue';
import Rule from '../../components/Questions/Rule.vue';

export default {
  components: {DrinkUpButton, TruthOrDare, Action, Rule},
  methods: {
    ...mapActions(useQuestionStore, ['initQuestions', 'finishQuestion', 'nextQuestion']),
    loadNextQuestion() {
      this.nextQuestion(this.playerStore.getPlayers);
    },
    handleQuestionEnd() {
      this.finishQuestion();
    },
    resetGame() {
      this.initQuestions(true);
    }
  },
  created() {
    this.initQuestions();
  },
  setup() {
    const playerStore = usePlayerStore();
    const questionStore = useQuestionStore();

    return {playerStore, questionStore};
  },
  computed: {
    componentName() {
      if (!this.questionStore.currentQuestion) {
        return null;
      }

      switch (this.questionStore.currentQuestion.getQuestionType()) {
        case QuestionTypeEnum.TRUTH_OR_DARE:
          return 'truth-or-dare';
        case QuestionTypeEnum.ACTION:
          return 'action';
        case QuestionTypeEnum.RULE:
          return 'rule';
        default:
          return 'question';
      }
    }
  },
  head: {
    title: "Kaartspel"
  }
}
</script>
