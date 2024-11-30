<template>
  <div class="header">
    <ListMangHeader />
    <ListMangContent />
  </div>
</template>

<script setup lang="ts">
import ListMangContent from './c-cpns/ListMangContent.vue'
import ListMangHeader from './c-cpns/ListMangHeader.vue'

</script>

<style lang="less" scoped>
.header {
  border-radius: 8px;
  overflow: hidden;
}
</style>
