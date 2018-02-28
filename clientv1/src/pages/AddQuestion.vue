<template>
  <div class="">
    <Navbar/>
    <form class="container">
  <fieldset>
    <legend>Add Question</legend>
    <div class="form-group container">
      <label>title</label>
      <input v-model="title" type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter email">
    </div>
    <div class="form-group container">
      <label>description</label>
      <textarea v-model="description" class="form-control" rows="3"></textarea>
    </div>
    <button @click="addQuestion" type="button" class="btn btn-outline-info btn-sm">Add</button>
  </fieldset>
</form>
  </div>
</template>

<script>
import swal from 'sweetalert'
import axios from 'axios'
import Navbar from '@/components/Navbar'
export default {
  components: {
    Navbar
  },
  data () {
    return {
      title: null,
      description: null
    }
  },
  methods: {
    addQuestion () {
      if (!this.title || !this.description) {
        swal({
          title: 'field cant be empty!',
          text: 'check field!',
          icon: 'error'
        })
      }
      axios.post('http://35.227.111.213/api/users/question', {
        title: this.title,
        description: this.description
      },
      {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then((response) => {
          if (response.status === 200) {
            this.$router.push('/home')
          }
        }).catch((err) => {
          console.error(err)
        })
    }
  }
}
</script>

<style lang="css">
</style>
