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
                    <el-form-item label="部门名称">
                        <el-select v-model="searchData.agentArea" placeholder="选择省">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="绑定时间">
                        <el-select v-model="searchData.agentArea" placeholder="选择市">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="代理商名称/联系人/联系方式" v-model="searchData.queryCriteria"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="searchClick" type="primary" plain>搜索</el-button>
                        <el-button @click="agentAdd" type="success" plain>新增</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="tableBox">
                <el-table empty-text v-loading="loading" element-loading-text="数据正在加载中"
                          element-loading-spinner="el-icon-loading"
                          :headerRowStyle="{color:'#000000'}"
                          :data="tableData" border style="width: 100%;">
                    <el-table-column align="center" prop="agentId" label="序号"></el-table-column>
                    <el-table-column align="center" prop="snCode" label="SN码"></el-table-column>
                    <el-table-column align="center" prop="deviceTypeCode" label="设备型号"></el-table-column>
                    <el-table-column align="center" prop="agentName" label="代理商"></el-table-column>
                    <el-table-column align="center" prop="sellerName" label="商家"></el-table-column>
                    <el-table-column align="center" prop="agentScope" label="交易笔数"></el-table-column>
                    <el-table-column align="center" prop="createTime" label="交易金额"></el-table-column>
                    <el-table-column align="center" prop="bindTime" label="绑定时间"></el-table-column>
                    <el-table-column align="center" prop="createTime" label="操作人"></el-table-column>
                    <el-table-column align="center" prop="sellerCount" label="操作"></el-table-column>
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
                listUrl: '/deviceManage/device/getDeviceListByStatus',   //表格数据接口
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
                httpRequest("/deviceManage/device/selectCountByDeviceStatus", "GET")
                    .then(res => {
                        this.dataInfo = res.data;
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
