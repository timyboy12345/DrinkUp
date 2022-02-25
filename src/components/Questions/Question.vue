<template>
  <div class="text-center mb-8">
    <h1>NOT SET</h1>

    <DrinkUpButton class="mt-8" @click="handleQuestionEnd">
      Volgende...
    </DrinkUpButton>
  </div>
</template>

<script>
import DrinkUpButton from "../DrinkUpButton.vue";
import {usePlayerStore} from "../../store/players";
import {useQuestionStore} from "../../store/question";

export default {
  name: 'Question',
  components: {DrinkUpButton},
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
}
</script>
