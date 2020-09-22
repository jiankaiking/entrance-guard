<template>
  <el-form label-width="120px" :model="modelFromdata" style="padding: 0 80px; box-sizing: border-box">
    <el-form-item label="任务名称">
      <el-input v-model="modelFromdata.taskName" placeholder="请输入内容" />
    </el-form-item>
    <el-form-item label="执行类">
      <el-input v-model="modelFromdata.taskClass" placeholder="请输入内容" />
    </el-form-item>
    <el-form-item label="任务执行规则">
      <el-input v-model="modelFromdata.taskRunCron" placeholder="请输入内容" />
    </el-form-item>
    <el-form-item label="任务状态">
      <el-select v-model="modelFromdata.taskStatus" placeholder="请选择活动区域">
        <el-option label="停止" :value="0">停止</el-option>
        <el-option label="正常" :value="1">正常</el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="执行时间(分)">
      <el-input v-model="modelFromdata.taskRunTime" placeholder="请输入内容" />
    </el-form-item>
    <el-form-item label="任务描述">
      <el-input v-model="modelFromdata.taskDesc" placeholder="请输入内容" type="textarea" />
    </el-form-item>
    <el-form-item label-width="30px">
      <template>
        <el-button type="primary" plain @click="handleOk">立即创建</el-button>
        <el-button @click="close">取消</el-button>
      </template>
    </el-form-item>
  </el-form>
</template>

<script>
import httpRequest from '../../api/api'
export default {
  name: 'ParameterModel',
  data() {
    return {
      modelFromdata: {
        taskName: '', // 任务名
        taskClass: '', // 任务执行类
        taskRunCron: '', // 任务执行规则
        taskDesc: '', // 任务描述
        taskRunTime: '', // 任务运行时间(分)
        taskStatus: ''// 任务状态
      },
      url: {
        info: '/managecenter/taskConfigManage/getTaskConfigInfo',
        add: '/managecenter/taskConfigManage/addTaskConfig',
        edit: '/managecenter/taskConfigManage/updateTaskConfig'
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
    close() {
      this.$emit('close')
    },
    edit(record) {
      // 员工详情
      this.modelDatanull()
      httpRequest(this.url.info, 'get', { taskId: record.taskId })
        .then(res => {
          Object.assign(this.modelFromdata, res.data)
        })
    },
    handleOk() {
      const that = this
      let url = ''
      if (this.modelFromdata.taskId) {
        url = this.url.edit
      } else {
        url = this.url.add
      }
      // 触发表单验证
      httpRequest(url, 'post', this.modelFromdata)
        .then((res) => {
          if (res.success) {
            that.$message.success('修改成功')
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
