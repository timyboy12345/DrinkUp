<template>
  <div class="mx-8 md:max-w-2xl lg:max-w-4xl md:mx-auto flex content-center flex-col pb-8">
    <div class="flex flex-col">
      <h1 class="text-4xl font-bold font-google">Alle Drankspellen</h1>
      <p class="opacity-70 mb-8 mt-2">Heb je een probleem het juiste drankspel te vinden? Hieronder vindt je alle drankspellen die wij hebben gedocumenteerd, ondertussen een hele collectie. Vindt hier het drankspel dat je zoekt, of vindt jullie volgende favoriete drankspel.</p>
    </div>

    <div v-if="drinkingGames" class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <DrinkingGameCard :game="drinkingGame" v-for="drinkingGame in drinkingGames"/>
    </div>
  </div>
</template>

<script>
import DrinkingGameCard from "@/components/Card/DrinkingGameCard.vue";

export default {
  components: {DrinkingGameCard},
  data() {
    return {
      drinkingGames: null,
    }
  },
  methods: {},
  async created() {
    const directusBaseUrl = 'https://drinkup.arendz.nl';
    const rawResponse = await fetch(`${directusBaseUrl}/items/drinking_games/`);

    const response = await rawResponse.json();
    this.drinkingGames = response.data;
  }
}
</script>
