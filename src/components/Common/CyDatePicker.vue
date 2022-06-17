<template>
  <el-date-picker
    v-model="date"
    type="daterange"
    :size="size"
    style="width: 260px"
    range-separator="~"
    :picker-options="pickerOptions"
    value-format="yyyy-MM-dd"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    @change="selectDate"
  />
</template>

<script>
import filter from '@/filters'
export default {
  // 二次封装element-ui日期组件，把数组接受变成对象的两个key接收，同时支持设置默认时间
  name: 'CyDatePicker',
  props: {
    //接收数据的对象
    formData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    //开始日期的key
    startKey: {
      type: String,
      default: 'startDate'
    },
    //结束日期的key
    endKey: {
      type: String,
      default: 'endDate'
    },
    //默认的天数，小于1不默认
    defaultDay: {
      type: Number,
      default: 7
    },
    //控件尺寸
    size: {
      type: String,
      default: 'medium'
    }
  },
  data() {
    return {
      date: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7
        }
      }
    }
  },
  created() {
    if (this.defaultDay < 1) {
      return
    }
    let date = parseInt(new Date().getTime() / 1000)
    this.date = [
      filter.dateFormat(date - 86400 * (this.defaultDay - 1), 'yyyy-MM-dd'),
      filter.dateFormat(date, 'yyyy-MM-dd')
    ]
    this.formData[this.startKey] = this.date[0]
    this.formData[this.endKey] = this.date[1]
  },
  methods: {
    selectDate(e) {
      if (e && e.length) {
        this.formData[this.startKey] = e[0]
        this.formData[this.endKey] = e[1]
        this.$emit('change')
      } else {
        this.formData[this.startKey] = ''
        this.formData[this.endKey] = ''
      }
    }
  }
}
</script>

<style>
</style>
