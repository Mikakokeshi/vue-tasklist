<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
import * as chartConfig from '../const/chartConfig.js'
import { computed, ref } from 'vue'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'TodoApp',
  components: {
    Pie
  },
  setup() {
    const items = ref(JSON.parse(localStorage.getItem('items')) || [])

    const chartData = computed(() => {
      const notStartLength = items.value.filter((item) => item.state.value === '未着手').length
      const doingLength = items.value.filter((item) => item.state.value === '進行中').length
      const completedLength = items.value.filter((item) => item.state.value === '完了').length

      return {
        labels: ['未着手', '進行中', '完了'],
        datasets: [
          {
            backgroundColor: ['#e76a6a', '#fbdb94', '#41B883'],
            data: [notStartLength, doingLength, completedLength]
          }
        ]
      }
    })

    const options = chartConfig.options

    return {
      items: items, // Wrap items with reactive
      chartData,
      options
    }
  }
}
</script>

<template>
  <div v-if="items.length" class="piechart">
    <Pie :data="chartData" :options="options" />
  </div>
</template>

<style scoped>
.piechart {
  width: 80%;
  margin: 20px auto;
}
@media screen and (max-width: 678px) {
  .piechart {
    width: 100%;
    margin: 40px auto;
  }
}
</style>
