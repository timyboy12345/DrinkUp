import {defineStore} from "pinia";

export const useGameStore = defineStore('game', {
    state: () => ({
        development: false
    }),
    getters: {
        getDevelopment: (state) => state.development,
    },
    actions: {}
})
