<script setup>
import TodoInput from '../components/TodoInput.vue'
import LatedTodoLists from '../components/LatedTodoLists.vue'
</script>

<template>
  <h1>タスク登録</h1>
  <div>
    <TodoInput />
    <h2>最近追加したタスク（直近5件）</h2>
    <LatedTodoLists />
  </div>
</template>

<style scoped>
h2 {
  display: block;
  font-weight: 600;
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
  color: hsla(160, 100%, 37%, 1);
}
</style>
