<template>
  <div>
    <el-dialog title="历史校验轨迹" :visible.sync="editVisible" width="768px" :close-on-click-modal="false" @close="close">
      <el-table ref="table2" v-loading="tableLoading2" :data="tableData2" row-key="id" stripe highlight-current-row class="width-100">
        <el-table-column type="index" label="序号" min-width="80" />
        <el-table-column prop="userCode" label="校验编号" align="center" min-width="170" />
        <el-table-column prop="batchNumber" label="错误总量" align="center" min-width="150" />
        <el-table-column prop="entryTime" label="检验日期" align="center" min-width="150" />
      </el-table>
      <pagination v-show="pagination2.total>0" :total="pagination2.total" :page.sync="pagination2.page" :limit.sync="pagination2.limit" class="float-right" @pagination="fetchList2()" />
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">数据质量检验结果清单下载</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList2 } from '@/api/demo/data-maintenance/dongjiangao'
export default {
  name: 'SpeechCraft',
  props: {
    title: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      required: true,
      default: false
    },
    type: {
      type: String,
      required: true
    },
    model: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      query: {
        params: {
        }
      },
      filter2: {
        name: '',
        gender: '',
        cardType: '',
        cardNo: '',
        birthday: ''
      },
      rules2: {
      },
      tableData2: [],
      tableLoading2: false,
      pagination2: {
        page: 1,
        limit: 10,
        total: 10
      },
      editVisible: this.visible,
      editModel: this.model,
      rules: {
        visittype: [
          { required: true, message: '回访类型不能为空', trigger: 'blur' }
        ],
        businscenario: [
          { required: true, message: '回访场景不能为空', trigger: 'blur' }
        ],
        speechcontent: [
          { required: true, message: '话术内容不能为空', trigger: 'blur' },
          { max: 255, message: '话术内容不多于255个字符' }
        ]
      },
      tenantSearchVisible: false
    }
  },
  watch: {
    visible(value) { // 监听visible
      this.editVisible = value
      this.$nextTick(() => {
        // 清空验证信息
        this.$refs.editForm.clearValidate()
      })
    },
    model(value) { // 监听model
      this.editModel = value
    }
  },
  mounted() {
    this.fetchList2()
  },
  methods: {
    fetchList2() {
      this.tableLoading2 = true
      fetchList2(this.filter2, this.pagination2).then(response => {
        this.tableData2 = response.data.list
        this.pagination2.total = response.data.total
        this.tableLoading2 = false
      }).catch(error => {
        console.log(error)
        this.tableLoading2 = false
      })
    },
    close() {
      this.$emit('setEditVisible', false)
    },
    confirm() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          if (this.type === 'insert') {
            this.insert()
          } else {
            this.update()
          }
        }
      })
    },
    insert() {

    },
    update() {
    }
  }
}
</script>

