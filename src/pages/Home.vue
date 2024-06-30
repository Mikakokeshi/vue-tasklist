<script setup>
import LimitTodoLists from '../components/LimitTodoLists.vue'
import LimitWeekLists from '../components/LimitWeekLists.vue'
import ChartStatus from '../components/ChartStatus.vue'
import ChartCategory from '../components/ChartCategory.vue'
</script>

<template>
  <h1>ダッシュボード</h1>
  <LimitTodoLists />
  <LimitWeekLists />
  <div class="piechart-col2">
    <div class="piechart-wrap">
      <h2>ステータス比率</h2>
      <ChartStatus />
    </div>
    <div class="piechart-wrap">
      <h2>カテゴリ比率</h2>
      <ChartCategory />
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-size: 16px;
  text-align: center;
  font-weight: 600;
  margin-top: 30px;
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
@media screen and (max-width: 678px) {
  .piechart-col2 {
    flex-direction: column;
  }
}
</style>
