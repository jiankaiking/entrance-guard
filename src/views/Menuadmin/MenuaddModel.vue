<template>
  <div class="menuInfo">
    <el-form
      v-if="type == 'add'"
      ref="form"
      :model="modelFromdata"
      label-width="80px"
      style="padding: 0 30px; box-sizing: border-box;"
    >
      <el-form-item label="*上级菜单">
        <el-input v-model="menuInfo.menuName" disabled />
      </el-form-item>
      <el-form-item label="*菜单类型">
        <el-radio-group v-model="modelFromdata.menuType">
          <el-radio :label="0">目录</el-radio>
          <el-radio :label="1">菜单</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="*菜单名称">
        <el-input v-model="modelFromdata.menuName" placeholder="请输入菜单名称" />
      </el-form-item>
      <el-form-item label="请求地址">
        <el-input v-model="modelFromdata.menuUrl" placeholder="请输入请求地址" />
      </el-form-item>
      <el-form-item label="链接目标">
        <el-select v-model="modelFromdata.menuMode">
          <el-option
            v-for="(item,index) in typeData"
            :key="index"
            :value="item.dataValue"
            :label="item.dataCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="图标">
        <el-col :span="3">
          <uploadImg :img-url.sync="modelFromdata.menuIcon" />
        </el-col>
      </el-form-item>
      <el-form-item label="显示排序">
        <el-input-number v-model="modelFromdata.menuSort" :min="1" />
      </el-form-item>
      <el-form-item label="*菜单类型">
        <el-radio-group v-model="modelFromdata.menuStatus">
          <el-radio label="1">显示</el-radio>
          <el-radio label="0">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model="modelFromdata.menuRemarks"
          type="textarea"
          placeholder="字数不能超过50个字符"
          :rows="6"
          maxlength="50"
          show-word-limit
        />
      </el-form-item>
    </el-form>
    <el-form v-if="type == 'info'" label-width="150px" class="menuinfo-form">
      <el-form-item label="排序:">
        <span>{{ infoData.menuSort }}</span>
      </el-form-item>
      <el-form-item label="类型:">
        <span>{{ infoData.menuTypeName }}</span>
      </el-form-item>
      <el-form-item label="请求地址:">
        <span>{{ infoData.menuUrl }}</span>
      </el-form-item>
      <el-form-item label="状态:">
        <span>{{ infoData.menuStatusName }}</span>
      </el-form-item>
      <el-form-item label="连接目标:">
        <span>{{ infoData.menuModeName }}</span>
      </el-form-item>
      <el-form-item label="所属角色:">
        <span>{{ infoData.roleNum }}</span>
      </el-form-item>
      <el-form-item label="备注:">
        <span>{{ infoData.menuRemarks }}</span>
      </el-form-item>
      <el-form-item label-width="0">
        <el-table :data="tableData" height="210px" border style="width: 99.9%">
          <el-table-column prop="roleName" align="center" label="角色名称" />
          <el-table-column prop="createUserName" align="center" label="创建人" />
          <el-table-column prop="createTime" align="center" label="创建时间" />
          <el-table-column prop="roleRemarks" align="center" label="描述" />
        </el-table>
      </el-form-item>
    </el-form>
    <div class="btn-box">
      <el-button v-if="type == 'add'" type="primary" plain @click="ok">立即创建</el-button>
      <el-button @click="close">取消</el-button>
    </div>
  </div>
</template>

<script>
import uploadImg from '../../components/uploadImg/uploadImg'
import httpRequest from '../../api/api'

export default {
  name: 'Menuaddmodel',

  components: {
    uploadImg
  },
  data() {
    return {
      modelFromdata: {
        menuName: '', // 菜单名称
        menuStatus: '1', // 菜单状态
        menuPid: '', // 菜单父节点ID，根节点0
        menuType: '', // 菜单类型
        menuUrl: '', // 菜单访问路径
        menuMode: '', // 菜单模式
        menuSort: '', // 菜单顺序
        menuRemarks: '', // 菜单备注
        systemId: '', // 所属业务系统
        menuIcon: ''// 菜单图标URL
      },
      menuInfo: {},
      infoData: {},
      typeData: [],
      type: '',
      url: {
        add: '/managecenter/menuManage/addMenu',
        info: '/managecenter/menuManage/getMenuInfo'
      },
      tableData: [{}]
    }
  },
  methods: {
    // 清空填充项
    modelDatanull() {
      for (var key in this.modelFromdata) {
        this.modelFromdata[key] = ''
      }
      this.modelFromdata.isLadder = 0
    },

    add(menuInfo) {
      this.type = 'add'
      this.getType()
      this.modelDatanull()
      this.menuInfo = menuInfo
      this.modelFromdata.menuPid = menuInfo.menuId
    },
    info(id) {
      this.type = 'info'
      httpRequest(this.url.info, 'GET', { menuId: id })
        .then(res => {
          this.infoData = res.data
          this.getOperatingInfo(res.data.menuId)
        })
    },
    // 获取操作信息
    getOperatingInfo(id) {
      httpRequest('/managecenter/menuManage/getMenuInfoAndRoleList', 'GET', { menuId: id })
        .then(res => {
          this.tableData = res.data.records
        })
    },
    // 获取链接目标类型
    getType() {
      httpRequest('/managecenter/sysDict/getDataListByType', 'GET', { dataType: 'menu_mode' })
        .then(res => {
          this.typeData = res.data
        })
    },
    // 新增菜单
    ok() {
      this.modelFromdata.menuPid = this.modelFromdata.menuPid ? this.modelFromdata.menuPid : 0
      httpRequest(this.url.add, 'POST', this.modelFromdata)
        .then(res => {
          if (res.success) {
            this.$message.success(res.msg)
            this.$emit('ok', this.modelFromdata.menuPid)
          }
        })
    },
    // 取消
    close() {
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

    /*.menuInfo .el-form-item{*/
    /*    margin-bottom: 0;*/
    /*}*/

    .avatar {
        width: 50px;
        height: 50px;
        display: block;
    }
</style>
