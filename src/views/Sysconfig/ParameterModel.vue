<template>
  <el-form label-width="80px" :model="modelFromdata" style="padding: 0 80px; box-sizing: border-box">
    <el-form-item v-if="modelFromdata.paramId" label="参数Id">
      <el-input v-model="modelFromdata.paramId" disabled />
    </el-form-item>
    <el-form-item label="参数名">
      <el-input v-model="modelFromdata.paramName" />
    </el-form-item>
    <el-form-item label="参数值">
      <el-input v-model="modelFromdata.paramValue" />
    </el-form-item>
    <el-form-item label="所属模块">
      <CommonSelect :value.sync="modelFromdata.paramModule" type="system_service" />
    </el-form-item>
    <el-form-item label="说明">
      <el-input v-model="modelFromdata.paramDesc" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleOk">确定保存</el-button>
      <el-button @click="close">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import httpRequest from '../../api/api'
import CommonSelect from '../../components/select/CommonSelect'
export default {
  name: 'ParameterModel',
  components: {
    CommonSelect
  },
  data() {
    return {
      modelFromdata: {
        paramName: '',
        paramValue: '',
        paramModule: '',
        paramDesc: ''
      },
      url: {
        info: '/managecenter/paramManage/getParamInfo',
        edit: '/managecenter/paramManage/updateParam',
        add: '/managecenter/paramManage/addParam'

      }
    }
  },

  methods: {
    // 清空填充项
    modelDatanull() {
      for (var key in this.modelFromdata) {
        this.modelFromdata[key] = ''
      }
    },
    add() {
      this.modelDatanull()
    },
    edit(record) {
      // 员工详情
      httpRequest(this.url.info, 'get', { paramId: record.paramId })
        .then(res => {
          this.modelFromdata = res.data
        })
    },
    close() {
      this.$emit('close')
    },
    handleOk() {
      const that = this
      let url = ''
      if (this.modelFromdata.paramId) {
        url = this.url.edit
      } else {
        url = this.url.add
      }
      // 触发表单验证
      httpRequest(url, 'post', this.modelFromdata)
        .then((res) => {
          if (res.success) {
            that.$message.success(res.msg)
            that.$emit('ok')
          }
        })
        .finally(() => {
          this.$emit('close')
        })
    }
  }
}
</script>

<style scoped>

</style>
