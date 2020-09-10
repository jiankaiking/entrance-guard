<template>
    <div class="main-contenner">
        <div class="searchData">
            <el-form ref="form" :model="searchData" label-width="80px">
                <el-form-item label="设备名称" style="width: 220px">
                    <el-input v-model="searchData.loginUserName"   placeholder="请输入设备名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain @click="searchClick">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tableData">
            <div class="tableBox">
                <el-table :data="tableData" border empty-text style="width: 100%" v-loading="loading">
                    <el-table-column type="index" width="200" align="center" label="序号"></el-table-column>
                    <el-table-column prop="loginOrganName" label="设备编号" align="center"></el-table-column>
                    <el-table-column prop="loginClientIp" align="center" label="设备名称"></el-table-column>
                    <el-table-column prop="loginStatus" align="center" label="设备型号"></el-table-column>
                    <el-table-column prop="loginClientIp" align="center" label="所在位置"></el-table-column>
                    <el-table-column prop="loginStatus" align="center" label="报警事件"></el-table-column>
                    <el-table-column prop="loginClientIp" align="center" label="报警情况"></el-table-column>
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
        name: "controlInfo",
        mixins: [myMixins],
        data() {
            return {
                //搜索数据
                searchData: {
                    loginUserName: '',
                    loginClientIp: '',
                    startDate: '',
                    endDate: '',
                    loginStatus: '',
                    page: 1,
                    size: 10
                },
                dateValue: '',
                total: 0,
                listUrl: '/managecenter/log/getSysLoginLog',
                tableData: []
            }
        },

        mounted() {

        },
        methods: {

        },

    }
</script>

<style>

</style>
