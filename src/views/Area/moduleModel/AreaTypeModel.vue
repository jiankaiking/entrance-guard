<template>
  <el-dialog title="区域类型信息" :visible.sync="centerDialogVisible" width="30%" center>
    <el-form ref="form" label-width="120px" :model="modelFromdata" :rules="rules">
      <el-form-item label="区域类型" prop="areaTypeName">
        <el-input v-model="modelFromdata.areaTypeName" placeholder="请输入区域类型" />
      </el-form-item>
      <el-form-item label="类型图片" prop="areaImgUr">
        <upload-img :img-url.sync="modelFromdata.areaImgUr">
          <template slot="bottom">
            支持jpg、png格式、大小不超过4M，尺寸 xx*xx
          </template>
        </upload-img>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model="modelFromdata.remark"
          type="textarea"
          :autosize="{ minRows:4, maxRows: 5}"
          placeholder="请输入内容"
          maxlength="50"
          show-word-limit
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="ok">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import httpRequest from '../../../api/api'
import uploadImg from '../../../components/uploadImg/uploadImg'
export default {
  name: 'AreaTypeModel',
  components: {
    uploadImg
  },
  data() {
    return {
      centerDialogVisible: false,
      modelFromdata: {
        areaTypeName: '',
        areaImgUr: '',
        remark: ''
      },
      rules: {
        areaTypeName: { required: true, message: '请输入区域类型名称', trigger: 'blur' },
        areaImgUr: { required: true, message: '请上传图片', trigger: 'change' }
      },
      url: {
        add: '/property-manage/area/type/insert',
        edit: '/property-manage/area/type/update'
      }
    }
  },
  methods: {
    modelDataClear() {
      Object.keys(this.modelFromdata).map(key => { this.modelFromdata[key] = '' })
    },
    add() {
      this.modelDataClear()
      console.log(this.modelFromdata)
      this.centerDialogVisible = true
    },
    edit(row) {
      this.add()
      this.modelFromdata = Object.assign(this.modelFromdata, row)
    },
    ok() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const url = this.modelFromdata.id ? this.url.edit : this.url.add
          httpRequest(url, 'post', this.modelFromdata)
            .then((res) => {
              if (res.code === 200) {
                this.centerDialogVisible = false
                this.$emit('ok')
              }
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
