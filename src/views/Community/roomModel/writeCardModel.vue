<template>
  <div class="main-contenner clear">
    <div class="card-main">
      <div id="act" ref="emergencyCommandPage"></div>
      <!--      <object id="obj_ie" classid="clsid:8B5A1D0B-4142-4EE1-B247-56DFD7C1CACA" width="6" height="14" align="left" />-->
    </div>
    <div class="ic-card-no">
      <span>ic卡编号</span>
      <div class="ic-input">
        <el-input v-model="icCardNo" readonly />
      </div>
    </div>
    <div class="ic-card-no">
      <span>选中设备数</span>
      <div class="ic-input">
        {{ tableDataByOptions.length }}
      </div>
      <div class="ic-input">
        <el-button>重置</el-button>
      </div>
    </div>
    <div class="left-options">
      <div class="title">
        区域
      </div>
      <el-input v-model="treeKeyWords" class="treeKeyWords" placeholder="请输入">
        <i slot="suffix" class="el-input__icon el-icon-search" />
      </el-input>
      <el-tree
        ref="treeRef"
        :lazy="lazy"
        :data="treeList"
        node-key="id"
        :load="loadTreeNode"
        :props="{label:'treeName',isLeaf:'haveLower'}"
        @node-click="menuNodeClick"
      />
    </div>
    <div class="right-table">
      <el-form inline style="margin-bottom: 15px;">
        <el-form-item label="设备名称">
          <el-input v-model="searchData.equipmentName" />
        </el-form-item>
        <el-form-item label="设备编号">
          <el-input v-model="searchData.equipmentNo" />
        </el-form-item>
        <el-form-item>
          <el-button>查询</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
      <div class="tableData">
        <div class="tableBox flex-box">
          <el-table
            ref="multipleTable"
            border
            :data="tableData"
            :header-cell-style="{background:'#f5f7fa'}"
            @select-all="selectAll"
            @clearSelection="clearSelect"
            @select="onSelect"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column prop="equipmentName" label="设备名称" />
            <el-table-column prop="equipmentNo" label="设备编号" />
            <el-table-column prop="equipmentTypeName" label="设备类型" />
            <el-table-column prop="areaName" label="所在区域" />
          </el-table>
        </div>
      </div>
    </div>
    <div>
      <el-button @click="close">取消</el-button>
      <el-button type="success" @click="add">确认</el-button>
    </div>
  </div>
</template>

<script>
import httpRequest from '@/api/api'
// import debounce from '@/util/utils'
// import { myMixins } from '../../mixins/mixin'

