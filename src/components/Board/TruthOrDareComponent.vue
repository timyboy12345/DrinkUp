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
  data() {
    return {
      choice: null
    }
  },
  methods: {
    choose(choice) {
      this.choice = choice;

      setTimeout(() => {
        this.$emit('readyForNextPlayer', true);
      }, 2000);
    }
  },
  created() {
  },
  mixins: [filterMixin]
}
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full h-full">
    <!--  <div class="font-google text-sm mb-8">Doen/Durven of de Waarheid</div>-->

    <div v-if="!choice">
      <div class="grid grid-cols gap-4">
        <DrinkUpButton @click="choose('dare')" type="white">Doen/Durven</DrinkUpButton>
        <DrinkUpButton @click="choose('truth')" type="white">Waarheid</DrinkUpButton>
      </div>
    </div>

    <div v-else-if="choice === 'dare'">
      {{ locale(data.dare) }}
    </div>

    <div v-else-if="choice === 'truth'">
      {{ locale(data.truth) }}
    </div>
  </div>
</template>

<style scoped>

</style>
