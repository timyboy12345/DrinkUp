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
    <div>
      {{ locale(data.rule.rule) }}
    </div>
  </div>
</template>

<style scoped>

</style>
