<template>
  <div class="modal" id="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Register</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <fieldset>
              <div class="form-group">
                <label>Name</label>
                <input v-model="name" type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter Name">
              </div>
              <div class="form-group">
                <label for="email">Email address</label>
                <input v-model="email" type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group">
                <label>Password</label>
                <input v-model="password" type="password" class="form-control" placeholder="Password">
              </div>
              <div class="form-group">
                <label>Confirm Password</label>
                <input v-model="conpass" type="password" class="form-control" placeholder="Password">
              </div>
              </fieldset>
              <fieldset class="form-group">
                <div class="form-check">
                  <label class="form-check-label">
                    <input class="form-check-input" type="checkbox" value="" checked="">
                      send me email about offer and notifications
                  </label>
                </div>
              </fieldset>
              <button @click="register" data-dismiss="modal" type="button" class="btn btn-primary">Login</button>
            </fieldset>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'
export default {
  data () {
    return {
      name: null,
      email: null,
      password: null,
      conpass: null
    }
  },
  methods: {
    register () {
      if (!this.name || !this.email || !this.password || !this.conpass) {
        swal({
          title: 'you must fill all field',
          icon: 'error'
        })
      } else {
        if (this.password === this.conpass) {
          let payload = {
            name: this.name,
            email: this.email,
            password: this.password
          }
          this.$emit('register', payload)
          this.name = null
          this.email = null
          this.password = null
          this.conpass = null
        } else {
          swal({
            title: 'Password and confirm password not match!',
            icon: 'error'
          })
        }
      }
    }
  }
}
</script>

<style lang="css">
</style>
