<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isFold ? '60px' : '210px'">
        <main-menu />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <main-header @fold-change="handleFoldChange" />
        </el-header>
        <el-main>
          <router-view />   <!-- 这里是路由视图 -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants';
import { useRouter } from 'vue-router';
import { localCache } from '@/utils/cache';
import MainMenu from '@/components/main-menu/main-menu.vue';
import MainHeader from '@/components/main-header/main-header.vue';
import { ref } from 'vue';

const isFold = ref(false);
function handleFoldChange(flag: boolean) {
  isFold.value = flag; // 更新折叠状态
}

// function handleExitClick() {
//   localCache.removeCache('token');
//   router.push('/login');
// }
</script>

<style lang="less" scoped>
.main {
  height: 100%;
}

.main-content {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */

    transition: width 1s ease; /* 优化过渡时间 */

    &::-webkit-scrollbar {
      display: none; /* 隐藏滚动条 */
    }
  }

  .el-main {
    background-color: #f0f2f5;
    padding: 20px; /* 添加内边距 */
  }
}
</style>
