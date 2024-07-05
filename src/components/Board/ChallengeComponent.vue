<script>
import DrinkUpButton from "@/components/DrinkUpButton.vue";
import filterMixin from "@/mixins/filterMixin";
import {usePlayerStore} from "@/store/players";

export default {
  components: {DrinkUpButton},
  props: {
    data: {
      type: Object,
      required: true,
    }
  },
  setup() {
    const playerStore = usePlayerStore();
    return {playerStore}
  },
  computed: {
    desc() {
      return this.locale(this.data.challenge.desc).replace('%player_name%', this.playerStore.getActivePlayer.name)
    }
  },
  created() {
    setTimeout(() => {
      this.$emit('readyForNextPlayer', true);
    }, 2000);
  },
  mixins: [filterMixin]
}
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full h-full">
    <div class="text-6xl mb-4" v-if="data.challenge.emoji">
      {{ data.challenge.emoji }}
    </div>

    <div class="text-2xl font-google font-bold">
      {{ locale(data.challenge.title) }}
    </div>

    <div class="text-sm opacity-90">
      {{ desc }}
    </div>
  </div>
</template>

<style scoped>

</style>
