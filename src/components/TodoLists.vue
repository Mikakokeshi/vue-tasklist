<script setup>
import { ref } from 'vue'
import { statuses } from '../const/statuses'
import { categories } from '../const/categories'

const items = ref(JSON.parse(localStorage.getItem('items')) || [])

let inputContent = ref()
let inputLimit = ref()
let inputState = ref()
let inputCategory = ref()
let inputMemo = ref()
let deleteItemId = ref()
// let isEditting = ref(false)
let isShowModal = ref(false)

function onEdit(id) {
  // isEditting.value = true
  // console.log(items.value[id])
  items.value[id].onEdit = true
  inputContent.value = items.value[id].content
  inputLimit.value = items.value[id].limit
  inputState.value = items.value[id].state
  inputCategory.value = items.value[id].category
  inputMemo.value = items.value[id].memo

  // console.log(isEditting)
  // console.log(inputContent.value, inputLimit.value, inputState.value)
}
console.log(inputCategory.value)

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

  localStorage.setItem('items', JSON.stringify(items.value))
}

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
</script>

<template>
  <table>
    <tr>
      <td>番号</td>
      <td>Todo</td>
      <td>期限</td>
      <td>ステータス</td>
      <td>カテゴリ</td>
      <td>メモ</td>
      <td>編集</td>
      <td>削除</td>
    </tr>
    <tr v-for="item in items" :key="item.id">
      <td>{{ item.id + 1 }}</td>
      <td>
        <span v-if="!item.onEdit">{{ item.content }}</span>
        <input v-model="inputContent" v-else type="text" />
      </td>
      <td>
        <span v-if="!item.onEdit">{{ item.limit }}</span>
        <input v-model="inputLimit" v-else type="date" />
      </td>
      <td>
        <span v-if="!item.onEdit">{{ item.state.value }}</span>
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
        <span v-if="!item.onEdit">{{ item.category }}</span>
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
        <span v-if="!item.onEdit">{{ item.memo }}</span>
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
}

table td {
  width: 120px;
}

input,
select {
  width: 100%;
  padding: 3px;
}
</style>
