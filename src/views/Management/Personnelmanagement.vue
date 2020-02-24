<template>
    <div class="main-contenner clear">
        <div class="left-options">
            <div class="title">
                组织机构
            </div>
            <el-tree
                    :data="originData"
                    :props="defaultProps"
                    default-expand-all
                    ref="tree"/>

        </div>
        <div class="right-table">
            <div class="searchData">
                <el-form ref="form" :model="searchData" label-width="80px">
                    <el-form-item label="部门名称">
                        <el-input v-model="searchData.organName"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="searchData.organStatus" placeholder="请选择">
                            <el-option label="正常" :value="0"></el-option>
                            <el-option label="异常" :value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="searchClick" type="primary" plain>搜索</el-button>
                        <el-button @click="headAdd" type="success" plain>新增</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="tableData">
                <div class="tableBox">
                    <el-table
                            v-loading="loading"
                            element-loading-text="拼命加载中"
                            :data="tableData"
                            style="width: 99.9%;margin-bottom: 20px;"
                            row-key="id"
                            border
                            default-expand-all
                            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                        <el-table-column
                                prop="staffFullName"
                                label="姓名"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="loginPhone"
                                label="电话"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="organName"
                                label="所属部门">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="position"
                                label="职位">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="roleName"
                                label="角色">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="状态">
                            <template slot-scope="scope">
                                <span>{{scope.row.staffStatus == '1'?'启动':'停止'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="200"
                                align="center"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" @click="headEdit(scope.row)">编辑</el-button>
                                <el-button type="text" @click="changeStatus(scope.row.staffId,scope.row.staffStatus)">
                                    {{scope.row.staffStatus == '0'?'启动':'停止'}}
                                </el-button>
                                <el-button type="text" @click="resetPassword(scope.row)">重置密码</el-button>
                                <el-dialog :lock-scroll="false" title="重置密码" width="30%" center
                                           :visible.sync="resetModel">
                                    <div style="display: flex; align-items: center; flex-direction: column;">
                                        <el-input v-model="staffpassword"></el-input>
                                        <p style="padding: 25px 0;">注:重置密码后,系统将发送短信给员工</p>
                                        <el-button @click="setPassword(scope.row)">重置</el-button>
                                    </div>
                                </el-dialog>
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

        <el-dialog :lock-scroll="false" class="organnizaDia" title="新建员工" width="43%" center
                   :visible.sync="dialogTableVisible">
            <PersonnelModel ref="modalForm" @close="modalClose" @ok="modalFormOk"></PersonnelModel>
        </el-dialog>
    </div>
</template>

<script>
    import PersonnelModel from "./PersonnelModel";

    import httpRequest from "../../api/api";
    import {myMixins} from "../../mixins/mixin";

    export default {
        name: "Personnelmanagement",
        mixins: [myMixins],
        data() {
            return {
                originData: [],
                defaultProps: {
                    children: 'children',
                    label: 'organName',
                },
                searchData: {
                    organId: 1,
                    organName: '',//机构名称、部门名称
                    organStatus: '',//状态
                    page: 1,
                    size: 10
                },
                staffpassword: '',  // 重置密码
                resetModel: false,
                total: 0,
                delUrl: '/staffManage/deleteStaffById',
                listUrl: '/staffManage/getStaffInfoList',
                dialogTableVisible: false,
                tableData: [],
                addData: {}
            }
        }
        ,
        components: {
            PersonnelModel
        },
        mounted() {
            this.getOrganTree()
        },
        methods: {

            //机构树形
            getOrganTree() {
                httpRequest('/organManage/getOrganTree', 'GET', {organId: 1})
                    .then(res => {
                        this.originData.push(res.data)
                        console.log(this.originData)
                    })
            },
            //重置密码
            setPassword(r) {
                let data = {
                    loginUserId: r.loginUserId,
                    staffPhone: r.loginPhone,
                    password: this.staffpassword
                }
                httpRequest('/staffManage/resetPassword', 'POST', data)
                    .then(res => {
                        console.log(res)
                    })
            },
            //重置密码
            resetPassword(id) {
                this.resetModel = true;
            },
            //停用启动员工
            changeStatus(id, status) {
                httpRequest('/staffManage/offOrNoStaff', 'POST', {
                    staffId: id,
                    userStatus: status == 0 ? 1 : '0',
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

        padding: 0 33px;
        box-sizing: border-box;
    }

    .right-table {
        float: left;
        width: 75%;
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
