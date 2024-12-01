<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<template>
  <div class="app">
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<style scoped>
  .app {
    width: 100vw;
    height: 100vh;
    background-color: #f5f5f5; /* 设置背景颜色 */
  }
</style>
