<script>
import DrinkUpButton from "@/components/DrinkUpButton.vue";
import filterMixin from "@/mixins/filterMixin";

export default {
  components: {DrinkUpButton},
  created() {
    setTimeout(() => {
      this.isDone = true;
    }, 1000 * 10)
  },
  data() {
    return {
      isDone: false,
    }
  },
  methods: {
    done() {
      this.$emit('nextPlayer', true);
    }
  },
  mixins: [filterMixin],
  props: {
    data: {
      type: Object,
      required: true,
    }
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full h-full">
    <div class="text-2xl font-google font-bold">
      <span class="text-lg">{{ data.minigame.emoji }}</span>
      {{ locale(data.minigame.title) }}
      <span class="text-lg">{{ data.minigame.emoji }}</span>
    </div>

    <div class="text-sm opacity-90">
      {{ locale(data.minigame.description) }}
    </div>

    <DrinkUpButton @click="done" v-show="isDone" type="white" class="absolute bottom-8">
      Minigame Afvinken
    </DrinkUpButton>
  </div>
</template>

<style scoped>

</style>
