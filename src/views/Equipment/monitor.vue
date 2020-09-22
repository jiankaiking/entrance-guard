<template>
  <div class="main-contenner clear">
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
        @node-click="nodeClick"
      />
    </div>
    <div class="right-table">
      <div class="tableData" v-loading="loading">
        <div class="tableBox flex-box">
          <div v-for="(item,index) in tableData" :key="index" class="monitor-item">
            <span>设备名称：{{ item.equipmentName }}</span>
            <span>管理区域：{{ item.areaName }}</span>
            <span><i class="el-icon-warning" />呼叫物业</span>
            <span><el-button type="success" @click="lookMonior">查看监控</el-button></span>
          </div>
        </div>
        <div class="pagination">
          <el-pagination
            :page-sizes="[6, 20, 50, 100]"
            :page-size="searchData.size"
            :total="total"
            layout=" sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import httpRequest from '../../api/api'
import { myMixins } from '../../mixins/mixin'

export default {
  name: 'Monitor',
  mixins: [myMixins],
  data() {
    return {
      originData: [],
      searchData: {
        currentPage: 1,
        size: 6
      },
      total: 0,
      tableData: [],
      lazy: true,
      treeList: [],
      url: {
        areaTree: '/property-manage/equipment/info/tree',
        areaTreeInfo: '/property-manage/area/info/tree'
      },
      listUrl: '/property-manage/equipment/info/page',
      treeKeyWords: '' // 机构搜索
    }
  },
  watch: {
    treeKeyWords(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    // 机构搜索
    filterNode(value, data) {
      if (!value) return true
      return data.organName.indexOf(value) !== -1
    },
    nodeClick(e) {
      if (!e.isArea) {
        this.searchData.areaId = e.id
        this.getTableData()
      }
    },
    lookMonior() {
      this.$message.info('待开发')
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
    }
  }

}
</script>

<style scoped>
    .monitor-item {
        padding: 36px;
        box-sizing: border-box;
        display: flex;
        margin: 7px 15px;
        align-items: center;
        justify-content: center;
        width: 274px;
        height: 270px;
        box-shadow: 0px 1px 6px 4px rgba(242, 242, 242, 1);
        border-radius: 8px;
        flex-direction: column;
    }

    .monitor-item span {
        margin-bottom: 15px;
    }

    .monitor-item span:nth-child(3) {
        color: #E40505;
        font-size: 18px;
        font-weight: bold;
    }

    .flex-box {
        display: flex;
        flex-wrap: wrap;
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
