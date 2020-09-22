<template>
  <el-form label-width="80px" style="padding: 0 80px; box-sizing: border-box">
    <el-form-item label="通道ID">
      <el-input v-model="input" placeholder="请输入内容" />
    </el-form-item>
    <el-form-item label="通道名称">
      <el-select placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai" />
        <el-option label="区域二" value="beijing" />
      </el-select>
    </el-form-item>

    <el-form-item label="任务周期">
      <el-input v-model="input" placeholder="请输入内容" />
    </el-form-item>
    <el-form-item label="使用说明">
      <el-input v-model="input" placeholder="请输入内容" type="textarea" />
    </el-form-item>
    <el-form-item label="模板内容">
      <el-input v-model="input" placeholder="请输入内容" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'ParameterModel',
  data() {
    return {
      input: ''
    }
  }
}
</script>

<style scoped>

</style>
