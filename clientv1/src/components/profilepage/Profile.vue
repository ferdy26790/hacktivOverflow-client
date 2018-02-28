<template>
  <div class="">
    <div class="card mb-3">
      <h3 class="card-header">Card header</h3>
      <div class="card-body">
        <h5 class="card-title">{{user.name}}</h5>
        <h6 class="card-subtitle text-muted">{{user.email}}</h6>
      </div>
      <img style="height: 10rem; width: 10rem; display: block; border-radius: 50%; margin: auto;" src="https://cdn2.iconfinder.com/data/icons/scenarium-vol-4/128/011_avatar_anonymous_profile_privacy_hacker_mask_hoodie-128.png" alt="Card image">
      <div class="card-body">
        <p class="card-text"></p>
      </div>
      <br>
      <h4>My Question</h4>
      <ul class="list-group list-group-flush left">
        <li v-for="question in userQuestions" class="list-group-item">
            <div class="flex-warp">
              <router-link :to="{ name: 'DetailPost', params: {id: question._id} }">
               <strong> {{question.title}} </strong>
               </router-link>
               <ul>
                 <li><router-link :to="{ name: 'EditQuestion', params: {id: question._id} }">Edit</router-link>  </li> <br>
                 <li><a href="#" @click="deleteQuestion(question._id)" class="card-link">Delete</a></li> <br>
                 <li><a href="#" class="card-link">see answer <span class="badge badge-primary badge-pill">{{question.answers}}</span></a></li>
               </ul>
            </div>
            <p>numbers upvote: {{question.upvote.length}}</p>
            <p>numbers downvote: {{question.downvote.length}}</p>
        </li>
      </ul>
      <div class="card-body">

      </div>
      <div class="card-footer text-muted">

      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapState([
      'user',
      'userQuestions'
    ])
  },
  methods: {
    ...mapActions([
      'getUserQuestions'
    ]),
    deleteQuestion (id) {
      axios.delete(`http://35.227.111.213/api/users/questions/${id}`,
        {

        },
        {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then((response) => {
          if (response.status === 200) {
            swal({
              title: 'Question Deleted',
              icon: 'success'
            })
            this.$router.push('/profile')
          }
        }).catch((err) => {
          console.error(err)
        })
    }
  },
  mounted () {
    this.getUserQuestions(this.user._id)
  }
}
</script>

<style lang="css">
.left{
  text-align: left;
}
.flex-warp{
  display: flex;
  justify-content: space-between;
}
ul{
  list-style: none;
}
</style>
