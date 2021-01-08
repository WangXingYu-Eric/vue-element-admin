<template>
  <div class="page-container">
    <div class="filter-container">
      <el-form ref="form" :model="filter" :rules="rules" class="form-container" @submit.native.prevent>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="代码类型:" prop="codeType">
              <el-select v-model="filter.codeType" :placeholder="'请选择代码类型'" clearable class="width-100">
                <el-option :key="'1'" :label="'人身险责任类别代码'" :value="'人身险责任类别代码'" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="目标代码:" prop="targetCode">
              <el-input v-model="filter.targetCode" :placeholder="'请输入目标代码'" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="源数据代码:" prop="originalCode">
              <el-input v-model="filter.originalCode" :placeholder="'请输入数据源代码'" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" class="float-right">
            <el-button type="success" icon="fa fa-plus" circle title="增加" class="float-right  ml-10" @click="()=>{}" />
            <el-button type="primary" icon="fa fa-search" circle title="查询" class="float-right" @click="handleFilter" />
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table ref="table" v-loading="tableLoading" :data="tableData" row-key="id" stripe highlight-current-row class="width-100">
      <el-table-column type="index" label="序号" align="center" min-width="50" />
      <el-table-column prop="codeValue" label="代码编码" align="center" min-width="100" />
      <el-table-column prop="codeType" label="代码类型" align="center" min-width="150" />
      <el-table-column prop="originalCode" label="源数据代码" align="center" min-width="100" />
      <el-table-column prop="targetCode" label="目标代码" align="center" min-width="150" />
      <el-table-column prop="targetCodeName" label="目标代码名" align="center" min-width="100" />
      <el-table-column prop="mapping" label="映射说明" align="center" min-width="150" />
      <el-table-column prop="groupCode" label="机构编码" align="center" min-width="100" />
      <el-table-column prop="remark" label="备注" align="center" min-width="100" />
      <el-table-column label="操作" align="center" fixed="right" min-width="100">
        <template>
          <el-button type="primary" size="mini" icon="fa fa-edit" circle title="修改" @click.stop="()=>{}" />
          <el-button type="primary" size="mini" icon="fa fa-trash-o" circle title="删除" @click.stop="()=>{}" />
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="pagination.total>0" :total="pagination.total" :page.sync="pagination.page" :limit.sync="pagination.limit" class="float-right" @pagination="fetchList()" />
  </div>
</template>

<script>
import { fetchList } from '@/api/demo/base-settings/code-transfer'
import Pagination from '@/components/Pagination'
export default {
  name: 'CodeTransferIndex',
  components: { Pagination },
  data() {
    return {
      filter: {
        codeValue: '',
        codeType: '',
        targetCode: '',
        targetCodeName: '',
        originalCode: '',
        mapping: '',
        groupCode: '',
        remark: ''
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
      fetchList(this.filter, this.pagination).then(response => {
        this.tableData = response.data.list
        this.pagination.total = response.data.total
        this.tableLoading = false
      }).catch(error => {
        console.log(error)
        this.tableLoading = false
      })
    },
    handleFilter() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.fetchList()
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
</style>

