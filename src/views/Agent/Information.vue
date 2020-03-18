<template>
    <div>
        <el-form class="agent-from from-shadow" label-width="100px">
            <el-form-item label="代理费">
                <el-row :gutter="24" class="padding-catch">
                    <el-col :span="2">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                        <el-input v-model="agentManage.agentMoney" placeholder="请输入内容"></el-input><span  style="padding:0 15px;">元</span>
                       <span style="padding:0 15px;">预存款</span><el-input v-model="agentManage.agentMoney" placeholder="请输入内容"></el-input>
                </el-row>
            </el-form-item>
            <el-form-item label="代理等级">
                <el-col :span="2">
                    <el-select v-model="agentManage.agentLevel" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="代理位置">
                <el-col :span="2">
                    <el-select v-model="agentManage.agentRegion" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="7" style="padding-left: 25px">
                    <CitySelect></CitySelect>
                </el-col>
            </el-form-item>
        </el-form>

        <div class="agent-from2 from-shadow">
            <div class="title">代理规则</div>
            <table border="1px solid #ccc" class="agent-table" width="100%">
                <tr>
                    <th>进件通道</th>
                    <th>签约产品</th>
                    <th>费率范围</th>
                    <th>备注</th>
                    <th>费率</th>
                </tr>
                <tr>
                    <td>
                        <div class="tdcheckbox">
                            <el-checkbox v-model="checked">直连&nbsp;</el-checkbox>
                        </div>
                    </td>
                    <td>
                        <div class="tdcheckbox">
                            <el-checkbox v-model="checked">支付宝</el-checkbox>
                        </div>
                        <div class="tdcheckbox">
                            <el-checkbox v-model="checked">微信&nbsp;</el-checkbox>
                        </div>
                    </td>
                    <td>
                        <div class="tdrate">0.38 — 0.6</div>
                        <div class="tdrate">0.38 — 0.6</div>
                    </td>
                    <td>3</td>
                    <td>
                        <div class="tdInput">
                            <el-input v-model="value">支付宝</el-input>
                        </div>
                        <div class="tdInput">
                            <el-input v-model="value">支付宝</el-input>
                        </div>

                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="tdcheckbox">
                            <el-checkbox v-model="checked">通联支付</el-checkbox>
                        </div>
                    </td>
                    <td>
                        <div class="tdcheckbox">
                            <el-checkbox v-model="checked">支付宝</el-checkbox>
                        </div>
                        <div class="tdcheckbox">
                            <el-checkbox v-model="checked">微信&nbsp;</el-checkbox>
                        </div>
                        <div class="tdcheckbox">
                            <el-checkbox v-model="checked">信用卡</el-checkbox>
                        </div>

                    </td>
                    <td>2</td>
                    <td>2</td>
                    <td>
                        <div class="tdInput">
                            <el-input v-model="value">支付宝</el-input>
                        </div>
                        <div class="tdInput">
                            <el-input v-model="value">支付宝</el-input>
                        </div>
                        <div class="tdInput">
                            <el-input v-model="value">支付宝</el-input>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="tdcheckbox">
                            <el-checkbox v-model="checked">通联支付</el-checkbox>
                        </div>
                    </td>
                    <td>
                        <div class="tdcheckbox">
                            <el-checkbox v-model="checked">支付宝</el-checkbox>
                        </div>
                        <div class="tdcheckbox">
                            <el-checkbox v-model="checked">微信&nbsp;</el-checkbox>
                        </div>
                        <div class="tdcheckbox">
                            <el-checkbox v-model="checked">信用卡</el-checkbox>
                        </div>
                        <div class="tdcheckbox">
                            <el-checkbox v-model="checked">pos机&nbsp;</el-checkbox>
                        </div>
                    </td>
                    <td>2</td>
                    <td>2</td>
                    <td>
                        <div class="tdInput">
                            <el-input v-model="value">支付宝</el-input>
                        </div>
                        <div class="tdInput">
                            <el-input v-model="value">支付宝</el-input>
                        </div>
                        <div class="tdInput">
                            <el-input v-model="value">支付宝</el-input>
                        </div>
                        <div class="tdInput">
                            <el-input v-model="value">支付宝</el-input>
                        </div>
                    </td>
                </tr>
            </table>
            <div class="title">合同信息</div>
            <el-form ref="form" :model="fromItem" label-width="80px">
                <el-form-item label="活动时间">
                    <el-col :span="3">
                        <el-date-picker type="date" placeholder="选择日期" v-model="agentManage.contractStartDate"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="1" style="text-align: center">-</el-col>
                    <el-col :span="3">
                        <el-date-picker type="date" placeholder="选择日期" v-model="agentManage.contractEndDate"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="活动形式">
                    <el-col :span="6">
                        <el-input type="textarea" v-model="agentManage.contractFile"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <div class="formsubmit-btn">
                        <el-button>取消</el-button>
                        <el-button type="primary" @click="onSubmit">保存</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import httpRequest from "../../api/api";
    import CitySelect from "../../components/select/CitySelect";
    export default {
        name: "information",
        data() {
            return {
                agentManage: {
                    agentMoney: '', // 代理费
                    prepateSavings: '', // 预存款
                    agentLevel: '', // 	代理级别ID，国、省、市、区县、街道
                    agentRegion: '', // 多个区域ID，中间用,分割，Id,id
                    contractStartDate: '', // 合同开始时间
                    contractEndDate: '', // 合同结束时间
                    contractFile: '', // 合同文件
                    channelInfoList: '', // json格式的渠道、产品、费率信息列表
                },
                agentlevel: ['国', '省', '市', '区县', '街道'],
                agentInfo: {},
                url:{
                    info:"/sellerManagement/agentManage/getAgentAgentInfo"
                },
                options: [],
                value: ''
            }
        },
        components:{
            CitySelect
        },
        methods: {
            getAgentInfo(){
                httpRequest(this.url.info,"GET",this.$route.query.agentId)
                    .then(res=>{
                        if(res.success){
                            this.agentInfo = res.data;
                        }
                    })
            },
        }
    }
