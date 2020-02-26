<template>
    <div class="main-contenner">
        <div class="searchData">
            <el-form ref="form" :model="searchData" label-width="80px">
                <el-form-item label="操作人员" style="width: 220px">
                    <el-input v-model="searchData.loginStaffName"></el-input>
                </el-form-item>
                <el-form-item label-width="20px">
                    <el-input v-model="searchData.loginClientIp"></el-input>
                </el-form-item>
                <el-form-item label="登录时间">
                    <p>{{value}}</p>
                    <el-date-picker
                            v-model="searchData.loginTime"
                            type="daterange"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['00:00:00', '23:59:59']">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchClick">搜索</el-button>
                    <el-button>导入设备号</el-button>
                    <el-button @click="headAdd">绑定</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tableData">
            <div class="tableBox">
                <el-table
                        :data="tableData"
                        border
                        empty-text
                        style="width: 100%">
                    <el-table-column
                            prop="loginUserName"
                            align="center"
                            label="序号">
                    </el-table-column>
                    <el-table-column
                            prop="organName"
                            label="商家"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="loginIp"
                            align="center"
                            label="门店">
                    </el-table-column>
                    <el-table-column
                            prop="loginStatus"
                            align="center"
                            label="设备号">
                    </el-table-column>
                    <el-table-column
                            prop="operResult"
                            align="center"
                            label="所属代理商">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="loginTime"
                            label="状态">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="loginTime"
                            label="绑定日期">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="loginTime"
                            label="操作人">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="loginTime"
                            label="累计交易金额">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="headEdit">解绑</el-button>
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
        <el-dialog
                align="center"
                width="500px"
                :visible.sync="dialogTableVisible"
                :lock-scroll="false"
                :before-close="handleClose">
            <CashierBindModel></CashierBindModel>
        </el-dialog>
    </div>
</template>

<script>
    import httpRequest from "../../api/api";
    import CashierBindModel from "./moduleModel/CashierBindModel";
    import {myMixins} from "../../mixins/mixin";
    export default {
        name: "CashierBind",
        mixins:[myMixins],
        data() {
            return {
                //搜索数据
                searchData:{
                    loginStaffName: '',
                    loginClientIp: '',
                    loginTime: null,
                    loginStatus: '',
                    page:1,
                    size:10
                },
                dialogTableVisible:false,
                value:'',
                total:0,
                listUrl:'/log/getSysLoginLog',
                tableData: [{}]
            }
        },
        components:{
            CashierBindModel
        },
        methods: {

        }

    }
</script>

<style>

</style>
