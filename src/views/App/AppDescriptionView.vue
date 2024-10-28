<script setup>
import {useHead} from "@unhead/vue";

useHead({
  title: 'Online Drankspellen'
})
</script>

<template>
  <div class="mx-6 md:max-w-2xl lg:max-w-4xl md:mx-auto flex content-center flex-col gap-8 pb-8">
    <div class="flex-grow mx-4 lg:mx-auto mt-16 flex flex-col items-center text-center">
      <h1 class="text-4xl font-bold font-google">Online Drankspel Spelen</h1>
      <h3 class="opacity-70 mb-8">Snel een drankspel spelen? Speel dan een van onze online drankspellen.</h3>

      <RouterLink
          to="/app/start"
          class="text-amber-500 rounded border border-amber-500 py-2 px-4 hover:bg-amber-500 hover:text-white transition duration-100">
        Start een nieuw spel
      </RouterLink>
    </div>

    <div>
      <h2 class="font-google text-2xl">2 verschillende spellen - onbeperkt vermaak</h2>
      <p class="opacity-80">Met de verschillende spellen op DrankSpellenWiki is er altijd een drankspel dat bij jullie
        past. Naast onze gigantische bibliotheek aan
        <RouterLink class="underline text-amber-500 hover:no-underline" to="/drankspellen">real-life drankspellen</RouterLink>
        hebben we ook enkele online drankspellen ontwikkeld, die je op je telefoon of laptop eenvoudig met de hele groep
        speelt.
      </p>
    </div>

    <div class="grid lg:grid-cols-2 gap-4">
      <div>
        <h2 class="font-google text-2xl">Kaartspel</h2>
        <p class="opacity-60">Het Kaartspel is een makkelijke manier om snel een spel te starten, dat zo kort of lang
          kan zijn als jullie willen. Je voert de naam van iedereen die aanwezig is in en je krijgt een bepaald aantal
          vragen. Dat kan een Never Have I Ever zijn, maar ook een challenge voor een specifiek persoon, een
          groepschallenge en nog veel meer!</p>
        <p class="opacity-60 mt-4">Met het Kaartspel weet je zeker dat de hele groep de hele tijd betrokken blijft.
          Jullie doen allemaal mee van begin tot eind, en aan het eind krijg je zelfs een korte samenvatting van hoe het
          spel ging. Daarna start je makkelijk een nieuw spel en gaat de avond door.</p>
        <RouterLink to="/app/start" class="underline text-amber-500 hover:no-underline text-sm">Start een kaartspel</RouterLink>
      </div>

      <div>
        <h2 class="font-google text-2xl">Bordspel</h2>
        <p class="opacity-60">Ons bordspel is de uitgebreide variant van het kaartspel. Je dobbelt en zet een bepaald
          aantal stappen, tot je de finish haalt. Ondertussen voert iedereen challenges uit, zodat je uiteindelijk als
          winnaar gekroond kan worden. Het bordspel heeft geen vaste tijd, maar duurt (net zoals een normaal bordspel)
          tussen de 20 en 40 minuten.</p>
        <p class="opacity-60 mt-4">Het bordspel duurt dus iets langer, maar zorgt de hele tijd voor gegarandeerd
          vermaak. En met de Never Have I Evers, challenges en andere vakjes tussendoor wordt je de hele tijd bezig
          gehouden.</p>
        <RouterLink to="/app/start" class="underline text-amber-500 hover:no-underline text-sm">Start een bordspel</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
