<template>
  <div class="container">
    <div class="card">
      <h3>树形选择器</h3>
      <cy-tree-select
        v-model="value"
        :data="list"
        style="width: 240px"
      ></cy-tree-select>
      <h3>图片</h3>
      <cy-image
        src="https://img1.baidu.com/it/u=700675537,3936578503&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"
        :ratio="0.5"
        :width="300"
        fit="cover"
        preview
      ></cy-image>
      <h3>文字展示</h3>
      <cy-cell :gap="15" label="文字" style="width: 300px;">
        <cy-text
          value="豫章故郡，洪都新府。星分翼轸，地接衡庐。襟三江而带五湖，控蛮荆而引瓯越。物华天宝，龙光射牛斗之墟；人杰地灵，徐孺下陈蕃之榻。雄州雾列，俊采星驰。"
          :row="1"
        ></cy-text>
      </cy-cell>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          label: '系统',
          id: 1,
          children: [
            { label: '用户', id: 2 },
            { label: '用户组', id: 3 },
            { label: '角色', id: 4 },
            { label: '菜单', id: 5 },
            { label: '组织架构', id: 6 }
          ]
        },
        {
          label: '商品',
          id: 7,
          children: [
            { label: '列表', id: 8 },
            { label: '添加', id: 9 },
            { label: '修改', id: 10 },
            { label: '删除', id: 11 },
            { label: '商品分类', id: 12 },
            { label: '分类修改', id: 13 }
          ]
        }
      ],
      value: 1
    }
  }
}
</script>
<style lang="scss" scoped>
.card {
  padding-bottom: 15px;
}
h3 {
  line-height: 60px;
}
</style>