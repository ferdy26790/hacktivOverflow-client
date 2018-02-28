<template>
  <div class="">
    <Navbar/>
    <form class="container">
  <fieldset>
    <legend>Edit Question</legend>
    <div class="form-group container">
      <label>title</label>
      <input v-model="title" type="text" class="form-control" aria-describedby="emailHelp" >
    </div>
    <div class="form-group container">
      <label>description</label>
      <textarea v-model="description"  class="form-control" rows="3"></textarea>
    </div>
    <button @click="editQuestion()" type="button" class="btn btn-outline-info btn-sm">Save Changes</button>
  </fieldset>
</form>
  </div>
</template>

<script>
import swal from 'sweetalert'
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
import Navbar from '@/components/Navbar'
export default {
  components: {
    Navbar
  },
  props: ['id'],
  computed: {
    ...mapState([
      'detailQuestion'
    ])
  },
  data () {
    return {
      title: null,
      description: null
    }
  },
  methods: {
    ...mapActions([
      'getQuestion'
    ]),
    editQuestion () {
      axios.put('http://35.227.111.213/api/users/questions/' + this.detailQuestion._id,
        {
          title: this.title,
          description: this.description
        },
        {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then((response) => {
          console.log(response.data)
          if (response.status === 200) {
            swal({
              title: 'save changed',
              icon: 'success'
            })
            this.$router.push('/profile')
          }
        }).catch((err) => {
          console.error(err)
        })
    }
  },
  created () {
    this.getQuestion(this.id)
    this.title = this.detailQuestion.title
    this.description = this.detailQuestion.description
  }
}
</script>

<style lang="css">
</style>
