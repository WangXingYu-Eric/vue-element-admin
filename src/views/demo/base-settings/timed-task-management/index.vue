<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <el-form ref="queryForm" :model="query" label-width="120px">
          <el-row>
            <el-col :sm="12" :lg="8">
              <el-form-item label="任务描述">
                <el-input v-model="query.record.remark" class="filter-item" placeholder="任务描述" />
              </el-form-item>
            </el-col>
            <el-col :sm="operateSM" :lg="operateLG">
              <div class="fr">
                <el-button type="primary" icon="fa fa-search" circle title="查询" @click="queryList" />
                <el-button type="info" icon="fa fa-eraser" circle title="重置" @click="resetQuery" />
                <el-button type="success" icon="fa fa-plus" circle title="添加" @click="handleInsert" />
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-table
        ref="table"
        v-loading="tableLoading"
        :data="tableData"
        row-key="id"
        stripe
        highlight-current-row
        @selection-change="selectionChange"
        @row-click="toggleSelection"
      >
        <el-table-column type="selection" min-width="50" />
        <el-table-column type="index" label="序号" min-width="50" />
        <el-table-column prop="a" label="服务名称" align="center" min-width="100" />
        <el-table-column prop="b" label="对象名称" align="center" min-width="100" />
        <el-table-column prop="c" label="参数" align="center" min-width="100" />
        <el-table-column prop="d" label="周期表达式" align="center" min-width="100" />
        <el-table-column prop="e" label="状态" align="center" min-width="110" />
        <el-table-column prop="j" label="描述" align="center" min-width="110" />
        <el-table-column prop="k" label="备注" align="center" min-width="110" />
        <el-table-column prop="f" label="创建时间" align="center" min-width="100" />
        <el-table-column prop="g" label="创建人" align="center" min-width="100" />
        <el-table-column prop="h" label="修改时间" align="center" min-width="100" />
        <el-table-column prop="i" label="修改人" align="center" min-width="130" />
        <el-table-column label="操作" align="center" fixed="right" min-width="120">
          <template slot-scope="{row}">
            <el-dropdown trigger="click" @command="handleOperate">
              <el-button type="default" size="mini" @click.stop>更多操作<i class="fa fa-angle-down ml-10" /></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{'operate':operate.running,'row':row}"><i :class="row.status===1?'fa fa-pause':'fa fa-play'" />{{ row.status===0?'运行':'暂停' }}</el-dropdown-item>
                <el-dropdown-item :command="{'operate':operate.runOnce,'row':row}"><i class="fa fa-step-forward" />立即运行一次</el-dropdown-item>
                <el-dropdown-item :command="{'operate':operate.edit,'row':row}"><i class="fa fa-edit" />编辑</el-dropdown-item>
                <el-dropdown-item :command="{'operate':operate.remove,'row':row}"><i class="fa fa-trash-o" />删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
import { fetchList1 } from '@/api/demo/base-settings/timedTaskManagement.js'
import Edit from './edit'
export default {
  name: 'Job',
  components: { Edit, Pagination },
  data() {
    return {
      query: {
        record: {
          remark: null
        },
        params: {}
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
      },
      operate: {
        running: 'running',
        runOnce: 'runOnce',
        edit: 'edit',
        remove: 'remove'
      },
      serviceName: 'core-service'
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
    },
    queryList() { // 查询
      this.tableLoading = true
      fetchList1(this.query.record, this.pagination).then(result => {
        this.tableData = result.data.list
        this.pagination.total = Number.parseInt(result.data.total)
        this.tableLoading = false
      })
    },
    handleTrigger(row) { // 暂停/运行
      const action = row.status === 0 ? '运行' : '暂停'
      this.$confirm('确认' + action + '选中的任务吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (row.status === 0) {
          // 当前为暂停状态,触发后运行
        } else {
          // 当前为运行状态,触发后暂停
        }
      }).catch(error => {
        this.$message({
          message: error.message,
          type: 'error'
        })
      })
    },
    handleDoNow(row) { // 立即运行一次
      this.$confirm('确认立即运行一次选中的任务吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // run(this.serviceName, row.id)
      }).catch(error => {
        this.$message({
          message: error.message,
          type: 'error'
        })
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
    handleOperate(command) { // 触发操作下拉
      if (command.operate === this.operate.running) {
        this.handleTrigger(command.row)
      } else if (command.operate === this.operate.runOnce) {
        this.handleDoNow(command.row)
      } else if (command.operate === this.operate.edit) {
        this.handleUpdate(command.row)
      } else if (command.operate === this.operate.remove) {
        this.handleRemove(command.row)
      }
    },
    setEditVisible(value) { // 设置编辑框是否可见
      this.edit.visible = value
    }
  }
}
</script>
