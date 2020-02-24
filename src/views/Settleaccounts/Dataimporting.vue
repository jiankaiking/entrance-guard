<template>
    <div class="main-contenner">
        <div class="searchData">
            <el-form ref="form" :model="form" label-width="50px">
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
                            label="导入时间"
                    >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="address"
                            label="月份">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="address"
                            label="类型">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="address"
                            label="导入数据">
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
                <div class="template">
                    <div class="template-button">
                        <el-button type="primary" plain>模版下载</el-button>
                        <el-button type="success" plain>导入设备补贴</el-button>
                        <el-button type="info" plain>导入直连分润</el-button>
                    </div>
                    <div class="temp-messges">
                        <p>设备补贴导入 : 设备的补贴需从支付宝或微信后台下载，下载整理后导入运营后台，代理商即可看到其相应的补贴收益 </p>
                        <p>直接分润导入 : 每月1号-28号导入上月佣金，若超过时间则上月佣金停止导入，每月的佣金在支付宝或微信中仅能导入一次</p>
                    </div>
                </div>
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
    export default {
        name: "Dataimporting",
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

        },
        methods: {
            showModel() {

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
        box-shadow: 0px 1px 6px 4px #f2f2f2;
    }
    .tableData .tableBox {
        padding: 30px;
        box-sizing: border-box;
    }
    .tableData .pagination {
        padding-bottom: 30px;
        display: flex;
        justify-content: space-between;
        padding-left: 30px;
        align-items: center;
    }
    .tableData .pagination p {
        color: #666666;
        font-size: 12px;
    }
    .tableData .pagination .template-button {
        margin-bottom: 20px;
    }



</style>

