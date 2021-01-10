<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <el-form ref="queryForm" :model="query" label-width="120px">
          <el-row>
            <el-col :sm="12" :lg="8">
              <el-form-item label="角色名称">
                <el-input v-model="query.record.name" class="filter-item" placeholder="角色名称" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="角色编码">
                <el-input v-model="query.record.code" class="filter-item" placeholder="角色名称" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="状态" class="filter-item">
                <el-select v-model="query.record.status" style="width: 100%;">
                  <el-option label="启用" value="1" />
                  <el-option label="禁用" value="0" />
                </el-select>
              </el-form-item>
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
      <el-table ref="table" v-loading="tableLoading" :data="tableData" row-key="id"  stripe highlight-current-row @selection-change="selectionChange" @row-click="toggleSelection">
        <el-table-column type="selection" width="55" />
        <el-table-column label="角色名称" align="left" min-width="150">
          <template slot-scope="scope"><span>{{ scope.row.name }}</span></template>
        </el-table-column>
        <el-table-column label="角色编码" align="left" min-width="150">
          <template slot-scope="scope"><span>{{ scope.row.code }}</span></template>
        </el-table-column>
        <el-table-column label="状态" align="left" min-width="80">
          <template slot-scope="scope">
            <el-tag effect="plain" :type="scope.row.status===0?'danger':'success'">{{scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="描述" align="left" min-width="250">
          <template slot-scope="scope">
            {{scope.row.description}}
          </template>
        </el-table-column>
        <el-table-column label="备注" align="left" min-width="250">
          <template slot-scope="scope">
            {{scope.row.remark}}

          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="left" min-width="150">
          <template slot-scope="scope"><span>{{ scope.row.createTime }}</span></template>
        </el-table-column>
        <el-table-column label="创建人" align="left" min-width="100">
          <template slot-scope="scope"><span>{{ scope.row.createUser }}</span></template>
        </el-table-column>
        <el-table-column label="修改时间" align="left" min-width="150">
          <template slot-scope="scope"><span>{{ scope.row.modifyTime?scope.row.modifyTime:'无' }}</span></template>
        </el-table-column>
        <el-table-column label="修改人" align="left" min-width="100">
          <template slot-scope="scope"><span>{{ scope.row.modifyUser }}</span></template>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right" min-width="120">
          <template slot-scope="{row}">
            <el-dropdown trigger="click" @command="handleOperate">
              <el-button type="default" size="mini" @click.stop>更多操作<i class="fa fa-angle-down ml-10" /></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{'operate':operate.settingResource,'row':row}"><i class="fa fa-cog" />配置资源</el-dropdown-item>
                <el-dropdown-item :command="{'operate':operate.settingMenu,'row':row}"><i class="fa fa-user" />配置菜单</el-dropdown-item>
                <el-dropdown-item :command="{'operate':operate.edit,'row':row}"><i class="fa fa-edit" />编辑</el-dropdown-item>
                <el-dropdown-item :command="{'operate':operate.remove,'row':row}"><i class="fa fa-trash-o" />删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="pagination.total>0" :total="pagination.total" :page.sync="pagination.page" :limit.sync="pagination.limit" :page-sizes="[10, 50, 100]" @pagination="queryList" />
    </el-card>
    <edit :title="edit.title" :visible="edit.visible" :type="edit.type" :model="edit.model" @setEditVisible="setEditVisible" @queryList="queryList" />
    <resource-settings :visible="resourceSettings.visible" :role-id="resourceSettings.roleId" @setResourceSettingsVisible="setResourceSettingsVisible" />
    <menu-settings :visible="menuSettings.visible" :role-id="menuSettings.roleId" @setMenuSettingsVisible="setMenuSettingsVisible" />
  </div>
</template>

<script>
  import { fetchList1 } from '@/api/demo/data-maintenance/dongjiangao'
import Pagination from '@/components/Pagination'
import Edit from './edit'
import ResourceSettings from './resourceSettings'
import MenuSettings from './menuSettings'
export default {
  name: 'Role',
  components: { Edit, Pagination, ResourceSettings, MenuSettings },
  data() {
    return {
      query: {
        record: {
          name: null,
          code: null,
          status: null
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
        settingResource: 'settingResource',
        settingMenu: 'settingMenu',
        edit: 'edit',
        remove: 'remove'
      },
      resourceSettings: {
        visible: false,
        roleId: ''
      },
      menuSettings: {
        visible: false,
        roleId: ''
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
    },
    queryList() { // 查询
      this.tableLoading = true
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
    handleOperate(command) { // 触发操作下拉
      if (command.operate === this.operate.settingResource) {
        this.setResourceSettingsVisible(true)
        this.setResourceSettingsRoleId(command.row.id)
      } else if (command.operate === this.operate.settingMenu) {
        this.setMenuSettingsVisible(true)
        this.setMenuSettingsRoleId(command.row.id)
      } else if (command.operate === this.operate.edit) {
        this.handleUpdate(command.row)
      } else if (command.operate === this.operate.remove) {
        this.handleRemove(command.row)
      }
    },
    setEditVisible(value) { // 设置编辑框是否可见
      this.edit.visible = value
    },
    setResourceSettingsVisible(visible) { // 设置资源配置框是否可见
      this.resourceSettings.visible = visible
    },
    setResourceSettingsRoleId(roleId) { // 设置角色ID
      this.resourceSettings.roleId = roleId
    },
    setMenuSettingsVisible(visible) { // 设置菜单配置框是否可见
      this.menuSettings.visible = visible
    },
    setMenuSettingsRoleId(roleId) { // 设置角色ID
      this.menuSettings.roleId = roleId
    }
  }
}
</script>
