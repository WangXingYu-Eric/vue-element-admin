<template>
  <div class="page-container">
    <div class="filter-container">
      <el-form ref="form" :model="filter" :rules="rules" class="form-container" @submit.native.prevent>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="规则来源:" prop="roleSource">
              <el-select v-model="filter.roleSource" :placeholder="'请选择规则来源'" clearable class="width-100">
                <el-option :key="'1'" :label="'监管发文规则'" :value="'监管发文规则'" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="规则类型:" prop="roleType">
              <el-select v-model="filter.roleType" :placeholder="'请选择规则类型'" clearable class="width-100">
                <el-option :key="'1'" :label="'条件必填'" :value="'条件必填'" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="规则集:" prop="roleCollection">
              <el-select v-model="filter.roleCollection" :placeholder="'请选择规则集'" clearable class="width-100">
                <el-option :key="'1'" :label="'主流程集中采集规则'" :value="'主流程集中采集规则'" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="110px" label="规则执行主表:" prop="roleMajorTable">
              <el-select v-model="filter.roleMajorTable" :placeholder="'请选择规执行主表'" clearable class="width-100">
                <el-option :key="'1'" :label="'机构股权信息表'" :value="'机构股权信息表'" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="规则状态:" prop="roleStatus">
              <el-select v-model="filter.roleStatus" :placeholder="'请选择规则状态'" clearable class="width-100">
                <el-option :key="'1'" :label="'启用'" :value="'启用'" />
                <el-option :key="'2'" :label="'停用'" :value="'停用'" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="规则描述:" prop="roleDescription">
              <el-input v-model="filter.roleDescription" :placeholder="'请输入规则描述'" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" class="float-right">
            <el-button type="danger" icon="fa fa-trash-o" circle title="规则删除" class="float-right ml-10" @click="()=>{}" />
            <el-button type="primary" icon="fa fa-edit" circle title="规则修改" class="float-right" @click="()=>{}" />
            <el-button type="success" icon="fa fa-plus" circle title="规则增加" class="float-right" @click="()=>{}" />
            <el-button type="info" icon="fa fa-pause" circle title="停用" class="float-right ml-10" @click="()=>{}" />
            <el-button type="primary" icon="fa fa-check" circle title="启用" class="float-right" @click="()=>{}" />
            <el-button type="primary" icon="fa fa-search" circle title="查询" class="float-right" @click="handleFilter" />
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table ref="table" v-loading="tableLoading" :data="tableData" row-key="id" stripe highlight-current-row class="width-100">
      <el-table-column type="selection" min-width="80" />
      <el-table-column prop="id" label="序号" align="center" min-width="80" />
      <el-table-column prop="roleCollection" label="所属规则集" align="center" min-width="150" />
      <el-table-column prop="roleSource" label="规则来源" align="center" min-width="100" />
      <el-table-column prop="roleType" label="规则类型" align="center" min-width="100" />
      <el-table-column prop="roleMajorTable" label="规则执行主表" align="center" min-width="150" />
      <el-table-column prop="data" label="数据项" align="center" min-width="100" />
      <el-table-column prop="roleDescription" label="规则描述" align="center" min-width="100" />
      <el-table-column prop="roleStatus" label="规则状态" align="center" min-width="100" />
    </el-table>
    <pagination v-show="pagination.total>0" :total="pagination.total" :page.sync="pagination.page" :limit.sync="pagination.limit" class="float-right" @pagination="fetchList()" />
  </div>
</template>

<script>
import { fetchList } from '@/api/demo/package/data-clean-config'
import Pagination from '@/components/Pagination'
export default {
  name: 'DataCleanConfig',
  components: { Pagination },
  data() {
    return {
      filter: {
        roleSource: '',
        roleType: '',
        roleCollection: '',
        roleMajorTable: '',
        roleStatus: '',
        roleDescription: ''
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

