<template>
    <div class="equipment-lsit">
        <div class="equipment-total">
            <ul>
                <li @click="equipmentClick(0)" :class="{'active':equipmentIndex == 0}"><p>已绑定设备</p><p>{{dataInfo.boundDeviceCount}}</p></li>
                <li @click="equipmentClick(1)" :class="{'active':equipmentIndex == 1}"><p>绑定设备申请</p><p>{{dataInfo.auditDeviceCount}}</p></li>
                <li @click="equipmentClick(2)" :class="{'active':equipmentIndex == 2}"><p>已发货设备</p><p>{{dataInfo.deliverDeviceCount}}</p></li>
            </ul>
        </div>
        <div class="status-options">
            <ul>
                <li @click="bindStatuschange(index)" :class="{'active': activeIndex == index}" v-for="(item,index) in bindStatusArr">
                    {{item.name}}
                </li>
            </ul>
        </div>
        <div class="tableData">
            <div class="searchData">
                <el-form ref="form" :model="searchData" label-width="120px">
                    <el-row>
                        <el-col :span="4">
                    <el-form-item label="设备型号">
                        <el-select v-model="searchData.deviceTypeId" @change="changeDeviceType" placeholder="选择设备型号">
                            <el-option
                                    v-for="item in deviceTypeList"
                                    :key="item.deviceTypeId"
                                    :label="item.deviceTypeCode"
                                    :value="item.deviceTypeId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="6">
                    <el-form-item label="绑定时间" :span="6">
                                <el-date-picker
                            v-model="searchData.searchTime"
                            type="daterange"
                            align="right"
                            unlink-panels
                            format='yyyy-MM-dd'
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
                            </el-date-picker>
                    </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item label-width="20px">
                        <el-select v-model="searchData.deviceTypeId" placeholder="请选择操作人">
                                <el-option
                                        v-for="item in deviceTypeList"
                                        :key="item.deviceTypeId"
                                        :label="item.deviceTypeCode"
                                        :value="item.deviceTypeId">
                                </el-option>
                        </el-select>
                        <el-form-item>
                    </el-col>
                    <el-col :span="3" >
                    <el-form-item label-width="20px">
                        <el-select v-model="searchData.search" placeholder="请选择代理商">
                                <el-option
                                        v-for="item in selectFactoryList"
                                        :key="item"
                                        :value="item">
                                {{item}}
                                </el-option>
                        </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="3">
                    <el-form-item label-width="20px">
                        <el-input placeholder="请输入SN码" v-model="searchData.queryCriteria"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="5">
                    <el-form-item label-width="20px">
                        <el-button @click="searchClick" type="primary" plain>搜索</el-button>
                        <el-button @click="resetSearch" type="success" plain>重置</el-button>
                        <el-button  type="warning" plain>导出</el-button>
                    </el-form-item>
                    </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="tableBox">
                <el-table empty-text v-loading="loading" element-loading-text="数据正在加载中"
                          element-loading-spinner="el-icon-loading"
                          :headerRowStyle="{color:'#000000'}"
                          :data="tableData" border style="width: 100%;">
                    <el-table-column align="center" type="index" width="50" label="序号"></el-table-column>
                    <el-table-column align="center" prop="snCode" label="SN码"></el-table-column>
                    <el-table-column align="center" prop="deviceTypeCode" label="设备型号"></el-table-column>
                    <el-table-column align="center" prop="agentName" label="代理商"></el-table-column>
                    <el-table-column align="center" prop="sellerName" label="商家"></el-table-column>
                    <el-table-column align="center" prop="totalCount" label="交易笔数"></el-table-column>
                    <el-table-column align="center" prop="totalMoney" label="交易金额"></el-table-column>
                    <el-table-column align="center" prop="bindTime" label="绑定时间"></el-table-column>
                    <el-table-column align="center" prop="auditUser" label="操作人"></el-table-column>
                    <el-table-column align="center" label="操作">
                        <template>
                            <el-button plain type="text">详情</el-button>
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
    import httpRequest from "../../api/api";

    export default {
        name: "EquipmentKList",
        mixins: [myMixins],
        data() {
            return {
                searchData: {
                    bindStatus: 3, //代理区域
                    searchTime: '',  //查询条件
                    deviceTypeId: '',  //上级代理商id\
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
                activeIndex: 0,  //绑定状态下标
                equipmentIndex:0, // 总数状态下标
                bindStatusArr: [
                    {name: "已绑定设备", value: 3},
                    {name: "待绑定设备", value: 2},
                    {name: "解除绑定申请", value: 5}
                ],
                dataInfo: {},
                total: '',
                dialogTableVisible: false,
                tableData: [],
                selectFactoryList:[],
                listUrl: '/managecenter/deviceManage/device/getDeviceListByStatus',   //表格数据接口
            }
        },
        mounted() {
            this.getdevice()
        },
        methods: {
            equipmentClick(index){
                this.equipmentIndex = index
            },
            //点击切换绑定状态
            bindStatuschange(index){
                this.activeIndex = index;
                this.searchData.bindStatus = this.bindStatusArr[index].value;
                this.getTableData()
            },
            
            //获取总设备数量
            getdevice() {
                httpRequest("/managecenter/deviceManage/device/selectCountByDeviceStatus", "GET")
                    .then(res => {
                        this.dataInfo = res.data;
                    })
                    httpRequest("managecenter/deviceManage/deviceType/selectDeviceTypeList", "GET")
                    .then(res => {
                        this.deviceTypeList = res.data;
                    })
                    httpRequest("managecenter/deviceManage/deviceType/selectFactoryList", "GET")
                    .then(res => {
                        this.selectFactoryList = res.data;
                    })
            }

        }
    }
</script>

<style scoped>
    .searchData {
        box-shadow: none;
        margin-bottom: 0;
        padding-top: 25px;
    }

    .status-options {
        width: 100%;
        background: #fff;
        margin: 25px 0;
        height: 60px;
        line-height: 60px;
        box-shadow: 0px 1px 6px 4px rgba(242, 242, 242, 1);
        border-radius: 8px;
    }

    .status-options ul {
        padding: 0 34px;
        box-sizing: border-box;
    }

    .status-options li {
        display: inline-block;
        margin-right: 100px;
        color: #000000;
        position: relative;
        cursor: pointer;
    }

    .status-options li.active {
        color: #38B8EE;
    }

    .status-options li.active::before {
        position: absolute;
        content: "";
        width: 100%;
        height: 2px;
        background: #38B8EE;
        bottom: 0; left: 0;
    }

</style>
