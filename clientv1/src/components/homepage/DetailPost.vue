<template>
  <div class="">
    <router-link :to="{ name: 'TimeLine' }" class="mt-2 mb-2">to timeline</router-link>
    <br> <br>
    <div class="card left">
      <div class="card-body">
        <img src="https://cdn2.iconfinder.com/data/icons/scenarium-vol-4/128/011_avatar_anonymous_profile_privacy_hacker_mask_hoodie-128.png" alt="icon" style="width:3rem;">
        <br><br>
        <h6 class="card-subtitle mb-2 text-muted">{{detailQuestion.userId.name}}</h6>
        <br>
        <h6 class="card-subtitle mb-2 "> <strong> {{detailQuestion.title}} </strong></h6>
        <p class="card-text">{{detailQuestion.description}}</p>
        <a v-if="detailQuestion.upvote.indexOf(user.id) !== -1" class="card-link text-muted">upvote <span class="badge badge-primary badge-pill">{{detailQuestion.upvote.length}}</span></a>
        <a v-else-if="detailQuestion.userId._id === user.id" class="card-link text-muted">upvote <span class="badge badge-primary badge-pill">{{detailQuestion.upvote.length}}</span></a>
        <a v-else href="#" @click="upvoteQuestion" class="card-link">upvote <span class="badge badge-primary badge-pill">{{detailQuestion.upvote.length}}</span></a>
        <a v-if="detailQuestion.downvote.indexOf(user.id) !== -1" class="card-link text-muted">downvote <span class="badge badge-primary badge-pill">{{detailQuestion.downvote.length}}</span></a>
        <a v-else-if="detailQuestion.userId._id === user.id" class="card-link text-muted">downvote <span class="badge badge-primary badge-pill">{{detailQuestion.downvote.length}}</span></a>
        <a v-else href="#" @click="downvoteQuestion" class="card-link">downvote <span class="badge badge-primary badge-pill">{{detailQuestion.downvote.length}}</span></a>
      </div>
      <div v-if="!showAnswers" class="container">
        <button @click="showAnswer" type="button" class="btn btn-primary">Show Answer</button>
      </div>
      <div v-else class="container">
        <button @click="showAnswer" type="button" class="btn btn-primary">Hide Answer</button>
      </div>
      <div v-if="showAnswers" class="container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item active">Answers</li>
        </ol>
        <div class="form-group">
          <div class="form-group">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text"><img src="https://cdn2.iconfinder.com/data/icons/scenarium-vol-4/128/011_avatar_anonymous_profile_privacy_hacker_mask_hoodie-128.png" alt="icon" style="width:2rem;"></span>
              </div>
              <input v-model="answer" type="text" class="form-control">
              <div class="input-group-append">
                <span class="input-group-text">
                  <button v-if="answer" @click="addAnswer" type="button" class="btn btn-outline-info">answer</button>
                </span>
              </div>
            </div>
          </div>
        </div>
        <ul class="list-group">
            <li v-for="answer in allAnswers" class="list-group-item d-flex justify-content-between align-items-center">
              <div class="">
                <div class="">
                  <img src="https://cdn2.iconfinder.com/data/icons/scenarium-vol-4/128/011_avatar_anonymous_profile_privacy_hacker_mask_hoodie-128.png" alt="icon" style="width:3rem;">
                  <p class="text-muted">{{answer.userId.name}}</p>
                </div>
                <br>
                {{answer.answer}}
                <br>
                <br>
                  <a v-if="answer.upvote.indexOf(user.id) !== -1" class="card-link text-muted">upvote <span class="badge badge-primary badge-pill">{{answer.upvote.length}}</span></a>
                  <a v-else-if="answer.userId._id === user.id" class="card-link text-muted">upvote <span class="badge badge-primary badge-pill">{{answer.upvote.length}}</span></a>
                  <a v-else @click.prevent="upvoteAnswer(answer._id)" class="card-link hoper">upvote <span class="badge badge-primary badge-pill">{{answer.upvote.length}}</span></a>
                  <!-- <a href="#" class="col-xs-3">upvote</a>  <span class="badge badge-primary badge-pill">{{answer.upvote.length}}</span> -->
                  <br> <br>
                  <a v-if="answer.downvote.indexOf(user.id) !== -1" class="card-link text-muted">downvote <span class="badge badge-primary badge-pill">{{answer.downvote.length}}</span></a>
                  <a v-else-if="answer.userId._id === user.id" class="card-link text-muted">downvote <span class="badge badge-primary badge-pill">{{answer.downvote.length}}</span></a>
                  <a v-else href="#" @click.prevent="downvoteAnswer(answer._id)" class="card-link">downvote <span class="badge badge-primary badge-pill">{{answer.downvote.length}}</span></a>
                  <!-- <a href="#" class="col-xs-3">downvote</a>  <span class="badge badge-primary badge-pill">{{answer.downvote.length}}</span> -->
              </div>
            </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
export default {
  props: ['id'],
  data () {
    return {
      showAnswers: false,
      answer: null
    }
  },
  computed: {
    ...mapState([
      'user',
      'detailQuestion',
      'allAnswers'
    ])
  },
  methods: {
    ...mapActions([
      'getQuestion',
      'getAnswers'
    ]),
    showAnswer () {
      this.showAnswers = !this.showAnswers
    },
    addAnswer () {
      axios.post(`http://35.227.111.213/api/users/question/${this.id}/answer`, {
        answer: this.answer
      },
      {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then((response) => {
          if (response.status === 200) {
            this.answer = null
            this.getAnswers(this.id)
          }
        }).catch((err) => {
          console.error(err)
        })
    },
    upvoteQuestion () {
      axios.put(`http://35.227.111.213/api/users/question/${this.id}/upvote`, {}, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then((response) => {
          if (response.status === 200) {
            this.getQuestion(this.id)
          } else {
            console.log(response)
          }
        }).catch((err) => {
          console.error(err)
        })
    },
    upvoteAnswer (id) {
      axios.put(`http://35.227.111.213/api/users/question/answer/${id}/upvote`, {}, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then((response) => {
          if (response.status === 200) {
            this.getAnswers(this.id)
          } else {
            console.log(response)
          }
        }).catch((err) => {
          console.error(err)
        })
    },
    downvoteQuestion () {
      axios.put(`http://35.227.111.213/api/users/question/${this.id}/downvote`, {}, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then((response) => {
          if (response.status === 200) {
            this.getQuestion(this.id)
          } else {
            console.log(response)
          }
        }).catch((err) => {
          console.error(err)
        })
    },
    downvoteAnswer (id) {
      axios.put(`http://35.227.111.213/api/users/question/answer/${id}/downvote`, {}, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then((response) => {
          if (response.status === 200) {
            this.getAnswers(this.id)
          } else {
            console.log(response)
          }
        }).catch((err) => {
          console.error(err)
        })
    }
  },
  mounted () {
    this.getQuestion(this.id)
    this.getAnswers(this.id)
  }
}
</script>

<style lang="css">
.left {
  text-align: left;
}
.hoper {
  cursor: pointer
}
.hoper:hover{
  color: blue;
  transition: 0.5s;
  transform:scale(1.9);
}
</style>
