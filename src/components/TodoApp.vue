<script setup>
import TodoLists from './TodoLists.vue'
import ChartStatus from './ChartStatus.vue'
import ChartCategory from './ChartCategory.vue'
</script>

<template>
  <h1>Vue.js タスク管理APP</h1>
  <TodoLists />
  <div class="piechart-col2">
    <div class="piechart-wrap">
      <h2>ステータスの割合</h2>
      <ChartStatus />
    </div>
    <div class="piechart-wrap">
      <h2>カテゴリの割合</h2>
      <ChartCategory />
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-size: 16px;
  text-align: center;
  font-weight: 600;
}
.piechart-col2 {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.piechart-wrap {
  flex: 1;
  width: 100%;
}
</style>
