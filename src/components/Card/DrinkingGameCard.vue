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
    <img :src="'https://drinkup.arendz.nl/assets/' + game.thumbnail">

    <div class="p-4">
      <h3 class="font-google">{{ game.title }}</h3>
      <p class="text-sm opacity-50">{{ game.description }}</p>
    </div>
  </RouterLink>
</template>

<style scoped>

</style>
