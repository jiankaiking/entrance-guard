<template>
    <div class="agentContenner">
        <div class="tabsCard">
            <div class="tabsNav">
                <ul class="clear">
                    <li v-for="(item,index) in componentArr"
                        @click="agentcheck(index)"
                        :class="{'active':componentIs == item.value}">{{item.name}}</li>
                </ul>
            </div>
        </div>
        <component :is="componentIs"></component>
    </div>
</template>

<script>
    import httpRequest from "../api/api";
    import Agentmessgesbasic from "../views/Agent/Agentmessgesbasic";
    import Information from "../views/Agent/Information";
    import Generation from "../views/Agent/Generation";
    export default {
        name: "AgentHeader",
        provide() {
            return {
                parentTest: this
            }
        },
        components:{
            Agentmessgesbasic,
            Information,
            Generation
        },

        data() {
            return {
                componentArr:[
                    {name:'基础信息',value:'Agentmessgesbasic'},
                    {name:'代理信息',value:'Information'},
                    {name:'子代信息',value:'Generation'}
                ],
                componentIs:'Agentmessgesbasic',
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
                left: 0,
                pageType: '',  //新增，详情 类型判断
            };
        },
        created() {
            this.pageType = this.$route.query.type;
            if(this.pageType != 'add'){
                httpRequest('/agentManage/getAgentBasicInfo', 'GET', {agentId: this.$route.query.agentId})
                    .then(res=>{
                        this.agentMessges = res.data;
                    })
            }else{
                this.componentArr.pop()
            }
        },

        methods: {
            agentcheck(index) {
                    this.componentIs = this.componentArr[index].value;
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

    }
    .tabsNav li.active{
        color: #409EFF
    }
</style>
