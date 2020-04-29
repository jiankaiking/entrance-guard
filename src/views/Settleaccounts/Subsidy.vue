<template>
    <div class="main-contenner">
        <div class="searchData">
            <el-form ref="form" :model="searchData" label-width="50px">
                <el-form-item label-width="120px" label="代理商名称">
                    <el-input v-model="searchData.agentId"></el-input>
                </el-form-item>
                <el-form-item label="申请结算时间" label-width="120px">

                        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
                                        v-model="searchData.startTime" style="width: 100%;"></el-date-picker>

                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="searchData.status" placeholder="请选择">
                        <el-option label="待结算" value="1"></el-option>
                        <el-option label="结算驳回" value="2"></el-option>
                        <el-option label="已结算" value="3"></el-option>
                    </el-select>
                </el-form-item>
<!--                <el-form-item label="补贴类型" label-width="70px">-->
<!--                    <el-select v-model="form.region" placeholder="请选择活动区域">-->
<!--                        <el-option label="区域一" value="1"></el-option>-->
<!--                        <el-option label="区域二" value="2"></el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
                <el-form-item>
                    <el-button @click="searchClick" type="primary" plain>搜索</el-button>
                    <el-button @click="resetSearch" type="info" plain>重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div style="line-height: 48px;padding-left: 35px">共{{total}}条数据</div>
        <div class="tableData">
            <div class="tableBox">
                <el-table empty-text :headerRowStyle="{color:'#000000'}" :data="tableData" v-loading="loading"
                        border style="width: 100%;">
                    <el-table-column align="center" type="index" width="50" label="序号"></el-table-column>
                    <el-table-column align="center" prop="agentName" label="代理商名称"></el-table-column>
                    <el-table-column align="center" prop="month" label="结算日期"></el-table-column>
                    <el-table-column align="center" prop="status" label="状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status == 1">待结算</span>
                            <span v-if="scope.row.status == 2">结算驳回</span>
                            <span v-if="scope.row.status == 3">已结算</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="type" label="补贴类型"></el-table-column>
                    <el-table-column align="center" prop="tradingCount" label="交易有效笔数(元)"></el-table-column>
                    <el-table-column align="center" prop="tradinAmount" label="交易有效金额(元)"></el-table-column>
                    <el-table-column align="center" prop="commission" label="补贴金额(元)"></el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="headEdit(scope.row)">详情</el-button>
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
        <el-dialog :lock-scroll="false" title="补贴详情" width="40%" align="center" :visible.sync="dialogTableVisible"
                  >
            <CommissionModel ref="modalForm" @close="modalClose"></CommissionModel>
        </el-dialog>
    </div>
</template>

<script>
    import {myMixins} from "../../mixins/mixin";
    import CommissionModel from "./CommissionModel";

    export default {
        name: "commission",
        mixins:[myMixins],
        data() {
            return {
                searchData: {
                    currentPage:1,
                    size:10,
                    month:'',
                    status:'',
                },
                total:0,
                listUrl:'/managecenter/center/settlement/manage/equipment/subsidies/list',
                dialogTableVisible: false,
                tableData: []
            }
        },
        components: {
            CommissionModel
        },
        methods: {

        }

    }
</script>

<style scoped>
.searchData{
    margin-bottom: 0;
}
</style>
