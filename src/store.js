import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
    questions: [
        {
            "id": 1,
            "answers": [
                {
                    "id": 11,
                    "label": "Rabat",
                    "correct": true
                },
                {
                    "id": 12,
                    "label": "Casablanca",
                    "correct": false
                },
                {
                    "id": 13,
                    "label": "Agadir",
                    "correct": false
                },
                {
                    "id": 14,
                    "label": "Tanger",
                    "correct": false
                }

            ],
            "image": "https://via.placeholder.com/750x600",
            "label": "Capitale du maroc ?",
            "time": 60
        },
        {
            "id": 2,
            "answers": [
                {
                    "id": 21,
                    "label": "Espagne",
                    "correct": true
                },
                {
                    "id": 22,
                    "label": "italie",
                    "correct": false
                },
                {
                    "id": 23,
                    "label": "france",
                    "correct": false
                },
                {
                    "id": 24,
                    "label": "portugal",
                    "correct": false
                }
            ],
            "image": "https://via.placeholder.com/750x600",
            "label": "Dans quel pays peut-on trouver la Catalogne, l'Andalousie et la Castille ?",
            "time": 30
        },
        {
            "id": 3,
            "answers": [
                {
                    "id": 31,
                    "label": "Vercingétorix",
                    "correct": false
                },
                {
                    "id": 32,
                    "label": "César",
                    "correct": true
                },
                {
                    "id": 33,
                    "label": "Attila",
                    "correct": false
                },
                {
                    "id": 34,
                    "label": "Augustus",
                    "correct": false
                }
            ],
            "image": "https://via.placeholder.com/750x600",
            "label": "Qui a dit : « Le sort en est jeté » (Alea jacta est) ?",
            "time": 60
        },
        {
            "id": 4,
            "answers": [
                {
                    "id": 41,
                    "label": "L'Argentine",
                    "correct": false
                },
                {
                    "id": 42,
                    "label": "L'Allemagne",
                    "correct": true
                },
                {
                    "id": 43,
                    "label": "L'Italie",
                    "correct": false
                },
                {
                    "id": 44,
                    "label": "Le Brésil",
                    "correct": false
                }
            ],
            "image": "https://via.placeholder.com/750x600",
            "label": "Quel pays a remporté la coupe du monde de football en 2014 ?",
            "time": 60
        },
        {
            "id": 5,
            "answers": [
                {
                    "id": 51,
                    "label": "Léonardo DiCaprio",
                    "correct": false
                },
                {
                    "id": 52,
                    "label": "Brad Pitt",
                    "correct": false
                },
                {
                    "id": 53,
                    "label": "Matthew MacConaughey",
                    "correct": true
                },
                {
                    "id": 54,
                    "label": "Tom Cruise",
                    "correct": false
                }
            ],
            "image": "https://via.placeholder.com/750x600",
            "label": "Quel acteur américain incarne le héros du film de Christopher Nolan de 2014 « Interstellar » ?",
            "time": 50
        }
    ],
    result:{}
}

const actions = {
    setResult(context, payload) {
        context.commit("SET_RESULT", payload)
    }
}
const mutations = {
    SET_RESULT(state, payload) {
        state.result = payload
    }
}
const getters = {
}


const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

export default store