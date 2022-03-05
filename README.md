## 简介

使用vue3.x + vite + element-plus，开发的一套后台管理系统模板

## 功能

```
- 多环境发布，配置对应环境数据（src/config/index.js）
- 动态路由权限（数据格式参考 src/config/menu.js）
- 多维度axios封装
- 锚点导航组件
- 二次封装el-table，实现自动分页
- 下拉树形选择器
- scss变量
```

## 启动项目

```bash
# 安装依赖
npm install

# npm 下载速度慢的问题可以修改npm源后再 npm install
npm config set registry https://registry.npm.taobao.org

# 启动开发环境
npm run dev
```

## 打包

```bash
# 测试环境
npm run test

# 生产环境
npm run build
```
![系统](pic.gif)


## 鸣谢
[vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)