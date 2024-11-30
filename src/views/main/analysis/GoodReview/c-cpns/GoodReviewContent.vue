<template>
  <div class="content">
    <div class="header">
      <h3 class="title">商品列表</h3>
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="60px" />
        <el-table-column align="center" type="index" label="商品ID" width="200px" />
        <el-table-column align="center" label="商品名称" prop="name" width="200px" />
        <el-table-column align="center" label="SKU ID" prop="skuId" width="200px" />
        <el-table-column align="center" label="店铺名称" prop="shopName" width="200px" />
        <el-table-column align="center" label="数量" prop="quantity" width="200px" />
        <el-table-column align="center" label="价格￥" prop="price" width="200px" />
        <el-table-column align="center" label="下单时间" prop="orderTime" width="200px" />
        <el-table-column align="center" label="收件人" prop="recipient" width="200px" />
        <el-table-column align="center" label="状态" prop="status" width="200px">
          <template #default="scope">
            <el-button
              size="small"
              :type="scope.row.status ? 'primary' : 'danger'"
              plain
              @click="toggleStatus(scope.row)"
            >
              {{ scope.row.status ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>

        <el-table-column align="center" label="创建时间" prop="createAt">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="更新时间" prop="updateAt">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="150px">
          <template #default="scope">
            <el-button
              v-if="isUpdate"
              size="small"
              icon="Edit"
              type="primary"
              text
              @click="handleEditBtnClick(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              v-if="isDelete"
              size="small"
              icon="Delete"
              type="danger"
              text
              @click="handleDeleteBtnClick(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'
import { ref } from 'vue'
import usePermissions from '@/hooks/usePermissions'

// 定义事件
const emit = defineEmits(['newClick', 'editClick'])

// 用户的权限判断
const isCreate = usePermissions('users:create')
const isDelete = usePermissions('users:delete')
const isUpdate = usePermissions('users:update')
const isQuery = usePermissions('users:query')

// 发起请求，获取用户列表数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
fetchUserListData()

// 获取用户列表数据
const { usersList, usersTotalCount } = storeToRefs(systemStore)

// 页码相关的逻辑
function handleSizeChange() {
  fetchUserListData()
}

function handleCurrentChange() {
  fetchUserListData()
}

// 发送网络请求获取用户列表数据
function fetchUserListData(formData: any = {}) {
  if (!isQuery) return

  // 获取 offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }

  // 发起网络请求
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postUsersListAction(queryInfo)
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

// 切换状态
function toggleStatus(row: any) {
  const newStatus = !row.status
  systemStore.updateUserStatusAction(row.id, newStatus)
}

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
