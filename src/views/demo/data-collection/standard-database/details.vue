<template>
  <div class="page-container">
    <el-row :gutter="10">
      <el-col :span="24">
        <div class="tip"><p>表名: {{ tableName }}</p><p>描述: {{ $route.params.table.tableComment?$route.params.table.tableComment.split("描述：")[1]:'' }}</p></div>
        <el-table ref="table1" v-loading="tableLoading" :data="tableData.filter(data => !search || data.columnField.toLowerCase().includes(search.toLowerCase() || data.columnComment.toLowerCase().includes(search.toLowerCase())))" row-key="id" stripe highlight-current-row class="width-100">
          <el-table-column prop="columnField" label="字段名称" align="center" min-width="200">
            <template slot="header">
              <el-input v-model="search" size="mini" placeholder="输入关键字搜索" clearable />
            </template>
            <template slot-scope="{row}">
              <el-tag v-if="row.columnKey==='Yes'" type="danger">主键: <span>{{ row.columnField }}</span></el-tag>
              <span v-else>{{ row.columnField }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="columnType" label="类型" align="center" min-width="120" />
          <el-table-column prop="columnComment" label="描述" align="center" min-width="500">
            <template slot-scope="{row}">
              <complete-show :complete-str="row.columnComment?row.columnComment:'无'" :min-width="400" />
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-button
        type="info"
        class="fr mt-10"
        @click="()=>{
          this.$store.dispatch('tagsView/delView', this.$route)
          this.$router.go(-1)}"
      >返回</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'StandardDataBaseDetails',
  components: { /* Pagination*/ },
  data() {
    return {
      search: null,
      tableData: [],
      tableName: [],
      tableComment: [],
      tableLoading: false,
      pagination: {
        page: 1,
        limit: 10,
        total: 10
      },
      selectedRow: []
    }
  },
  mounted() {
    if (this.$route.params.table) {
      this.tableName = this.$route.params.table.tableName
      this.tableComment = this.$route.params.table.tableComment
      this.$route.params.table.columns.forEach(column => {
        column.tableName = this.tableName
      })
      this.tableData = this.$route.params.table.columns
    } else {
      this.$message({
        message: '未加载到数据',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
</style>

