<script>
import DrinkUpButton from "@/components/DrinkUpButton.vue";
import filterMixin from "@/mixins/filterMixin";

export default {
  components: {DrinkUpButton},
  props: {
    data: {
      type: Object,
      required: true,
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
    <div class="flex flex-row items-center mb-8 font-google text-4xl font-bold">
      <span class="text-6xl mr-2">{{ data.surprise.emoji }}</span>
      {{ locale(data.surprise.title) }}
    </div>

    <div class="opacity-80">
      {{ locale(data.surprise.description) }}
    </div>
  </div>
</template>

<style scoped>

</style>
