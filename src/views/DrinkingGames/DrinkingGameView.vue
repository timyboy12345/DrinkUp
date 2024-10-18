<template>
  <div v-if="game" class="mx-6 md:max-w-2xl lg:max-w-4xl md:mx-auto flex content-center flex-col pb-8">
    <div class="flex-grow mt-16 flex flex-col items-center text-center">
      <h1 class="text-4xl font-bold font-google">{{ game.title }}</h1>
      <p class="opacity-70 mb-8">{{ game.description }}</p>
    </div>

    <div class="grid gap-4">
      <div class="prose prose-invert prose-stone lg:prose-lg max-w-none text-justify"
           v-html="markdown.render(game.content)"></div>

      <div v-if="game.rules">
        <h2 class="text-amber-500 font-google text-2xl">
          Regels
        </h2>
        <div class="prose prose-invert prose-stone max-w-none prose-xs" v-html="markdown.render(game.rules)"></div>
      </div>

      <div v-if="game.supplies">
        <h2 class="text-amber-500 font-google text-2xl ">
          Benodigdheden
        </h2>
        <div class="prose prose-invert prose-stone max-w-none prose-xs" v-html="markdown.render(game.supplies)"></div>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <img
            :alt="`Foto van ${game.title}`"
            v-for="img in game.images" class="overflow-hidden rounded"
            :src="`https://data.arendz.nl/assets/${img.directus_files_id.filename_disk}?height=400&width=400&quality=80`"
        >
      </div>

      <div v-if="game.variations">
        <div class="border-amber-500 border-opacity-50 border rounded transition duration-100 p-4">
          <div @click="showVariations = !showVariations"
               class="cursor-pointer flex justify-between items-center hover:text-amber-600 transition duration-100 text-amber-500">
            <div>
              <h2 class="font-google text-2xl">
                Variaties
              </h2>
              <p class="opacity-60 text-xs text-gray-100">Met deze variaties op het basisspel maak je het spel nog
                spannender</p>
            </div>

            <div>
              <ArrowRightIcon :class="{'rotate-90': showVariations}" class="transition duration-100 w-6"/>
            </div>
          </div>
          <div :class="{'max-h-96': showVariations}"
               class="max-h-0 overflow-hidden prose prose-invert prose-stone max-w-none prose-xs transition-all duration-100"
               v-html="markdown.render(game.variations)"></div>
        </div>
      </div>

      <div v-if="game.extra_rules">
        <div class="border-amber-500 border-opacity-50 border rounded transition duration-100 p-4">
          <div @click="showExtraRules = !showExtraRules"
               class="cursor-pointer flex justify-between items-center hover:text-amber-600 transition duration-100 text-amber-500">
            <div>
              <h2 class="font-google text-2xl">
                Extra Regels
              </h2>
              <p class="opacity-60 text-xs text-gray-100">Met deze extra regels maak je het spel extra moeillijk</p>
            </div>

            <div>
              <ArrowRightIcon :class="{'rotate-90': showExtraRules}" class="transition duration-100 w-6"/>
            </div>
          </div>
          <div :class="{'max-h-96': showExtraRules}"
               class="max-h-0 overflow-hidden prose prose-invert prose-stone max-w-none prose-xs transition-all duration-100"
               v-html="markdown.render(game.extra_rules)"></div>
        </div>
      </div>
    </div>
  </div>

  <Loader v-else-if="isLoading">Drankspel wordt geladen</Loader>
  <div v-else class="text-center my-8">
    <h1 class="font-google text-4xl text-amber-500">4xx</h1>
    <div class="opacity-60">Spel kon niet geladen worden, is de URL correct en bestaat het spel?</div>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import MarkdownIt from "markdown-it";
import {RouterLink} from "vue-router";
import {ArrowRightIcon} from "@heroicons/vue/24/outline";

export default {
  components: {RouterLink, Loader, ArrowRightIcon},
  data() {
    return {
      game: null,
      isLoading: true,
      loadError: null,
      markdown: new MarkdownIt(),
      showVariations: false,
      showExtraRules: false,
    }
  },
  methods: {},
  async created() {
    const directusBaseUrl = 'https://data.arendz.nl';
    const params = new URLSearchParams({
      "filter[slug][_eq]": this.$route.params.slug,
      "fields[]": "*,images.directus_files_id.*",
    });
    const rawResponse = await fetch(`${directusBaseUrl}/items/drinking_games?` + params);

    const response = await rawResponse.json().catch((e) => this.loadError = e);
    this.game = response.data[0];
    this.isLoading = false;
  },
  head() {
    return {
      title: this.game ? this.game.title : ''
    }
  }
}
</script>
