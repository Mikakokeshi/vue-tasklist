<script setup>
import { computed, ref } from 'vue'
import { statuses } from '../const/statuses'
import { categories } from '../const/categories'
import { Pie } from 'vue-chartjs'

const items = ref(JSON.parse(localStorage.getItem('items')) || [])

let inputContent = ref()
let inputLimit = ref()
let inputState = ref()
let inputCategory = ref()
let inputMemo = ref()
let deleteItemId = ref()
let isEditting = ref(false)
let isShowModal = ref(false)
let isToday = ref(false)
let notStartLength = ref()
let doingLength = ref()
let completedLength = ref()

function onEdit(id) {
  console.log(isEditting.value)
  if (isEditting.value) {
    return alert('編集中のタスクを完了してください')
  } else {
    isEditting.value = true
    console.log('編集中なし')
    items.value[id].onEdit = true
    inputContent.value = items.value[id].content
    inputLimit.value = items.value[id].limit
    inputState.value = items.value[id].state
    inputCategory.value = items.value[id].category
    inputMemo.value = items.value[id].memo

    console.log(inputCategory.value)
    // console.log(inputContent.value, inputLimit.value, inputState.value)
    return
  }
}

function onUpdate(id) {
  console.log(id)
  const newItem = {
    id: id,
    content: inputContent.value,
    limit: inputLimit.value,
    state: inputState.value,
    category: inputCategory.value,
    memo: inputMemo.value,
    onEdit: false
  }
  console.log(newItem)
  items.value.splice(id, 1, newItem)
  isEditting.value = false

  localStorage.setItem('items', JSON.stringify(items.value))
}
console.log(items.value)

function showDeleteModal(id, content) {
  isShowModal.value = true
  deleteItemId.value = id
  inputContent.value = content
}

function closeDeleteModal() {
  isShowModal.value = false
}
function onDelete(id) {
  console.log(id)
  const deleteItemId = id
  items.value.splice(deleteItemId, 1)
  items.value = items.value.map((item, index) => ({
    id: index,
    content: item.content,
    limit: item.limit,
    state: item.state,
    category: item.category,
    memo: item.memo,
    onEdit: item.onEdit
  }))
  localStorage.setItem('items', JSON.stringify(items.value))

  isShowModal.value = false
}

function onMemoChange(event) {
  console.log(event.target.value)
  inputMemo.value = event.target.value
}

// 今日かどうか判定
function ifToday() {
  const today = new Date().toLocaleDateString('ja-JP').replaceAll('/', '-')
  if ((inputLimit.value = today)) {
    return isToday.value == true
  }
  console.log(today, inputLimit.value)
}

ifToday()

//各カテゴリ数取得
notStartLength.value = items.value.filter((item) => item.state.value === '未着手').length
doingLength.value = items.value.filter((item) => item.state.value === '進行中').length
completedLength.value = items.value.filter((item) => item.state.value === '完了').length

// カテゴリごとに件数をカウント
const chartData = computed(() => {
  return {
    labels: ['未着手', '進行中', '完了'],
    datasets: [
      {
        backgroundColor: ['#41B883', '#fbdb94', '#e76a6a'],
        data: [notStartLength.value, doingLength.value, completedLength.value]
      }
    ]
  }
})
// console.log(item.state)
</script>

<template>
  <table>
    <tr>
      <th></th>
      <td>Todo</td>
      <td>期限</td>
      <td>ステータス</td>
      <td>カテゴリ</td>
      <td>メモ</td>
      <td></td>
      <td></td>
    </tr>
    <tr v-for="item in items" :key="item.id">
      <th>{{ item.id + 1 }}</th>

      <td>
        <span v-if="!item.onEdit" @click="onEdit(item.id)">{{ item.content }}</span>
        <input v-model="inputContent" v-else type="text" />
      </td>
      <td>
        <span :class="{ red: isToday }" v-if="!item.onEdit" @click="onEdit(item.id)">{{
          item.limit
        }}</span>
        <!-- :class='{"クラス名", 条件} -->
        <div v-else>
          <VueDatePicker
            showIcon
            v-model="inputLimit"
            format="yyyy/MM/dd"
            locale="ja"
            model-type="yyyy-MM-dd"
            week-start="0"
            :enable-time-picker="false"
            :day-class="getDayClass"
            :minDate="new Date()"
          />
        </div>
      </td>
      <td>
        <span v-if="!item.onEdit" @click="onEdit(item.id)">{{ item.state.value }}</span>
        <select v-else v-model="inputState">
          <option
            v-for="state in statuses"
            :key="state.id"
            :value="state"
            :selected="state.id == item.state.id"
          >
            {{ state.value }}
          </option>
        </select>
      </td>
      <td>
        <span v-if="!item.onEdit" @click="onEdit(item.id)">{{ item.category }}</span>
        <select v-else v-model="inputCategory">
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.value"
            :selected="category.id == item.category.id"
          >
            {{ category.value }}
          </option>
        </select>
      </td>
      <td>
        <span v-if="!item.onEdit" @click="onEdit(item.id)">{{ item.memo }}</span>
        <input v-else type="text" v-model="inputMemo" @change="onMemoChange($event)" />
      </td>
      <td>
        <button v-if="!item.onEdit" @click="onEdit(item.id)">編集</button>
        <button v-else @click="onUpdate(item.id)">完了</button>
      </td>
      <td><button @click="showDeleteModal(item.id, item.content)">削除</button></td>
      <!-- 削除モーダル -->
      <td v-if="isShowModal" class="modal">
        <div class="modal-content">
          <p>{{ ` タスク: 「${inputContent}」 ` }}本当に削除しますか？</p>
          <button class="modal-button" @click="onDelete(deleteItemId)">はい</button>
          <button class="modal-button" @click="closeDeleteModal">いいえ</button>
        </div>
      </td>
    </tr>
  </table>
  <Pie :data="chartData" :options="options" />
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
  display: flex;
  align-items: center;
}
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}
.modal-button {
  margin: 5px;
}
table span {
  width: 100%;
  padding: 5px;
  display: block;
}

table td {
  width: 120px;
}

input,
select {
  width: 100%;
  padding: 3px;
  height: 30px;
}
</style>
