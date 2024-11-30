<template>
  <div class="header">
    <GoodListHeader />
    <GoodListContent />
  </div>
</template>

<script setup lang="ts">
import GoodListContent from './c-cpns/GoodListContent.vue'
import GoodListHeader from './c-cpns/GoodListHeader.vue'
</script>

<style lang="less" scoped>
.header {
  border-radius: 8px;
  overflow: hidden;
}
</style>
