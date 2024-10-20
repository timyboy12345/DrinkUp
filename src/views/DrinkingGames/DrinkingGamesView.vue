<template>
  <div class="mx-6 md:max-w-2xl lg:max-w-4xl md:mx-auto flex content-center flex-col gap-8">
    <div class="flex flex-col">
      <h1 class="text-4xl font-bold font-google">Alle Drankspellen</h1>
      <p class="opacity-70 mt-2">Heb je een probleem het juiste drankspel te vinden? Hieronder vindt je alle
        drankspellen die wij hebben gedocumenteerd, ondertussen een hele collectie. Vindt hier het drankspel dat je
        zoekt, of vindt jullie volgende favoriete drankspel.</p>
    </div>

    <div v-if="tags && tags.length > 0" class="flex items-center gap-4 overflow-y-hidden overflow-x-scroll text-nowrap">
      <div class="opacity-60">Of gebruik een van de tags</div>
      <RouterLink :to="`/tags/${tag.slug}`" class="rounded py-2 px-4 bg-amber-500 hover:bg-amber-600 transition duration-100 text-white" v-for="tag in tags">
        {{ tag.title }}
      </RouterLink>
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
      tags: null,
      baseUrl: 'https://data.arendz.nl',
    }
  },
  methods: {},
  async created() {
    const gamesResponse = await fetch(`${this.baseUrl}/items/drinking_games/?fields[]=*,images.directus_files_id.*,thumbnail.*,tags.*.*`);
    const tagsResponse = await fetch(`${this.baseUrl}/items/drinkup_tags`);

    const games = await gamesResponse.json();
    this.drinkingGames = games.data;
    const tags = await tagsResponse.json();
    this.tags = tags.data;
  },
  head: {
    title: "Drankspellen"
  }
}
</script>
