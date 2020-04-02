<template>
    <div class="equipment-lsit overspread-parent">
        <div class="tableData" v-if="!dialogTableVisible">
            <div class="searchData">
                <el-form :model="searchData" label-width="80px">
                    <el-form-item label="设备型号">
                        <EquimentSelect :deviceTypeId.sync="searchData.deviceTypeId"></EquimentSelect>
                    </el-form-item>
                    <el-form-item label="支付方式">
                        <el-select v-model="searchData.payChannel">
                                <el-option v-for="item in device_pay_channel" 
                                :key="item.dataValue" 
                                :label="item.dataCode" 
                                :value="item.dataValue">
                                </el-option>
                            </el-select>
                    </el-form-item>
                    <el-form-item label="发货时间">
                        <el-date-picker
                            v-model="searchTime"
                            type="daterange"
                            align="right"
                            unlink-panels
                            format='yyyy-MM-dd'
                            @change="timeChage"
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
                            </el-date-picker>
                    </el-form-item>
                    <el-form-item label="出库人">
                        <el-input v-model="searchData.consignor" placeholder="请输入快递单号"></el-input>
                    </el-form-item>
                    <el-form-item label="代理商名称" label-width="100px">
                    <el-select v-model="searchData.agentId" >
                            <el-option v-for="item in selectAgentList" 
                            :key="item.agentId" 
                            :label="item.agentName"
                            :value="item.agentId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label-width="20px" >
                        <el-input v-model="searchData.search" placeholder="请输入快递单号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="searchClick" type="primary" plain>搜索</el-button>
                        <el-button @click="resetSearch" type="success" plain>重置</el-button>
                        <el-button @click="exportData" type="success" plain>导出</el-button>
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
                    <el-table-column align="center" prop="consignee" label="收货人"></el-table-column>
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
                    startTime:'',
                    endTime:'',
                    consignor:'', //发货人
                    payChannel:'',//支付方式
                    agentId: '',  //代理商id
                    search:'',
                    size: 10,
                    page: 1
                },
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                        }
                    }]
                    },
                deviceType:[],
                searchTime:[],
                total: 1,
                device_pay_channel:[], ///支付方式
                selectAgentList:[],
                dialogTableVisible: false,
                tableData: [],
                exportUrl:'/api/managecenter/deviceManage/deviceOutbound/exportDeviceOutbound',///导出
                listUrl: '/managecenter/deviceManage/deviceOutbound/queryDeviceOutbound',   //表格数据接口
            }
        },
        mounted() {
            httpRequest("managecenter/sysDict/getSysDict", "GET")
                    .then(res => {
                        this.device_pay_channel = res.data.device_pay_channel;
            })
             httpRequest("managecenter/deviceManage/device/selectAgentList", "GET")
                    .then(res => {
                        this.selectAgentList = res.data;
            })
            if(this.$route.query.deviceTypeId != undefined){
                this.searchData.deviceTypeId = this.$route.query.deviceTypeId
            }
        },
        methods:{
             timeChage(){
                this.searchData.startTime=this.searchTime[0]
                this.searchData.endTime=this.searchTime[1]
            },
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
