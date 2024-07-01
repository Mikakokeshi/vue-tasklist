<script setup>
import { ref } from 'vue'

let weekTasks = ref([])
let isToday = ref()

// 今日かどうか判定
const today = new Date()
  .toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
  .replaceAll('/', '-')

const items = ref(JSON.parse(localStorage.getItem('items')) || [])

function ifToday() {
  isToday.value = items.value.find((item) => item.limit === today)
  if ((isToday.value = today)) {
    return isToday.value == true
  }
  return isToday.value
}
ifToday()

weekTasks.value = items.value.filter((item) =>
  Math.ceil((new Date(item.limit) - new Date()) / (1000 * 60 * 60 * 24) <= 7)
)
console.log(weekTasks.value)
</script>

<template>
  <h2>1週間以内のタスク</h2>
  <div v-if="weekTasks.length" class="table_wrap">
    <table>
      <tr class="table_head">
        <th>タスク</th>
        <th class="limit">
          <div class="sort_wrap">期限</div>
        </th>
        <th class="">
          <div class="sort_wrap">ステータス</div>
        </th>
        <th>
          <div class="sort_wrap">カテゴリ</div>
        </th>
        <th>
          <div class="sort_wrap">重要度</div>
        </th>
        <th>メモ</th>
      </tr>
      <tr v-for="item in weekTasks" :key="item.id">
        <td>
          <span>{{ item.content }}</span>
        </td>
        <td class="limit-value">
          <span :class="{ red: item.limit === today }">{{ item.limit }}</span>
          <!-- :class='{"クラス名", 条件} -->
        </td>
        <td>
          <span>{{ item.state.value }}</span>
        </td>
        <td>
          <span>{{ item.category }}</span>
        </td>
        <td>
          <span>{{ item.priority }}</span>
        </td>
        <td>
          <span>{{ item.memo }}</span>
        </td>
      </tr>
    </table>
  </div>
  <p v-else class="text-center">今週〆切のタスクはありません。</p>
  <div class="tasklists">
    <router-link to="/tasklists"
      >タスク一覧を見る<v-icon>mdi-arrow-right-bold-circle-outline</v-icon></router-link
    >
  </div>
</template>

<style scoped>
h2 {
  display: block;
  font-weight: 600;
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 30px;
  color: hsla(160, 100%, 37%, 1);
}
.tasklists {
  display: flex;
  justify-content: end;
  font-weight: 600;
  font-size: 14px;
  padding-top: 10px;
}
.tasklists a {
  font-weight: 600;
}

table {
  width: 100%;
}

.table_wrap table {
  border-collapse: collapse;
  height: 100%;
  font-weight: bold;
  text-align: center;
}
table span {
  width: 100%;
  padding: 5px;
  display: block;
  font-size: 12px;
}
table input,
table select {
  font-size: 12px;
  text-align: center;
}

table .table_head .sort_wrap {
  display: flex;
  justify-content: center;
  font-weight: bold;
}
.sort {
  padding-left: 5px;
}
table th {
  font-size: 12px;
  font-weight: bold;
}
table td {
  width: 120px;
}
table .button {
  width: 30px;
}
table .memo {
  width: 180px;
}

table .button button {
  font-size: 11px;
  padding: 4px;
}

input,
select {
  width: 100%;
  padding: 3px;
  height: 30px;
  border: 1px solid rgb(118, 118, 118);
  border-radius: 5px;
}

.limit {
  width: 135px;
}

.red {
  color: red;
  font-weight: bold;
  border: 1px solid red;
  border-radius: 70px;
  justify-items: center;
  line-height: 1;
  margin: auto;
}

.limit-value .red {
  width: 120px;
}

@media screen and (max-width: 678px) {
  .table_wrap {
    overflow-x: scroll;
    overflow-y: visible;
  }
  .table_wrap table {
    border-collapse: collapse;
    min-width: 600px;
  }
  .limit {
    width: 165px;
  }
}
</style>

<style>
.table_wrap .dp__pointer {
  font-size: 12px !important;
  border: 1px solid rgb(118, 118, 118) !important;
  height: 30px !important;
}
.dp__menu {
  position: relative;
  z-index: 2;
}
</style>
