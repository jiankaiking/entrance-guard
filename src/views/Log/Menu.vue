<template>
    <div class="main-contenner">
        <div class="searchData">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="任务名称" style="width: 250px">
                    <el-select   v-model="form.region" placeholder="请选择">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间" style="width: 250px">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                    style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" style="width: 250px">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                    style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="任务名称" style="width: 250px">
                    <el-select  v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain @click="searchClick">搜索</el-button>
                    <el-button type="info" plain>重置</el-button>
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
                            align="center"
                            prop="date"
                            label="日志编号"
                           >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="name"
                            label="操作模块"
                           >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="address"
                            label="操作结果">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="address"
                            label="IP">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="address"
                            label="操作时间">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="address"
                            label="操作内容">
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
        name: "Organization",
        mixins:[myMixins],
        data() {
            return {
                //搜索内容
                searchData:{
                    operatorName:'',
                    operTime:null,
                    operContent:'',
                    page:1,
                    size:10
                },
                listUrl:'/log/getSysOperationLogList',
                tableData: []
            }
        },
        mounted(){

        },
        methods: {

        }
    }
</script>

<style >

</style>
