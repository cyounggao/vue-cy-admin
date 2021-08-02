<template>
  <echart :id="id" :height="height" :option-map="optionMap" />
</template>

<script>
import Echart from './Echart.vue'

export default {
  name: 'LineChart',
  components: {
    Echart
  },
  props: {
    color: {
      type: Array,
      default: function() {
        return []
      }
    },
    legend: {
      type: [Object, Boolean],
      default: function() {
        return {}
      }
    },
    xData: {
      type: Array,
      default: function() {
        return []
      }
    },
    series: {
      type: Array,
      default: function() {
        return []
      }
    },
    id: {
      type: String,
      default: 'echart'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      optionMap: {
        color: ['#396BFF', '#00C990', '#FFAD36', '#FF4400'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          left: 0,
          icon: 'roundRect',
          itemHeight: 2,
          itemWidth: 15,
          itemGap: 20,
          textStyle: {
            padding: [0, 0, 0, 6]
          }
        },
        grid: {
          top: 45,
          left: 50,
          right: 0,
          bottom: 80
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            /* 文字颜色*/
            color: '#000000'
          },
          axisLine: {
            /* 坐标轴颜色 */
            lineStyle: {
              color: '#E5E5E5'
            }
          },
          axisTick: {
            alignWithLabel: true,
            /* 刻度线和标签对齐*/
            lineStyle: {
              /* 刻度的颜色 */
              color: '#E5E5E5'
            }
          },
          data: []
        },
        yAxis: {
          type: 'value',
          splitNumber: 4, // 分割数
          splitLine: {
            lineStyle: {
              color: '#E5E5E5'
            }
          }
        },
        series: []
      }
    }
  },
  watch: {
    xData: {
      handler: function(val) {
        if (val.length) {
          this.optionMap.xAxis.data = val
        }
      },
      deep: true
    },
    series: {
      handler: function(val) {
        if (val.length) {
          this.optionMap.series = val
        }
      },
      deep: true
    }
  },
  mounted() {
    this.color.length && (this.optionMap.color = this.color)
    if (this.legend === false) {
      this.optionMap.legend = undefined
    } else {
      !this.$isEmptyObject(this.legend) && (this.optionMap.legend = this.legend)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
