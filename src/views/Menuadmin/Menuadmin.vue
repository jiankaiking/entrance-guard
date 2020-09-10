<template>
    <div class="main-contenner">
        <div class="searchData">
            <el-form ref="form" :model="searchData" label-width="80px">
                <el-form-item label="菜单名称">
                    <el-input v-model="searchData.menuName"></el-input>
                </el-form-item>

                <el-form-item label="状态">
                    <el-select v-model="searchData.menuStatus" placeholder="请选择状态">
                        <el-option label="隐藏" :value="0"></el-option>
                        <el-option label="显示" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain @click="getMenuList">搜索</el-button>
                    <el-button type="success" plain @click="addMenu">新增</el-button>
                    <el-button plain @click="resetSearch">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tableData">
            <div class="tableBox" style="display: flex;">
                <el-table :data="tableData" border style="width: 99.9%"
                          row-key="menuId" lazy :load="loadData"
                          highlight-current-row
                          ref="table"
                          v-loading="loading"
                          :indent="10"
                          @current-change="handleCurrentChange"
                          :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                    <el-table-column prop="menuName" label="菜单名称"></el-table-column>
                    <el-table-column prop="menuSort" align="center" label="排序"></el-table-column>
                    <el-table-column prop="menuTypeName" align="center" label="类型"></el-table-column>
                    <el-table-column prop="menuUrl" align="center" label="请求地址"></el-table-column>
                    <el-table-column prop="menuStatusName" align="center" label="状态"></el-table-column>
                    <el-table-column prop="menuModeName" align="center" label="连接目标"></el-table-column>
                    <el-table-column prop="menuRemarks" align="center" label="备注"></el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="hideMenu(scope.row)">{{scope.row.menuStatus == '1'?"隐藏":"显示"}}</el-button>
                            <el-button type="text" @click="menuInfo(scope.row)">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog :title="title" :lock-scroll="false" center   width="50%" :visible.sync="dialogTableVisible">
            <MenuaddModel ref="modalForm" @close="close" @ok="modelFormOk"></MenuaddModel>
        </el-dialog>
    </div>
</template>

<script>
    import httpRequest from "../../api/api";
    import MenuaddModel from './MenuaddModel';
    import {mapActions} from 'vuex'

    export default {
        name: "Menuadmin",
        data() {
            return {
                searchData: {
                    menuName: '',
                    menuStatus: '',
                    menuPid: 0,
                },
                value: '',
                dialogTableVisible:false,
                total: 0,
                cliMenuId:0,
                loading:false,
                title:'',
                listUrl: '/managecenter/menuManage/getMenuList',
                tableData: []
            }
        },
        components: {
            MenuaddModel
        },
        mounted() {
            this.getMenuList()
        },
        methods: {
            ...mapActions(["menuChange"]),
            //重置
            resetSearch(){
                Object.keys(this.searchData).forEach(key => this.searchData[key] = '');
                this.searchData.menuPid =  0;
                this.getMenuList()
            },
            //菜单详情
            menuInfo(row){
                this.title = '菜单详情'
                this.dialogTableVisible = true

                this.$nextTick(() => {
                    this.$refs.modalForm.info(row.menuId);
                })
            },
            handleCurrentChange(e){
                this.cliMenuId = e
            },
            close(){
                this.dialogTableVisible = false;
            },
            //新增菜单
            addMenu(){
                this.title = '菜单新增'
                this.dialogTableVisible = true

                this.$nextTick(() => {
                    this.$refs.modalForm.add(this.cliMenuId);
                })
            },
            modelFormOk(e){
                this.dialogTableVisible = false;
                e == 0?this.getMenuList():this.refreshRow(e)
            },
            //隐藏菜单
            hideMenu(row){
                httpRequest("/managecenter/menuManage/hideOrShowMenu", "POST", {menuId:row.menuId})
                    .then(res=>{
                        if(res.success){
                            this.searchData.menuPid = 0
                            row.menuPid == 0?this.getMenuList():this.refreshRow(row.menuPid)
                            this.menuChange()
                        }
                    })
            },
            //增加菜单
            getMenuList() {
                this.loading = true;
                httpRequest(this.listUrl, "GET", this.searchData)
                    .then(res => {
                        this.tableData = res.data;
                        this.loading = false;
                    })
            },
            refreshRow(id) {
                // console.log(id)
                this.loading = true;
                httpRequest(this.listUrl, "GET", {menuPid: id})
                    .then(res => {
                        if (res.success) {
                            this.$set(this.$refs.table.store.states.lazyTreeNodeMap, id, res.data)
                            this.loading = false;
                        }
                    })
            },
            //加载子节点菜单
            loadData(tree, treeNode, resolve){
                // console.log(tree)
                // this.searchData.menuPid = tree.menuId
                httpRequest(this.listUrl, "GET", {menuPid:tree.menuId})
                    .then(res=>{
                        resolve(res.data)
                    })
            },
        }

    }
</script>

<style scoped>
    .left-menu-nav {
        border: 1px solid #ebeef5;
        border-right: none;
    }

    .left-menu-nav .listRigth {
        color: #000000;
        font-size: 14px;
    }

    .tableData {
        background: #ffffff;
        box-shadow: 0px 1px 6px 4px #f2f2f2;
    }

    .tableData .tableBox {
        padding: 30px;
        box-sizing: border-box;
    }

    .tableData .pagination {
        padding-bottom: 30px;
    }

</style>
