import {defineStore} from "pinia";

export const usePlayerStore = defineStore('players', {
    state: () => ({
        players: [{
            active: false,
            color: null,
            name: 'Tim',
            position: null
        }, {
            active: false,
            color: null,
            name: 'Piet',
            position: null
        }]
    }),
    getters: {
        getPlayers: (state) => state.players,
        getActivePlayer: (state) => state.players.find((p) => p.active),
        getPlayersForTile: (state) => (tile) => state.players.filter((p) => p.position === tile),
        getPlayerById: (state) => (id) => state.players.find(p => p.name === id)
    },
    actions: {
        addPlayer(playerName) {
            this.players.push({
                name: playerName,
                position: null
            });
        },
        removePlayer(playerName) {
            this.players = this.players.filter(p => p.name !== playerName);
        },
        initBoardGame() {
            const colors = ['red', 'blue', 'green', 'purple', 'black'];

            let i = -1;
            this.players = this.players.map((p) => {
                i++;

                return {
                    ...p,
                    active: i === 0,
                    position: 1,
                    color: colors[i],
                }
            })

            console.log("BOARD GAME INITIATED");
        },
        setActivePlayerTile(tile, max) {
            this.players = this.players.map((p) => {
                function calcNewTile(currentTile) {
                    const newPos = currentTile + tile;

                    if (newPos > max) {
                        return newPos % max;
                    } else {
                        return newPos;
                    }
                }

                return {
                    ...p,
                    position: p.active ? calcNewTile(p.position) : p.position,
                }
            })
        },
        setNextPlayer(steps = 1) {
            // TODO: Check if steps works properly
            const index = this.players.findIndex((p) => p.active);
            let newIndex = index + steps;

            if (index + 1 >= this.players.length) {
                newIndex = 0;
            }

            this.players = this.players.map((p) => {
                return {
                    ...p,
                    active: false,
                }
            })

            this.players[newIndex] = {
                ...this.players[newIndex],
                active: true,
            }
        }
    }
})
