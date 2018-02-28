import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

let http = axios.create({
  baseURL: 'http://35.227.111.213/api/users'
})
// var config = {
//     apiKey: "AIzaSyD7HQliu0RBfI9AqWQHj5Df09SlDk-RfZs",
//     authDomain: "hacktivoverflow-912ee.firebaseapp.com",
//     databaseURL: "https://hacktivoverflow-912ee.firebaseio.com",
//     projectId: "hacktivoverflow-912ee",
//     storageBucket: "",
//     messagingSenderId: "917777618791"
//   };
//
// firebase.initializeApp(config);

// const db = firebase.database()
// const questionRef = db.ref('questions')
// const answerRef = db.ref('answers')

Vue.use(Vuex)

const state = {
  user: {
    name: 'tes',
    email: 'tes@tes',
    _id: null
  },
  userQuestions: null,
  userAnswers: null,
  allQuestions: null,
  allAnswers: null,
  detailQuestion: null
}

const mutations = {
  fetchUser (state, payload) {
    state.user = payload
  },
  fetchAllQuestions (state, payload) {
    state.allQuestions = payload
  },
  fetchDetailQuestion (state, payload) {
    state.detailQuestion = payload
    console.log(state.detailQuestion)
  },
  fetchAllAnswers (state, payload) {
    state.allAnswers = payload
    console.log(state.allAnswers)
  },
  fetchUserQuestions (state, payload) {
    state.userQuestions = payload
    console.log(state.userQuestions)
  },
  fetchUserAnswers (state, payload) {

  }
}

const actions = {
  getQuestions ({commit}) {
    http.get('questions')
      .then((response) => {
        commit('fetchAllQuestions', response.data.questions)
      }).catch((err) => {
        console.error(err)
      })
  },
  getQuestion ({commit}, id) {
    http.get(`questions/${id}`)
      .then((response) => {
        commit('fetchDetailQuestion', response.data.question)
      }).catch((err) => {
        console.error(err)
      })
  },
  getUserQuestions ({commit}, id) {
    http.get(`me/questions`, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then((response) => {
        commit('fetchUserQuestions', response.data.questions)
      }).catch((err) => {
        console.error(err)
      })
  },
  getAnswers ({commit}, questionId) {
    http.get(`question/${questionId}/answers`)
      .then((response) => {
        commit('fetchAllAnswers', response.data.answers)
      }).catch((err) => {
        console.error(err)
      })
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
