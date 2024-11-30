<template>
  <div class="content">
    <div class="header">
      <h3 class="title">品牌列表</h3>
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="60px"></el-table-column>
        <el-table-column align="center" type="index" label="商品ID" width="60px"></el-table-column>
        <el-table-column align="center" label="商品名称" prop="productName" width="150px"></el-table-column>
        <el-table-column align="center" label="分类" prop="category" width="150px"></el-table-column>
        <el-table-column align="center" label="SKU信息" prop="skuInfo" width="150px"></el-table-column>
        <el-table-column align="center" label="品牌" prop="brandName" width="100px"></el-table-column>
        <el-table-column align="center" label="价格￥" prop="price" width="100px"></el-table-column>
        <el-table-column align="center" label="库存" prop="stock" width="100px"></el-table-column>
        <el-table-column align="center" label="状态" prop="status" width="100px"></el-table-column>

        <!-- 合并后的操作列 -->
        <el-table-column align="center" label="操作" width="250px">
          <template #default="scope">
            <el-button
              size="small"
              :type="scope.row.status ? 'primary' : 'danger'"
              plain
              @click="toggleStatus(scope.row)"
            >
              {{ scope.row.status ? '启用' : '禁用' }}
            </el-button>
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
// ... 省略其他代码
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
  :deep(.el-table__cell) {
    padding: 12px 0;
  }
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>



