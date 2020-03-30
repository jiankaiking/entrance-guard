<template>
    <div class="main-contenner">
        <div class="searchData">
            <el-form ref="form" class="search-from" :model="searchData" label-width="30px">
                <el-form-item style="width: 20%">
                    <CitySelect type="city" @selectCode="selectCode"></CitySelect>
                </el-form-item>
                <el-form-item>
                    <el-input></el-input>
                </el-form-item>
                <el-form-item style="width: 160px" label="状态" label-width="60px">
                    <el-select v-model="searchData.status" placeholder="结算状态">
                        <el-option label="未结算" value="1"></el-option>
                        <el-option label="已驳回" value="2"></el-option>
                        <el-option label="已结算" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="申请结算时间" label-width="120px">
                    <el-col :span="11">
                        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
                                        v-model="searchData.startTime" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col style="text-align: center" :span="1">-</el-col>
                    <el-col :span="11">
                        <el-date-picker
                                value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
                                v-model="searchData.endTime"
                                style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button @click="searchClick" type="primary" plain>搜索</el-button>
                    <el-button @click="resetSearch" type="info" plain>重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tableData">
            <div class="tableBox">
                <el-table
                        empty-text  :headerRowStyle="{color:'#000000'}" :data="tableData"
                        border v-loading="loading" style="width: 100%;">
                    <el-table-column align="center" type="index" width="80" label="序号"></el-table-column>
                    <el-table-column align="center" prop="agentName" label="代理商名称"></el-table-column>
                    <el-table-column align="center" prop="responsibleName" label="联系人"></el-table-column>
                    <el-table-column align="center" prop="totalAmount" label="结算金额"></el-table-column>
                    <el-table-column align="center" prop="area" label="代理区域"></el-table-column>
                    <el-table-column align="center"  label="结算状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status == 1">待结算</span>
                            <span v-if="scope.row.status == 2">结算驳回</span>
                            <span v-if="scope.row.status == 3">已结算</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="applyTime" label="申请时间"></el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" v-if="scope.row.status == 1" @click="settleAccounts(scope.row,2)">驳回</el-button>
                            <el-button type="text" v-if="scope.row.status == 1" @click="settleAccounts(scope.row,3)">结算</el-button>
                            <el-button type="text" @click="goInfo(scope.row)">详情</el-button>
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
    import {myMixins} from "../../mixins/mixin";
    import CitySelect from "../../components/select/CitySelect";
    import httpRequest from "../../api/api";

    export default {
        name: "accountslist",
        mixins:[myMixins],
        data() {
            return {
                searchData: {
                    startTime:'',
                    endTime:'',
                    status:'',
                    currentPage:1,
                    size:10
                },
                total:0,
                cityCode:'',
                dialogTableVisible: false,
                tableData: [],
                listUrl:'/managecenter/center/settlement/manage/settlement/list'
            }
        },
        components:{
            CitySelect
        },
        methods: {
            selectCode(e){

            },
            settleAccounts(row,status){
                httpRequest("/managecenter/center/settlement/manage/settlement",'POST',{id:row.id, status:status})
                    .then(res=>{
                        if(res.success){
                            this.getTableData()
                        }
                    })
            },
            goInfo(row){
                this.$router.push({path:'/accounts/settleamessage',query:{id:row.id}})
            },
        }

    }
</script>

<style scoped>
.search-from{
    display: flex; justify-content: flex-start;align-items: center;
}
</style>
