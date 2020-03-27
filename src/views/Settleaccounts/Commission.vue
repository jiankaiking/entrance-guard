<template>
    <div class="main-contenner">
        <div class="searchData">
            <el-form ref="form" class="search-from" :model="searchData" label-width="100px">
                <el-form-item label="代理商名称">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="申请结算时间" label-width="120px">
                        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
                                        v-model="searchData.startTime" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="状态" label-width="60px">
                    <el-select placeholder="请选择" v-model="searchData.status">
                        <el-option :value="3" label="已结算"></el-option>
                        <el-option :value="1" label="待结算"></el-option>
                        <el-option :value="2" label="已驳回"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="searchClick" type="primary" plain>搜索</el-button>
                    <el-button @click="resetSearch"  plain>重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div style="padding-left: 35px;line-height: 48px">共{{total }}条数据，补贴金额0元</div>
        <div class="tableData">
            <div class="tableBox">
                <el-table empty-text
                          :headerRowStyle="{color:'#000000'}" :data="tableData"
                        border style="width: 100%;">
                    <el-table-column align="center" type="index" width="80" label="序号"></el-table-column>
                    <el-table-column align="center" prop="agentName" label="代理商名称"></el-table-column>
                    <el-table-column align="center" prop="monthDate" label="结算日期"></el-table-column>
                    <el-table-column align="center" prop="status" label="状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status == 1">待结算</span>
                            <span v-if="scope.row.status == 3">已结算</span>
                            <span v-if="scope.row.status == 2">已驳回</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="settlementAmount" label="结算金额(元)"></el-table-column>
                    <el-table-column align="center" prop="tradingCount" label="交易笔数"></el-table-column>
                    <el-table-column align="center" prop="indirectCommission" label="间连分润(元)"></el-table-column>
                    <el-table-column align="center" prop="directlyCommission" label="直连分润(元)"></el-table-column>
                    <el-table-column align="center" prop="totalCommission" label="总分润(元)"></el-table-column>
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
        <el-dialog :lock-scroll="false" title="结算详情" width="40%" align="center" :visible.sync="dialogTableVisible"
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
                searchData:{
                    startTime:'',
                    status:'',
                    currentPage:1,
                    size:10,
                    endTime:''
                },
                total:0,
                listUrl:'/managecenter/center/settlement/manage/settlement/commission/list',
                dialogTableVisible: false,
                tableData: []
            }
        },
        components: {
            CommissionModel
        },
        methods: {
            //搜索重置
            resetSearch() {
                Object.keys(this.searchData).forEach(key => this.searchData[key] = '');
                this.searchData.size = 10;
                this.searchData.currentPage = 1;
                this.getTableData()
            },
            showModel() {
                this.dialogTableVisible = true
            },
            onSubmit() {
                console.log('submit!');
            }
        }

    }
</script>

<style scoped>


.searchData{
    margin-bottom: 0;
}
</style>
