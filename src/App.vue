<script setup>
import {RouterLink, RouterView, useRoute} from 'vue-router'
import {useHead} from "@unhead/vue";

const route = useRoute();

function showHeader() {
  return route && route.name && !route.name.includes('app/');
  // return routeName && routeName.value && !routeName.value.includes('app');
}

// watch(() => route.name, () => {
// console.log(route.name);
// routeName.value = route.name;
// })

// all the goodies
useHead({
  // Titles
  title: 'DrankSpellenWiki',
  titleTemplate: '%s %separator %siteName',
  templateParams: {separator: '|', siteName: 'DrankSpellenWiki'},
})
</script>

<template>
  <header v-if="showHeader()" class="w-full py-4 px-4 md:px-6 lg:px-8">
    <div class="wrapper">
      <nav class="font-google flex gap-x-2 lg:gap-x-6">
        <RouterLink
            class="rounded py-1 bg-opacity-10 transition duration-100 px-2 lg:px-4 hover:bg-gray-50 hover:bg-opacity-10"
            activeClass="bg-gray-100" to="/">Home
        </RouterLink>
        <RouterLink
            class="rounded py-1 bg-opacity-10 transition duration-100 px-2 lg:px-4 hover:bg-gray-50 hover:bg-opacity-10"
            activeClass="bg-gray-100" to="/drankspellen">Drankspellen
        </RouterLink>
        <!--        <RouterLink class="rounded py-1 bg-opacity-10 transition duration-100 px-2 lg:px-4 hover:bg-gray-50 hover:bg-opacity-10" activeClass="bg-gray-100" to="/artikelen">Artikelen</RouterLink>-->

        <RouterLink
            activeClass="bg-gray-10"
            class="hidden sm:block bg-amber-500 hover:bg-amber-600 transition-colors duration-100 ml-auto py-1 px-2 lg:px-4 rounded text-black"
            to="/app">
          Online Drankspel Spelen
        </RouterLink>
      </nav>
    </div>
  </header>

  <RouterView/>
</template>
