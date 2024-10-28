<template>
  <div class="mx-6 md:max-w-2xl lg:max-w-4xl md:mx-auto flex content-center flex-col pb-8 gap-8">
    <div class="flex flex-col">
      <h1 class="text-4xl font-bold font-google">Alle Drankspellen</h1>
      <p class="opacity-70 mt-2">Heb je een probleem het juiste drankspel te vinden? Hieronder vindt je alle
        drankspellen die wij hebben gedocumenteerd, ondertussen een hele collectie. Vindt hier het drankspel dat je
        zoekt, of vindt jullie volgende favoriete drankspel.</p>
    </div>

    <div v-if="!isFetchingTags"
         class="text-xs flex items-center gap-4 overflow-y-hidden overflow-x-scroll text-nowrap">
      <div class="opacity-60">Of gebruik een van de tags</div>
      <RouterLink :to="`/tags/${tag.slug}`"
                  class="rounded py-1 px-2 bg-amber-500 hover:bg-amber-600 transition duration-100 text-white"
                  v-for="tag in tags.data">
        {{ tag.title }}
      </RouterLink>
    </div>

    <div v-if="!isFetchingGames" class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <DrinkingGameCard :game="drinkingGame" v-for="drinkingGame in drinkingGames.data"/>
    </div>

    <Loader v-else>Drankspellen worden geladen</Loader>
  </div>
</template>

<script lang="ts" setup>
import DrinkingGameCard from "@/components/Card/DrinkingGameCard.vue";
import {useFetch} from "@vueuse/core";
import {useHead} from "@unhead/vue";
import Loader from "@/components/Loader.vue";

const baseUrl = 'https://data.arendz.nl';

const {
  isFetching: isFetchingGames,
  error: gamesError,
  data: drinkingGames
} = useFetch(`${baseUrl}/items/drinking_games/?fields[]=*,images.directus_files_id.*,thumbnail.*,tags.*.*`).get().json()

const {
  isFetching: isFetchingTags,
  error: tagsError,
  data: tags
} = useFetch(`${baseUrl}/items/drinkup_tags`).get().json()

useHead({
  title: 'Drankspellen',
})
</script>
