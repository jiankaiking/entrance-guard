<template>
  <div class="main-contenner clear">
    <div class="left-options">
      <div class="title">
        区域管理
      </div>
      <el-input v-model="treeKeyWords" class="treeKeyWords" placeholder="请输入">
        <i slot="suffix" class="el-input__icon el-icon-search" />
      </el-input>
      <el-tree
        ref="treeRef"
        lazy
        :data="treeList"
        node-key="id"
        :load="loadTreeNode"
        :props="{label:'treeName',isLeaf:'haveLower'}"
        @node-click="menuNodeClick"
      />
    </div>
    <div class="right-table">
      <div class="searchData">
        <el-form ref="form" :model="searchData" label-width="50px">
          <el-form-item label="名称">
            <el-input v-model="searchData.areaName" placeholder="请输入区域名称" />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="searchData.areaStatus" placeholder="请选择">
              <el-option label="正常" value="1" />
              <el-option label="停用" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="searchData.areaTypeId" clearable placeholder="请选择">
              <el-option v-for="(item,index) in areaTypeArr" :key="index" :label="item.value" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain @click="searchClick">搜索</el-button>
            <el-button plain @click="resetSearch">重置</el-button>
            <el-button type="success" plain @click="personnelHeadAdd">新增区域</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tableData">
        <div class="tableBox">
          <el-table v-loading="loading" border empty-text element-loading-text="拼命加载中" :data="tableData">
            <el-table-column prop="areaName" label="区域名称" align="center" />
            <el-table-column prop="areaTypeName" label="类型" align="center" />
            <el-table-column align="center" prop="createTime" label="创建时间">
              <template slot-scope="scope">
                {{ scope.row.createTime | getTime }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="状态">
              <template slot-scope="scope">
                <el-button type="text" @click="changeSonStatus(scope.row)">
                  <el-switch
                    active-value="1"
                    inactive-value="0"
                    :value="scope.row.areaStatus"
                    active-text="正常"
                    inactive-text="停用"
                  />
                </el-button>
              </template>
            </el-table-column>
            <el-table-column width="200" align="center" label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="edit(scope.row)">编辑</el-button>
                <el-popover :ref="`popover-${scope.row.id}`" width="160" style="text-align: right; margin-left: 10px;">
                  <p>确认删除？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button type="text" size="mini" @click="scope._self.$refs[`popover-${scope.row.id}`].doClose()">
                      取消
                    </el-button>
                    <el-button type="success" size="mini" @click="headDelet(scope.row.id)">确定</el-button>
                  </div>
                  <el-button slot="reference" type="text">删除</el-button>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>

        </div>
        <div class="pagination">
          <el-pagination
            :page-sizes="[10, 20, 50, 100]"
            :page-size="searchData.size"
            :total="total"
            layout=" sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
    <area-admin-model ref="modalForm" :area-type.sync="areaTypeArr" @ok="getTableData" />
  </div>
</template>

<script>

import httpRequest from '../../api/api'
import { myMixins } from '../../mixins/mixin'
import areaAdminModel from './moduleModel/areaAdminModel'

export default {
  name: 'AreaAdmin',
  components: {
    areaAdminModel
  },
  mixins: [myMixins],
  data() {
    return {
      originData: [],
      searchData: {
        areaTypeId: '',
        areaName: '',
        areaStatus: '',
        currentPage: 1,
        size: 10
      },
      treeKeyWords: '', // 机构搜索
      total: 0,
      url: {
        typeList: '/property-manage/area/type/list',
        del: '/property-manage/area/info/delete',
        areaTree: '/property-manage/area/info/tree/area',
        areaTreeInfo: '/property-manage/area/info/tree'
      },
      areaTypeArr: [],
      listUrl: '/property-manage/area/info/page',
      dialogTableVisible: false,
      tableData: [],
      treeList: []
    }
  },
  watch: {
    treeKeyWords(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this.getTypeArr()
  },
  methods: {
    getTypeArr() {
      httpRequest(this.url.typeList, 'GET')
        .then(res => {
          this.areaTypeArr = res.data
        })
    },
    // 编辑
    edit(row) {
      this.$refs.modalForm.edit(row)
    },
    // 新增
    personnelHeadAdd() {
      this.$refs.modalForm.add()
    },
    // 机构搜索
    filterNode(value, data) {
      if (!value) return true
      return data.organName.indexOf(value) !== -1
    },
    // 树状图展开
    expandedStructure(data) {
      this.searchData.organId = data.organId
      this.getTableData()
    },
    // 树形结构点击搜索
    menuNodeClick(e) {
      if (!e.isArea) {
        this.searchData.areaName = e.treeName
        this.getTableData()
      }
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
            resolve(res.data)
          } else if (node) {
            console.log(123)
            node.doCreateChildren(res.data)
            this.$nextTick(() => {
              this.$refs.tree.setCurrentKey(this.selectNodeData[this.nodeKey])
              this.$refs.tree.store.nodesMap[this.selectNodeData[this.nodeKey]].expanded = true
            })
          } else if (!this.lazy) {
            resolve(res.data)
            this.treeList = res.data
          }
        })
    },

    changeSonStatus(row) {
      httpRequest('/property-manage/area/info/stop', 'post', {
        id: row.id,
        status: row.areaStatus === '0' ? '1' : '0'
      }).then(res => {
        if (res.code === 200) {
          this.getTableData()
        }
      })
    },
    changeStatusStaff(id, status) {
      httpRequest('/managecenter/staffManage/offOrNoStaff', 'POST', {
        staffId: id,
        userStatus: status === 0 ? 1 : 0
      })
        .then(res => {
          this.getTableData()
        })
    }
  }
}
</script>

<style scoped>

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
}

.treeKeyWords {
  margin-bottom: 40px;
}

.tableData {
  background: #ffffff;
  box-shadow: 0px 1px 6px 4px rgba(242, 242, 242, 1);

}

.tableData .tableBox {
  padding: 30px;
  box-sizing: border-box;

}

.tableData .pagination {
  padding-bottom: 30px;
}
</style>
