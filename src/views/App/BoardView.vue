<template>
  <div v-if="playerStore.players.length > 0" class="absolute flex flex-col justify-center items-center h-full w-full">
    <div :key="x" class="flex flex-row" v-for="x in rows">
      <div :key="y" class="flex flex-col" v-for="y in columns">
        <div :class="[rowColumnType(x, y).background]"
             class="flex items-center justify-center relative m-1 w-14 h-14 rounded shadow">
          <div class="absolute left-1 top-1 text-xs opacity-60" v-if="gameStore.getDevelopment">{{ x }} / {{ y }}</div>

          <div class="absolute opacity-70 font-bold">{{ tileToNum(x, y) }}</div>

          <div class="grid grid-cols-2 absolute top-2 left-2 gap-2">
            <div class="rounded w-4 h-4" :class="[getPlayerBG(p.color)]"
                 v-for="p in playerStore.getPlayersForTile(tileToNum(x, y))">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute left-8 top-8">
      <div class="items-center font-google text-3xl font-bold">
        <TransitionGroup name="slide-up">
          <div v-show="p.active" class="absolute flex flex-row items-center" :key="p.name"
               v-for="p in playerStore.players">
            <div :class="[getPlayerBG(p.color)]"
                 class="transition duration-100 rounded w-8 h-8 mr-4"></div>
            {{ p.name }}
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>

  <div class="flex flex-col h-full w-full justify-center items-center gap-y-4"
       v-if="playerStore.players.length === 0">
    <div class="text-4xl font-google font-bold">
      Geen spelers gevonden
    </div>

    <div class="opacity-60">Je moet terug naar de homepagina om een spel te starten</div>

    <DrinkUpButton type="white" to="/">
      Terug naar de homepagina
    </DrinkUpButton>
  </div>

  <div v-if="playerStore.players.length > 0" class="absolute flex flex-col justify-center items-center h-full w-full">
    <div class="flex gap-x-8 items-center" v-if="step === 'roll'">
      <div class="flex flex-row items-center">
        <div :class="[getPlayerBG(playerStore.getActivePlayer.color)]" class="rounded w-8 h-8"></div>
        <div class="font-google text-md ml-2">{{ playerStore.getActivePlayer.name }}</div>
      </div>

      <DrinkUpButton @click="rollDice">
        Rollen
      </DrinkUpButton>
    </div>

    <div v-if="step === 'rolling'" class="text-2xl font-google">
      {{ diceStep }}
    </div>

    <div v-if="step === 'rolled'" class="text-2xl font-google">
      {{ rolled ?? 'X' }} Gerold
    </div>
  </div>

  <div class="absolute left-4 bottom-4 text-xs opacity-40 hover:opacity-100 cursor-pointer transition duration-100"
       @click="cancelGame">
    Stop spel
  </div>

  <Transition name="fade">
    <div class="absolute flex flex-col items-center justify-center z-10 left-0 top-0 w-full h-full"
         v-if="step === 'modal'">
      <div class="absolute w-full h-full bg-black bg-opacity-70"></div>

      <Transition name="rotate" appear>
        <div
            :class="[tileType(playerStore.getActivePlayer.position).border, tileType(playerStore.getActivePlayer.position).background]"
            class="text-center relative flex flex-col items-center p-4 z-10 border-4 bg-white rounded-lg w-80 h-2/3">

          <component @next-player="nextPlayer" @ready-for-next-player="readyForNextPlayer = true" :data="modalData"
                     :is="cardComponentName"/>

          <Transition name="fade">
            <DrinkUpButton v-show="readyForNextPlayer" type="white" class="absolute bottom-8" @click="nextPlayer">
              Volgende Speler
            </DrinkUpButton>
          </Transition>
        </div>
      </Transition>
    </div>
  </Transition>

  <div class="text-right flex flex-col justify-between items-end absolute right-4 h-full py-4">
    <div class="flex flex-col items-end">
      <div :class="{'opacity-50': !p.active}" class="transition duration-100 flex flex-row items-center text-md"
           v-for="p in playerStore.players">
        {{ p.name }}
        <div :class="getPlayerBG(p.color)" class="ml-2 w-4 h-4 rounded"></div>
      </div>
    </div>

    <div class="flex flex-col items-end opacity-50 hover:opacity-100 transition duration-100">
      <div class="flex flex-row items-center text-md">
        Minigame
        <div class="ml-2 w-4 h-4 rounded bg-orange-500"></div>
      </div>
      <div class="flex flex-row items-center text-md">
        Challenge
        <div class="ml-2 w-4 h-4 rounded bg-blue-400"></div>
      </div>
      <div class="flex flex-row items-center text-md">
        Doen of Waarheid
        <div class="ml-2 w-4 h-4 rounded bg-red-500"></div>
      </div>
      <div class="flex flex-row items-center text-md">
        Rule
        <div class="ml-2 w-4 h-4 rounded bg-green-500"></div>
      </div>
      <div class="flex flex-row items-center text-md">
        Surprise
        <div class="ml-2 w-4 h-4 rounded bg-purple-500"></div>
      </div>
      <div class="flex flex-row items-center text-md">
        Drinken
        <div class="ml-2 w-4 h-4 rounded bg-yellow-400"></div>
      </div>
    </div>
  </div>
</template>

