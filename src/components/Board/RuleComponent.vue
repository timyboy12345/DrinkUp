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
    <div class="font-google text-2xl font-bold">
      {{ locale(data.rule.title) }}
    </div>

    <div class="pt-4">
      {{ locale(data.rule.rule) }}
    </div>

    <div class="pt-4" v-if="data.rule.rounds">
      Deze regel is {{ data.rule.rounds }} rondes geldig
    </div>
  </div>
</template>

<style scoped>

</style>
