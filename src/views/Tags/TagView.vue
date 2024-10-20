<template>
  <div class="mx-6 md:max-w-2xl lg:max-w-4xl md:mx-auto flex content-center flex-col gap-8 pb-8">
    <div v-if="tag" class="flex-grow flex flex-col items-center text-center">
      <h1 class="text-4xl font-bold font-google">{{ tag.title }}</h1>
      <p class="opacity-70 mb-8" v-if="tag.description">{{ tag.description }}</p>
    </div>

    <div class="grid gap-4" v-if="tag">
      <div class="prose prose-invert prose-stone lg:prose-lg max-w-none text-justify"
           v-if="tag.content" v-html="markdown.render(tag.content)"></div>
    </div>

    <Loader v-else-if="isLoading">Tag wordt geladen</Loader>
    <div v-else class="text-center my-8">
      <h1 class="font-google text-4xl text-amber-500">4xx</h1>
      <div class="opacity-60">Tag kon niet geladen worden, is de URL correct en bestaat het spel?</div>
    </div>

    <div v-if="games && games.length > 0">
      <h2 class="font-google mb-2 text-2xl text-amber-500">Games met deze tag</h2>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <DrinkingGameCard
            v-for="post in games"
            :key="post.id"
            :game="post"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import MarkdownIt from "markdown-it";
import {RouterLink} from "vue-router";
import {ArrowRightIcon} from "@heroicons/vue/24/outline";
import DrinkingGameCard from "@/components/Card/DrinkingGameCard.vue";

export default {
  components: {DrinkingGameCard, RouterLink, Loader, ArrowRightIcon},
  data() {
    return {
      tag: null,
      games: null,
      isLoading: true,
      loadError: null,
      markdown: new MarkdownIt(),
    }
  },
  methods: {},
  async created() {
    const directusBaseUrl = 'https://data.arendz.nl';
    const tagParams = new URLSearchParams({
      "filter[slug][_eq]": this.$route.params.slug,
      "fields[]": "*",
    });

    const tagResponse = await fetch(`${directusBaseUrl}/items/drinkup_tags?` + tagParams);
    const tag = await tagResponse.json().catch((e) => this.loadError = e);

    this.tag = tag.data[0];
    this.isLoading = false;

    const gamesParams = new URLSearchParams({
      "filter[tags][drinkup_tags_id][id][_eq]": this.tag.id,
      "fields[]=": "*,images.directus_files_id.*,thumbnail.*,tags.*.*"
    });

    const gamesResponse = await fetch(`${directusBaseUrl}/items/drinking_games?` + gamesParams);
    const games = await gamesResponse.json().catch((e) => this.loadError = e);
    this.games = games.data;
  },
  head() {
    return {
      title: this.tag ? this.tag.title : '',
      meta: [
        {
          name: 'description',
          content: this.tag ? this.tag.content : '',
        },
      ],
    }
  }
}
</script>
