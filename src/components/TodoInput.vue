<script setup>
import { ref } from 'vue'
import { statuses } from '../const/statuses'

const inputText = ref('')
const inputDate = ref('')
const errMsg = ref(false)
const handleSubmit = () => {
  if (inputText.value == '' || inputDate.value == '') {
    return (errMsg.value = true)
  }

  // 'items'という名前(任意)のkeyにデータ保存
  // itemsにデータなかったら空の配列を返す
  const items = JSON.parse(localStorage.getItem('items')) || []

  const newItem = {
    id: items.length,
    content: inputText.value,
    limit: inputDate.value,
    state: statuses.NOT_START,
    onEdit: false
  }

  items.push(newItem)
  localStorage.setItem('items', JSON.stringify(items))
}
</script>

<template>
  <p v-if="errMsg">Todoと期限どちらも入力してください</p>

  <form @submit="handleSubmit">
    <label>Todo<input type="text" v-model="inputText" /></label>
    <label>期限<input type="date" v-model="inputDate" /></label>
    <input type="submit" value="登録" />
  </form>
</template>

<style scoped></style>
