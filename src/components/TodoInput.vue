<script setup>
import { ref } from 'vue'

const inputText = ref('')
const inputDate = ref('')

const handleSubmit = (event) => {
  event.preventDefault()
  console.log(inputText)
  console.log(inputDate)
}
</script>

<template>
  <form action="">
    <label>Todo<input type="text" v-model="inputText" /></label>
    <label>期限<input type="date" v-model="inputDate" /></label>
    <input type="submit" value="登録" @click="handleSubmit" />
  </form>
</template>

<style scoped></style>
