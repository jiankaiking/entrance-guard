/*
*   全局获取table表格数据；
*   引入minxin需要定义
*   获取数据接口   listUrl；
*   搜索数据    searchData;
*/

import httpRequest from '../api/api'
import exportExcel from './exportExcel'
import { Message } from 'element-ui'

export const myMixins = {
  data() {
    return {
      loading: false
    }
  },
  // 获取表格数据
  mounted() {
    this.getTableData()
  },
  methods: {
    // 点击搜索
    searchClick() {
      this.searchData.page ? this.searchData.page = 1 : this.searchData.currentPage = 1
      // this.searchData.page = 1;
      this.getTableData()
    },

    // 获取表格数据
    getTableData() {
      this.loading = true
      httpRequest(this.listUrl, 'get', this.searchData)
        .then((res) => {
          if (res.code === 200) {
            this.total = res.data.total ? res.data.total : res.data.totalCount
            this.tableData = res.data.records ? res.data.records : res.data.list
          }
        })
        .finally(res => {
          this.loading = false
        })
    },
    // 每页多少个获取数据
    handleSizeChange(e) {
      this.searchData.size = e
      this.getTableData()
    },
    // 数据页数
    handleCurrentChange(e) {
      this.searchData.page ? this.searchData.page = e : this.searchData.currentPage = e
      this.getTableData()
    },
    // model框显示
    showModel() {
      this.dialogTableVisible = true
    },
    // 模态框关闭
    modalClose() {
      this.dialogTableVisible = false
    },

    // 新增/修改 成功时，重载列表
    modalFormOk() {
      this.getTableData()
      this.modalClose()
    },

    // 编辑
    headEdit(record) {
      this.dialogTableVisible = true
      this.$nextTick(() => {
        this.$refs.modalForm.edit(record)
      })
    },
    // 新增
    headAdd() {
      this.dialogTableVisible = true
      this.$nextTick(() => {
        this.$refs.modalForm.add()
      })
    },
    headDelet(id) {
      httpRequest(this.url.del, 'POST', { id }).then(res => {
        if (res.code === 200) {
          this.$refs[`popover-${id}`].doClose()
          this.getTableData()
        }
      })
    },
    // 搜索重置
    resetSearch() {
      Object.keys(this.searchData).map(key => { if (key !== 'size') { this.searchData[key] = '' } })
      this.searchData.page ? this.searchData.page = 1 : this.searchData.currentPage = 1
      this.getTableData()
    },
    delData(id) {
      httpRequest(this.delUrl, 'post', { staffId: id })
        .then((res) => {
          if (res.code === 200) {
            this.getTableData()
          }
        })
    },
    errorMessages(data) {
      Message.error({ type: 'error', message: data })
    },
    exportData() {
      exportExcel('GET', this.exportUrl, this.$store.state.token, this.searchData)
    }
  }
}

