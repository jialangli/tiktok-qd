<template>
  <div class="search">
    <!-- 1.输入搜索关键字的表单 -->
    <el-form :model="searchForm" ref="formRef" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="关键字" prop="name">
            <el-input
              v-model="searchForm.name"
              placeholder="商品名称/收件人/店铺名称"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input
              v-model="searchForm.cellphone"
              placeholder="请输入查询的手机号码"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="价格范围">
            <el-input
              v-model="priceRange.min"
              placeholder="最低价"
              style="width: 120px; margin-right: 10px"
            />
            <span>-</span>
            <el-input
              v-model="priceRange.max"
              placeholder="最高价"
              style="width: 120px; margin-left: 10px"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select
              v-model="searchForm.enable"
              placeholder="请选择查询的状态"
              style="width: 100%"
            >
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="下单时间" prop="createAt">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="下单时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 2.重置和搜索的按钮 -->
    <div class="btns">
      <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button icon="Search" type="primary" @click="handleQueryClick"
        >查询</el-button
      >
      <el-button icon="Plus" type="success" @click="handleAddClick"
        >新增</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'

// 定义自定义事件
const emit = defineEmits(['queryClick', 'resetClick'])

// 定义form的数据
const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: '',
  createAt: '',
})

// 定义价格范围
const priceRange = ref({
  min: '', // 最低价
  max: '', // 最高价
})

// 重置操作
const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick() {
  // 1.form中的数据全部重置
  formRef.value?.resetFields()

  // 2.将价格范围重置
  priceRange.value = { min: '', max: '' }

  // 3.将事件出去, content内部重新发送网络请求
  emit('resetClick')
}

function handleQueryClick() {
  // 将价格范围添加到查询条件中
  const queryConditions = {
    ...searchForm,
    priceRange: priceRange.value,
  }

  console.log('查询条件:', queryConditions)
  emit('queryClick', queryConditions)
}

// 新增操作
function handleAddClick() {
  // 这里可以实现新增的逻辑，比如打开一个新增表单的对话框
  console.log('执行新增操作')
  emit('addClick') // 发出新增事件
}
</script>

<style scoped>
.search {
  margin: 20px;
}

.btns {
  margin-top: 20px;
}
</style>

<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 20px;

  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }

  .btns {
    text-align: right;
    padding: 0 50px 10px 0;

    .el-button {
      height: 36px;
    }
  }
}
</style>
