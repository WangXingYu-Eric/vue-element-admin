<template>
  <div class="page-container">
    <el-row :gutter="10">
      <el-col :span="24">
        <el-table ref="table" v-loading="tableLoading" :data="tableData.filter(data => !search || data.tableName.toLowerCase().includes(search.toLowerCase() || data.tableComment.toLowerCase().includes(search.toLowerCase())))" row-key="id" stripe highlight-current-row class="width-100">
          <el-table-column type="index" min-width="50" />
          <el-table-column prop="tableName" label="表名" align="center" min-width="240">
            <template slot="header">
              <el-input v-model="search" size="mini" placeholder="输入关键字搜索" clearable />
            </template>
          </el-table-column>
          <el-table-column prop="tableComment" label="描述" align="center" min-width="400">
            <template slot-scope="{row}">
              <complete-show :complete-str="row.tableComment?row.tableComment:'无'" :min-width="400" />
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getTableList } from '@/api/demo/data-collection/standard-database/car'
export default {
  name: 'CarIndex',
  data() {
    return {
      search: '',
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
    this.getTableList()
  },
  methods: {
    async getTableList() {
      this.tableLoading = true
      await getTableList().then(response => {
        this.tableData = response.data
        this.pagination.total = this.tableData.length
        this.tableLoading = false
      }).catch(error => {
        console.log(error)
        this.tableLoading = false
      })
    }
  }
}
</script>

<style scoped>
</style>

