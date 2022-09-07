<template>
  <div id="app">
    <quiz-card></quiz-card>
  </div>
</template>

<script>
import QuizCard from "@/components/QuizCard";

export default {
  name: 'App',
  components: {
    QuizCard
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
