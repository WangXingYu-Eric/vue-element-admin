<template>
  <div class="page-container">
    <div class="filter-container">
      <el-form ref="form" :model="filter" :rules="rules" class="form-container" @submit.native.prevent>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="用户编码:" prop="userCode">
              <el-input v-model="filter.userCode" :placeholder="'请输入用户编码'" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="用户姓名:" prop="userName">
              <el-input v-model="filter.userName" :placeholder="'请输入用户姓名'" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" class="float-right">
            <el-button type="primary" icon="fa fa-gear" circle title="用户部门分配" class="float-right ml-10" @click="handleFilter" />
            <el-button type="primary" icon="fa fa-search" circle title="查询" class="float-right" @click="handleFilter" />
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table ref="table" v-loading="tableLoading" :data="tableData" row-key="id" stripe highlight-current-row class="width-100">
      <el-table-column type="selection" min-width="50" />
      <el-table-column type="index" label="序号" align="center" min-width="50" />
      <el-table-column prop="userCode" label="用户编码" align="center" min-width="100" />
      <el-table-column prop="userName" label="用户姓名" align="center" min-width="100" />
      <el-table-column prop="userStatus" label="用户状态" align="center" min-width="100" />
      <el-table-column prop="userDescription" label="用户描述" align="center" min-width="200" />
      <el-table-column prop="userGroup" label="机构" align="center" min-width="110" />
    </el-table>
    <pagination v-show="pagination.total>0" :total="pagination.total" :page.sync="pagination.page" :limit.sync="pagination.limit" class="float-right" @pagination="fetchList()" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import { fetchList } from '@/api/demo/base-settings/user-group'
export default {
  name: 'UserGroupIndex',
  components: { Pagination },
  data() {
    return {
      filter: {
        userCode: '',
        userName: ''
      },
      rules: {},
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

