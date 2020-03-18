<template>
    <div class="overspread-parent">
        <div v-if="!parentTest.dialogTableVisible" class="tableData">
            <div class="searchData">
                <el-form ref="form" :model="searchData" label-width="80px">
                    <el-form-item label="订单状态">
                        <el-select v-model="searchData.applyStatus" placeholder="选择省">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="支付类型">
                        <el-select v-model="searchData.agentArea" placeholder="选择市">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="申请时间">
                        <el-select v-model="searchData.agentArea" placeholder="选择市">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="申请人">
                        <el-select v-model="searchData.agentArea" placeholder="选择市">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label-width="20px">
                        <el-input placeholder="代理商名称/联系人/联系方式" v-model="searchData.search"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="searchClick" type="primary" plain>搜索</el-button>
                        <el-button plain typ="info" @click="resetSearch">重置</el-button>
                        <el-button @click="searchClick" type="warning" plain>导出</el-button>
                        <el-button type="success" @click="showAdd" plain>新增发货</el-button>
                        <el-button @click="searchClick" typ="info" plain>批量审核</el-button>
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
                            <el-button type="text" v-if="scope.row.applyStatus == 1" @click="trueDelivery(scope.row)">
                                确认发货
                            </el-button>
                            <el-button type="text" @click="showInfo(scope.row)">详情</el-button>
                            <el-button type="text" v-if="scope.row.applyStatus == 3" @click="showInfo(scope.row)">审核
                            </el-button>
                            <el-button type="text" v-if="scope.row.applyStatus == 5" @click="showInfo(scope.row)">修改
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
        <el-dialog align="center" custom-class="shipped-class" width="400px" :title="dialogTitle"
                   :visible.sync="modelFlag" :lock-scroll="false">
            <MessagesBox></MessagesBox>
        </el-dialog>

        <ShippedAddModel ref="modalForm" class="overspread-model" v-if="parentTest.dialogTableVisible"
                         @backrank="backrank"></ShippedAddModel>
    </div>
</template>

<script>
    import {myMixins} from "../../mixins/mixin";
    import ShippedAddModel from "./moduleModel/ShippedAddModel";
    import MessagesBox from "./moduleModel/MessagesBox";
    import httpRequest from "../../api/api";

    export default {
        name: "Unshipped",
        mixins: [myMixins],
        inject: ['parentTest'],
        data() {
            return {
                searchData: {
                    search: '', //查询条件，代理商、订单号
                    applyStatus: '',  //申请状态
                    payType: '',  //支付类型
                    searchTime: '',//查询时间
                    operation: '',//申请人
                    size: 10,
                    page: 1
                },
                dialogTitle: '',
                modelFlag: false,
                dialogTableVisible: false,
                multipleSelection: [],
                total: 1,
                tableData: [{}],
                listUrl: '/managecenter/deviceManage/deviceApply/queryDeviceApply',   //表格数据接口
            }
        },
        components: {
            ShippedAddModel,
            MessagesBox
        },
        //组件卸载后关闭
        beforeDestroy() {
            this.parentTest.hiddDialogTableVisible()
        },
        methods: {
            //确认发货
            trueDelivery() {

            },
            modelMessage() {

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
                this.multipleSelection = val;
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
