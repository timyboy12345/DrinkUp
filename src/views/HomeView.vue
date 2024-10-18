<template>
  <div class="mx-6 md:max-w-2xl lg:max-w-4xl md:mx-auto flex content-center flex-col pb-8">
    <div class="flex-grow mx-4 lg:mx-auto mt-16 flex flex-col items-center text-center">
      <h1 class="text-4xl font-bold font-google">DrinkUp</h1>
      <h3 class="opacity-70 mb-8">Alles wat je ooit hebt willen weten over de gaafste drankspellen.</h3>
    </div>

    <div v-if="drinkingGames" class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <DrinkingGameCard
          v-for="post in drinkingGames"
          :key="post.id"
          :game="post"
      />

      <RouterLink to="/drankspellen"
                  class="py-4 opacity-60 border rounded hover:bg-stone-800 transition-colors duration-100 border-stone-800 flex flex-col items-center justify-center">
        Alle Drankspellen
        <ArrowRightIcon class="w-8 mt-4"/>
      </RouterLink>
    </div>

    <div v-else-if="drinkingGames && drinkingGames.length === 0">
      Geen Drankspellen gevonden
    </div>

    <Loader v-else>Drankspellen worden geladen...</Loader>
  </div>
</template>

<script>
import DrinkingGameCard from "@/components/Card/DrinkingGameCard.vue";
import {ArrowRightIcon} from "@heroicons/vue/24/outline";
import Loader from "@/components/Loader.vue";

export default {
  components: {Loader, DrinkingGameCard, ArrowRightIcon},
  data() {
    return {
      baseUrl: 'https://data.arendz.nl',
      drinkingGames: null,
      posts: null,
    }
  },
  methods: {
    async loadDrinkingGames() {
      const rawResponse = await fetch(`${this.baseUrl}/items/drinking_games/?fields[]=*,images.directus_files_id.*,thumbnail.*`);

      const response = await rawResponse.json();
      this.drinkingGames = response.data;
    },
    async loadPosts() {
      const rawResponse = await fetch(`${this.baseUrl}/items/drinkup_posts/`);

      const response = await rawResponse.json();
      this.posts = response.data;
    }
  },
  async created() {
    this.loadDrinkingGames();
    // this.loadPosts();
  },
  head: {
    title: 'Home',
    meta: [
      {
        name: 'description',
        content: 'Dit is een test',
      },
    ],
  }
}
</script>
