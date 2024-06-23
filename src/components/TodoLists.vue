<script setup>
import { ref } from 'vue'
import { statuses } from '../const/statuses'

const items = ref(JSON.parse(localStorage.getItem('items')) || [])

let inputContent = ref()
let inputLimit = ref()
let inputState = ref()

function onEdit(id) {
  items.value[id].onEdit = true
  console.log(items.value[0])
  inputContent.value = items.value[id].content
  inputLimit.value = items.value[id].limit
  inputState.value = items.value[id].state
}

function onUpdate(id) {
  console.log(id)
  const newItem = {
    id: id,
    content: inputContent.value,
    limit: inputLimit.value,
    state: inputState,
    onEdit: false
  }
  items.value.splice(id, 1, newItem)
  console.log(items)
  console.log(newItem)
  localStorage.setItem('items', JSON.stringify(items.value))
}
</script>

<template>
  <tr>
    <td>Todo</td>
    <td>期限</td>
    <td>ステータス</td>
    <td>編集</td>
    <td>削除</td>
  </tr>
  <tr v-for="item in items" :key="item.id">
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
      <button v-if="!item.onEdit" @click="onEdit(item.id)">編集</button>
      <button v-else @click="onUpdate(item.id)">完了</button>
    </td>
    <td><button>削除</button></td>
  </tr>
</template>

<style scoped></style>
