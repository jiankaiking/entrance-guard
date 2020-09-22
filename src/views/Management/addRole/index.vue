<template>
  <div>
    <ul class="tab-li">
      <li class="tabSelect"><a href="javascript:;">员工信息</a><i /></li>
    </ul>
    <div class="roleInfo">
      <treeTransfer
        :title="['未选','已选']"
        :from_data="noRoles"
        node_key="roleId"
        :to_data="alreadyRoles"
        :default-props="{label:'roleName'}"
        mode="transfer"
        @addBtn="addMove"
        @removeBtn="remove"
      />
      <div style="text-align:center;margin-top:30px;">
        <el-button @click="tabClick">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import httpRequest from '../../../api/api'
import treeTransfer from 'el-tree-transfer'
export default {
  name: 'PersonnelModel',
  components: { treeTransfer },
  data() {
    return {
      noRoles: [],
      alreadyRoles: [],
      tabSelected: true,
      newBtnStatus: false,
      modelFromdata: {
        roleIds: ''
      },
      url: {
        add: '/managecenter/staffManage/addStaff',
        info: '/managecenter/staffManage/getStaffInfo',
        edit: '/managecenter/staffManage/editStaffInfo'
      }
    }
  },
  mounted() {
    this.department()
  },
  methods: {
    // 角色信息选择
    addMove(fromData, toData, obj) {
      if (this.modelFromdata.roleIds === '') {
        this.modelFromdata.roleIds = obj.keys.join(',')
      } else {
        var str = this.modelFromdata.roleIds.split(',')
        var arr = str.concat(obj.keys)
        this.modelFromdata.roleIds = arr.join(',')
      }
    },
    // 角色信息移除
    remove(fromData, toData, obj) {
      console.log(obj, this.modelFromdata.roleIds)
      var roleIdArr = this.modelFromdata.roleIds.split(',')
      // console.log(roleIdArr)
      for (var i = 0; i < roleIdArr.length; i++) {
        for (var j = 0; j < obj.keys.length; j++) {
          if (roleIdArr[i] === obj.keys[j]) {
            // console.log(roleIdArr[i],i)
            roleIdArr.splice(i, 1)
            // console.log(roleIdArr)
          }
        }
      }
      // console.log(roleIdArr)
      this.modelFromdata.roleIds = roleIdArr.join(',')
    },
    getOrganInfo() {
      httpRequest('/managecenter/organManage/getOrganInfo', 'get')
    },
    // 正面照
    handleAvatarSuccess(res) {
      this.modelFromdata.staffPhotos = res.data
    },
    add() {

    },
    edit(record) {
      httpRequest(this.url.info, 'get', { staffId: record.staffId })
        .then(res => {
          this.modelFromdata = res.data
        })
      httpRequest('/managecenter/roleManage/getUnSelectedRoleListByUserId', 'GET', { staffId: record.staffId })
        .then(res => {
          this.noRoles = res.data
        })
      httpRequest('/managecenter/roleManage/getSelectedRoleListByUserId', 'get', { staffId: record.staffId })
        .then(res => {
          this.alreadyRoles = res.data
          var arr = []
          for (var i = 0; i < res.data.length; i++) {
            arr.push(res.data[i]['roleId'])
          }
          this.modelFromdata.roleIds = arr.join(',')
        })
    },
    close() {
      this.$emit('close')
    },
    closeMessage() {
      this.$refs.form.clearValidate()
    },
    addStaff() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const that = this
          httpRequest(this.url.add, 'post', this.modelFromdata)
            .then((res) => {
              if (res.success) {
                that.$message.success(res.msg)
                if (this.modelFromdata.staffId === this.$store.state.user.userId) {
                  this.$store.dispatch('LogOut')
                } else {
                  this.$emit('ok')
                }
                // this.modelFromdata.staffId === this.$store.state.user.userId && this.$store.dispatch('LogOut')
              }
            })
        } else {
          return false
        }
      })
    },
    handleOk(modelFromdata) {
      if (this.modelFromdata.staffId === this.$store.state.user.userId) {
        this.$confirm('编辑登录账号信息要重新登录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.addStaff()
        }).catch(() => {

        })
      } else {
        this.addStaff()
      }
    }
  }

}
</script>
<style>
    .organ-from .el-select {
        width: 48% !important;
    }

</style>

<style scoped>

    .tab-li{
        position: absolute;
        top: 25px;
        left: 45%;
        display: flex;
        justify-items: center;
        align-content: center;
        text-align: center;
    }
    .tab-li li+li{
        margin-left: 20px;
    }
    .tab-li li i{
        display: block;
        width: 80px;
        height: 3px;
        background-color: #fff;
    }
    .roleInfo{
        padding: 50px;
    }
    .tabSelect a{
        color: #000;
        font-weight: bold;
    }
    .tabSelect i{
        background-color: #38b8ee !important;
    }
    .avatar {
        width: 50px;
        height: 50px;
    }
    a{
        text-decoration:none;
        color: #CACACA;
        font-size: 20px;
    }
    .center-button {
        width: 300px;
        margin: 0 auto;
        padding-top: 50px;
    }
    .center-button button {
        width: 100px;
        height: 36px;
    }
    .center-button .app-button {
        background-color: #38B8EE;
        color: #ffffff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
    }
</style>
