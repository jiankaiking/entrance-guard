<template>
    <div class="main-contenner">
        <div class="searchData">
            <el-form ref="form" :model="searchData" label-width="80px">
                <el-form-item label="任务名称">
                    <el-input v-model="searchData.taskName"></el-input>
                </el-form-item>
                <el-form-item label="任务状态">
                    <el-select v-model="searchData.taskStatus" placeholder="选择任务状态">
                        <el-option label="停止" :value="0"></el-option>
                        <el-option label="运行" :value="1"></el-option>
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
                <el-table empty-text header-row-style="color:#000000"
                        v-loading = "loading" :data="tableData" border style="width: 99.9%;">
                    <el-table-column align="center" prop="taskId" label="序号"></el-table-column>
                    <el-table-column align="center" prop="taskName" label="任务名称"></el-table-column>
                    <el-table-column align="center" prop="taskClass" label="执行类"></el-table-column>
                    <el-table-column align="center" prop="taskRunCron" label="任务执行规则"></el-table-column>
                    <el-table-column align="center" prop="taskDesc" label="任务描述"></el-table-column>
                    <el-table-column align="center" prop="taskRunTime" label="执行时间(分)"></el-table-column>
                    <el-table-column align="center" label="任务状态">
                        <template slot-scope="scope">
                            <el-button type="text" @click="changeTaskStatus(scope.row,scope.$index)">
                                <el-switch
                                        :active-value="1"
                                        :inactive-value="0"
                                        :value="scope.row.taskStatus"
                                        active-text="正常"
                                        inactive-text="停用">
                                </el-switch>
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button type="info" plain size="mini" @click="headEdit(scope.row)">修改</el-button>
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
        <el-dialog :lock-scroll="false" title="新增任务配置" width="30%"  :visible.sync="dialogTableVisible"
                   style="text-align: center;">
            <TaskmanagementModel  ref="modalForm" @close="modalClose" @ok="modalFormOk"></TaskmanagementModel>
        </el-dialog>
    </div>
</template>

<script>
    import {myMixins} from "../../mixins/mixin";
    import httpRequest from "../../api/api";
    import TaskmanagementModel from "./TaskmanagementModel";

    export default {
        name: "taskmanagement",
        mixins:[myMixins],
        data() {
            return {
                searchData:{
                    taskName:'', //任务名称
                    taskStatus:'', //任务状态
                    page:1,
                    size:10
                },
                total:0,
                listUrl:'/taskConfigManage/getTaskConfigList',
                dialogTableVisible: false,
                tableData: []
            }
        },
        components: {
            TaskmanagementModel
        },
        methods: {
            changeTaskStatus(row, index) {
                httpRequest('/managecenter/taskConfigManage/updateTaskStatus', 'POST',{taskId:row.taskId})
                    .then(res => {
                        if (res.success) {
                                this.tableData[index].taskStatus = row.taskStatus == 0?1:0;
                        }
                    })
            },

        }

    }
</script>

<style scoped lang="scss">




    .tableData {
        background: #ffffff;
        box-shadow: 0px 1px 6px 4px rgba(242, 242, 242, 1);

        .tableBox {
            padding: 30px;
            box-sizing: border-box;

        }

        .pagination {
            padding-bottom: 30px;
        }
    }
</style>
