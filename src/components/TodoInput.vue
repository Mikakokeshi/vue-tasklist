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

const getDayClass = (date) => {
  const weekDay = new Date(date).getDay()
  if (weekDay == 6) {
    // 土曜日の場合、classに"saturday"を追加
    return 'saturday'
  }
  if (weekDay == 0) {
    // 日曜日の場合、classに"sunday"を追加
    return 'sunday'
  }
  return ''
}
</script>

<template>
  <p v-if="errMsg" class="error">Todoと期限どちらも入力してください</p>

  <form @submit="handleSubmit">
    <div class="form-wrap">
      <label>タスク<input type="text" v-model="inputText" /></label>
      <label
        >期限
        <div class="datepicker">
          <VueDatePicker
            showIcon
            v-model="inputDate"
            format="yyyy/MM/dd"
            locale="ja"
            model-type="yyyy-MM-dd"
            week-start="0"
            :enable-time-picker="false"
            :day-class="getDayClass"
            :minDate="new Date()"
          /></div
      ></label>
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
form {
  /* border: 1px solid #ccc; */
  border-radius: 10px;
  /* padding: 30px 40px; */
  margin: 40px 0 50px;
}
.form-wrap {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
form label {
  font-size: 12px;
  font-weight: bold;
}
form input,
form select {
  width: 100%;
  padding: 10px;
  height: 38px;
  border-radius: 5px;
  border: 1px solid;
}
.submit {
  margin: 20px auto 10px;
  background-color: rgb(16, 107, 203);
  color: #fff;
  font-weight: 600;
  width: 280px;
  display: block;
  height: 40px;
}

.datepicker input {
  border-radius: 5px !important;
}
.error {
  color: red;
}
.datepicker {
  /* border: 1px solid rgb(118, 118, 118); */
}
</style>

<style>
/* scopedの中には書かない */
.saturday {
  color: #0000ff;
}
.sunday {
  color: #ff0000;
}

.form-wrap .dp__pointer {
  height: 38px !important;
  border: 1px solid #000;
}
</style>