</script>

<style scoped>
    .from-shadow {
        box-sizing: border-box;
        box-shadow: 0px 1px 6px 4px #f2f2f2;
        border-radius: 8px;
        background: #ffffff;
    }

    .agent-from {
        margin-bottom: 30px;
        padding: 23px 80px;
    }

    .formsubmit-btn {
        width: 350px;
        margin: 0 auto;
    }

    .formsubmit-btn button:first-child {
        margin-right: 150px;
    }

    .agent-from2 {
        padding: 23px 35px;
    }

    .agent-from2 .agent-table {
        text-align: center;
        border-radius: 8px;
        margin-bottom: 30px;
        border: 1px solid #CACACA;
    }

    .agent-from2 .agent-table th {
        padding: 19px 0;
        color: #000000;
        font-weight: bold;
        font-size: 14px;
        text-align: center;
    }

    .agent-from2 .agent-table td {
        color: #666666;
        padding: 15px;
    }

    .agent-from2 .agent-table .tdInput {
        width: 75px;
        margin: 0 auto 10px;
        height: 36px;
        background: #fcfcfc;
        border-radius: 4px;
    }
    .el-input{
        width: auto;
    }
    .agent-from2 .agent-table .tdInput:last-child {
        margin-bottom: 0;
    }

    .agent-from2 .agent-table .tdrate {
        margin: 0 auto 20px;
    }

    .agent-from2 .agent-table .tdrate:last-child {
        margin-bottom: 0;
    }

    .agent-from2 .agent-table .tdcheckbox {
        margin-bottom: 28px;
    }

    .agent-from2 .agent-table .tdcheckbox:last-child {
        margin-bottom: 0;
    }

    .agent-from2 .title {
        position: relative;
        color: #000000;
        font-size: 18px;
        font-weight: bold;
        padding-left: 30px;
        margin-bottom: 25px;
    }

    .agent-from2 .title:before {
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
