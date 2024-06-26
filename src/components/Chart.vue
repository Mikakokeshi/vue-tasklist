<script lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
import * as chartConfig from '../const/chartConfig.js'
import { ref } from 'vue'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'TodoApp',
  components: {
    Pie
  },
  data() {
    return chartConfig
  },
  setup() {
    const chartData = ref(chartConfig.data)

    return {
      chartData,
      options: chartConfig.options
    }
  }
}
</script>

<template>
  <div class="piechart">
    <Pie :data="data" :options="options" />
  </div>
</template>

<style scoped>
.piechart {
  width: 50%;
  margin: 40px auto;
}
</style>
