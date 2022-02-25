import {defineStore} from "pinia";

export const usePlayerStore = defineStore('players', {
    state: () => ({
        players: ['Tim']
    }),
    getters: {
        getPlayers: (state) => state.players,
        getPlayerById: (state) => (id) => state.players.find(p => p === id)
    },
    actions: {
        addPlayer(player) {
            this.players.push(player);
        },
        removePlayer(player) {
            this.players = this.players.filter(p => p !== player);
        }
    }
})
