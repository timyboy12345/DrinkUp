<script>
export default {
  name: "DrinkingGameCard",
  props: ['game']
}
</script>

<template>
  <RouterLink
      class="overflow-hidden hover:bg-stone-800 transition-colors duration-100 rounded border border-stone-800 flex flex-col"
      :to="'/drankspellen/' + game.slug"
  >
    <img
        :alt="`Foto van ${game.title}`"
        class="h-40 object-cover"
        v-if="game.thumbnail"
        :src="`https://data.arendz.nl/assets/${game.thumbnail.filename_disk}?height=400&width=400&quality=80`"
    >

    <div class="p-4">
      <h3 class="font-google">{{ game.title }}</h3>
      <p class="text-sm opacity-50">{{ game.description }}</p>
    </div>
  </RouterLink>
</template>

<style scoped>

</style>
