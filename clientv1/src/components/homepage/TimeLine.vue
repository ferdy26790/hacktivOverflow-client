<template>
  <div class="">
    <router-link :to="{ name: 'AddQuestion' }" class="mt-2 mb-2">add Question</router-link>
    <br> <br>
    <div class="list-group">
      <a v-for="question in allQuestions" :key="question._id" href="#" class="list-group-item list-group-item-action flex-column align-items-start ">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{question.title}}</h5>
          <small>posted by: {{question.userId.name}}</small>
        </div>
        <p class="mb-1 left">{{question.description}}</p>
        <router-link :to="{ name: 'DetailPost', params: {id: question._id} }">Read More..</router-link>
      </a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState([
      'allQuestions'
    ])
  }
}
</script>

<style lang="css">
</style>
