<template>
    <div class="main-contenner">
        <div class="searchData">
            <el-form ref="form" :model="searchData" label-width="80px">
                <el-form-item label="部门名称">
                    <el-input v-model="searchData.organName"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="searchData.organStatus" placeholder="请选择状态">
                        <el-option label="停用" :value="0"></el-option>
                        <el-option label="启用" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="getDataList" type="primary" plain>搜索</el-button>
                    <el-button @click="headAdd" type="success" plain>新增</el-button>
                    <el-button @click="restSearch" plain>重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tableData">
            <div class="tableBox">
                <el-table :data="tableData" border style="width: 99.9%"
                          v-loading="loading" :indent="16"
                          ref="table"
                          row-key="organId" lazy :load="loadData"
                          :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                    <el-table-column prop="organName" label="组织机构层级"></el-table-column>
                    <el-table-column prop="organTypeName" label="分类" align="center"></el-table-column>
                    <el-table-column align="center" prop="staffFullName" label="主要负责人"></el-table-column>
                    <el-table-column align="center" prop="loginPhone" label="电话"></el-table-column>
                    <el-table-column align="center" prop="personCount" label="人数"></el-table-column>
                    <el-table-column align="center" prop="organStatusName" label="状态"></el-table-column>
                    <el-table-column align="center" prop="organRemarks" label="备注"></el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="headEdit(scope.row)">编辑</el-button>
                            <el-button type="text" @click="changeStatus(scope.row)">{{scope.row.organStatus ==
                                1?'停用':'启用'}}
                            </el-button>
                            <el-button type="text" @click="deleteOrgan(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog :lock-scroll="false" class="organnizaDia" title="机构管理" width="30%" center
                   :visible.sync="dialogTableVisible">
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
                    organStatus: '',//状态
                    organName: '',//机构名称、部门名称
                },
                loading: false,
                listUrl: '/managecenter/organManage/getOrganList',
                dialogTableVisible: false,
                tableData: [],
                abc: false,
            }
        },
        components: {
            OrganizationModel
        },
        mounted() {
            this.getDataList()
        },
        methods: {
            restSearch(){
                Object.keys(this.searchData).map(key=> this.searchData[key] = '')
                this.getDataList()
            },
            modalFormOk(data) {
                this.tableData.some(item => item.organPid === data.id) ? this.getDataList() : this.refreshRow(data.id)
                this.close()
            },
            close() {
                this.dialogTableVisible = false
            },
            //编辑
            headEdit(record) {
                // console.log(this.tableData)
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
            //删除
            deleteOrgan(row) {
                this.$confirm('删除该部门,包含得下级部门将一并删除,是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    center:true,
                    type: 'error'
                }).then(() => {
                    httpRequest("/managecenter/organManage/deleteOrgan", "POST", {organId: row.organId})
                        .then(res => {
                            if (res.success) {
                                this.tableData.some(item => item.organPid === row.organPid) ? this.getDataList() : this.refreshRow(row.organPid)
                            }
                        })
                }).catch(() => {
                });
            },
            changeStatus(row) {
                httpRequest("/managecenter/organManage/offOrNoOrgan", "POST", {
                    organId: row.organId,
                    organStatus: row.organStatus == 0 ? 1 : 0
                })
                    .then(res => {
                        if (res.success) {
                            this.tableData.some(item => item.organPid === row.organPid) ? this.getDataList() : this.refreshRow(row.organPid)
                            // this.$refs.table.store.updateTreeData()
                            // this.getDataList()
                        }
                    })
            },
            getDataList() {
                this.loading = true;
                httpRequest(this.listUrl, "GET", this.searchData)
                    .then(res => {
                        if (res.success) {
                            this.tableData = res.data;

                        }
                    })
                    .finally(res => {
                        this.loading = false;
                    })
            },
            refreshRow(id) {
                httpRequest(this.listUrl, "GET", {organId: id})
                    .then(res => {
                        if (res.success) {
                            // console.log(this.$refs.table)
                            this.$set(this.$refs.table.store.states.lazyTreeNodeMap, id, res.data)
                        }
                    })
            },

            loadData(tree, treeNode, resolve) {
                // this.searchData.menuPid = tree.organId
                httpRequest(this.listUrl, "GET", {organId: tree.organId})
                    .then(res => {
                        resolve(res.data)
                    })
            },
        }

    }
</script>

<style scoped>
</style>

