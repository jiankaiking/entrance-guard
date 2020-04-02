<template>
    <div class="overspread-parent">
        <div v-if="!parentTest.dialogTableVisible" class="tableData">
            <div class="searchData">
                <el-form ref="form" :model="searchData" label-width="80px">
                    <el-form-item label="订单状态">
                        <el-select v-model="searchData.applyStatus" placeholder="选择订单状态">
                            <el-option
                                        v-for="item in applyList"
                                        :key="item.dataValue"
                                        :label="item.dataCode"
                                        :value="item.dataValue">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="支付类型">
                        <el-select v-model="searchData.payType" placeholder="支付方式">
                            <el-option
                                        v-for="item in device_pay_type"
                                        :key="item.dataValue"
                                        :label="item.dataCode"
                                        :value="item.dataValue">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="申请时间">
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
                    <el-form-item label="申请人">
                        <el-select v-model="searchData.operUserId" >
                         <el-option v-for="item in getAgentPersonIdAndNameByAgentList" 
                         :key="item.personId" 
                         :label="item.personName"
                         :value="item.personId">
                        </el-option>
                        </el-select>
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
                    <el-form-item label="订单号">
                        <el-input type="text" placeholder="请输入订单号" v-model="searchData.applyOrderNum"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="searchClick" type="primary" plain>搜索</el-button>
                        <el-button plain typ="info" @click="resetSearch">重置</el-button>
                        <el-button @click="exportData" type="warning" plain>导出</el-button>
                        <el-button type="success" @click="showAdd" plain>新增发货</el-button>
                        <el-button @click="batchReview" typ="info" plain>批量审核</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="tableBox">
                <el-table empty-text ref="multipleTable" tooltip-effect="dark"
                          @selection-change="handleSelectionChange" element-loading-text="数据正在加载中"
                          element-loading-spinner="el-icon-loading" :headerRowStyle="{color:'#000000'}"
                          :data="tableData" border style="width: 100%;">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column align="center" prop="applyOrderNum" label="订单号" width="240px"></el-table-column>
                    <el-table-column align="center" prop="agentName" label="代理商名称"></el-table-column>
                    <el-table-column align="center" prop="deviceTypeCode" label="设备型号"></el-table-column>
                    <el-table-column align="center" prop="applyCount" label="数量"></el-table-column>
                    <el-table-column align="center" prop="sumMoney" label="总价"></el-table-column>
                    <el-table-column align="center" prop="consignee" label="收货人"></el-table-column>
                    <el-table-column align="center" prop="payTypeName" label="支付类型"></el-table-column>
                    <el-table-column align="center" prop="prepareSavings" label="预存款可用余额"></el-table-column>
                    <el-table-column align="center" prop="outboundCount" label="已发货数量"></el-table-column>
                    <el-table-column align="center" prop="createTime" label="申请时间"></el-table-column>
                    <el-table-column align="center" prop="operation" label="申请人"></el-table-column>
                    <el-table-column align="center" prop="applyStatusName" label="订单状态"></el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" v-if="scope.row.applyStatus == 1" @click="shipBtn(scope.row)">
                                确认发货
                            </el-button>
                            <el-button type="text" @click="showInfo(scope.row)">详情</el-button>
                            <el-button type="text" v-if="scope.row.applyStatus == 3" @click="showInfo(scope.row)">审核
                            </el-button>
                            <el-button type="text" v-if="scope.row.applyStatus == 5" @click="showInfo(scope.row)">修改
                            </el-button>
                            <el-button type="text" v-if="scope.row.payType == 2" @click="showInfo(scope.row)">完款
                            </el-button>
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
        <el-dialog align="center" custom-class="shipped-class" width="40%" :title="dialogTitle"
                   :visible.sync="modelFlag" :lock-scroll="false">
            <MessagesBox v-if="cliIndex == 0" :review='review' @backrank="backrank"></MessagesBox>
            <PresentModel :deviceTypeId="deviceTypeId" :type="1" style="padding: 0 50px; box-sizing: border-box" v-if="cliIndex == 1"  @close="modalClose" @ok="modalFormOk"></PresentModel>
        </el-dialog>
        <ShippedAddModel ref="modalForm" class="overspread-model" v-if="parentTest.dialogTableVisible"
                       @trueDelivery="trueDelivery"  @backrank="backrank"></ShippedAddModel>
        <el-dialog
        title="批量审核"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <div style="margin:20px auto;text-align:center">
            <el-radio v-model="multipleSelection.auditStatus" :label="0">不通过</el-radio>
            <el-radio v-model="multipleSelection.auditStatus" :label="1">通过</el-radio>
        </div>
        <div>
            <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入审批意见"
        v-model="multipleSelection.remark">
        </el-input> 
        </div>
         
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="batchReviewBtn">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
    import {myMixins} from "../../mixins/mixin";
    import ShippedAddModel from "./moduleModel/ShippedAddModel";
    import MessagesBox from "./moduleModel/MessagesBox";
    import httpRequest from "../../api/api";
    import PresentModel from "./moduleModel/PresentModel";
    export default {
        name: "Unshipped",
        mixins: [myMixins],
        inject: ['parentTest'],
        data() {
            return {
                searchData: {
                    applyStatus: '',  //申请状态
                    payType: "",  //支付类型
                    startTime:'',
                    endTime:'',
                    operUserId: '',//申请人
                    size: 10,
                    applyOrderNum:'',
                    page: 1,
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
                centerDialogVisible:false,
                dialogTitle: '',
                modelFlag: false,
                review:{},
                deviceTypeId:null,
                dialogTableVisible: false,
                multipleSelection: {
                    deviceApplyIds:'',
                    auditStatus:'',
                    remark:''
                },
                total: 1,  
                cliIndex:0,              
                tableData: [{}],
                payList:[],
                searchTime:[],
                getAgentPersonIdAndNameByAgentList:[],
                selectAgentList:[],
                applyList:[],
                device_pay_type:[],
                exportUrl:'/api/managecenter/deviceManage/deviceApply/exportDeviceApply',///导出
                listUrl: '/managecenter/deviceManage/deviceApply/queryDeviceApply',   //表格数据接口
            }
        },
        components: {
            ShippedAddModel,
            MessagesBox,
            PresentModel
        },
        //组件卸载后关闭
        beforeDestroy() {
            this.parentTest.hiddDialogTableVisible()
        },
        mounted(){
            httpRequest("managecenter/sysDict/getSysDict", "GET")
                    .then(res => {
                        this.applyList=res.data.device_apply_status;
                        this.device_pay_type = res.data.device_pay_type;
            })
            httpRequest("managecenter/deviceManage/device/selectAgentList", "GET")
                    .then(res => {
                        this.selectAgentList = res.data;
            })
            httpRequest("/sellerManagement/agentPerson/getAgentPersonIdAndNameByAgentId", "GET")
                    .then(res => {
                        this.getAgentPersonIdAndNameByAgentList = res.data;
                    })
        },
        methods: {
            //确认发货
            shipBtn(row,){
                this.modelFlag=true
                this.cliIndex=1
                this.deviceTypeId=row.deviceTypeId
            },
            trueDelivery(row,review) {
               this.modelFlag=true
               this.cliIndex=0
               this.review=review
            },
            modelMessage() {

            },
            //
            modalFormOk(){
                this.modelFlag = false;
            },
            timeChage(){
                this.searchData.startTime=this.searchTime[0]
                this.searchData.endTime=this.searchTime[1]
            },
            //完款
            acccc() {
                this.dialogTableVisible = true
            },
            //新增点击
            showAdd() {
                this.parentTest.changeDialogTableVisible()
                this.$nextTick(() => {
                    this.$refs.modalForm.add();
                })
            },
            //详情
            showInfo(row) {
                this.parentTest.changeDialogTableVisible()
                this.$nextTick(() => {
                    this.$refs.modalForm.edit(row.deviceApplyId)
                })
            },
            // 去除新增组件
            backrank() {
                this.parentTest.hiddDialogTableVisible()
                this.modelFlag=false
                this.searchClick()
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                var arr=[];
                for(var i=0;i<val.length;i++){
                    arr.push(val[i].deviceApplyId)
                }
                this.multipleSelection.deviceApplyIds=arr.join(',')
            },
            batchReviewBtn(){
                httpRequest("managecenter/deviceManage/deviceApply/batchAuditApply", "post",this.multipleSelection)
                    .then(res => {
                        if(res.success){
                            this.centerDialogVisible=false;
                             this.$message({
                                            type: 'success',
                                            message: res.msg
                                        })
                                        this.searchClick()

                        }
                })
            },
            batchReview(){
                if(this.multipleSelection.deviceApplyIds){
                    this.centerDialogVisible=true;
                }else{
                    this.$message({
                                            type: 'error',
                                            message: `请选择设备`
                                        })
                }
            },
        },
    }
</script>

<style scoped>
    .searchData {
        box-shadow: none;
        margin-bottom: 0;
        padding-top: 25px;
    }

</style>
