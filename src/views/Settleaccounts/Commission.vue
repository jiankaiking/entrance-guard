<template>
    <div class="main-contenner">
        <div class="searchData">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="代理商名称">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="日期">
                    <el-date-picker
                            v-model="value1"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="onSubmit" type="primary" plain>搜索</el-button>
                    <el-button @click="onSubmit" type="info" plain>新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div style="line-height: 48px;padding-left: 35px">共dasdaskjdhasdkjhaskjdhaskjdhas</div>
        <div class="tableData">
            <div class="tableBox">
                <el-table
                        @row-click="rowClinck"
                        empty-text
                        header-row-style="color:#000000"
                        :data="tableData"
                        border
                        style="width: 100%;">
                    <el-table-column
                            align="center"
                            prop="date"
                            label="序号"
                    >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="name"
                            label="代理商名称"
                    >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="address"
                            label="结算日期">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="address"
                            label="状态">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="address"
                            label="结算金额(元)">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="address"
                            label="交易笔数">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="address"
                            label="间连分润(元)">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="address"
                            label="直连分润(元)">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="address"
                            label="总分润(元)">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="操作">
                        <template>
                            <el-button type="text" @click="showModel">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage4"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        :total="400"
                        layout=" sizes, prev, pager, next, jumper"
                >
                </el-pagination>
            </div>
        </div>
        <el-dialog :lock-scroll="false" title="提示" width="40%" align="center" :visible.sync="dialogTableVisible"
                   :before-close="handleClose">
            <CommissionModel></CommissionModel>
        </el-dialog>
    </div>
</template>

<script>
    import CommissionModel from "./CommissionModel";

    export default {
        name: "commission",
        data() {
            return {
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                optionsClum: '',
                dialogTableVisible: false,
                tableData: []
            }
        },
        components: {
            CommissionModel
        },
        methods: {
            showModel() {
                this.dialogTableVisible = true
            },
            onSubmit() {
                console.log('submit!');
            }
        }

    }
</script>

<style scoped>




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
