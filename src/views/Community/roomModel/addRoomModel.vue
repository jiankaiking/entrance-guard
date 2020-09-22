<template>
  <el-dialog title="房间信息" center width="30%" :visible.sync="dialogTableVisible">
    <div class="menuInfo">
      <el-form ref="form" :model="modelFromdata" :rules="rules" label-width="120px">
        <el-form-item label="小区名称" prop="communityId">
          <el-select v-model="modelFromdata.communityId" placeholder="请选择小区" @change="changeComm">
            <el-option v-for="item in communityArr" :key="item.id" :label="item.value" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="住宅楼名称" prop="buildingId">
          <el-select v-model="modelFromdata.buildingId" placeholder="请选择住宅楼" @change="changeBuilding">
            <el-option v-for="item in communityBuildingArr" :key="item.id" :label="item.value" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="单元名称" prop="unitId">
          <el-select v-model="modelFromdata.unitId" placeholder="请选择单元">
            <el-option v-for="item in unitArr" :key="item.id" :label="item.value" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="房间号" prop="roomNo">
          <el-input v-model="modelFromdata.roomNo" placeholder="请输入房间号" />
        </el-form-item>
        <el-form-item label="住宅类型" prop="buildingType">
          <el-select v-model="modelFromdata.buildingType" placeholder="请选择住宅类型">
            <el-option v-for="item in buildingTypeArr" :key="item.code" :label="item.label" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item label="建筑面积" prop="roomArea">
          <el-input
            v-model.number="modelFromdata.roomArea"
            max-length="9"
            placeholder="请输入建筑面积"
          />
        </el-form-item>
        <el-form-item label="房间类型" prop="roomType">
          <el-input v-model="modelFromdata.roomType" placeholder="请输入房间类型" />
        </el-form-item>
        <el-form-item label="朝向" prop="roomToward">
          <el-input v-model="modelFromdata.roomToward" placeholder="请输入房间朝向" />
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
import { getData } from '@/util/filter'

export default {
  name: 'AddRoomModel',
  data() {
    return {
      dialogTableVisible: false,
      modelFromdata: {
        communityId: '',
        buildingId: '',
        unitId: '',
        buildingType: '',
        roomNo: '',
        roomArea: '',
        roomType: '',
        roomToward: ''
      },
      communityArr: [],
      communityBuildingArr: [],
      unitArr: [],
      type: '',
      rules: {
        communityId: { required: true, message: '选择小区', trigger: 'change' },
        buildingId: { required: true, message: '选择住宅楼', trigger: 'change' },
        roomNo: { required: true, message: '输入房间号', trigger: 'blur' },
        roomType: { required: true, message: '输入房间类型', trigger: 'blur' },
        roomArea: [{ required: true, message: '输入建筑面积', trigger: 'blur' },
          { type: 'number', message: '只能输入数字', trigger: 'blur' }],
        buildingType: { required: true, message: '选择住宅楼类型', trigger: 'change' },
        unitId: { required: true, message: '选择单元楼', trigger: 'change' },
        roomToward: { required: true, message: '请输入房间朝向', trigger: 'blur' }
      },
      buildingTypeArr: getData('buildingType'),
      url: {
        selectUrl: '/property-manage/community/info/list',
        add: '/property-manage/community/room/info/insert',
        edit: '/property-manage/community/room/info/update'
      }
    }
  },
  mounted() {
    this.getSelectArr()
  },
  methods: {
    changeComm(communityId) {
      this.modelFromdata.buildingId = ''
      this.modelFromdata.unitId = ''
      httpRequest('/property-manage/community/building/info/building/list', 'GET', { communityId })
        .then(res => {
          this.communityBuildingArr = res.data
        })
    },
    changeBuilding(buildingId) {
      this.modelFromdata.unitId = ''
      httpRequest('/property-manage/community/building/info/unit/list', 'GET', { buildingId })
        .then(res => {
          this.unitArr = res.data
        })
    },
    modelDatanull() {
      this.$nextTick(() => {
        this.$refs.form.resetFields()
      })
    },

    add() {
      this.dialogTableVisible = true
      this.modelDatanull()
    },
    edit(row) {
      this.changeComm(row.communityId)
      this.changeBuilding(row.buildingId)
      this.dialogTableVisible = true
      this.modelFromdata = Object.assign(this.modelFromdata, row)
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
      console.log(this.modelFromdata)
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
<style scoped>
.btn-box {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 100px;
  box-sizing: border-box;
}

.btn-box {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 100px;
  box-sizing: border-box;
}
</style>

