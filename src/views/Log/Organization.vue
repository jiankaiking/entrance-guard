<template>
    <div class="main-contenner">
        <div class="searchData">
            <el-form ref="form" :model="searchData" label-width="80px">
                <el-form-item label="操作人员">
                    <el-input v-model="searchData.operatorName"  placeholder="请输入操作人员"></el-input>
                </el-form-item>
                <el-form-item label="操作时间">
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
                <el-form-item label="操作内容" style="width: 350px">
                    <el-input v-model="searchData.operContent" placeholder="支持模糊搜索"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button plain type="primary" @click="searchClick">搜索</el-button>
                    <el-button type="info" @click="resetSearch" plain>重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tableData">
            <div class="tableBox">
                <el-table :data="tableData" border empty-text style="width: 99.9%"  v-loading="loading">
                    <el-table-column prop="logId" align="center" label="日志编号"></el-table-column>
                    <el-table-column prop="logModule" label="操作模块" align="center"></el-table-column>
                    <el-table-column prop="operResult" align="center" label="操作结果"></el-table-column>
                    <el-table-column prop="userName" align="center" label="姓名"></el-table-column>
                    <el-table-column prop="clientIp" align="center" label="IP"></el-table-column>
                    <el-table-column prop="operTime" align="center" label="操作时间"></el-table-column>
                    <el-table-column prop="operContent" align="center" label="操作内容"></el-table-column>
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
        mixins:[myMixins],
        data() {
            return {
                //搜索数据
                searchData:{
                    operatorName:'',
                    startDate: '',
                    endDate: '',
                    operContent:'',
                    page:1,
                    size:10
                },
                total:0,
                dateValue: '',
                listUrl:'/managecenter/log/getSysOperationLogList',
                tableData: []
            }
        },
        mounted(){
        },
        methods: {
            changeDate(e) {
                if(e){
                    this.searchData.startDate = e[0]
                    this.searchData.endDate = e[1]
                }else{
                    this.searchData.startDate = ''
                    this.searchData.endDate = ''
                }
            },
        },
        watch:{
            "searchData.startDate"(val,old){
                if(val === ''){
                    this.dateValue = ''
                }
            },
        }

    }
</script>

<style scoped>

</style>
