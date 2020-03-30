<template>
  <el-form  label-width="120px" style="padding: 0 40px; box-sizing: border-box">
      <el-row>
          <el-col :span="12">
              <el-form-item label="设备sn号:" >
                  <el-input v-model="searchData.snCode"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="设备型号:">
                  <el-input v-model="searchData.deviceTypeCode"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="商家名称:">
                  <el-input v-model="searchData.sellerName"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="门店名称:">
                  <el-input v-model="searchData.storeName"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="申请时间:">
                  <el-input v-model="searchData.applyBindTime"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="绑定状态:">
                  <el-input  v-model="searchData.bindStatus"></el-input>
              </el-form-item>
          </el-col>
      </el-row>
          <el-col :span="12" v-if="searchData.bindStatus=='已绑定'||searchData.bindStatus=='解绑申请驳回'">
              <el-form-item label="绑定时间:">
                  <el-input v-model="searchData.bindTime"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12" v-if="searchData.bindStatus=='已解绑'">
              <el-form-item label="解绑时间:">
                  <el-input v-model="searchData.unbindTime"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12" v-if="searchData.bindStatus=='解绑待审核'||searchData.bindStatus=='解绑申请驳回'">
              <el-form-item label="申请解绑时间:">
                  <el-input v-model="searchData.applyUnbindTime"></el-input>
              </el-form-item>
          </el-col>
      <el-row v-if="searchData.bindStatus=='解绑申请驳回'">
          <el-col :span="12">
              <el-form-item label="驳回原因:">
                  <el-input v-model="searchData.auditDescription" type="textarea"
                            :rows="5"></el-input>
              </el-form-item>
          </el-col>
      </el-row>
      <el-button style="margin-top: 60px;" @click="heldHid">返回</el-button>
  </el-form>
</template>

<script>
    import httpRequest from "../../../api/api"
    export default {
        name: "EquimentInfo",
        props:{
            deviceId:{
                type:Number
            }
        },
        data() {
            return {
                searchData: {
                },
            }
        },
        mounted(){
            httpRequest('managecenter/deviceManage/device/getDeviceInfoAtAgent', 'get',{deviceId:this.deviceId})
                    .then(res => {
                        if (res.success) {
                            this.searchData=res.data
                        }
                    })
        },
        methods:{
            heldHid(){
                this.$emit('close')
            }
        }
    }
</script>

<style scoped>

</style>
