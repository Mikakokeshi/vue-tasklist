<script setup>
import { computed, ref } from 'vue'
import { statuses } from '../const/statuses'
import { categories } from '../const/categories'
import { priorities } from '../const/priorities'

const items = ref(JSON.parse(localStorage.getItem('items')) || [])

let latedTasks = ref([])
let inputContent = ref()
let inputLimit = ref()
let inputState = ref()
let inputCategory = ref()
let inputPriority = ref()
let inputMemo = ref()
let isToday = ref()

latedTasks.value = items.value.slice(-5).reverse()

// 今日かどうか判定
const today = new Date()
  .toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
  .replaceAll('/', '-')

function ifToday() {
  isToday.value = latedTasks.value.find((item) => item.limit === today)

  if ((isToday.value = today)) {
    return isToday.value == true
  }
}
ifToday()
</script>

<template>
  <div v-if="latedTasks.length" class="table_wrap">
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
      <tr v-for="item in latedTasks" :key="item.id">
        <td>
          <span v-if="!item.onEdit" @click="onEdit(item.id)">{{ item.content }}</span>
          <input v-model="inputContent" v-else type="text" />
        </td>
        <td class="limit-value">
          <span
            :class="{ red: item.limit === today }"
            v-if="!item.onEdit"
            @click="onEdit(item.id)"
            >{{ item.limit }}</span
          >
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
          <span v-if="!item.onEdit" @click="onEdit(item.id)">{{ item.priority }}</span>
          <select v-else v-model="inputPriority">
            <option
              v-for="priority in priorities"
              :key="priority.id"
              :value="priority.value"
              :selected="priority.id == item.priority.id"
            >
              {{ priority.value }}
            </option>
          </select>
        </td>
        <td>
          <span v-if="!item.onEdit" @click="onEdit(item.id)">{{ item.memo }}</span>
          <input v-else type="text" v-model="inputMemo" @change="onMemoChange($event)" />
        </td>
      </tr>
    </table>
  </div>
  <div class="tasklists">
    <router-link to="/tasklists"
      >タスク一覧を見る<v-icon>mdi-arrow-right-bold-circle-outline</v-icon></router-link
    >
  </div>
</template>

<style scoped>
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
    min-width: 700px;
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
