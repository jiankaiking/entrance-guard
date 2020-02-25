<template>
    <div class="main-contenner">
        <div class="searchData">
            <el-form ref="form" :model="searchData" label-width="80px">
                <el-form-item label="设备型号" style="width: 220px">
                    <el-input v-model="searchData.loginStaffName"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchClick">搜索</el-button>
                    <el-button>重置</el-button>
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
                            label="设备型号"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="loginIp"
                            align="center"
                            label="厂商">
                    </el-table-column>
                    <el-table-column
                            prop="loginStatus"
                            align="center"
                            label="价格(元)">
                    </el-table-column>
                    <el-table-column
                            prop="operResult"
                            align="center"
                            label="状态">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="loginTime"
                            label="操作时间">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="操作">
                        <template slot-scope="scope">
                            <button type="text">详情</button>
                            <button type="text">下载</button>
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
</template>

<script>
    import httpRequest from "../../api/api";
    import {myMixins} from "../../mixins/mixin";

    export default {
        name: "EquipmentConfig",
        mixins: [myMixins],
        data() {
            return {
                //搜索数据
                searchData: {
                    loginStaffName: '',
                    loginClientIp: '',
                    loginTime: null,
                    loginStatus: '',
                    page: 1,
                    size: 10
                },
                value: '',
                total: 0,
                listUrl: '/log/getSysLoginLog',
                tableData: []
            }
        },
    }
</script>

<style>

</style>
