<template>
  <div class="hello">
    <div class="jumbotron">
      <h1 class="display-3">Welcome To Hacktiv Overflow</h1>

      <hr class="my-4">

      <form>
        <fieldset>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
          </div>
          <button @click="login" type="button" class="btn btn-primary">login</button>
        </fieldset>
      </form>
      <br>
      <p class="lead">
        <p>don't have account? register <a href="#" data-target="#modal" data-toggle="modal"><strong>here</strong></a></p>
      </p>
    </div>
    <!-- modal -->
    <modal-register v-on:register="register"/>
    <!-- end of modal -->
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import swal from 'sweetalert'
import axios from 'axios'
import ModalRegister from '@/components/landingpage/ModalRegister'
export default {
  components: {
    ModalRegister
  },
  name: 'LandingPage',
  data () {
    return {
      msg: 'Welcome to Your Vue.js PWA',
      email: null,
      password: null
    }
  },
  methods: {
    ...mapMutations([
      'fetchUser'
    ]),
    register (payload) {
      axios.post('http://35.227.111.213/api/users/register', {
        ...payload
      })
        .then((response) => {
          if (response.status === 200) {
            swal({
              title: 'Register Success!',
              text: 'you have been registerd please login',
              icon: 'success'
            })
          }
        }).catch((err) => {
          console.error(err)
        })
    },
    login () {
      if (!this.email || !this.password) {
        swal({
          title: 'field cant be empty!',
          text: 'check your field',
          icon: 'error'
        })
      } else {
        let payload = {
          email: this.email,
          password: this.password
        }
        axios.post('http://35.227.111.213/api/users/login', {...payload})
          .then((response) => {
            console.log(response)
            if (response.data === '') {
              swal({
                title: 'wrong email or password!',
                text: 'check your field',
                icon: 'error'
              })
              return false
            }
            localStorage.setItem('token', response.data.token)
            this.fetchUser(response.data.user)
            this.$router.push('/home')
          }).catch((err) => {
            console.error(err)
          })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
