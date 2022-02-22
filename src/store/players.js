import {defineStore} from "pinia";

export const usePlayerStore = defineStore('players', {
    state: () => ({
        players: ['Tim', 'Jaap', 'Jeroen']
    }),
    getters: {
        getPlayers: (state) => state.players,
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
