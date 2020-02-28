<template>
        <div class="tableData">
            <div class="tableBox">
                <el-table
                        empty-text
                        header-row-style="color:#000000"
                        :data="tableData"
                        border
                        style="width:99.8%;">
                    <el-table-column
                            align="center"
                            prop="date"
                            label="子代理名称"
                    >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="name"
                            label="代理商等级"
                    >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="address"
                            label="联系人">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="address"
                            label="代理区域">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="address"
                            label="创建时间">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="address"
                            label="商户数量">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="address"
                            label="状态">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="操作">
                        <template slot-scope="scope">
                            <div style=" color:#419FFF">详情</div>
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
</template>

<script>
    export default {
        name: "generation",
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
                },{
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                },{
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                },{
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                },{
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                },
                    {
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
        mounted(){

        },
        methods: {

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
