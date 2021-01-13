<template>
  <div class="page-container">
    <el-divider content-position="center">源数据表与目标数据表</el-divider>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-table ref="table1" v-loading="tableLoading1" :data="tableData1.filter(data => !search1 || data.tableName.toLowerCase().includes(search1.toLowerCase() || data.tableComment.toLowerCase().includes(search1.toLowerCase())))" height="500" max-height="500" row-key="id" stripe highlight-current-row class="width-100" @selection-change="selectionChange1">
          <el-table-column type="selection" min-width="80" />
          <el-table-column prop="tableName" label="表名" align="center" min-width="240">
            <template slot="header">
              <el-input v-model="search1" size="mini" placeholder="输入关键字搜索" clearable />
            </template>
          </el-table-column>
          <el-table-column prop="tableComment" label="描述" align="center" min-width="200">
            <template slot-scope="{row}">
              <complete-show :complete-str="row.tableComment?row.tableComment:'无'" :min-width="100" />
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
        <el-table ref="table2" v-loading="tableLoading2" :data="tableData2.filter(data => !search2 || data.tableName.toLowerCase().includes(search2.toLowerCase() || data.tableComment.toLowerCase().includes(search2.toLowerCase())))" height="500" max-height="500" row-key="id" stripe highlight-current-row class="width-100" @selection-change="selectionChange2">
          <el-table-column type="selection" min-width="80" />
          <el-table-column prop="tableName" label="表名" align="center" min-width="240">
            <template slot="header">
              <el-input v-model="search2" size="mini" placeholder="输入关键字搜索" clearable />
            </template>
          </el-table-column>
          <el-table-column prop="tableComment" label="描述" align="center" min-width="200">
            <template slot-scope="{row}">
              <complete-show :complete-str="row.tableComment?row.tableComment:'无'" :min-width="100" />
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-button type="primary" class="fr mt-10" @click="createMappingSetting">新建映射配置集</el-button>
    </el-row>
    <el-divider content-position="center">映射配置集列表</el-divider>
    <el-row :gutter="10">
      <el-col :span="24">
        <el-table ref="table3" v-loading="tableLoading3" :data="tableData3" row-key="id" stripe highlight-current-row class="width-100">
          <el-table-column type="selection" min-width="80" />
          <el-table-column prop="table1" label="源数据表" align="center" min-width="120" />
          <el-table-column prop="table2" label="目标数据表" align="center" min-width="120" />
          <el-table-column label="操作" align="center" fixed="right" min-width="100">
            <template>
              <el-button type="primary" size="mini" icon="fa fa-edit" circle title="修改" @click.stop="()=>{}" />
              <el-button type="danger" size="mini" icon="fa fa-trash-o" circle title="删除" @click.stop="()=>{}" />
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import Pagination from '@/components/Pagination/index'
import { getStandardTableList, getMatchTableList } from '@/api/demo/data-collection/mapping-setting'
export default {
  name: 'MappingSettingIndex',
  components: { /* Pagination*/ },
  data() {
    return {
      search1: '',
      tableData1: [],
      tableLoading1: false,
      pagination1: {
        page: 1,
        limit: 10,
        total: 10
      },
      selectedRow1: [],
      search2: '',
      tableData2: [],
      tableLoading2: false,
      pagination2: {
        page: 1,
        limit: 10,
        total: 10
      },
      selectedRow2: [],
      tableData3: [
        {
          table1: 'SYS_USER',
          table2: 'CAR_GRLSKHXXB'
        },
        {
          table1: 'SYS_GROUP,SYS_MENU',
          table2: 'CAR_HZJGXXB'
        }
      ],
      tableLoading3: false,
      pagination3: {
        page: 1,
        limit: 10,
        total: 10
      }
    }
  },
  mounted() {
    this.getMatchTableList()
    this.getStandardTableList()
  },
  methods: {
    async getMatchTableList() {
      this.tableLoading1 = true
      await getMatchTableList().then(response => {
        this.tableData1 = response.data
        this.pagination1.total = this.tableData1.length
        this.tableLoading1 = false
      }).catch(error => {
        console.log(error)
        this.tableLoading1 = false
      })
    },
    async getStandardTableList() {
      this.tableLoading2 = true
      await getStandardTableList().then(response => {
        this.tableData2 = response.data
        this.pagination2.total = this.tableData2.length
        this.tableLoading2 = false
      }).catch(error => {
        console.log(error)
        this.tableLoading2 = false
      })
    },
    selectionChange1(selection) {
      this.selectedRow1 = selection
    },
    selectionChange2(selection) {
      this.selectedRow2 = selection
    },
    createMappingSetting() {
      if (this.selectedRow1.length !== 0 || this.selectedRow1.length !== 0) {
        this.$router.push({ name: 'MappingSettingEdit', params: { tableList1: this.selectedRow1, tableList2: this.selectedRow2 }})
      } else {
        this.$message({
          message: '请选择要配置的数据表',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style scoped>
</style>

