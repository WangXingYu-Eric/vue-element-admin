<template>
  <div>
    <el-dialog title="字典项" :visible.sync="itemVisible" width="768px" :close-on-click-modal="false" @close="close">
      <el-scrollbar wrap-class="hidden-scroll-x dialog-scroll-warp-height">
        <el-form ref="itemForm" :model="query" label-width="120px">
          <el-row>
            <el-col :span="16">
              <el-form-item label="字典项名称">
                <el-input v-model="query.record.name" class="filter-item" placeholder="字典项名称" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <div class="fr">
                <el-button type="primary" icon="fa fa-search" circle title="查询" @click="queryList" />
                <el-button type="info" icon="fa fa-eraser" circle title="重置" @click="resetQuery" />
                <el-button type="success" icon="fa fa-plus" circle title="添加" @click="handleInsert" />
                <el-button type="danger" icon="fa fa-trash-o" circle title="批量删除" @click="handleBatchRemove" />
              </div>
            </el-col>
          </el-row>
        </el-form>
        <el-table ref="table" v-loading="tableLoading" :data="tableData" row-key="id" :max-height="315" stripe highlight-current-row>
          <el-table-column label="字典项名称" align="center" min-width="150">
            <template slot-scope="scope"><span>{{ scope.row.name }}</span></template>
          </el-table-column>
          <el-table-column label="字典项值" align="center" min-width="200">
            <template slot-scope="scope"><span>{{ scope.row.value }}</span></template>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right" min-width="110">
            <template slot-scope="{row}">
              <el-button icon="fa fa-edit" circle title="查询" @click.stop="handleUpdate(row)" />
              <el-button icon="fa fa-trash-o" circle title="删除" @click.stop="handleRemove(row)" />
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="pagination.total>0" :total="pagination.total" :page.sync="pagination.page" :limit.sync="pagination.limit" :page-sizes="[10, 50, 100]" @pagination="queryList" />
      </el-scrollbar>
    </el-dialog>
    <edit :title="edit.title" :visible="edit.visible" :type="edit.type" :model="edit.model" @setEditVisible="setEditVisible" @queryList="queryList" />
  </div>
</template>

<script>
import { fetchList2 } from '@/api/demo/data-maintenance/dongjiangao'
import Pagination from '@/components/Pagination'
import { deepClone } from '@/utils'
import Edit from './edit'

export default {
  name: 'DictionaryItems',
  components: { Edit, Pagination },
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false
    },
    dictionaryId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      itemVisible: this.visible,
      query: {
        record: {
          name: null,
          dictionaryId: this.dictionaryId
        },
        params: {}
      },
      tableHeight: 315,
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
  watch: {
    visible(value) { // 监听visible
      if (value) {
        this.queryList()
      }
      this.itemVisible = value
    },
    dictionaryId(value) {
      this.query.record.dictionaryId = value
    }
  },
  methods: {
    close() {
      this.$emit('setItemsVisible', false)
    },
    handleInsert() { // 添加
      this.edit.title = '添加'
      this.setEditVisible(true)
      this.edit.type = 'insert'
      this.edit.model = {}
      this.edit.model.dictionaryId = this.query.record.dictionaryId
    },
    handleRemove(row) { // 删除记录
      this.$confirm('确认删除该记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

      }).catch(error => {
        this.$message({
          message: error.message,
          type: 'error'
        })
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

      }).catch(error => {
        this.$message({
          message: error.message,
          type: 'error'
        })
      })
    },
    handleUpdate(row) { // 编辑
      this.edit.title = '编辑'
      this.setEditVisible(true)
      this.edit.type = 'update'
      this.edit.model = deepClone(row)
      this.edit.model.dictionaryId = this.query.record.dictionaryId
    },
    queryList() { // 查询
      this.tableLoading = true
      fetchList2(this.query.record, this.pagination).then(result => {
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
    setEditVisible(value) { // 设置编辑框是否可见
      this.edit.visible = value
    }
  }
}
</script>
