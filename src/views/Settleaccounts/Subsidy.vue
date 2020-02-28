<template>
    <div class="main-contenner">
        <div class="searchData">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label-width="170px" label="代理商名称 / 活动名称">
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
                <el-form-item label="补贴类型" label-width="70px">
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
                        @row-click="rowClinck" empty-text
                        header-row-style="color:#000000" :data="tableData"
                        border style="width: 100%;">
                    <el-table-column align="center" prop="date" label="序号"></el-table-column>
                    <el-table-column align="center" prop="name" label="代理商名称"></el-table-column>
                    <el-table-column align="center" prop="address" label="结算日期"></el-table-column>
                    <el-table-column align="center" prop="address" label="状态"></el-table-column>
                    <el-table-column align="center" prop="address" label="补贴类型"></el-table-column>
                    <el-table-column align="center" prop="address" label="交易有效笔数(元)"></el-table-column>
                    <el-table-column align="center" prop="address" label="交易有效金额(元)"></el-table-column>
                    <el-table-column align="center" prop="address" label="补贴金额(元)"></el-table-column>
                    <el-table-column align="center" label="操作">
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
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
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

</style>