<script>
import DrinkUpButton from "../../components/DrinkUpButton.vue";
import {usePlayerStore} from "@/store/players";
import {useQuestionStore} from "@/store/question";
import {useGameStore} from "@/store/game";
import {mapActions} from "pinia";
import TruthOrDare from '../../components/Questions/TruthOrDare.vue';
import Action from '../../components/Questions/Action.vue';
import Rule from '../../components/Questions/Rule.vue';
import {BoardService} from '@/services';
import CardTypeEnum from "@/enums/CardTypeEnum";
import TruthOrDareComponent from "@/components/Board/TruthOrDareComponent.vue";
import RuleComponent from "@/components/Board/RuleComponent.vue";
import SurpriseComponent from "@/components/Board/SurpriseComponent.vue";
import ChallengeComponent from "@/components/Board/ChallengeComponent.vue";
import DrinkComponent from "@/components/Board/DrinkComponent.vue";
import MiniGameComponent from "@/components/Board/MiniGameComponent.vue";

export default {
  components: {
    DrinkUpButton,
    TruthOrDare,
    Action,
    Rule,
    TruthOrDareComponent,
    RuleComponent,
    SurpriseComponent,
    ChallengeComponent,
    DrinkComponent,
    MiniGameComponent,
  },
  data() {
    return {
      rows: 8,
      columns: 12,
      step: null,
      rolled: null,
      diceStep: 1,
      modalData: null,
      readyForNextPlayer: false,
    }
  },
  created() {
    this.initBoardGame();
    this.step = 'roll';
  },
  setup() {
    const playerStore = usePlayerStore();
    const questionStore = useQuestionStore();
    const gameStore = useGameStore();

    return {playerStore, questionStore, gameStore};
  },
  computed: {
    totalTiles() {
      return (2 * this.rows) + (2 * this.columns) - 4;
    },
    cardComponentName() {
      return this.modalData.type.toLowerCase().replaceAll('_', '-') + '-component';
    }
  },
  methods: {
    ...mapActions(usePlayerStore, ['initBoardGame', 'setActivePlayerTile', 'setNextPlayer']),
    loadNextQuestion() {
      this.nextQuestion(this.playerStore.getPlayers);
    },
    handleQuestionEnd() {
      this.finishQuestion();
    },
    resetGame() {
      this.initQuestions(true);
    },
    shouldShow(row, column) {
      return (row === 1 || row === this.rows) || (column === 1 || column === this.columns);
    },
    rowColumnType(row, column) {
      if (!this.shouldShow(row, column)) {
        return {background: 'opacity-0'};
      }

      const num = this.tileToNum(row, column);
      return this.tileType(num);
    },
    tileType(tile) {
      if (tile % 8 === 0 || tile % 15 === 0) {
        return {type: CardTypeEnum.MINI_GAME, border: 'border-orange-700', background: 'bg-orange-500'};
      }

      if (tile % 6 === 0) {
        return {type: CardTypeEnum.CHALLENGE, border: 'border-blue-600', background: 'bg-blue-400'};
      }

      if (tile % 5 === 0 || tile % 7 === 0) {
        return {type: CardTypeEnum.TRUTH_OR_DARE, border: 'border-red-700', background: 'bg-red-500'};
      }

      if (tile % 9 === 0 || tile === 3) {
        return {type: CardTypeEnum.RULE, border: 'border-green-700', background: 'bg-green-500'};
      }

      if (tile % 17 === 0) {
        return {type: CardTypeEnum.SURPRISE, border: 'border-purple-700', background: 'bg-purple-500'};
      }

      return {type: CardTypeEnum.DRINK, border: 'border-yellow-600', background: 'bg-yellow-400'};
    },
    tileToNum(row, column) {
      if (row === 1) {
        return column;
      }

      if (row === this.rows) {
        return this.rows + this.columns + (this.columns - column - 1);
      }

      if (column === this.columns) {
        return this.columns + row - 1;
      }

      if (column === 1) {
        return (this.rows * 2) + this.columns + (this.rows - row + 2);
      }

      return -1;
    },
    getPlayerBG(color) {
      switch (color) {
        case 'red':
          return 'bg-red-600';
        case 'blue':
          return 'bg-blue-800';
        case 'green':
          return 'bg-green-600';
        case 'purple':
          return 'bg-purple-600';
        case 'black':
          return 'bg-black';
        default:
          return 'bg-white';
      }
    },
    rollDice() {
      this.step = 'rolling';
      const rolled = BoardService.roll();

      this.rollStep(rolled);
    },
    rollStep(endWith, step = 0, steps = 20) {
      const max = 6;
      const min = 1;
      this.diceStep = Math.floor(Math.random() * (max - min + 1)) + min;

      if (step >= steps) {
        // this.finishRoll(endWith);
        this.diceStep = endWith;
      }

      setTimeout(() => {
        if (step >= steps) {
          this.finishRoll(endWith);
        } else {
          this.rollStep(endWith, step + 1);
        }
      }, 10 + (Math.pow(step, 2)))
    },
    finishRoll(rolled) {
      this.step = 'rolled';

      this.rolled = rolled;
      this.setActivePlayerTile(rolled, this.totalTiles);
      console.info(`Rolled ${rolled}`);

      const tileType = this.tileType(this.playerStore.getActivePlayer.position);
      console.info(`Requesting a ${tileType.type} card`);

      this.modalData = BoardService.generateCard(tileType.type);

      setTimeout(() => {
        this.step = 'modal';
      }, 2000);
    },
    cancelGame() {
      this.$router.push('/');
    },
    nextPlayer() {
      this.readyForNextPlayer = false;
      this.setNextPlayer();
      this.step = 'roll';
    }
  },
  head: {
    title: "BordSpel"
  }
}
</script>

<!--suppress CssUnusedSymbol -->
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.rotate-enter-active,
.rotate-leave-active {
  transition: transform 0.5s ease;
}

.rotate-enter-from,
.rotate-leave-to {
  transform: rotateY(60deg) scale(0.8);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
