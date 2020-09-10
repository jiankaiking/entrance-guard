<template>
    <div class="main-contenner clear">
        <div class="left-options">
            <div class="title">
                区域管理
            </div>
            <el-input class="treeKeyWords" placeholder="请输入" v-model="treeKeyWords">
                <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-tree
                    ref="treeRef"
                    :lazy="lazy"
                    :data="treeList"
                    node-key="id"
                    :load="loadTreeNode"
                    :props="{label:'treeName'}"
                    @node-click="menuNodeClick"
            >

            </el-tree>
        </div>
        <div class="right-table">
            <div class="searchData">
                <el-form ref="form" :model="searchData" label-width="50px">
                    <el-form-item label="名称">
                        <el-input placeholder="请输入区域名称" v-model="searchData.areaName"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="searchData.areaStatus" placeholder="请选择">
                            <el-option label="正常" value="1"></el-option>
                            <el-option label="停用" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="类型">
                            <el-select v-model="searchData.areaTypeId" clearable placeholder="请选择">
                                <el-option v-for="item in areaTypeArr" :label="item.value" :value="item.id"></el-option>
                            </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="searchClick" type="primary" plain>搜索</el-button>
                        <el-button @click="resetSearch"  plain>重置</el-button>
                        <el-button @click="personnelHeadAdd" type="success" plain>新增区域</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="tableData">
                <div class="tableBox">
                    <el-table v-loading="loading" border empty-text element-loading-text="拼命加载中" :data="tableData" >
                        <el-table-column prop="areaName" label="区域名称" align="center"></el-table-column>
                        <el-table-column prop="areaTypeName" label="类型" align="center"></el-table-column>
                        <el-table-column align="center" prop="createTime" label="创建时间">
                            <template slot-scope="scope">
                                {{scope.row.createTime | getTime}}
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
                                                inactive-text="停用">
                                        </el-switch>
                                    </el-button>
                                </template>
                        </el-table-column>
                        <el-table-column width="200" align="center" label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" @click="edit(scope.row)">编辑</el-button>
                                <el-popover width="160" :ref="`popover-${scope.row.id}`" style="text-align: right; margin-left: 10px;">
                                    <p>确认删除？</p>
                                    <div style="text-align: right; margin: 0">
                                        <el-button type="text" size="mini" @click="scope._self.$refs[`popover-${scope.row.id}`].doClose()">
                                            取消
                                        </el-button>
                                        <el-button type="success" size="mini" @click="headDelet(scope.row.id)">确定</el-button>
                                    </div>
                                    <el-button type="text" slot="reference">删除</el-button>
                                </el-popover>
                            </template>
                        </el-table-column>
                    </el-table>

                </div>
                <div class="pagination">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :page-sizes="[10, 20, 50, 100]"
                            :page-size="searchData.size"
                            :total="total"
                            layout=" sizes, prev, pager, next, jumper"
                    >
                    </el-pagination>
                </div>
            </div>
        </div>
        <area-admin-model @ok="getTableData" :areaType.sync="areaTypeArr" ref="modalForm" />
    </div>
</template>

<script>

    import httpRequest from "../../api/api";
    import {myMixins} from "../../mixins/mixin";
    import areaAdminModel from "./moduleModel/areaAdminModel";

    export default {
        name: "areaAdmin",
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
                treeKeyWords:'', //机构搜索
                total: 0,
                url:{
                    typeList:'/property-manage/area/type/list',
                    del:'/property-manage/area/info/delete',
                    areaTree: '/property-manage/area/info/tree/area',
                    areaTreeInfo: '/property-manage/area/info/tree',
                },
                areaTypeArr:[],
                listUrl: '/property-manage/area/info/page',
                dialogTableVisible: false,
                tableData: [],
                lazy: true,
                treeList: [],
            }
        },
        components:{
            areaAdminModel
        },
        watch: {
            treeKeyWords(val) {
                this.$refs.tree.filter(val);
            }
        },
        mounted() {
             this.getOrganTree()
            this.getTypeArr()
        },
        methods: {
            getTypeArr(){
                httpRequest(this.url.typeList, 'GET')
                    .then(res => {
                        this.areaTypeArr = res.data;
                    })
            },
            // 编辑
            edit(row){
                this.$refs.modalForm.edit(row)
            },
            //新增
            personnelHeadAdd(){
                    this.$refs.modalForm.add()
            },
            //机构搜索
            filterNode(value, data) {
                if (!value) return true;
                return data.organName.indexOf(value) !== -1;
            },
            getOrganTree() {
                httpRequest(this.url.areaTreeInfo, 'GET', {level: 0, pid: 0})
                    .then(res => {
                        this.treeList = res.data
                    })
            },
            // 树状图展开
            expandedStructure(data){
                this.searchData.organId=data.organId
                this.getTableData()
            },
            menuNodeClick(){

            },
            loadTreeNode(node, resolve){
                let level = node.level;
                let pid = node.level == 2 ? node.data.pid : node.data.id;
                let url = node.data.type == 0 ? (level == 3 ? this.url.areaTree : this.url.areaTreeInfo) : this.url.areaTree;
                if(level == 0){
                    pid = 0
                }
                httpRequest(url, 'GET', {pid:pid,level:level})
                    .then(res => {
                        if(resolve) {

                            resolve(res.data)
                        }else if(node) {
                            node.doCreateChildren(res.data)
                            this.$nextTick(() => {
                                // 设置当前选择的节点
                                this.$refs.tree.setCurrentKey(this.selectNodeData[this.nodeKey])
                                // 将当前选中节点展开
                                this.$refs.tree.store.nodesMap[this.selectNodeData[this.nodeKey]].expanded = true
                            })
                        }else if(!this.lazy) {
                            resolve(res.data)
                            this.treeList = res.data
                        }
                    })
            },

            changeSonStatus(row) {
                httpRequest("/property-manage/area/info/stop",'post',{id:row.id,status:row.areaStatus == '0'?'1':'0'}).then(res=>{
                    if(res.code === 200){
                        this.getTableData()
                    }
                })
            },
            changeStatusStaff(id, status) {
                httpRequest('/managecenter/staffManage/offOrNoStaff', 'POST', {
                    staffId: id,
                    userStatus: status == 0 ? 1 : '0',
                })
                    .then(res => {
                        this.getTableData()
                    })
            }
        },
    }
</script>

<style scoped>

    .left-options {
        float: left;
        margin-right: 25px;
        width: 22%;
        background: #ffffff;
        height: 100%;
        box-shadow:0px 1px 6px 4px rgba(242,242,242,1);
        border-radius:8px;
        padding: 20px 33px;
        box-sizing: border-box;
    }

    .right-table {
        float: left;
        width: 75%;
    }
    .treeKeyWords{
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
