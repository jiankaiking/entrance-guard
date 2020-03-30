<template>
    <div class="main-contenner">
        <div class="searchData">
            <el-form ref="form" :model="searchData" label-width="80px">
                <el-form-item label="操作人员" style="width: 220px">
                    <el-input v-model="searchData.loginStaffName"   placeholder="请输入操作人员"></el-input>
                </el-form-item>
                <el-form-item label="IP地址" style="width: 310px">
                    <el-input v-model="searchData.loginClientIp"   placeholder="请输入IP地址"></el-input>
                </el-form-item>
                <el-form-item label="登录时间">
                    <el-date-picker
                            v-model="dateValue"
                            @change="changeDate"
                            type="daterange"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="状态" style="width: 220px">
                    <el-select v-model="searchData.loginStatus" placeholder="请选择">
                        <el-option label="成功" value="1"></el-option>
                        <el-option label="失败" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain @click="searchClick">搜索</el-button>
                    <el-button @click="resetSearch" plain>重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tableData">
            <div class="tableBox">
                <el-table :data="tableData" border empty-text style="width: 100%" v-loading="loading">
                    <el-table-column prop="loginUserName" align="center" label="姓名"></el-table-column>
                    <el-table-column prop="loginOrganName" label="所属部门" align="center"></el-table-column>
                    <el-table-column prop="loginClientIp" align="center" label="IP"></el-table-column>
                    <el-table-column prop="loginStatus" align="center" label="状态"></el-table-column>
                    <el-table-column prop="loginInfo" align="center" label="操作信息"></el-table-column>
                    <el-table-column align="center" prop="loginTime" label="操作时间"></el-table-column>
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
        name: "Organization",
        mixins: [myMixins],
        data() {
            return {
                //搜索数据
                searchData: {
                    loginStaffName: '',
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
            changeDate(e) {
                this.searchData.startDate = e[0]
                this.searchData.endDate = e[1]
            },
        }

    }
</script>

<style>

</style>
