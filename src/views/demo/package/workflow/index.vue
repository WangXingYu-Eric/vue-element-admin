<template>
  <div class="page-container">
    <div class="filter-container">
      <el-form ref="form" :model="filter" :rules="rules" class="form-container" @submit.native.prevent>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="请流程名称:" prop="reportArea">
              <el-input v-model="filter.workflowName" :placeholder="'请输入流程名称'" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="状态:" prop="dataYear">
              <el-select v-model="filter.status" :placeholder="'请选择状态'" clearable style="width: 100%">
                <el-option :key="'1'" :label="'启用'" :value="'启用'" />
                <el-option :key="'2'" :label="'停用'" :value="'停用'" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" class="float-right">
            <el-button type="primary" icon="fa fa-search" circle title="查询" class="float-right" @click="handleFilter" />
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table ref="table1" v-loading="tableLoading" :data="tableData" row-key="id" stripe highlight-current-row class="width-100">
      <el-table-column type="selection" min-width="80" />
      <el-table-column type="index" label="序号" min-width="80" />
      <el-table-column prop="workflowName" label="流程名称" align="center" min-width="100" />
      <el-table-column prop="workflowCode" label="流程编码" align="center" min-width="100" />
      <el-table-column prop="workflowDescription" label="描述" align="center" min-width="100" />
      <el-table-column prop="createTime" label="创建时间" align="center" min-width="120" />
      <el-table-column prop="modifyTime" label="修改时间" align="center" min-width="120" />
      <el-table-column label="操作" align="center" fixed="right" min-width="100">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" icon="fa fa-edit" circle title="修改" @click.stop="editHandler(row)" />
          <el-button type="danger" size="mini" icon="fa fa-trash-o" circle title="删除" @click.stop="()=>{}" />
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="pagination.total>0" :total="pagination.total" :page.sync="pagination.page" :limit.sync="pagination.limit" class="float-right" @pagination="fetchList()" />

    <el-dialog title="流程编辑" :visible.sync="visible" fullscreen>
      <iframe :src="iframeSrc" style="width: 100%; height:700px;" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="visible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'

export default {
  name: 'WorkflowIndex',
  components: { Pagination },
  data() {
    return {
      iframeSrc: null,
      visible: false,
      filter: {
        workflowName: '',
        status: ''
      },
      rules: {
      },
      tableData: [],
      tableLoading: false,
      pagination: {
        page: 1,
        limit: 10,
        total: 10
      }
    }
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    fetchList() {
      this.tableLoading = true
      this.tableData = [
        {
          id: '5e07d9a3-1774-11eb-93ff-802bf9da0e17',
          workflowName: '工单流程',
          workflowCode: 'workOrder',
          workflowDescription: '',
          createTime: '2020-10-26 18:16:52',
          modifyTime: '2020-10-26 18:16:52'
        },
        {
          id: '2ce81160-534f-11eb-9528-9eb6d03e8219',
          workflowName: 'EAST系统',
          workflowCode: 'EAST',
          workflowDescription: '流程演示',
          createTime: '2020-10-26 18:16:52',
          modifyTime: '2020-10-26 18:16:52'
        },
        {
          id: 'a564f771-e516-11ea-a6d6-005056b55abc',
          workflowName: 'TEST1',
          workflowCode: 'TEST1',
          workflowDescription: 'TEST1',
          createTime: '2020-10-26 18:16:52',
          modifyTime: '2020-10-26 18:16:52'
        }
      ]
      this.tableLoading = false
    },
    handleFilter() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.fetchList()
        } else {
          return false
        }
      })
    },
    editHandler(row) {
      this.iframeSrc = 'http://13810600758.qicp.vip:51713/#/editor/' + row.id
      this.visible = true
    }
  }
}
</script>

<style scoped>
</style>

