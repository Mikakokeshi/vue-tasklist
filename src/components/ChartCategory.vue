<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
import * as chartConfig from '../const/chartConfig.js'
import { computed, ref } from 'vue'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  components: {
    Pie
  },
  setup() {
    const items = ref(JSON.parse(localStorage.getItem('items')) || [])

    const chartData = computed(() => {
      const privateValue = items.value.filter((item) => item.category === 'プライベート').length
      const workValue = items.value.filter((item) => item.category === '仕事').length
      const studyValue = items.value.filter((item) => item.category === '勉強').length
      const otherValue = items.value.filter((item) => item.category === 'その他').length

      return {
        labels: ['プライベート', '仕事', '勉強', 'その他'],
        datasets: [
          {
            backgroundColor: ['#e76a6a', '#41B883', '#3899d8', '#fbdb94'],
            data: [privateValue, workValue, studyValue, otherValue]
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
