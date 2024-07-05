<template>
  <div class="text-center flex flex-col items-center mb-8" v-if="!chosen">
    <h1 class="text-4xl font-bold font-google mb-4">
      {{ playerName }}, maak je keuze!
    </h1>

    <div class="flex flex-col md:flex-row gap-y-4 text-center md:gap-y-0 gap-x-4">
      <DrinkUpButton @click="handleChooseTruth">
        <NewspaperIcon class="w-6 h-6 mr-2"/>
        Truth
      </DrinkUpButton>

      <DrinkUpButton @click="handleChooseDare">
        <BoltIcon class="w-6 h-6 mr-2"/>
        Dare
      </DrinkUpButton>
    </div>
  </div>

  <div v-else class="text-center">
    <h1 class="text-4xl font-bold font-google mb-2">{{ locale(questionStore.currentQuestion.getTitle()) }}</h1>
    <h3 class="opacity-70 mb-8" v-if="chosen === 'truth'">{{ locale(questionStore.currentQuestion.getTruth()) }}</h3>
    <h3 class="opacity-70 mb-8" v-else>{{ locale(questionStore.currentQuestion.getDare()) }}</h3>

    <DrinkUpButton @click="handleQuestionEnd" v-if="questionStore.hasQuestionsLeft">
      Volgende vraag
    </DrinkUpButton>

    <DrinkUpButton @click="handleQuestionEnd" v-else>
      Beïndig spel
    </DrinkUpButton>
  </div>
</template>

<script>
import DrinkUpButton from "../DrinkUpButton.vue";
import {usePlayerStore} from "@/store/players";
import {useQuestionStore} from "@/store/question";
import {NewspaperIcon, BoltIcon} from "@heroicons/vue/24/outline"
import filterMixin from "../../mixins/filterMixin";

export default {
  name: 'Question',
  emits: ['finish'],
  data() {
    return {
      chosen: null
    }
  },
  mixins: [filterMixin],
  components: {DrinkUpButton, NewspaperIcon, BoltIcon},
  setup() {
    const playerStore = usePlayerStore();
    const questionStore = useQuestionStore();

    return {playerStore, questionStore};
  },
  methods: {
    handleQuestionEnd() {
      this.$emit('finish');
    },
    handleChooseDare() {
      this.chosen = 'dare';
    },
    handleChooseTruth() {
      this.chosen = 'truth';
    }
  },
  computed: {
    playerName() {
      const playerId = this.questionStore.currentQuestion.getPlayerId();
      return this.playerStore.getPlayerById(playerId).name;
    }
  }
}
</script>
