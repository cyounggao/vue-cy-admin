<template>
  <div class="container">
    <cy-table :api="getData" :filter-data="filterData">
      <!-- 筛选区域 -->
      <template slot="filter">
        <el-form-item label="性别">
          <el-select v-model="filterData.sex" placeholder="请选择性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="filterData.name" placeholder="请输入关键词">
          </el-input>
        </el-form-item>
      </template>
      <!-- 功能按钮区域 -->
      <template slot="btnRight">
        <el-button type="success" size="mini">增加</el-button>
      </template>
      <!-- 列表 -->
      <el-table-column label="序号">
        {{ Math.random().toString(36).substring(2) }}
      </el-table-column>
      <el-table-column label="姓名">
        {{ Math.random().toString(36).substring(2) }}
      </el-table-column>
      <el-table-column label="性别">
        {{ Math.random().toString(36).substring(2) }}
      </el-table-column>
      <el-table-column label="年龄">
        {{ Math.random().toString(36).substring(2) }}
      </el-table-column>
      <el-table-column label="爱好">
        {{ Math.random().toString(36).substring(2) }}
      </el-table-column>
    </cy-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterData: {}
    }
  },
  methods: {
    getData() {
      return new Promise((resolve) => {
        setTimeout(() => {
          let list = []
          for (let index = 0; index < 30; index++) {
            list.push({ index })
          }
          let data = {
            code: 0,
            data: {
              list,
              total: 30
            }
          }
          resolve(data)
        }, 1000)
      })
    }
  }
}
</script>

<style>
</style>
