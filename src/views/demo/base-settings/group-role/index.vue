<template>
  <div class="page-container">
    <div class="filter-container">
      <el-form ref="form" :model="filter" :rules="rules" class="form-container" @submit.native.prevent>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="部门:" prop="groupName">
              <el-select v-model="filter.groupName" :placeholder="'请选择部门'" clearable class="width-100">
                <el-option :key="'1'" :label="'财务部'" :value="'财务部'" />
                <el-option :key="'2'" :label="'董办'" :value="'董办'" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="表名:" prop="tableName">
              <el-select v-model="filter.tableName" :placeholder="'请选择表名'" clearable class="width-100">
                <el-option :key="'1'" :label="'总账会计全科表'" :value="'总账会计全科表'" />
                <el-option :key="'2'" :label="'自主投资交易流水表'" :value="'自主投资交易流水表'" />
                <el-option :key="'3'" :label="'自主投资账户持仓明细表'" :value="'自主投资账户持仓明细表'" />
                <el-option :key="'4'" :label="'自主投资账户信息汇总表'" :value="'自主投资账户信息汇总表'" />
                <el-option :key="'5'" :label="'银行账户信息表'" :value="'银行账户信息表'" />
                <el-option :key="'6'" :label="'手续费及佣金分科目明细表'" :value="'手续费及佣金分科目明细表'" />
                <el-option :key="'7'" :label="'业务及管理费分科目明细表'" :value="'业务及管理费分科目明细表'" />
                <el-option :key="'8'" :label="'财务凭证信息表'" :value="'财务凭证信息表'" />
                <el-option :key="'9'" :label="'内部科目对照表'" :value="'内部科目对照表'" />
                <el-option :key="'10'" :label="'董监高履职信息表'" :value="'董监高履职信息表'" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" class="float-right">
            <el-button type="danger" icon="fa fa-trash-o" circle title="删除" class="float-right ml-10" @click.stop="()=>{}" />
            <el-button type="success" icon="fa fa-plus" circle title="增加" class="float-right" @click.stop="()=>{}" />
            <el-button type="primary" icon="fa fa-search" circle title="查询" class="float-right" @click.stop="handleFilter" />
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table ref="table" v-loading="tableLoading" :data="tableData" row-key="id" stripe highlight-current-row class="width-100">
      <el-table-column type="selection" min-width="50" />
      <el-table-column type="index" label="序号" align="center" min-width="50" />
      <el-table-column prop="groupName" label="部门全称" align="center" min-width="150" />
      <el-table-column prop="tableName" label="表名" align="center" min-width="110" />
    </el-table>
    <pagination v-show="pagination.total>0" :total="pagination.total" :page.sync="pagination.page" :limit.sync="pagination.limit" class="float-right" @pagination="fetchList" />
  </div>
</template>

<script>
import { fetchList } from '@/api/demo/base-settings/group-role'
import Pagination from '@/components/Pagination'
export default {
  name: 'GroupRoleIndex',
  components: { Pagination },
  data() {
    return {
      filter: {
        groupName: '',
        tableName: ''
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

