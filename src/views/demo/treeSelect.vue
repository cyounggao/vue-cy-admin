<template>
    <div class="container">
        <cy-tree-select v-model="value" :data="list" style="width: 240px;"></cy-tree-select>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [{
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
            }],
            value: 1
        }
    }
}
</script>