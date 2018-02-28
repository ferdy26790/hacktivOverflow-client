<template>
  <div class="">
    <Navbar/>
    <br>
    <!-- <button type="button" class="btn btn-primary mt-2 mb-2"></button> -->
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Navbar from '@/components/Navbar'
export default {
  components: {
    Navbar
  },
  methods: {
    ...mapActions([
      'getQuestions'
    ])
  },
  mounted () {
    this.getQuestions()
  }
}
</script>

<style lang="css">
.left {
  text-align: left;
}
</style>
