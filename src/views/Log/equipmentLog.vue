<template>
    <div class="main-contenner">
        <div class="searchData">
            <el-form ref="form" :model="searchData" label-width="80px">
                <el-form-item label="事件" style="width: 220px">
                    <el-input v-model="searchData.loginUserName"   placeholder="请输入事件名称"></el-input>
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
                <el-form-item>
                    <el-button type="primary" plain @click="searchClick">搜索</el-button>
                    <el-button @click="resetSearch" plain>重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tableData">
            <div class="tableBox">
                <el-table :data="tableData" border empty-text style="width: 100%" v-loading="loading">
                    <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
                    <el-table-column prop="event" align="center" label="事件"></el-table-column>
                    <el-table-column prop="createTime" label="发生时间" align="center"></el-table-column>
                    <el-table-column prop="operUser" align="center" label="操作人"></el-table-column>
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
        name: "quipmentLog",
        mixins: [myMixins],
        data() {
            return {
                //搜索数据
                searchData: {
                    event: '',
                    startDate: '',
                    endDate: '',
                    page: 1,
                    size: 10
                },
                dateValue: '',
                total: 0,
                listUrl: '/managecenter/log/getEquipmentLogList',
                tableData: []
            }
        },

        mounted() {

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

<style>

</style>
