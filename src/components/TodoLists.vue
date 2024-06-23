<script setup>
const items = JSON.parse(localStorage.getItem('items')) || []
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
    <td>{{ item.content }}</td>
    <td>{{ item.limit }}</td>
    <td>{{ item.state.value }}</td>
    <td><button>編集</button></td>
    <td><button>削除</button></td>
  </tr>
</template>

<style scoped></style>