export default {
  name: 'WriteCardModel',
  data() {
    return {
      icCardNo: '',
      roomId: '',
      equipmentIds: [],
      ocx: {},
      isComOpen: false,
      icdev: 0,
      nRead: 0,
      hasCard: false,
      timer: null,
      gl_sector: 2,
      gl_BinBlock: 8,
      gl_valBlock: 9,
      originData: [],
      searchData: {
        equipmentName: '',
        equipmentNo: '',
        areaId: ''
      },
      total: 0,
      tableDataByOptions: [],
      tableData: [],
      lazy: true,
      treeList: [],
      url: {
        areaTree: '/property-manage/equipment/info/tree',
        areaTreeInfo: '/property-manage/area/info/tree',
        getEquipmentByIc: '/property-manage/community/room/info/get/equipment/by/ic',
        getAreaEquipmentUrl: '/property-manage/community/room/info/equipment/list',
        icWrite: '/property-manage/community/room/info/ic/write',
        icUpdate: '/property-manage/community/room/info/ic/update'
      },
      treeKeyWords: '' // 机构搜索
    }
  },
  watch: {
    treeKeyWords(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this.insetObj()
    // 监听刷新页面断开连接
    window.addEventListener('beforeunload', this.unLink)
    this.$once('hook:beoforeDestroy', this.unLink)
  },
  methods: {
    handleSelectionChange(rows) {
    },
    selectAll(e) {
      if (e.length) {
        this.tableDataByOptions = [...this.tableDataByOptions, ...e]
        this.tableDataByOptions = this.tableDataByOptions.filter((x, index, self) => {
          var arrids = []
          this.tableDataByOptions.forEach((item, i) => {
            arrids.push(item.id)
          })
          return arrids.indexOf(x.id) === index
        })
        // console.log(this.tableDataByOptions, '111')
        // this.filterTable()
      } else {
        this.filterTable()
      }
    },
    clearSelect(e) {
      console.log(e, 'clearSelect')
    },
    onSelect(rows, row) {
      const selected = rows.length && rows.indexOf(row) !== -1
      if (selected) {
        this.tableDataByOptions.push(row)
      } else {
        this.tableDataByOptions = this.tableDataByOptions.filter(item => item.id !== row.id)
      }
    },
    filterTable() {
      if (this.tableDataByOptions.length) {
        this.tableDataByOptions.forEach((_item, _index) => {
          this.tableData.forEach((o_item, o_index) => {
            if (_item.id === o_item.id) {
              this.tableDataByOptions.splice(_index, 1)
            }
          })
        })
      }
    },
    // 机构搜索
    filterNode(value, data) {
      if (!value) return true
      return data.organName.indexOf(value) !== -1
    },
    // 区域树点击
    menuNodeClick(e) {
      if (!e.isArea) {
        this.searchData.areaId = e.id
        this.getAreaEquipment()
      }
    },
    // 获取区域下面的设备
    getAreaEquipment() {
      httpRequest(this.url.getAreaEquipmentUrl, 'GET', { ...this.searchData })
        .then(res => {
          this.tableData = res.data
        })
    },
    // 获取ic卡的绑定的设备
    getEquipmentByIcard() {
      if (!this.icCardNo) return this.$message.error('请先读卡')
      httpRequest(this.url.getEquipmentByIc, 'GET', { icCardNo: this.icCardNo })
        .then(res => {
          if (res.code === 200) {
            this.tableDataByOptions = res.data
          }
        })
    },
    add() {
      console.log(this.tableDataByOptions)
      const equipmentIds = this.tableDataByOptions.map(item => item.id)
      const icCardNo = this.icCardNo
      const roomId = this.roomId
      console.log({ equipmentIds, icCardNo, roomId })
      httpRequest(this.url.icWrite, 'get', { equipmentIds, icCardNo, roomId })
        .then(res => {
          console.log(res)
        })
    },
    loadTreeNode(node, resolve) {
      if (node.level === 0) {
        httpRequest(this.url.areaTreeInfo, 'GET')
          .then(res => {
            res.data.forEach(item => {
              item.isArea = true
            })
            resolve(res.data)
          })
        return
      }
      const pid = node.data.id
      const url = this.url.areaTree
      httpRequest(url, 'GET', { pid: pid, level: node.level === 1 ? 0 : 1 })
        .then(res => {
          if (resolve) {
            res.data.forEach(item => {
              item.treeName = `${item.treeName}(${item.equipmentCount}个)`
            })
            resolve(res.data)
          }
        })
    },
    // 初始化obj对象
    insetObj() {
      const obj = document.createElement('OBJECT')
      obj.setAttribute('id', 'obj_ie')
      obj.setAttribute('classid', 'clsid:8B5A1D0B-4142-4EE1-B247-56DFD7C1CACA')
      obj.setAttribute('width', 6)
      obj.setAttribute('height', 14)
      this.$refs.emergencyCommandPage.appendChild(obj)
      this.ocx = document.getElementById('obj_ie')
    },
    // 连接
    Connect(id) {
      this.roomId = id
      var iRet
      var eeprwOffset = 0
      var eeprwLen = 5
      this.icCardNo = ''
      var obj = this.ocx
      let { icdev, isComOpen } = this
      try {
        // if reader link failed
        if (!isComOpen) {
          let hdev = 1
          iRet = obj.initialcom(100, 115200) // Link reader, 100 means USB port, 115200 is baud
          console.log(iRet)
          if (iRet !== -1) {
            this.icdev = iRet
            let data = ''
            hdev = obj.beep(icdev, 10) // do a beep
            data = obj.GetDevSN(icdev)
            isComOpen = true // Set reader link status
            obj.swr_eeprom(icdev, eeprwOffset, eeprwLen, '链接成功')
            data = obj.srd_eeprom(icdev, eeprwOffset, eeprwLen)
            console.log(data, '链接成功')
            this.findcard()
          } else {
            isComOpen = false
          }
        }
      } catch (e) {
        alert(e.message)
      }
      return
    },
    // 卡号
    findcard() {
      clearTimeout(this.timer)
      var strcard = ''
      const { icdev, ocx } = this
      strcard = ocx.findcardStr(icdev, 0)// 1);     //1: multy card mode
      if (strcard !== '') {
        // console.log('strcard' + strcard)
        this.hasCard = true
        this.icCardNo = strcard
        this.getEquipmentByIcard()
        ocx.halt(icdev)
        ocx.beep(icdev, 5)
        return
      } else {
        this.hasCard = false
      }
      this.timer = setTimeout(this.findcard, 200)
    },
    // 关闭读写器
    unLink() {
      var iRet
      iRet = this.ocx.exit(this.icdev)
      if (iRet) {
        console.log('UnLink with reader error')
      } else {
        console.log('Unlink with reader ok')
        this.isComOpen = false // Set unlink status
      }
      clearTimeout(this.timer)
    },
    close() {
      this.$emit('close')
    }
  },
  beforeDestory() {
    this.unLink()
  }
}
</script>

<style scoped lang="scss">
.ic-card-no {
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  .ic-input {
    width: 200px;
    margin-left: 15px;
  }
}

.left-options {
  float: left;
  margin-right: 25px;
  width: 22%;
  background: #ffffff;
  height: 100%;
  box-shadow: 0px 1px 6px 4px rgba(242, 242, 242, 1);
  border-radius: 8px;
  padding: 20px 33px;
  box-sizing: border-box;
}

.right-table {
  float: left;
  width: 75%;
  margin-bottom: 150px;
}

.treeKeyWords {
  margin-bottom: 40px;
}

</style>
