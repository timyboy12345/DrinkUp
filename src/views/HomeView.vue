<template>
  <div class="mx-6 md:max-w-2xl lg:max-w-4xl md:mx-auto flex content-center flex-col gap-8 pb-8">
    <div class="flex-grow mx-4 lg:mx-auto mt-16 flex flex-col items-center text-center">
      <h1 class="text-4xl font-bold font-google">DrankSpellenWiki</h1>
      <h3 class="opacity-70 mb-8">Alles wat je ooit hebt willen weten over de gaafste drankspellen.</h3>
    </div>

    <div v-if="drinkingGames" class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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

    <div class="text-gray-300">
      DrankSpellenWiki helpt je met het vinden van het perfecte drankspel op het juiste moment. Gebruik onze filters om te zoeken
      op specifieke spellen, of struin door de tientallen spellen die we hebben gedocumenteerd om te kijken welk spel
      jullie volgende keer gaan spelen.
    </div>

    <div v-if="tags && tags.length > 0" class="flex gap-4 overflow-y-hidden overflow-x-scroll text-nowrap">
      <RouterLink :to="`/tags/${tag.slug}`"
                  class="rounded py-2 px-4 bg-amber-500 hover:bg-amber-600 transition duration-100 text-white"
                  v-for="tag in tags">
        {{ tag.title }}
      </RouterLink>
    </div>

    <div class="text-gray-300">
      Ook helemaal klaar met dat eeuwenoude
      <RouterLink to="/drankspellen/juffen" class="underline text-amber-500 hover:no-underline">Juffen</RouterLink> of
      <RouterLink to="/drankspellen/beerpong" class="underline text-amber-500 hover:no-underline">Beerpong</RouterLink>? Op DrankSpellenWiki vindt je talloze nieuwe drankspellen om jullie avond extra gezellig te maken. Van simpele spellen als
      <RouterLink to="/drankspellen/fuck-the-dealer" class="underline text-amber-500 hover:no-underline">Fuck the Dealer</RouterLink> tot complexere drankspellen als
      <RouterLink to="/drankspellen/paardenrace" class="underline text-amber-500 hover:no-underline">Paardenrace</RouterLink>. Je vindt
      <RouterLink to="/drankspellen" class="underline text-amber-500 hover:no-underline">alle drankspellen</RouterLink>
      in een duidelijk overzicht.
    </div>

    <div class="flex flex-col text-center">
      <h2 class="font-google text-amber-500 text-xl">Online Drankspellen Spelen</h2>
      <div class="text-gray-300">Via DrankSpellenWiki kan je niet alleen leren over verschillende offline drankspellen, je kan
        via onze site ook
        meerdere online drankspellen spelen. Van simpele kaartspellen tot complexere bordspellen, allemaal op dit
        scherm.
      </div>
      <RouterLink to="/app"
                  class="mt-2 mx-auto rounded py-2 px-4 bg-amber-500 hover:bg-amber-600 transition duration-100 text-white">
        Online Drankspel Spelen
      </RouterLink>
    </div>
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
      tags: null,
    }
  },
  methods: {
    async loadDrinkingGames() {
      const rawResponse = await fetch(`${this.baseUrl}/items/drinking_games/?fields[]=*,images.directus_files_id.*,thumbnail.*,tags.*.*&limit=3`);

      const response = await rawResponse.json();
      this.drinkingGames = response.data;
    },
    async loadTags() {
      const rawResponse = await fetch(`${this.baseUrl}/items/drinkup_tags/`);

      const response = await rawResponse.json();
      this.tags = response.data;
    }
  },
  async created() {
    this.loadDrinkingGames();
    this.loadTags();
  },
  head: {
    title: 'Home',
    meta: [
      {
        name: 'description',
        content: 'Met DrankSpellenWiki heb je nooit meer een saaie avond! Lees alle regels van jouw favoriete drankspellen, of speel een van onze drankspellen met je vrienden.',
      },
    ],
  }
}
</script>
