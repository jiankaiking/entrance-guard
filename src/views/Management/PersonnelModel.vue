<template>
  <div>
    <ul class="tab-li">
      <li v-if="tabSelected" :class="{tabSelect:tabSelected}"><a href="javascript:;">员工信息</a><i /></li>
      <li v-if="!tabSelected" v-show="newBtnStatus" :class="{tabSelect:!tabSelected}"><a
        href="javascript:;"
      >角色信息</a><i /></li>
    </ul>
    <el-form
      v-show="tabSelected"
      ref="form"
      :rules="rules"
      :model="modelFromdata"
      style="padding: 0 50px; padding-top:50px; box-sizing: border-box"
      label-width="120px"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="头像:">
            <uploadImg :img-url.sync="modelFromdata.staffPhotos" />
            <span style="margin-left: 20px">点击选择头像</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="真实姓名:" prop="staffFullName">
            <el-input v-model="modelFromdata.staffFullName" placeholder="请输入真实姓名" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户名:">
            <el-input v-model="modelFromdata.loginUserName" placeholder="请输入用户名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="昵称(花名):">
            <el-input v-model="modelFromdata.staffAlias" placeholder="请输入花名" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="性别:">
            <el-radio-group v-model="modelFromdata.staffSex">
              <el-radio :label="0">男</el-radio>
              <el-radio :label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号:" prop="staffPhone">
            <el-input v-model="modelFromdata.staffPhone" placeholder="请输入手机号" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="初始密码:">
            <el-input v-model="modelFromdata.loginPwd" placeholder="输入修改的密码" />
          </el-form-item>
        </el-col>
        <el-col :span="12" class="organ-from">
          <el-form-item label="所属部门:" prop="position">
            <el-select v-model="modelFromdata.organId" style="width:48%" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.organId"
                :label="item.organName"
                :value="item.organId"
              />
            </el-select>
            <el-input v-model="modelFromdata.position" placeholder="请输入职位" style="width:48%;margin-left:3%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="入职时间:">
            <el-date-picker
              v-model="modelFromdata.entryTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="生日:">
            <el-date-picker
              v-model="modelFromdata.staffBirthday"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="邮箱:">
            <el-input v-model="modelFromdata.loginEmail" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态:">
            <el-radio-group v-model="modelFromdata.staffStatus">
              <el-radio label="0">停用</el-radio>
              <el-radio label="1">正常</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <div class="center-button">
          <el-button @click="close">取消</el-button>
          <el-button class="app-button" @click="handleOk(modelFromdata)">确认</el-button>
        </div>
      </el-form-item>
    </el-form>
    <div v-show="!tabSelected" class="roleInfo">
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
        <el-button @click="handleOk">确认</el-button>
      </div>
    </div>
  </div>

</template>

<script>
import staffPhotos from '@/assets/images/77.png'
import uploadImg from '../../components/uploadImg/uploadImg'
import httpRequest from '../../api/api'
import treeTransfer from 'el-tree-transfer'

export default {
  name: 'PersonnelModel',
  components: {
    uploadImg, treeTransfer
  },
  data() {
    return {
      noRoles: [],
      alreadyRoles: [],
      tabSelected: true,
      newBtnStatus: false,
      options: [],
      modelFromdata: {
        staffPhotos: staffPhotos,
        staffFullName: '', // 真实姓名
        loginUserName: '', // 用户名（登录
        staffAlias: '', // 花名
        staffPhone: '', // 手机号
        loginPwd: '', // 初始密码
        staffSex: 0, // 性别（0 女 1 男）
        staffStatus: '1', // 状态（0 停用 1 启用）
        organId: '', // 机构id 所属部门id
        position: '', // 职位
        entryTime: '', // 入职时间
        staffBirthday: '', // 生日
        loginEmail: '', // 邮箱
        roleIds: ''
      },
      rules: {
        staffFullName: { required: true, message: '请输入真实姓名', trigger: 'blur' },
        staffPhone: { required: true, message: '请输入手机号', trigger: 'blur' },
        loginPwd: { required: true, message: '请输入密码', trigger: 'blur' },
        position: { required: true, message: '请输入职位', trigger: 'blur' }
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
    // 角色信息切换
    getOrganInfo() {
      httpRequest('/managecenter/organManage/getOrganInfo', 'get')
    },
    // 所属部门
    department() {
      httpRequest('/managecenter/organManage/getChildOrganList', 'GET')
        .then(res => {
          this.options = res.data
        })
    },
    // 正面照
    handleAvatarSuccess(res) {
      this.modelFromdata.staffPhotos = res.data
    },
    add() {
      this.newBtnStatus = false
      this.tabSelected = true
      for (var key in this.modelFromdata) {
        if (key === 'staffStatus') {
          this.modelFromdata[key] = '1'
        } else {
          this.modelFromdata[key] = ''
        }
      }
    },
    edit({ record, flag }) {
      this.newBtnStatus = true
      this.tabSelected = flag
      delete this.rules['loginPwd']
      // 员工详情
      httpRequest(this.url.info, 'get', { staffId: record.staffId })
        .then(res => {
          delete res.data.organName
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

.tab-li {
  position: absolute;
  top: 25px;
  left: 45%;
  display: flex;
  justify-items: center;
  align-content: center;
  text-align: center;
}

.tab-li li + li {
  margin-left: 20px;
}

.tab-li li i {
  display: block;
  width: 80px;
  height: 3px;
  background-color: #fff;
}

.roleInfo {
  padding: 50px;
}

.tabSelect a {
  color: #000;
  font-weight: bold;
}

.tabSelect i {
  background-color: #38b8ee !important;
}

.avatar {
  width: 50px;
  height: 50px;
}

a {
  text-decoration: none;
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
