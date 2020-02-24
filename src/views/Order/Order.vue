<template>
    <div class="main-contenner">
        <div class="searchData">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="订单号">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="订单时间">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                    style="width: 140px"></el-date-picker>
                                    <span style="margin: 0 15px;">-</span>
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date2"
                                    style="width: 140px"></el-date-picker>
                </el-form-item>
                <el-form-item label="门店">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="商户">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tableData tableBorder">
            <div class="tableBox">
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            align="center"
                            prop="number"
                            label="序号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="name"
                            label="订单号ID"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="state"
                            label="订单状态">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="payer"
                            label="付款人">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="shop"
                            label="商户名">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="store"
                            label="门店名字">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="equipment"
                            label="设备号">
                    </el-table-column>
                    <el-table-column
                            prop="group"
                            label="所属小组">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="cashier"
                            label="收银员">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="money"
                            label="订单金额">
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage4"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        :total="400"
                        layout=" sizes, prev, pager, next, jumper"
                >
                </el-pagination>
            </div>
        </div>
        <div class="halfTable">
            <div class="tableData tableBox">
                <div class="title">流水信息</div>
                <div class="tableBox">
                <el-table
                        :data="tableDataLeft"
                        border

                        style="width: 100%">
                    <el-table-column
                            align="center"
                            prop="merchantRate"
                            label="商户费率"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="actualAmount"
                            label="商户实到金额"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="amountPayable"
                            label="客户应付金额">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="businessType"
                            label="业务类型">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="collectionChannel"
                            label="收款通道">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="createTime"
                            label="创建时间">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="remark"
                            label="备注">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="state"
                            label="状态">
                    </el-table-column>
                </el-table>
                </div>
            </div>
            <div class="tableData tableBox">
                <div class="title">支付信息</div>
                <div class="tableBox">
                <el-table
                        :data="tableDataRight"
                        border
                        style="width: 100%">
                    <el-table-column
                            align="center"
                            prop="useChannel"
                            label="使用通道"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="useProduct"
                            label="使用产品"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="royaltyRate"
                            label="手续费">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="merchantRate"
                            label="商户费率">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="channelFee"
                            label="商户通道费用">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="dueFromMerchant"
                            label="商户应到账金额">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="drawingRule"
                            label="提款规则">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="threePartyOrder"
                            label="三方订单号">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="basicAmount"
                            label="基础金额">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="orderOfPayer"
                            label="支付方订单号">
                    </el-table-column>
                </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Organization",
        data() {
            return {
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                tableData: [{
                    number: '001',
                    user: '熏悟空',
                    state: '已支付'
                }, {
                    number: '002',
                    user: '居八戒',
                    state: '未支付'
                }, {
                    number: '003',
                    user: '虾悟净',
                    state: '未支付'
                }, {
                    number: '004',
                    user: '别龙马',
                    state: '未支付'
                }],
                tableDataLeft: [{
                    actualAmount: '2%',
                    amountPayable: '800',
                    merchantRate: '500'
                }, {
                    actualAmount: '2%',
                    amountPayable: '800',
                    merchantRate: '500'
                }, {
                    actualAmount: '2%',
                    amountPayable: '800',
                    merchantRate: '500'
                }, {
                    actualAmount: '2%',
                    amountPayable: '800',
                    merchantRate: '500'
                }],
                tableDataRight: [{
                    useChannel: '不机到',
                    useProduct: '西瓜霜',
                    royaltyRate: '25'
                }, {
                    useChannel: '不机到',
                    useProduct: '西瓜霜',
                    royaltyRate: '25'
                }, {
                    useChannel: '不机到',
                    useProduct: '西瓜霜',
                    royaltyRate: '25'
                }, {
                    useChannel: '不机到',
                    useProduct: '西瓜霜',
                    royaltyRate: '25'
                }],
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }

    }
</script>

<style>
    .tableBorder th.gutter,.tableLeft th.gutter,.tableRight th.gutter{
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
    .tableData .title {
        margin-top: 20px;
        text-align: center;
        display: inline-block;
        background: #fff;
        width: 100%;
    }
</style>
