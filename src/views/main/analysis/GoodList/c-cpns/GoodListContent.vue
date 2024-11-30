<template>
  <div>
    <el-cascader
      v-model="selectedCategory"
      :options="options"
      placeholder="请选择类目"
      @change="handleCategoryChange"
      style="margin-bottom: 20px; width: 300px;"
      filterable
      clearable
    />

    <div class="content">
      <div class="header">
        <div class="title">商品列表</div>
        <el-button type="primary" @click="handleNewUserClick">新增品牌</el-button>
      </div>

      <el-table :data="usersList" class="table">
        <el-table-column prop="brand" label="商品" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button @click="handleEditBtnClick(row)">编辑</el-button>
            <el-button type="danger" @click="handleDeleteBtnClick(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="usersTotalCount"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
import usePermissions from '@/hooks/usePermissions'

// 定义事件
const emit = defineEmits(['newClick', 'editClick'])

// 用户的权限判断
const isQuery = usePermissions('users:query')

// 发起请求，获取用户列表数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)

// 获取用户列表数据
const { usersList, usersTotalCount } = storeToRefs(systemStore)

// 初始化数据
fetchUserListData()

// 发送网络请求获取用户列表数据
function fetchUserListData(formData: any = {}) {
  if (!isQuery.value) return

  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const queryInfo = { size, offset, ...formData }

  systemStore.postUsersListAction(queryInfo)
}

// 页码相关的逻辑
function handleSizeChange() {
  fetchUserListData()
}

function handleCurrentChange() {
  fetchUserListData()
}

// 删除/新建/编辑的操作
function handleDeleteBtnClick(id: number) {
  systemStore.deleteUserByIdAction(id)
}

function handleNewUserClick() {
  emit('newClick')
}

function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}

// 处理级联选择器的变化
const selectedCategory = ref([])

function handleCategoryChange(value) {
  console.log('选择的类目:', value)
}

// 定义级联选择器的选项
const options = [
  {
    value: '食品',
    label: '食品',
    children: [
      {
        value: '糕点点心',
        label: '糕点点心',
        children: [
          { value: '西式糕点', label: '西式糕点' },
          { value: '中式糕点', label: '中式糕点' },
        ],
      },
      {
        value: '膨化食品',
        label: '膨化食品',
        children: [
          { value: '薯片', label: '薯片' },
          { value: '锅巴', label: '锅巴' },
          { value: '其他膨化食品', label: '其他膨化食品' },
          { value: '干脆面', label: '干脆面' },
          { value: '薯条', label: '薯条' },
          { value: '虾条', label: '虾条' },
          { value: '爆米花', label: '爆米花' },
        ],
      },
      {
        value: '坚果炒货',
        label: '坚果炒货',
        children: [
          { value: '花生', label: '花生' },
          { value: '每日坚果', label: '每日坚果' },
          { value: '瓜子', label: '瓜子' },
          { value: '蚕豆', label: '蚕豆' },
          { value: '南瓜子', label: '南瓜子' },
          { value: '核桃', label: '核桃' },
          { value: '青豆', label: '青豆' },
          { value: '坚果礼盒', label: '坚果礼盒' },
        ],
      },
      {
        value: '面点烘焙',
        label: '面点烘焙',
        children: [
          { value: '面点', label: '面点' },
          { value: '水饺', label: '水饺' },
          { value: '馄饨', label: '馄饨' },
          { value: '汤圆', label: '汤圆' },
          { value: '披萨', label: '披萨' },
          { value: '蛋挞', label: '蛋挞' },
        ],
      },
      {
        value: '熟食腊味',
        label: '熟食腊味',
        children: [
          { value: '其他熟食', label: '其他熟食' },
        ],
      },
      {
        value: '蜜饯果干',
        label: '蜜饯果干',
        children: [
          { value: '山楂', label: '山楂' },
        ],
      },
      {
        value: '海味零食',
        label: '海味零食',
        children: [
          { value: '海苔', label: '海苔' },
        ],
      },
      {
        value: '饼干',
        label: '饼干',
        children: [
          { value: '夹心饼干', label: '夹心饼干' },
        ],
      },
    ],
  },
  {
    value: '食品',
    label: '食品',
    children: [
      {
        value: '糕点点心',
        label: '糕点点心',
        children: [
          { value: '西式糕点', label: '西式糕点' },
          { value: '中式糕点', label: '中式糕点' },
        ],
      },
      {
        value: '膨化食品',
        label: '膨化食品',
        children: [
          { value: '薯片', label: '薯片' },
          { value: '锅巴', label: '锅巴' },
          { value: '其他膨化食品', label: '其他膨化食品' },
          { value: '干脆面', label: '干脆面' },
          { value: '薯条', label: '薯条' },
          { value: '虾条', label: '虾条' },
          { value: '爆米花', label: '爆米花' },
        ],
      },
      {
        value: '坚果炒货',
        label: '坚果炒货',
        children: [
          { value: '花生', label: '花生' },
          { value: '每日坚果', label: '每日坚果' },
          { value: '瓜子', label: '瓜子' },
          { value: '蚕豆', label: '蚕豆' },
          { value: '南瓜子', label: '南瓜子' },
          { value: '核桃', label: '核桃' },
          { value: '青豆', label: '青豆' },
          { value: '坚果礼盒', label: '坚果礼盒' },
        ],
      },
      {
        value: '面点烘焙',
        label: '面点烘焙',
        children: [
          { value: '面点', label: '面点' },
          { value: '水饺', label: '水饺' },
          { value: '馄饨', label: '馄饨' },
          { value: '汤圆', label: '汤圆' },
          { value: '披萨', label: '披萨' },
          { value: '蛋挞', label: '蛋挞' },
        ],
      },
      {
        value: '熟食腊味',
        label: '熟食腊味',
        children: [
          { value: '其他熟食', label: '其他熟食' },
        ],
      },
      {
        value: '蜜饯果干',
        label: '蜜饯果干',
        children: [
          { value: '山楂', label: '山楂' },
        ],
      },
      {
        value: '海味零食',
        label: '海味零食',
        children: [
          { value: '海苔', label: '海苔' },
        ],
      },
      {
        value: '饼干',
        label: '饼干',
        children: [
          { value: '夹心饼干', label: '夹心饼干' },
        ],
      },
    ],
  },
]

// 允许父组件访问方法
defineExpose({ fetchUserListData })
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;

  .title {
    font-size: 22px;
  }
}

.table {
  width: 100%; /* 确保表格容器宽度为100% */
  overflow-x: auto; /* 允许横向滚动 */
}

.table :deep(.el-table__cell) {
  padding: 12px 0;
}

.el-button {
  margin-left: 0;
  padding: 5px 8px;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
