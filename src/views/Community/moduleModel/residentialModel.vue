<template>
  <el-dialog title="住宅楼信息" :lock-scroll="false" center width="30%" :visible.sync="dialogTableVisible">
    <div class="menuInfo">
      <el-form ref="form" :model="modelFromdata" :rules="rules" label-width="120px">
        <el-form-item label="小区名称" prop="communityId">
          <el-select v-model="modelFromdata.communityId" placeholder="请选择小区名称">
            <el-option
              v-for="item in communityArr"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            />
          </el-select>
          <!--                    <el-input v-model="modelFromdata.communityName"  placeholder="请选择小区" ></el-input>-->
        </el-form-item>
        <el-form-item label="住宅楼名称" prop="buildingName">
          <el-input v-model="modelFromdata.buildingName" placeholder="住宅楼名称" />
        </el-form-item>
        <el-form-item label="单元名称" prop="unitName">
          <el-input v-model="modelFromdata.unitName" placeholder="单元名称" />
        </el-form-item>
        <el-form-item label="楼层数" prop="floor">
          <el-input v-model="modelFromdata.floor" placeholder="请输入楼层数" />
        </el-form-item>
        <el-form-item label="单层房间数" prop="room">
          <el-input v-model="modelFromdata.room" placeholder="请输入单层房间数" />
        </el-form-item>
        <el-form-item label="联系人" prop="contact">
          <el-input v-model="modelFromdata.contact" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="联系电话" prop="contactPhone">
          <el-input v-model="modelFromdata.contactPhone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="modelFromdata.remarks"
            type="textarea"
            placeholder="字数不能超过50个字符"
            :rows="6"
            maxlength="50"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <div class="btn-box">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" plain @click="ok">确认</el-button>
      </div>
    </div>
  </el-dialog>

</template>

<script>
import httpRequest from '../../../api/api'

export default {
  name: 'ResidentialModel',
  data() {
    return {
      dialogTableVisible: false,
      modelFromdata: {
        communityId: '',
        buildingName: '',
        unitName: '',
        floor: '',
        room: '',
        remarks: '',
        contact: '',
        contactPhone: ''
      },
      communityArr: [],
      type: '',
      rules: {
        communityId: { required: true, message: '选择小区', trigger: 'change' },
        buildingName: { required: true, message: '输入住宅楼名称', trigger: 'blur' },
        unitName: { required: true, message: '输入单元名称', trigger: 'blur' },
        floor: { required: true, message: '输入楼层', trigger: 'blur' },
        room: { required: true, message: '输入房间号', trigger: 'blur' },
        contact: { required: true, message: '输入联系人', trigger: 'blur' },
        contactPhone: { required: true, message: '输入联系电话', trigger: 'change' }
      },
      url: {
        selectUrl: '/property-manage/community/info/list',
        add: '/property-manage/community/building/info/insert',
        edit: '/property-manage/community/building/info/update'
      }
    }
  },
  mounted() {
    this.getSelectArr()
  },
  methods: {
    // 清空填充项
    modelDatanull() {
      for (var key in this.modelFromdata) {
        this.modelFromdata[key] = ''
      }
    },

    add() {
      this.dialogTableVisible = true
      this.modelDatanull()
    },
    edit(row) {
      this.dialogTableVisible = true
      this.modelFromdata = Object.assign(this.modelFromdata, row)
      // this.modelFromdata.communityId = + this.modelFromdata.communityId
      // console.log(this.modelFromdata)
    },
    selectCode(e) {
      this.modelFromdata.regionCode = e.code
      this.modelFromdata.regionValue = e.regionName
    },
    getSelectArr() {
      httpRequest(this.url.selectUrl, 'GET').then(res => {
        this.communityArr = res.data
      })
    },
    ok() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let url
          if (this.modelFromdata.id) {
            url = this.url.edit
          } else {
            url = this.url.add
          }
          httpRequest(url, 'POST', this.modelFromdata)
            .then(res => {
              if (res.success) {
                this.dialogTableVisible = false
                this.$emit('ok')
              }
            })
        } else {
          return false
        }
      })
    },
    // 取消
    close() {
      this.dialogTableVisible = false
      this.$emit('close')
    }
  }
}

</script>
<style>
    .menuInfo .el-table td, .menuInfo .el-table th {
        padding: 0 !important;
    }
</style>
<style scoped>
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
    }

    .btn-box {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 0 100px;
        box-sizing: border-box;
    }

    .avatar {
        width: 50px;
        height: 50px;
        display: block;
    }

</style>

