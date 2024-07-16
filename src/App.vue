<script setup>
import {RouterLink, RouterView} from 'vue-router'

function showHeader() {
  return this.$route.name !== 'home' && !this.$route.name.includes('app')
}
</script>

<template>
  <header v-if="showHeader" class="w-full py-4 px-8">
    <div class="wrapper">
      <nav class="break-normal font-google flex lg:flex-row gap-x-6">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/drankspellen">Drankspellen</RouterLink>
        <!--        <RouterLink to="/posts">Artikelen</RouterLink>-->
        <RouterLink
            class="bg-amber-500 hover:bg-amber-600 transition-colors duration-100 ml-auto py-1 px-4 rounded text-black"
            to="/app">Bordspel spelen
        </RouterLink>
      </nav>
    </div>
  </header>

  <RouterView/>
</template>
