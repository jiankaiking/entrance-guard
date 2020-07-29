<template>
    <div class="main-contenner clear">
        <div class="left-options">
            <div class="title">
                组织机构
            </div>
            <el-input class="treeKeyWords"
            placeholder="请输入"
            v-model="treeKeyWords">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-tree
                    :data="originData"
                    :props="{children: 'children',label: 'organName'}"
                    default-expand-all
                    :accordion="false"
                    :auto-expand-parent="false"
                    :filter-node-method="filterNode"
                    @node-expand="expandedStructure"
                    ref="tree"/>
        </div>
        <div class="right-table">
            <div class="searchData">
                <el-form ref="form" :model="searchData" label-width="80px">
                    <el-form-item label="员工名称">
                        <el-input v-model="searchData.staffFullName"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="searchData.userStatus" placeholder="请选择">
                            <el-option label="正常" value="1"></el-option>
                            <el-option label="停用" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="searchClick" type="primary" plain>搜索</el-button>
                        <el-button @click="personnelHeadAdd" type="success" plain>新增</el-button>
                        <el-button @click="resetSearch"  plain>重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="tableData">
                <div class="tableBox">
                    <el-table v-loading="loading" element-loading-text="拼命加载中" :data="tableData" style="width: 99.9%;margin-bottom: 20px;"
                            row-key="id" border default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                        <el-table-column prop="staffFullName" label="姓名" align="center"></el-table-column>
                        <el-table-column prop="staffPhone" label="电话" align="center"></el-table-column>
                        <el-table-column align="center" prop="organName" label="所属部门"></el-table-column>
                        <el-table-column align="center" prop="position" label="职位"></el-table-column>
                        <el-table-column align="center" prop="roleName" label="角色"></el-table-column>
                        <el-table-column align="center" label="状态">
                            <template slot-scope="scope">
                                <span>{{scope.row.staffStatus == '1'?'正常':'停用'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column width="200" align="center" label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" @click="personnelHeadEdit(scope.row)">编辑</el-button>
                                <el-button type="text" @click="changeStatus(scope.row.staffId,scope.row.staffStatus)">
                                    {{scope.row.staffStatus == '0'?'正常':'停用'}}
                                </el-button>
                                <el-button type="text" @click="resetPassword(scope.row)">重置密码</el-button>
                                <el-dialog :lock-scroll="false" title="重置密码" width="30%" center
                                           :visible.sync="resetModel">
                                    <div style="display: flex; align-items: center; flex-direction: column;">
                                        <el-input v-model="resetInfo.staffpassword"></el-input>
                                        <p style="padding: 25px 0;">注:重置密码后,系统将发送短信给员工</p>
                                        <el-button @click="setPassword()">重置</el-button>
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

        <el-dialog :lock-scroll="false" class="organnizaDia" title="" width="43%" center :visible.sync="dialogTableVisible">
            <PersonnelModel ref="modalForm" @close="modalClose"  @ok="modalFormOk"></PersonnelModel>
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
                // defaultProps: {
                //     children: 'children',
                //     label: 'organName',
                // },
                searchData: {
                    organId: 1,
                    staffFullName: '',//机构名称、部门名称
                    userStatus: '',//状态
                    page: 1,
                    size: 10
                },
                treeKeyWords:'', //机构搜索
                resetInfo:{// 重置密码
                    staffPhone:'',
                    staffpassword:''
                },
                resetModel: false,
                total: 0,
                delUrl: '/managecenter/staffManage/deleteStaffById',
                listUrl: '/managecenter/staffManage/getStaffInfoList',
                dialogTableVisible: false,
                tableData: [],
                addData: {}
            }
        },
        watch: {
            treeKeyWords(val) {
                this.$refs.tree.filter(val);
            }
        },
        components: {
            PersonnelModel
        },
        mounted() {
            this.getOrganTree()
        },
        methods: {
            // 编辑
            personnelHeadEdit(data){
                this.headEdit(data)
                this.$nextTick(() => {
                    this.$refs.modalForm.closeMessage()
                })
            },
            //新增
            personnelHeadAdd(){
                this.headAdd()
                this.$nextTick(() => {
                    this.$refs.modalForm.closeMessage()
                })
            },
            //机构搜索
             filterNode(value, data) {
                if (!value) return true;
                return data.organName.indexOf(value) !== -1;
            },
            //机构树形
            getOrganTree() {
                httpRequest('/managecenter/organManage/getOrganTree', 'GET', {organId: 1})
                    .then(res => {
                        this.originData.push(res.data)
                    })
            },
            // 树状图展开
            expandedStructure(data){
                this.searchData.organId=data.organId
                this.getTableData()
            },
            //重置密码
            setPassword() {
                const that = this;
                httpRequest('/staffManage/resetPassword', 'POST', this.resetInfo)
                    .then(res => {
                        if(res.success){
                                that.$message.success("重置成功")
                                this.resetModel = false;
                            }
                    })
            },
            //重置密码
            resetPassword(id) {
                this.resetInfo.staffPhone=id.staffPhone
                this.resetInfo.staffpassword=''
                this.resetModel = true;
            },
            //停用启动员工
            changeStatus(id, status) {
                httpRequest('/managecenter/staffManage/offOrNoStaff', 'POST', {
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
