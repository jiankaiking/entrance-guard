<template>
    <div class="commission-container">
        <el-form label-width="120px" :model="modelFromdata">
            <div class="title">代理商信息</div>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="代理商">
                        <el-input disabled :value="modelFromdata.agentName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="1">
                    <el-form-item label="代理等级">
                        <el-input disabled :value="modelFromdata.cooperType"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="联系人">
                        <el-input disabled :value="modelFromdata.responsibleName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="1">
                    <el-form-item label="代理区域">
                        <el-input disabled :value="modelFromdata.area"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="结算人名称">
                        <el-input disabled :value="modelFromdata.agentName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="1">
                    <el-form-item label="结算银行卡">
                        <el-input disabled :value="modelFromdata.agentName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="title">分润信息</div>
            <div v-if="modelFromdata.totalCommission">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="分润月份:">
                            <el-input disabled :value="modelFromdata.monthDate"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="1">
                        <el-form-item label="交易笔数:">
                            <el-input disabled :value="modelFromdata.tradingCount"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="交易金额(元):">
                            <el-input disabled :value="modelFromdata.tradingAmount"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="1">
                        <el-form-item label="分润总额(元):">
                            <el-input disabled :value="modelFromdata.totalCommission"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="间连分润(元)">
                            <el-input disabled :value="modelFromdata.indirectCommission"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="1">
                        <el-form-item label="直连分润(元)">
                            <el-input disabled :value="modelFromdata.directlyCommission"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <div v-if="modelFromdata.type == '设备'">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="补贴月份:">
                            <el-input disabled :value="modelFromdata.month"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="1">
                        <el-form-item label="补贴金额:">
                            <el-input disabled :value="modelFromdata.commission"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="去重累计用户:">
                            <el-input disabled :value="modelFromdata.userCount"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="1">
                        <el-form-item label="导入时间:">
                            <el-input disabled :value="modelFromdata.exportTime"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <div  v-if="modelFromdata.type == '活动'">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="活动名称">
                            <el-input disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="1">
                        <el-form-item label="活动周期">
                            <el-input disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="补贴周期">
                            <el-input disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="1">
                        <el-form-item label="活动返佣金额">
                            <el-input disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="总交易金额(元)">
                            <el-input disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="1">
                        <el-form-item label="总交易笔数">
                            <el-input disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="活动有效金额(元)">
                            <el-input disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="1">
                        <el-form-item label="有效商户">
                            <el-input disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="有效笔数">
                            <el-input disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="1">
                        <el-form-item label="补贴系数">
                            <el-input disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <el-form-item style="margin-top: 60px" label-width="0">
                <el-button @click="close">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import httpRequest from "../../api/api";

    export default {
        name: "CommissionModel",
        data() {
            return {
                modelFromdata: {},
            }
        },
        methods: {
            edit(row) {
                httpRequest("/managecenter/center/settlement/manage/equipment/commission/detail", "GET", {settleLogId: row.settleLogId})
                    .then(res => {
                        if (res.success) {
                            this.modelFromdata = Object.assign(res.data,row);
                        }
                    })
            },
            close() {
                this.$emit("close")
            }
        },
    }
</script>

<style scoped>
    .commission-container {
        background: #ffffff;
        padding: 25px 0px 25px 25px;
        box-sizing: border-box;
        border-radius: 8px;
    }

    .commission-container .title {
        position: relative;
        text-align: left;
        color: #000000;
        font-size: 18px;
        font-weight: bold;
        padding-left: 30px;
        margin-bottom: 25px;
    }

    .commission-container .title:before {
        position: absolute;
        content: "";
        left: 0;
        top: 2px;
        width: 9px;
        height: 21px;
        background: linear-gradient(180deg, #ff2a00 0%, #ed7346 100%);
        border-radius: 5px;
    }
</style>
