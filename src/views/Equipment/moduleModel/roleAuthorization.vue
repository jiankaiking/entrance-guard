<template>
  <el-dialog title="设备信息 " :visible.sync="centerDialogVisible" width="50%" center>
    <div class="roleInfo">
      <treeTransfer
        :title="['未选','已选']"
        :from_data="noRoles"
        node_key="organId"
        :to_data="alreadyRoles"
        :default-props="{label:'organName',children: 'hasChildren'}"
        lazy
        open-all
        :lazy-fn="loadNode"
        mode="transfer"
        @addBtn="addMove"
        @removeBtn="remove"
      />
      <div>
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button @click="ok">确认</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import httpRequest from '../../../api/api'
import treeTransfer from 'el-tree-transfer'

export default {
  name: 'PersonnelModel',
  components: {
    treeTransfer
  },
  data() {
    return {
      noRoles: [],
      alreadyRoles: [],
      centerDialogVisible: false,
      options: [],
      modelFromdata: {
        equipmentId: '',
        organIds: []
      },
      url: {
        add: '/managecenter/staffManage/addStaff',
        info: '/managecenter/staffManage/getStaffInfo',
        edit: '/managecenter/staffManage/editStaffInfo'
      }
    }
  },
  mounted() {
  },
  methods: {
    roleInfo(row) {
      this.centerDialogVisible = true
      this.modelFromdata.equipmentId = row.id
      httpRequest('/managecenter/organManage/getOrganList', 'GET', { organId: 0 })
        .then(res => {
          this.noRoles = res.data
        })
    },
    loadNode(node, resolve) {
      httpRequest('/managecenter/organManage/getOrganList', 'GET', { organId: node.data.organId })
        .then(res => {
          resolve(res.data)
        })
    },

    // 角色信息选择

    addMove(fromData, toData, obj) {
      console.log(fromData, toData, obj)
      this.modelFromdata.organIds = obj.keys
    },
    // 角色信息移除
    remove(fromData, toData, obj) {
      this.modelFromdata.organIds = obj.keys
    },

    ok() {
      const data = JSON.parse(JSON.stringify(this.modelFromdata))
      data.organIds = data.organIds.join(',')
      httpRequest('/managecenter/staffManage/editStaffToEquipment', 'POST', data)
        .then(res => {
          if (res.code === 200) {
            this.$emit('ok')
            this.centerDialogVisible = false
          }
        })
    }
  }

}
</script>
<style>

</style>

<style scoped>

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
    a {
        text-decoration: none;
        color: #CACACA;
        font-size: 20px;
    }

    .center-button button {
        width: 100px;
        height: 36px;
    }
</style>
