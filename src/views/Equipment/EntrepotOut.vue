<template>
    <div class="equipment-lsit overspread-parent">
        <div class="tableData" v-if="!dialogTableVisible">
            <div class="searchData">
                <el-form :model="searchData" label-width="80px">
                    <el-form-item label="设备型号">
                        <EquimentSelect :deviceTypeId.sync="searchData.deviceTypeId"></EquimentSelect>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="searchData.agentArea" placeholder="支付方式">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="发货人">
                        <el-input placeholder="代理商名称/联系人/联系方式" v-model="searchData.queryCriteria"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="searchClick" type="primary" plain>搜索</el-button>
                        <el-button @click="resetSearch" type="success" plain>重置</el-button>
                        <el-button @click="resetSearch" type="success" plain>导出</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="tableBox">
                <el-table empty-text v-loading="loading" element-loading-text="数据正在加载中" element-loading-spinner="el-icon-loading"
                          :headerRowStyle="{color:'#000000'}" :data="tableData" border style="width: 100%;">
                    <el-table-column align="center" prop="orderNo" label="订单号"></el-table-column>
                    <el-table-column align="center" prop="agentName" label="代理商名称"></el-table-column>
                    <el-table-column align="center" prop="deviceTypeCode" label="设备型号"></el-table-column>
                    <el-table-column align="center" prop="deliveryCount" label="数量"></el-table-column>
                    <el-table-column align="center" prop="orderAmount" label="总价"></el-table-column>
                    <el-table-column align="center" prop="payChannelName" label="支付方式"></el-table-column>
                    <el-table-column align="center" prop="sendTime" label="发货时间"></el-table-column>
                    <el-table-column align="center" prop="sellerCount" label="收货人"></el-table-column>
                    <el-table-column align="center" prop="consignor" label="发货人"></el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text"  @click="headEdit(scope.row.deviceOutboundId)">详情</el-button>
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
                        layout=" sizes, prev, pager, next, jumper">
                </el-pagination>
            </div>
        </div>
        <ShippedAddModel ref="modalForm" class="overspread-model" v-if="dialogTableVisible"
                         @backrank="backrank"></ShippedAddModel>
    </div>
</template>

<script>
    import {myMixins} from "../../mixins/mixin";
    import ShippedAddModel from "./moduleModel/ShippedAddModel";
    import EquimentSelect from "../../components/select/EquimentSelect";
    import httpRequest from "../../api/api";
    export default {
        name: "EntrepotOut",
        mixins: [myMixins],
        data() {
            return {
                searchData: {
                    deviceTypeId: null, //设备型号
                    queryCriteria: '',  //查询条件
                    agent_pid: '',  //上级代理商id
                    size: 10,
                    page: 1
                },
                deviceType:[],
                total: 1,
                dialogTableVisible: false,
                tableData: [],
                listUrl: '/managecenter/deviceManage/deviceOutbound/queryDeviceOutbound',   //表格数据接口
            }
        },
        mounted() {
            if(this.$route.query.deviceTypeId != undefined){
                this.searchData.deviceTypeId = this.$route.query.deviceTypeId
            }
        },
        methods:{
            backrank(){
                this.dialogTableVisible = false;
            },
        },
        components:{
            EquimentSelect,
            ShippedAddModel
        },

    }
</script>

<style scoped>
    .searchData{
        box-shadow: none; margin-bottom: 0; padding-top: 25px;
    }
</style>
