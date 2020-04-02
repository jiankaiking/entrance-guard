<template>
    <div class="signing-msg">
        <div class="msg-title">
            <ul>
                <li>签约通道</li>
                <li>签约产品</li>
                <li>签约状态</li>
                <li>启用状态</li>
                <li>收款参数</li>
                <li>备注</li>
                <li>签约费率</li>
                <li>操作</li>
            </ul>
        </div>
        <div class="signing-type ">
            <div class="direct-type" v-if="false">
                <div class="right-content">
                    <ul>
                        <li><span>直连</span></li>
                        <li>
                            <div>支付宝</div>
                            <div>微信</div>
                        </li>
                        <li>
                            <div>未签约</div>
                            <div>未签约</div>
                        </li>
                        <li>
                            <div>--</div>
                            <div>--</div>
                        </li>
                        <li>
                            <div class="parmerText">
                                <p>开户名称:近店</p>
                                <p>开户银行杭支行</p>
                                <p>单笔交易手续费单笔2222222</p>
                            </div>
                            <div class="parmerText">
                                <p>开户名称:近店</p>
                                <p>开户银行杭支行</p>
                                <p>单笔交易手续费单笔2222222</p>
                            </div>
                        </li>
                        <li>
                            <div class="parmerText">
                                <p>开户名称:近店</p>
                                <p>开户银行:中国建设</p>
                                <p>单笔交易手</p>
                            </div>
                            <div class="parmerText">
                                <p>开户名称:近店</p>
                                <p>开户银行:中国建设</p>
                                <p>单笔交易手</p>
                            </div>
                        </li>
                        <li>
                            <div class="center-status">
                                <p>0.6</p>
                            </div>
                            <div class="center-status">
                                <p>0.6</p>
                            </div>
                        </li>
                        <li>
                            <div class="btn-cont">
                                <el-button type="text">查看资料</el-button>
                                <el-button type="text">信息变更</el-button>
                            </div>
                            <div class="btn-cont">
                                <el-button type="text">查看资料</el-button>
                                <el-button type="text">信息变更</el-button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="signing-item" v-for="(item,index) in signingInfo" :key="index">
                <div class="right-content">
                    <ul>
                        <li>
                            <span v-if="item.channelId == 1">新大陆</span>
                            <span v-if="item.channelId == 3">拉卡拉</span>
                            <span v-if="item.channelId == 2">通联</span>
                        </li>
                        <li>
                            <div class="product"
                                 :style="{justifyContent:item.prd.length == 1?'center':'space-between'}">
                                <p v-for="pro in item.prd">{{pro.channelPrdName}}</p>
                            </div>
                        </li>
                        <li>
                            <div class="center-status">
                                <p v-if="item.auditStatus == '0'">未签约</p>
                                <div v-if="item.auditStatus == '1'">
                                    <el-checkbox checked>签约成功</el-checkbox>
                                    <div>{{item.signTime}}</div>
                                </div>
                                <p v-if="item.auditStatus == '2'">已驳回</p>
                                <p v-if="item.auditStatus == '3'">审核中</p>
                            </div>
                        </li>
                        <li>
                            <div class="center-status">
                                <p v-if="item.auditStatus != '1'">--</p>
                                <div v-if="item.auditStatus == '1'">
                                    {{item.status == 1?'已启用':'未启用'}}

                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="parmerText">
                                <p v-for="(a,i) in item.settleInfo">{{a}}</p>
                            </div>
                        </li>
                        <li>
                            <div class="product"
                                 :style="{justifyContent:item.prd.length == 1?'center':'space-between'}">
                                <p v-for="pro in item.prd">{{pro.remark}}</p>
                            </div>
                        </li>
                        <li>
                            <div class="center-status"
                                 :style="{justifyContent:item.prd.length == 1?'center':'space-between'}">
                                <p v-for="pro in item.prd">{{pro.prdRate}}</p>
                            </div>
                        </li>
                        <li>
                            <div class="btn-cont">
                                <el-button type="text" v-if="item.auditStatus != '0'" @click="goInfo(item)">查看资料
                                </el-button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import httpRequest from "../../../api/api";

    export default {
        name: "SubscriptionInformation",
        data() {
            return {
                signingInfo: {},
            }
        },
        mounted() {
            this.getSigningInfo()
        },
        methods: {
            //签约详情
            goInfo(row) {
                // this.$router.push({path: "/newlandaudit", query: {channelId: row.channelId, sellerId: row.sellerId}})
                 this.$router.push({path: "/newland/info", query: {channelId: row.channelId, sellerId: row.sellerId}})
                console.log(row)
            },


            //获取商户签约信息
            getSigningInfo() {
                httpRequest("/sellerManagement/sellerMange/getSellerSignInfo", "GET", {sellerId: this.$route.query.id})
                    .then(res => {
                        this.signingInfo = res.data;
                    })
            },
        }
    }
</script>
<style scoped>
    .msg-title, .left-content {
        font-size: 14px;
        color: #000000;
    }

    .right-content {
        color: #666666;
        font-size: 14px;
    }

    .btn-cont {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        height: 100%;
    }

    .center-status {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        height: 100%;
    }

    .el-button {
        margin-left: 0;
    }

    .product {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 100%;
    }

    .signing-msg {
        background: #ffffff;
        padding: 35px;
        box-sizing: border-box;
        box-shadow: 0px 1px 6px 4px rgba(242, 242, 242, 1);
        border-radius: 8px;
    }

    .msg-title {
        border-radius: 8px;
        border: 1px solid rgba(202, 202, 202, 1);
        height: 57px;
        line-height: 57px;
        display: flex;
    }

    .msg-title .left-title {
        width: 179px;
        text-align: center;
    }

    .direct-type, .signing-item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        border-radius: 8px;
        border: 1px solid rgba(202, 202, 202, 1);
        margin-top: 20px;
    }

    .msg-title ul {
        display: flex;
        width: 100%;
    }

    .signing-item ul {
        height: 250px;
        width: 100%;
    }

    .right-content {
        width: 100%;
    }

    .signing-item li {

        padding: 48px 0;
        box-sizing: border-box;
    }

    .signing-msg li {
        height: 100%;
        display: inline-block;
        box-sizing: border-box;
        vertical-align: top;
        text-align: center;
        border-left: 1px solid #CACACA;
    }

    .left-content {
        text-align: center;
    }


    .signing-msg ul li:nth-child(4) {
        width: 16%;
    }

    .signing-msg ul li {
        width: 12%;
    }


    .direct-type ul {
        height: 250px;
    }

    .right-content ul li:first-child {
        line-height: 250px;
        padding: 0;
    }

    .signing-msg ul li:first-child {
        border: none;
    }

    .direct-type ul li div {
        height: 50%;
        line-height: 125px;
    }

    .direct-type ul li:nth-child(5) div, .direct-type ul li:nth-child(6) div {
        line-height: 20px;
    }

    .direct-type ul li div:first-child {
        border-bottom: 1px solid #cccccc;
    }


    .parmerText {
        display: flex;
        height: 100%;
        justify-content: center;
        flex-direction: column;
        text-align: left;
        padding: 20px;
        box-sizing: border-box;
    }

</style>
