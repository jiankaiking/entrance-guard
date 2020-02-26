<template>
    <div class="agentContenner">
        <div class="tabsCard">
            <div class="tabsNav">
                <ul class="clear">
                    <li  @click="agentcheck($event,0)" :class="{active:cli == 0}">基础信息</li>
                    <li  @click="agentcheck($event,1)" :class="{active:cli == 1}">代理信息</li>
                    <li  @click="agentcheck($event,2)" v-if="pageType != 'add'" :class="{active:cli == 2}">子代信息</li>
                </ul>

            </div>
        </div>
        <router-view v-if="routerFlag" />
    </div>
</template>

<script>
    import httpRequest from "../api/api";
    import BASE_URL from '../api/config'
    export default {
        name: "AgentHeader",
        provide() {
            return {
                parentTest: this
            }
        },

        data() {
            return {
                agentMessges: {
                    cooperType: '',//合作方式
                    agentType: '',//代理商类型 个人 or 企业
                    agentName: '', // 代理商名称
                    agentTel: '', //绑定手机号
                    responsibleName: '', //联系人
                    agentContact: '', //联系方式
                    agentArea: '', //地址
                    agentAddr: '', //详细地址
                    wxAccount: '', //微信账号
                    qqAccount: '', //qq账号
                    email: '', //邮箱
                    aliAccount: '', //支付宝账号
                    salesman: '', //销售人员
                    operator: '', //运营人员
                    bankAccountType: '', //银行账号类型:对公2：对私）
                    bankName: '', //开户行名称
                    bankNetwork: '', //开户行网点
                    bankAccountName: '', //账户名
                    bankAccount: '', //银行卡号
                    bankAddress: '', //开户行所在地
                    fullName: '', //姓名
                    idCardNo: '', //身份证
                    idCardStartDate: '',//证件开始时间
                    idCardEndDate: '',//证件结束时间
                    idCardFront: '',//身份证正面照（国徽）
                    idCardReverse: '',// 身份证反面照（人像）
                    comFullName: '',//企业名
                    comBusLicNo: '',//统一社会信用代码 / 营业执照号
                    comBusUrl: '',//营业执照照片
                },
                uploadImg:BASE_URL + '/upload/uploadImg',
                routerFlag:false,
                left: 0,
                pageType: '',  //新增，详情 类型判断
                cli: 0
            };
        },
        created() {
            console.log(process)
            this.pageType = this.$route.query.type;
            if(this.pageType != 'add'){
                httpRequest('/agentManage/getAgentBasicInfo', 'GET', {agentId: this.$route.query.agentId})
                    .then(res=>{
                        this.agentMessges = res.data;

                    })
                    .finally(res=>{
                        this.routerFlag = true
                    })
            }else{
                this.routerFlag = true
            }


        },
        mounted() {

        },
        methods: {
            agentcheck(e, num) {
                if (num != this.cli) {
                    var routes = {
                        children: this.$router.options.routes
                    };
                    var route = this.$route.matched;
                    for (var i = 0; i < route.length - 1; i++) {
                        routes = routes.children.find((e) => (e.name == route[i].name));
                    }
                    this.cli = num;
                    this.$router.push(routes.children[num].path)
                }
            }
        }
    }
</script>

<style scoped>


    .tabsCard {
        margin-bottom: 25px;
        background-color: #ffffff;
        box-shadow:0px 1px 6px 4px rgba(242, 242, 242, 1);
        padding: 0 68px;
        box-sizing: border-box;
        height: 60px;
        border-radius: 8px;
    }
    .tabsNav {
        position: relative;
    }
    .tabsNav li {
        float: left;
        line-height: 60px;
        font-size: 14px;
        color: #000000;
        margin-right: 100px;
        cursor: pointer;
        transition: color .5s;
    }
    .tabsNav li.active{
        color: #409EFF
    }
</style>
