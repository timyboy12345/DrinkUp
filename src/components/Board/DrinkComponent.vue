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
  methods: {
    doneDrinking() {
      this.$emit('nextPlayer', true);
    }
  },
  mixins: [filterMixin]
}
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full h-full">
    <div class="font-google text-4xl font-bold">
      Drinken :)
    </div>

    <div class="pt-8">
      Neem {{ data.count }} slokken
    </div>

    <DrinkUpButton type="white" class="absolute bottom-8" @click="doneDrinking">
      Klaar
    </DrinkUpButton>
  </div>
</template>

<style scoped>

</style>
