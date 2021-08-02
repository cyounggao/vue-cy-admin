<template>
  <div :id="id" :style="{height: height}" />
</template>

<script>
import * as echarts from 'echarts/core'
import utils from '@/utils'
import {
  BarChart,
  LineChart
} from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DatasetComponent
  // DataZoomComponent
} from 'echarts/components'
import {
  CanvasRenderer
} from 'echarts/renderers'
echarts.use(
  [
    TitleComponent,
    TooltipComponent,
    GridComponent,
    BarChart,
    LineChart,
    LegendComponent,
    DatasetComponent,
    CanvasRenderer
    // DataZoomComponent
  ]
)
export default {
  name: 'Echart',
  props: {
    id: String,
    height: String,
    optionMap: Object
  },
  data() {
    return {
      chartInstance: null,
      chartResizeDebounce: utils.vueDebounce('chartResize', 300)
    }
  },
  watch: {
    optionMap: {
      handler: function(val) {
        this.chartInstance.setOption(val)
      },
      deep: true
    }
  },
  mounted() {
    this.drawLine()
    window.addEventListener('resize', this.chartResizeDebounceFun)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.chartResizeDebounceFun)
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChartContainer = document.getElementById(this.id)
      this.chartInstance = echarts.init(myChartContainer)
    },
    chartResize() {
      this.chartInstance.resize()
    },
    chartResizeDebounceFun() {
      this.chartResizeDebounce()
    }
  }
}
</script>

<style>
</style>
