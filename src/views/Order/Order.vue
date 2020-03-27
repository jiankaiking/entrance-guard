<template>
    <div class="main-contenner">
        <div class="searchData">
            <el-form ref="form" style="display: flex" :model="searchData" label-width="80px">
                <el-form-item label="订单号">
                    <el-input v-model="searchData.currentPage"></el-input>
                </el-form-item>
                <el-form-item label="订单时间" style="width: 28%">
                    <el-row>
                        <el-col :span="10">
                            <el-date-picker type="date" placeholder="选择日期" v-model="searchData.currentPage"
                            ></el-date-picker>
                        </el-col>
                        <el-col :offset="1" :span="1">
                            <span>-</span>
                        </el-col>
                        <el-col :span="10">
                            <el-date-picker type="date" placeholder="选择日期" v-model="searchData.currentPage"
                                            ></el-date-picker>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="门店">
                    <el-input v-model="searchData.currentPage"></el-input>
                </el-form-item>
                <el-form-item label="商户">
                    <el-input v-model="searchData.currentPage"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getOrder" plain>搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tableData tableBorder">
            <div class="tableBox">
                <el-table :data="tableData" v-loading="loading" empty-text border style="width: 100%">
                    <el-table-column align="center" type="index" label="序号" width="50px"></el-table-column>
                    <el-table-column align="center" prop="orderId" label="订单号ID" width="180"></el-table-column>
                    <el-table-column align="center" prop="state" label="订单状态" width="100"></el-table-column>
                    <el-table-column align="center" prop="payer" label="付款人" width="150"></el-table-column>
                    <el-table-column align="center" prop="merchantName" label="商户名" width="150"></el-table-column>
                    <el-table-column align="center" prop="storeName" label="门店名字" width="150"></el-table-column>
                    <el-table-column align="center" prop="equipment" label="设备号" width="150"></el-table-column>
                    <el-table-column prop="group" label="所属小组"></el-table-column>
                    <el-table-column align="center" prop="cashier" label="收银员" width="150"></el-table-column>
                    <el-table-column align="center" prop="totalPrice" label="订单金额" width="150"></el-table-column>
                    <el-table-column align="center" prop="platformDiscount"  label="平台优惠总额度" width="150"></el-table-column>
                    <el-table-column align="center" prop="money" label="优惠额度" width="150"></el-table-column>
                    <el-table-column align="center" prop="amountPayable" label="客户应付金额 " width="150"></el-table-column>
                    <el-table-column align="center" prop="creationTime" label="创建时间" width="150"></el-table-column>
                    <el-table-column align="center" prop="passName" label="使用通道 " width="150"></el-table-column>
                    <el-table-column align="center" prop="mediaName" label="使用介质" width="150"></el-table-column>
                    <el-table-column align="center" prop="poundage" label="手续费 " width="150"></el-table-column>
                    <el-table-column align="center" prop="money" label="平台费率" width="150"></el-table-column>
                    <el-table-column align="center" prop="merchantRate" label="商户费率 " width="150"></el-table-column>
                    <el-table-column align="center" prop="money" label="订单备注" width="150"></el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="searchData.currentPage"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="searchData.size"
                        :total="total"
                        layout=" sizes, prev, pager, next, jumper"
                >
                </el-pagination>
            </div>
        </div>
        <div class="halfTable">
            <div class="tableData tableBox">
                <div class="title-order">流水信息</div>
                <div class="tableBox">
                    <el-table :data="tableDataLeft" empty-text border style="width: 100%">
                        <el-table-column align="center" prop="merchantRate" label="商户费率" width="50"></el-table-column>
                        <el-table-column align="center" prop="actualAmount" label="商户实到金额" width="180"></el-table-column>
                        <el-table-column align="center" prop="amountPayable" label="客户应付金额"></el-table-column>
                        <el-table-column align="center" prop="businessType" label="业务类型"></el-table-column>
                        <el-table-column align="center" prop="collectionChannel" label="收款通道"></el-table-column>
                        <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
                        <el-table-column align="center" prop="remark" label="备注"></el-table-column>
                        <el-table-column align="center" prop="state" label="状态"></el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="tableData tableBox">
                <div class="title-order">支付信息</div>
                <div class="tableBox">
                    <el-table :data="tableDataRight" empty-text border style="width: 100%">
                        <el-table-column align="center" prop="useChannel" label="使用通道" width="180"></el-table-column>
                        <el-table-column align="center" prop="useProduct" label="使用产品" width="180"></el-table-column>
                        <el-table-column align="center" prop="royaltyRate" label="手续费"></el-table-column>
                        <el-table-column align="center" prop="merchantRate" label="商户费率"></el-table-column>
                        <el-table-column align="center" prop="channelFee" label="商户通道费用"></el-table-column>
                        <el-table-column align="center" prop="dueFromMerchant" label="商户应到账金额"></el-table-column>
                        <el-table-column align="center" prop="drawingRule" label="提款规则"></el-table-column>
                        <el-table-column align="center" prop="threePartyOrder" label="三方订单号"></el-table-column>
                        <el-table-column align="center" prop="basicAmount" label="基础金额"></el-table-column>
                        <el-table-column align="center" prop="orderOfPayer" label="支付方订单号"></el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import httpRequest from "../../api/api";
    export default {
        name: "Organization",
        data() {
            return {
                tableData: [],
                tableDataLeft: [],
                tableDataRight: [],
                loading:false,
                total:1,
                searchData:{
                    currentPage:1,
                    size:10,
                    startTime:'2020-03-18',
                    storeId:'', //门店
                    merchantId:'',//商户id
                    endTime:'2020-03-19',
                }
            }
        },
        mounted(){
            this.getOrder()
        },
        methods: {
            handleSizeChange(e){
                this.searchData.size = e;
                this.getOrder()
            },
            handleCurrentChange(){
                this.searchData.currentPage = e;
                this.getOrder()
            },
           getOrder(){
               this.loading = true;
               httpRequest("/managecenter/center/settlement/manage/order/list","GET",this.searchData)
                   .then(res=>{
                       if(res.success){
                           this.tableData = res.data.list;
                       }
                   })
                   .finally(res=>{
                       this.loading = false
                   })
           },
        }

    }
</script>

<style>
    .tableBorder th.gutter, .tableLeft th.gutter, .tableRight th.gutter {
        display: table-cell !important;
    }
</style>

<style scoped>
    .tableData {
        background: #ffffff;
        box-shadow: 0px 1px 6px 4px #f2f2f2;
    }

    .tableData .tableBox {
        padding: 30px;
        box-sizing: border-box;
    }

    .tableData .tableBox th {
        display: table-cell !important;
    }

    .tableData .pagination {
        padding-bottom: 30px;
    }

    .tableData {
        margin-bottom: 25px;
    }

    .tableData .title-order {
        margin-top: 20px;
        text-align: center;
        display: inline-block;
        background: #fff;
        width: 100%;
    }
</style>
