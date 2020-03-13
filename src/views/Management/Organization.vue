<template>
    <div class="main-contenner">
        <div class="searchData">
            <el-form ref="form" :model="searchData" label-width="80px">
                <el-form-item label="部门名称">
                    <el-input v-model="searchData.organName"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="searchData.organStatus" placeholder="请选择活动区域">
                        <el-option label="区域一" value="0"></el-option>
                        <el-option label="区域二" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="getDataList" type="primary" plain>搜索</el-button>
                    <el-button @click="headAdd" type="success" plain>新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tableData">
            <div class="tableBox">
                <el-table :data="tableData" border style="width: 99.9%"
                          v-loading="loading"
                          row-key="menuId" lazy :load="loadData"
                          :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                    <el-table-column prop="organName" label="组织机构层级"  align="center"></el-table-column>
                    <el-table-column prop="organTypeName" label="分类"  align="center"></el-table-column>
                    <el-table-column align="center" prop="staffFullName" label="主要负责人"></el-table-column>
                    <el-table-column align="center" prop="loginPhone" label="电话"></el-table-column>
                    <el-table-column align="center" prop="personCount" label="人数"></el-table-column>
                    <el-table-column align="center" prop="organStatusName" label="状态"></el-table-column>
                    <el-table-column align="center" prop="organRemarks" label="备注"></el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="headEdit(scope.row)">编辑</el-button>
                            <el-button type="text" @click="changeStatus(scope.row)">{{scope.row.organStatus == 1?'停用':'启用'}}</el-button>
                            <el-button type="text">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog :lock-scroll="false" class="organnizaDia" title="收货地址" width="30%" center :visible.sync="dialogTableVisible">
            <OrganizationModel ref="modalForm" @close="close" @ok="modalFormOk"></OrganizationModel>
        </el-dialog>
    </div>
</template>

<script>
    // import {myMixins} from "../../mixins/mixin";
    import httpRequest from "../../api/api";
    import OrganizationModel from "./OrganizationModel";


    export default {
        name: "Organization",
        // mixins:[myMixins],
        data() {
            return {
                searchData: {
                    organStatus:'',//状态
                    organName:'',//机构名称、部门名称
                },
                loading:false,
                listUrl:'/organManage/getOrganList',
                dialogTableVisible: false,
                tableData: [],
            }
        },
        components: {
            OrganizationModel
        },
        mounted(){
            this.getDataList()
        },
        methods: {
            modalFormOk(){
                this.getDataList()
                this.close()
            },
            close(){
                this.dialogTableVisible = false
            },
            //编辑
            headEdit(record) {
                this.dialogTableVisible = true;
                this.$nextTick(() => {
                    this.$refs.modalForm.edit(record);
                })
            },
            //新增
            headAdd() {
                this.dialogTableVisible = true;
                this.$nextTick(() => {
                    this.$refs.modalForm.add();
                })
            },
            changeStatus(row){
                httpRequest("/organManage/offOrNoOrgan","POST",{organId:row.organId,organStatus:row.organStatus == 0?1:0})
                    .then(res=>{
                        if(res.success){
                            this.getDataList()
                        }
                    })
            },
            getDataList(){
                this.loading = true;
                httpRequest(this.listUrl,"GET",this.searchData)
                    .then(res=>{
                       if(res.success){
                           this.tableData = res.data;
                       }
                    })
                    .finally(res=>{
                        this.loading = false;
                    })
            },
            loadData(tree, treeNode, resolve){
                this.searchData.menuPid = tree.organId
                httpRequest(this.listUrl, "GET", this.searchData)
                    .then(res=>{
                        resolve(res.data)
                    })
            },
        }

    }
</script>

<style scoped>
</style>

