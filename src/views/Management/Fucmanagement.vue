<template>
    <div class="main-contenner">
        <div class="searchData">
            <el-form ref="searchFrom" :model="searchData" label-width="80px">
                <el-form-item label="任务名称">
                    <el-input v-model="searchData.roleName"></el-input>
                </el-form-item>
                <el-form-item label="任务状态">
                    <el-select v-model="searchData.roleStatus" placeholder="请选择活动区域">
                        <el-option label="不正常" value="0"></el-option>
                        <el-option label="正常" value="1"></el-option>
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
                <el-table :data="tableData" empty-text border style="width: 99.9%">
                    <el-table-column align="center" prop="roleId" label="序号"></el-table-column>
                    <el-table-column prop="roleName" label="角色名称" align="center"></el-table-column>
                    <el-table-column prop="personCount" align="center" label="人数"></el-table-column>
                    <el-table-column align="center" label="状态">
                        <template slot-scope="scope">
                            <el-button type="text" size="small">{{scope.row.roleStatusName }}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="roleRemarks" align="center" label="角色描述"></el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="headEdit(scope.row)" size="small">编辑</el-button>
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
        <el-dialog title="提示" align="center" :visible.sync="dialogTableVisible" width="50%" :before-close="handleClose">
            <FucmanagementModel ref="modalForm" @close="modalClose" @ok="modalFormOk"></FucmanagementModel>
        </el-dialog>
    </div>
</template>

<script>
    import {myMixins} from "../../mixins/mixin";
    import FucmanagementModel from "./FucmanagementModel";

    export default {
        name: "funcmanagement",
        mixins: [myMixins],
        data() {
            return {
                searchData: {
                    roleName: '',//角色名称
                    roleStatus: '',//角色状态
                    page: 1,
                    size: 10
                },
                listUrl: '/roleManage/getRoleList',
                total: 0,
                dialogTableVisible: false,
                tableData: []
            }
        },
        components: {
            FucmanagementModel
        },
        methods: {}

    }
</script>

<style scoped>


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

