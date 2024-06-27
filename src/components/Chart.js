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
