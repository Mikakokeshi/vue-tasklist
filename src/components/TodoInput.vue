<script setup>
import { ref } from 'vue'
import { statuses } from '../const/statuses'
import { categories } from '../const/categories'

const inputText = ref('')
const inputDate = ref('')
const errMsg = ref(false)
const inputCategory = ref('プライベート')

const handleSubmit = (event) => {
  if (inputText.value == '' || inputDate.value == '') {
    errMsg.value = true
    event.preventDefault()
  } else {
    // 'items'という名前(任意)のkeyにデータ保存
    // itemsにデータなかったら空の配列を返す
    const items = JSON.parse(localStorage.getItem('items')) || []
    const newItem = {
      id: items.length,
      content: inputText.value,
      limit: inputDate.value,
      state: statuses.NOT_START,
      category: inputCategory.value,
      onEdit: false
    }
    items.push(newItem)
    localStorage.setItem('items', JSON.stringify(items))
  }
}

const handleSelectChange = (event) => {
  inputCategory.value = event
  console.log(inputCategory.value)
}
</script>

<template>
  <p v-if="errMsg" class="error">Todoと期限どちらも入力してください</p>

  <form @submit="handleSubmit">
    <div class="form-wrap">
      <label>Todo<input type="text" v-model="inputText" /></label>
      <label>期限<input type="date" v-model="inputDate" /></label>
      <label
        >カテゴリ
        <select @change="handleSelectChange($event.target.value)">
          <option v-for="category in categories" :key="category">
            {{ category.value }}
          </option>
        </select>
      </label>
    </div>
    <input class="submit" type="submit" value="登録" />
  </form>
</template>

<style scoped>
.form-wrap {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
form input,
form select {
  width: 100%;
  padding: 5px;
}
.submit {
  margin: 10px 0 10px 0;
  background-color: blue;
  color: #fff;
  font-weight: 600;
}
.error {
  color: red;
}
</style>
