<template>
  <div class="text-center flex flex-col items-center">
    <h1 class="text-6xl mb-4" v-if="questionStore.currentQuestion.getEmoji()">
      {{ questionStore.currentQuestion.getEmoji() }}
    </h1>
    <h1 class="text-4xl font-bold font-google mb-2">{{ locale(questionStore.currentQuestion.getTitle()) }}</h1>
    <h3 class="opacity-70 mb-8">{{ action }}</h3>

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
import filterMixin from "../../mixins/filterMixin";

export default {
  name: 'Question',
  emits: ['finish'],
  components: {DrinkUpButton},
  mixins: [filterMixin],
  setup() {
    const playerStore = usePlayerStore();
    const questionStore = useQuestionStore();

    return {playerStore, questionStore};
  },
  methods: {
    handleQuestionEnd() {
      this.$emit('finish');
    }
  },
  computed: {
    playerName() {
      const playerId = this.questionStore.currentQuestion.getPlayerId();
      return this.playerStore.getPlayerById(playerId).name;
    },
    action() {
      let action = this.questionStore.currentQuestion.getAction();
      action = this.locale(action);
      action = action.replace('%player_name%', this.playerName);
      return action;
    }
  }
}
</script>
