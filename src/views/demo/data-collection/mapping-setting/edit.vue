<template>
  <div class="page-container">
    <el-divider content-position="center">源数据字段与目标数据字段</el-divider>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-table ref="table1" v-loading="tableLoading1" :data="tableData1.filter(data => !search1 || data.columnField.toLowerCase().includes(search1.toLowerCase() || data.columnComment.toLowerCase().includes(search1.toLowerCase())))" height="500" max-height="500" row-key="id" stripe highlight-current-row class="width-100" @selection-change="selectionChange1">
          <el-table-column type="selection" min-width="50" />
          <el-table-column prop="tableName" label="表名" align="center" min-width="260">
            <template slot="header">
              <el-input v-model="search1" size="mini" placeholder="输入关键字搜索" clearable />
            </template>
          </el-table-column>
          <el-table-column prop="columnField" label="字段名称" align="center" min-width="200">
            <template slot-scope="{row}">
              <el-tag v-if="row.columnKey==='Yes'" type="danger">主键: <span>{{ row.columnField }}</span></el-tag>
              <span v-else>{{ row.columnField }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="columnType" label="类型" align="center" min-width="120" />
          <el-table-column prop="columnComment" label="描述" align="center" min-width="200">
            <template slot-scope="{row}">
              <complete-show :complete-str="row.columnComment?row.columnComment:'无'" :min-width="100" />
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
        <el-table ref="table2" v-loading="tableLoading2" :data="tableData2.filter(data => !search2 || data.columnField.toLowerCase().includes(search2.toLowerCase() || data.columnComment.toLowerCase().includes(search2.toLowerCase())))" height="500" max-height="500" row-key="id" stripe highlight-current-row class="width-100" @selection-change="selectionChange2">
          <el-table-column type="selection" min-width="50" />
          <el-table-column prop="tableName" label="表名" align="center" min-width="260">
            <template slot="header">
              <el-input v-model="search2" size="mini" placeholder="输入关键字搜索" clearable />
            </template>
          </el-table-column>
          <el-table-column prop="columnField" label="字段名称" align="center" min-width="200">
            <template slot-scope="{row}">
              <el-tag v-if="row.columnKey==='Yes'" type="danger">主键: <span>{{ row.columnField }}</span></el-tag>
              <span v-else>{{ row.columnField }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="columnType" label="类型" align="center" min-width="120" />
          <el-table-column prop="columnComment" label="描述" align="center" min-width="200">
            <template slot-scope="{row}">
              <complete-show :complete-str="row.columnComment?row.columnComment:'无'" :min-width="100" />
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-button
        type="primary"
        class="fr mt-10 ml-10"
        @click="()=>{
          if (selectedRow1.length !== 0 || selectedRow1.length !== 0) {
          } else {
            this.$message({
              message: '请选择要配置的数据字段',
              type: 'warning'
            })
          }
        }"
      >新建映射配置</el-button>
      <el-button
        type="info"
        class="fr mt-10"
        @click="()=>{
          this.$store.dispatch('tagsView/delView', this.$route)
          this.$router.go(-1)}"
      >返回</el-button>
    </el-row>
    <el-divider content-position="center">映射配置列表</el-divider>
    <el-row :gutter="10">
      <el-table ref="table3" v-loading="tableLoading3" :data="tableData3" row-key="id" stripe highlight-current-row class="width-100">
        <el-table-column type="selection" min-width="50" />
        <el-table-column prop="sourceTableName" label="源数据表名" align="center" min-width="260" />
        <el-table-column prop="sourceColumnField" label="源字段名称" align="center" min-width="200" />
        <el-table-column prop="targetTableName" label="目标数据表名" align="center" min-width="260" />
        <el-table-column prop="targetColumnField" label="目标字段名称" align="center" min-width="200" />
        <el-table-column label="操作" align="center" fixed="right" min-width="100">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" icon="fa fa-edit" circle title="修改" @click.stop="()=>{}" />
            <el-button type="primary" size="mini" icon="fa fa-gear" circle title="校验规则配置" @click.stop="goCheckRule(row)" />
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
// import Pagination from '@/components/Pagination/index'
export default {
  name: 'MappingSettingEdit',
  components: { /* Pagination*/ },
  data() {
    return {
      search1: '',
      tableData1: [],
      table1Name: [],
      table1Comment: [],
      tableLoading1: false,
      pagination1: {
        page: 1,
        limit: 10,
        total: 10
      },
      selectedRow1: [],
      search2: '',
      tableData2: [],
      table2Name: '',
      table2Comment: '',
      tableLoading2: false,
      pagination2: {
        page: 1,
        limit: 10,
        total: 10
      },
      selectedRow2: [],
      search3: '',
      tableData3: [],
      tableLoading3: false,
      pagination3: {
        page: 1,
        limit: 10,
        total: 10
      },
      selectedRow3: []
    }
  },
  mounted() {
    if (this.$route.params.tableList1 && this.$route.params.tableList2) {
      this.$route.params.tableList1.forEach((table, index) => {
        this.table1Name[index] = this.$route.params.tableList1[index].tableName
        this.table1Comment[index] = this.$route.params.tableList1[index].tableComment
        this.$route.params.tableList1[index].columns.forEach(column => {
          column.tableName = this.table1Name[index]
        })
        this.tableData1.push(this.$route.params.tableList1[index].columns)
      })
      this.tableData1 = this.tableData1.flat()

      this.table2Name = this.$route.params.tableList2[0].tableName
      this.table2Comment = this.$route.params.tableList2[0].tableComment
      this.$route.params.tableList2[0].columns.forEach(column => {
        column.tableName = this.table2Name
      })
      this.tableData2 = this.$route.params.tableList2[0].columns

      this.tableData3 = [
        {
          sourceTableName: this.tableData1[0].tableName,
          sourceColumnField: this.tableData1[0].columnField,
          targetTableName: this.tableData2[0].tableName,
          targetColumnField: this.tableData2[0].columnField
        }
      ]
    } else {
      this.$message({
        message: '未加载到数据,请在【数据采集映射配置】页面选择数据后进入该页面',
        type: 'warning'
      })
    }
  },
  methods: {
    selectionChange1(selection) {
      this.selectedRow1 = selection
    },
    selectionChange2(selection) {
      this.selectedRow2 = selection
    },
    goCheckRule(row) {
      this.$router.push({ name: 'CheckRule', params: { sourceTableName: row.sourceTableName, sourceColumnField: row.sourceColumnField }})
    }
  }
}
</script>

<style scoped>
</style>

