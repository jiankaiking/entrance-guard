<template>
    <div class="main-contenner clear">
        <div class="left-options">
            <div class="title">
                区域
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
                <el-form ref="form" :model="searchData" label-width="80px">
                    <el-form-item label="名称">
                        <el-input placeholder="请输入设备名称" v-model="searchData.equipmentName"></el-input>
                    </el-form-item>
                    <el-form-item label="区域">
                        <el-input placeholder="请输入位置" v-model="searchData.staffFullName"></el-input>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="searchData.equipmentTypeId" clearable placeholder="请选择">
                            <el-option v-for="item in equipmentTypeArr" :label="item.value" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="searchData.status" placeholder="请选择">
                            <el-option v-for="item in equipmentStatusArr" :label="item.label" :value="item.code"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="厂家">
                        <el-select v-model="searchData.factoryId" clearable placeholder="请选择">
                            <el-option v-for="item in factoryArr" :label="item.value" :value="item.id" ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchClick" plain>搜索</el-button>
                        <el-button plain @click="resetSearch">重置</el-button>
                        <el-button @click="add" type="success" plain>新增设备</el-button>
<!--                        <el-button @click="role" type="success" plain>新增设备</el-button>-->
                    </el-form-item>
                </el-form>
            </div>
            <div class="tableData">
                <div class="tableBox equipment-box" v-loading="loading">
                    <p v-if="tableData == 0">还没有数据</p>
                    <div class="equipment-item"  v-for="(item,index) in tableData" :key="index">
                        <div class="item-top">
                            <span>设备名称：{{item.equipmentName}}</span>
                            <span class="item-icon">
                                <i @click="infogo" class="el-icon-zoom-in"></i>
                                <i @click="edit(item)" class="el-icon-s-tools"></i></span>
                        </div>
                        <div class="item-center">
                            <div class="item-text">
                                <p>设备编号：{{item.equipmentNo}}</p>
                                <p>厂家：{{item.factoryName}}</p>
                            </div>
                            <div class="item-img">
                                <el-image src="231321"></el-image>
                            </div>
                        </div>
                        <div class="item-line">设备类型：{{item.equipmentTypeName}}</div>
                        <div class="item-line">管理区域：{{item.areaName + item.detail}}</div>
                        <div class="item-line">状态：{{item.status | getEquipmentStatus}}</div>
                        <div class="item-line">操作</div>
                        <div class="item-line">
                            <div class="item-btn">
                                <p>常开</p>
                                <p>开门</p>
                                <p @click="role(item.id)">人员授权</p>
                                <p>常关</p>
                                <p>禁用</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pagination">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :page-sizes="[6, 10, 20]"
                            :page-size="searchData.size"
                            :total="total"
                            layout=" sizes, prev, pager, next, jumper"
                    >
                    </el-pagination>
                </div>
            </div>
        </div>
        <equipment-add-model :equipmentTypeArr="equipmentTypeArr" :factoryArr="factoryArr" ref="modalForm" @ok="getTableData" />
        <equipment-log ref="info" />
        <role-authorization ref="role"  />
    </div>
</template>

<script>
    import {myMixins} from "../../mixins/mixin";
    import roleAuthorization from "./moduleModel/roleAuthorization";
    import httpRequest from "../../api/api";
    import equipmentAddModel from "./moduleModel/equipmentAddModel";
    import equipmentLog from "./moduleModel/equipmentLog";

    export default {
        name: "equipmentList",
        mixins: [myMixins],
        data() {
            return {
                originData: [],
                searchData: {
                    equipmentName: '',
                    factoryId: '',
                    detail: '',
                    equipmentTypeId: '',
                    status: '',
                    currentPage: 1,
                    size: 6
                },
                equipmentTypeArr:[],
                total:0,
                equipmentStatusArr: [
                    {label:'全部',code:''},
                    {label:'正常',code:'0'},
                    {label:'告警',code:'1'},
                    {label:'预警',code:'2'},
                    {label:'离线',code:'3'},
                ],
                tableData: [],
                url:{
                    factoryArr: '/property-manage/equipment/factory/info/list',
                    // tree:'/property-manage/area/info/tree',
                    areaTree: '/property-manage/area/info/tree/area',
                    areaTreeInfo: '/property-manage/area/info/tree',
                    typeList:'/property-manage/equipment/type/list'
                },
                listUrl: '/property-manage/equipment/info/page',
                treeKeyWords: '', //机构搜索
                lazy: true,
                treeList: [],
                factoryArr:[],
            }
        },
        components:{
            equipmentAddModel,
            roleAuthorization,
            equipmentLog
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
            //搜索重置
            resetSearch() {
                Object.keys(this.searchData).map(key => this.searchData[key] = '');
                this.searchData.currentPage = 1;
                this.searchData.size = 6;
                this.getTableData()
            },
            edit(row){
                this.$refs.modalForm.edit(row)
            },
            role(id){
                this.$refs.role.roleInfo({id})
            },
            getTypeArr(){
                httpRequest(this.url.typeList, 'GET')
                    .then(res => {
                        this.equipmentTypeArr = res.data;
                        return httpRequest(this.url.factoryArr,'GET')
                    })
                    .then(res=>{
                       this.factoryArr = res.data;
                    })
            },
            infogo(){
                this.$refs.info.info()
            },
            add() {
                this.$refs.modalForm.add()
            },
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
            menuNodeClick(){

            },
            loadTreeNodes (node, resolve) {
                // if (node.level === 0) {
                //     return resolve(this.doLoadTreeNodes("0"));
                // }
                // if (node.level >= 1) {
                //     return resolve(this.doLoadTreeNodes(node.data.id));
                // }
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
            // 树状图展开
            expandedStructure(data) {
                this.searchData.organId = data.organId
                this.getTableData()
            },
        }

    }
</script>

<style scoped>
    .equipment-box{
        display: flex; justify-content: flex-start; flex-wrap: wrap;
    }
    .equipment-item {
        width: 342px;
        padding: 10px 28px;
        margin: 0 15px 15px;
        box-sizing: border-box;
        height: 413px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 1px 6px 4px rgba(242, 242, 242, 1);
        border-radius: 8px;
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
    .item-top{
        display: flex; justify-content: space-between; align-items: center; font-size: 16px; font-weight: bold;
    }
    .item-icon{
        color: #38B8EE;font-size: 18px;
    }
    .item-icon i{
        margin-left: 5px; cursor: pointer;
    }
    .item-center ,.item-line{
        color: #666666; font-size: 14px; line-height: 40px;
    }
    .item-center{
         display: flex; align-items: center; justify-content: space-between; padding: 5px 0;
    }
    .item-center .el-image{
        display: block; width: 50px; height: 50px;
    }
    .item-btn{
        display: flex; justify-content: flex-start; flex-wrap: wrap;
    }
    .item-btn p{
     cursor: pointer;
        padding: 5px 16px; border:1px solid #999999; margin-right: 23px; line-height: 14px; border-radius:4px;
        margin-bottom: 15px;
    }
</style>
