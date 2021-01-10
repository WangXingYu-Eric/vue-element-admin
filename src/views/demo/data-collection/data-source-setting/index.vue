<template>
  <div class="page-container">
    <div class="filter-container">
      <el-form ref="from" :model="filter" :rules="rules" class="form-container" @submit.native.prevent>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="部门名称:" prop="reportType">
              <el-select v-model="filter.groupName" :placeholder="'请选择部门'" clearable class="width-100">
                <el-option :key="'1'" :label="'销售部'" :value="'销售部'" />
                <el-option :key="'2'" :label="'金融服务部'" :value="'金融服务部'" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="系统名称:" prop="reportType">
              <el-select v-model="filter.systemName" :placeholder="'请选择部门'" clearable class="width-100">
                <el-option :key="'1'" :label="'财务系统'" :value="'财务系统'" />
                <el-option :key="'2'" :label="'业务系统'" :value="'业务系统'" />
                <el-option :key="'3'" :label="'客服系统'" :value="'客服系统'" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" class="float-right">
            <el-button type="primary" icon="fa fa-search" circle title="查询" class="float-right" @click.stop="handleFilter" />
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table ref="table" v-loading="tableLoading" :data="tableData" stripe highlight-current-row class="width-100">
      <el-table-column type="selection" min-width="50" />
      <el-table-column prop="groupName" label="所属部门" align="center" min-width="100">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-select v-model="row.groupName" :placeholder="'请选择部门'" clearable size="mini" class="width-100">
              <el-option :key="'1'" :label="'财务部'" :value="'财务部'" />
              <el-option :key="'2'" :label="'金融服务部'" :value="'金融服务部'" />
            </el-select>
          </template>
          <span v-else>{{ row.groupName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="systemName" label="所属系统" align="center" min-width="100">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-select v-model="row.systemName" :placeholder="'请选择部门'" clearable size="mini" class="width-100">
              <el-option :key="'1'" :label="'财务系统'" :value="'财务系统'" />
              <el-option :key="'2'" :label="'业务系统'" :value="'业务系统'" />
              <el-option :key="'3'" :label="'客服系统'" :value="'客服系统'" />
            </el-select>
          </template>
          <span v-else>{{ row.systemName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" align="center" min-width="100">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.username" :placeholder="'请输入用户名'" clearable size="mini" />
          </template>
          <span v-else>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="password" label="密码" align="center" min-width="150">
        <template slot="header">
          <div class="cell">
            <span>密码</span>
            <i ref="faEye" :class="{'fa':true,'fa-eye-slash':true,'cursor-pointer':true,'ml-10':true}" @click.stop="changePasswordVisible" />
          </div>
        </template>
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.password" show-password :placeholder="'请输密码'" clearable size="mini" />
          </template>
          <span v-else>
            <span :class="{'hide':passwordVisible}">{{ row.password.replace(/./g,'*') }}</span>
            <span :class="{'hide':!passwordVisible}">{{ row.password }}</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="URL" align="center" min-width="250">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.url" :placeholder="'请输入URL'" clearable size="mini" />
          </template>
          <span v-else>{{ row.url.replace(' ','') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="driver" label="驱动类" align="center" min-width="150">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-select v-model="row.driver" :placeholder="'请选择驱动类'" clearable size="mini" class="width-100">
              <el-option :key="'1'" :label="'oracle.jdbc.driver.OracleDriver'" :value="'oracle.jdbc.driver.OracleDriver'" />
              <el-option :key="'2'" :label="'oracle.jdbc.OracleDriver'" :value="'oracle.jdbc.OracleDriver'" />
              <el-option :key="'3'" :label="'com.mysql.jdbc.Driver'" :value="'com.mysql.jdbc.Driver'" />
              <el-option :key="'4'" :label="'com.mysql.cj.jdbc.Driver'" :value="'com.mysql.cj.jdbc.Driver'" />
            </el-select>
          </template>
          <span v-else>{{ row.driver }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" min-width="100">
        <template slot-scope="{row}">
          <el-button v-if="row.edit" type="success" size="mini" icon="fa fa-check" circle title="保存" @click.stop="confirmEdit(row)" />
          <el-button v-else type="primary" size="mini" icon="fa fa-edit" circle title="修改" @click.stop="row.edit = !row.edit" />
          <el-button type="primary" size="mini" icon="fa fa-wrench" circle title="测试" @click.stop="test(row)" />
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="pagination.total>0" :total="pagination.total" :page.sync="pagination.page" :limit.sync="pagination.limit" class="float-right" @pagination="fetchList" />

  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import { fetchList, test } from '@/api/demo/data-collection/data-source-setting'
export default {
  name: 'DataSourceSettingIndex',
  components: { Pagination },
  data() {
    return {
      filter: {
        groupName: '',
        systemName: ''
      },
      rules: {
      },
      tableData: [],
      tableLoading: false,
      passwordVisible: false,
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
    async fetchList() {
      this.tableLoading = true
      await fetchList(this.filter, this.pagination).then(response => {
        this.tableData = response.data.list.map(item => {
          this.$set(item, 'edit', false)
          return item
        })
        this.pagination.total = response.data.total
        this.tableLoading = false
      }).catch(error => {
        console.log(error)
        this.tableLoading = false
      })
    },
    handleFilter() {
      this.$refs.from.validate(valid => {
        if (valid) {
          this.fetchList()
        } else {
          return false
        }
      })
    },
    changePasswordVisible() {
      if (this.$refs.faEye.className.indexOf('slash') > -1) {
        this.$refs.faEye.className = 'fa fa-eye cursor-pointer ml-10'
      } else {
        this.$refs.faEye.className = 'fa fa-eye-slash cursor-pointer ml-10'
      }
      this.passwordVisible = !this.passwordVisible
    },
    confirmEdit(row) {
      row.edit = false
      console.log(row.id)
      row.originalGroupName = row.groupName
      this.$message({
        message: '保存成功',
        type: 'success'
      })
    },
    test(row) {
      test(row).then(res => {
        this.$message({
          message: res.message + ' ' + res.data,
          type: res.data ? 'success' : 'warning'
        })
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
</style>

