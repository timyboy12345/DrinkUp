<template>
  <div class="flex flex-row pb-8">
    <div class="lg:max-w-4xl xl:max-w-6xl flex-grow mx-4 lg:mx-auto mt-16 flex flex-col items-center text-center">
      <h1 class="text-4xl font-bold font-google">DrinkUp</h1>
      <h3 class="opacity-70 mb-8">Maakt je avond een stuk gezelliger!</h3>

      <p class="mb-8 opacity-80">
        Voer hieronder de namen van je vrienden in en start het spel!
      </p>

      <div class="text-left flex flex-col mb-8">
        <label for="name" class="mb-1 text-md opacity-50">Naam</label>
        <input class="rounded py-2 px-4 text-black" id="name" placeholder="Naam invoeren" v-model="playerName"
               type="text" @keyup.enter="handleEnterPress">
        <p class="text-xs mt-1 opacity-40">Voer een naam in en druk op enter.</p>

        <ul class="mt-4 flex flex-col gap-y-2" v-if="playerStore.getPlayers.length > 0">
          <li v-for="player of playerStore.getPlayers">
            <div class="flex flex-row">
              <XIcon @click="handleRemovePlayer(player)" class="transition duration-100 p-1 w-6 h-6 rounded bg-amber-600 mr-2 cursor-pointer opacity-50 hover:opacity-100"></XIcon>
              {{ player }}
            </div>
          </li>
        </ul>
      </div>

      <DrinkUpButton to="/game" :disabled="playerStore.getPlayers.length === 0">
        <user-icon class="w-6 h-6 mr-2"/>
        Doorgaan met {{ playerStore.getPlayers.length }} spelers
      </DrinkUpButton>
    </div>
  </div>
</template>

<script>
import DrinkUpButton from "../components/DrinkUpButton.vue";
import {XIcon, UserIcon} from "@heroicons/vue/outline"
import {usePlayerStore} from "../store/players";
import {mapActions} from "pinia";

export default {
  components: {DrinkUpButton, UserIcon, XIcon},
  data() {
    return {
      playerName: ''
    }
  },
  setup() {
    const playerStore = usePlayerStore();

    return {playerStore};
  },
  methods: {
    ...mapActions(usePlayerStore, ['addPlayer', 'removePlayer']),
    handleEnterPress() {
      this.addPlayer(this.playerName);
      this.playerName = '';
    },
    handleRemovePlayer(playerName) {
      this.removePlayer(playerName);
    }
  }
}
</script>
