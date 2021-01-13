<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <el-form ref="queryForm" :model="query" label-width="120px">
          <el-row>
            <el-col :sm="12" :lg="8">
              <el-form-item label="内容">
                <el-input v-model="query.record.content" class="filter-item" placeholder="内容" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-row>
                <el-form-item label="发布时间">
                  <el-date-picker v-model="query.params.publishTime" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" class="filter-item date-range" start-placeholder="起始日期" end-placeholder="结束日期" />
                </el-form-item>
              </el-row>
            </el-col>
            <el-col :sm="operateSM" :lg="operateLG">
              <div class="fr">
                <el-button type="primary" icon="fa fa-search" circle title="查询" @click="queryList" />
                <el-button type="info" icon="fa fa-eraser" circle title="重置" @click="resetQuery" />
                <el-button type="success" icon="fa fa-plus" circle title="添加" @click="handleInsert" />
                <el-button type="danger" icon="fa fa-trash-o" circle title="批量删除" @click="handleBatchRemove" />
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-table ref="table" v-loading="tableLoading" :data="tableData" row-key="id" stripe highlight-current-row @selection-change="selectionChange" @row-click="toggleSelection">
        <el-table-column type="selection" min-width="80" />
        <el-table-column type="index" label="序号" min-width="80" />
        <el-table-column prop="a" label="内容" align="center" min-width="150" />
        <el-table-column prop="b" label="发布时间" align="center" min-width="100" />
        <el-table-column prop="f" label="创建时间" align="center" min-width="100" />
        <el-table-column prop="g" label="创建人" align="center" min-width="100" />
        <el-table-column prop="h" label="修改时间" align="center" min-width="100" />
        <el-table-column prop="i" label="修改人" align="center" min-width="130" />

        <el-table-column label="操作" align="center" fixed="right" min-width="165">
          <template slot-scope="{row}">
            <el-button icon="fa fa-edit" circle title="编辑" @click.stop="handleUpdate(row)" />
            <el-button icon="fa fa-trash-o" circle title="删除" @click.stop="handleRemove(row)" />
            <el-button icon="fa fa-check-square" circle title="发布" @click.stop="handlePublish(row)" />
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="pagination.total>0" class="float-right" :total="pagination.total" :page.sync="pagination.page" :limit.sync="pagination.limit" :page-sizes="[10, 50, 100]" @pagination="queryList" />
    </el-card>
    <edit :title="edit.title" :visible="edit.visible" :type="edit.type" :model="edit.model" @setEditVisible="setEditVisible" @queryList="queryList" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import { fetchList1 } from '@/api/demo/base-settings/noticeManagement'
import Edit from './edit'
export default {
  name: 'NoticeManagement',
  components: { Pagination, Edit },
  data() {
    return {
      query: {
        record: {
          content: null
        },
        params: {
          publishTime: null
        }
      },
      operateSM: 24,
      operateLG: 24,
      tableLoading: true,
      tableData: [],
      selectedRow: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0
      },
      edit: {
        title: '',
        visible: false,
        type: '',
        model: {}
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 计算查询条件的网格属性
      this.queryList()
    })
  },

  methods: {
    handleInsert() { // 添加
      this.edit.title = '添加'
      this.setEditVisible(true)
      this.edit.type = 'insert'
      this.edit.model = {}
    },
    handleRemove(row) { // 删除记录
      this.$confirm('确认删除该记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // remove(row.id).then(result => {
        //   if (result.success && result.data > 0) {
        //     this.queryList()
        //     this.$message({
        //       message: '删除成功',
        //       type: 'success'
        //     })
        //   }
        // })
      }).catch(() => {
      })
    },
    handleBatchRemove() { // 批量删除记录
      if (this.selectedRow.length === 0) {
        this.$message({
          message: '请选择要删除的记录.',
          type: 'warning'
        })
        return
      }
      this.$confirm('确认删除选中的记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

      }).catch(() => {
      })
    },
    handlePublish(row) { // 发布记录
      this.$confirm('确认发布该记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

      }).catch(() => {
      })
    },

    handleUpdate(row) { // 编辑
      this.edit.title = '编辑'
      this.setEditVisible(true)
      this.edit.type = 'update'
      // this.edit.model = deepClone(row)
    },
    queryList() { // 查询
      this.tableLoading = false
      fetchList1(this.query.record, this.pagination).then(result => {
        this.tableData = result.data.list
        this.pagination.total = Number.parseInt(result.data.total)
        this.tableLoading = false
      })
    },
    resetQuery() { // 重置查询条件
      for (const key in this.query.record) {
        this.query.record[key] = null
      }
      for (const key in this.query.params) {
        this.query.params[key] = null
      }
      this.queryList()
    },
    selectionChange(selection) { // 获取选中行
      this.selectedRow = selection
    },
    toggleSelection(row) { // 触发行选中
      this.$refs.table.toggleRowSelection(row)
    },
    setEditVisible(value) { // 设置编辑框是否可见
      this.edit.visible = value
    }
  }
}
</script>
