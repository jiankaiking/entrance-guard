<template>
    <div class="agent-message">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <div class="title">合作方式</div>
            <el-radio-group style="margin:10px 0 20px 100px" v-model="form.cooperType" >
                    <el-radio  v-for="(item,index) in dictionary.agent_cooper_type" :label="item.dataValue">{{item.dataCode}}</el-radio>
                </el-radio-group>
            <div class="title">基本信息</div>
            <el-form-item label="代理商类型">
                <el-radio-group v-model="form.agentType" >
                    <el-radio  v-for="(item,index) in dictionary.agent_type" :label="item.dataValue">{{item.dataCode}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-form-item label="代理商名称" prop="agentName">
                        <el-input v-model="form.agentName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="绑定手机号" prop="agentTel">
                        <el-input v-model="form.agentTel"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="联系人" prop="responsibleName">
                        <el-input v-model="form.responsibleName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="联系方式" prop="agentContact">
                        <el-input v-model="form.agentContact"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="type?9:6">
                    <el-form-item label="地址" prop="agentArea">
                        <div style="height: 38px;width:220px;padding-left:20px; border:1px solid #DCDFE6;color:#606266" v-show="!type" @click="addressFun">{{form.area}}</div>
                        <CitySelect v-show="type" @selectCode="selectCode"></CitySelect>
                    </el-form-item>
                </el-col>
                <el-col :span="type?5:6">
                    <el-form-item label="详细地址" prop="agentAddr">
                        <el-input v-model="form.agentAddr"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="type?5:6">
                    <el-form-item label="微信账号">
                        <el-input v-model="form.wxAccount"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="type?5:6">
                    <el-form-item label="QQ账号">
                        <el-input v-model="form.qqAccount"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="邮箱">
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="支付宝账号">
                        <el-input v-model="form.aliAccount"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="销售人员" prop="salesman">
                        <el-input v-model="form.salesman"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="运营人员" prop="operator">
                        <el-input v-model="form.operator"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="title">银行信息</div>
            <el-form-item label="账号类型">
                <el-radio-group v-model="form.bankAccountType">
                    <el-radio  v-for="(item,index) in dictionary.agent_account_type" :label="item.dataValue">{{item.dataCode}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-form-item label="开户行名称" prop="bankName">
                        <el-input v-model="form.bankName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="开户网点" prop="bankNetwork">
                        <el-input v-model="form.bankNetwork"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="姓名" prop="bankAccountName">
                        <el-input v-model="form.bankAccountName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="银行卡号" prop="bankAccount">
                        <el-input v-model="form.bankAccount"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="所在地" prop="bankAddress">
                        <el-input v-model="form.bankAddress"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="title">实名认证信息</div>
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-form-item label="姓名" prop="fullName">
                        <el-input v-model="form.fullName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="证件号码" prop="idCardNo">
                        <el-input v-model="form.idCardNo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="证件有效期">
                        <el-col :span="10">
                            <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
                                            v-model="form.idCardStartDate" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="10">
                            <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
                                            v-model="form.idCardEndDate" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col :span="2">
                            <el-checkbox @change="comBusExpDate">长期</el-checkbox>
                        </el-col>
                    </el-form-item>
                </el-col>

            </el-row>

            <div class="title">身份证照片</div>
            <el-form-item>
                <el-row :gutter="10">
                    <el-col :span="3">
                        <uploadImg :imgUrl.sync="form.idCardFront"></uploadImg>
                        <span>身份证正面</span>
                    </el-col>
                    <el-col :span="3">
                        <uploadImg :imgUrl.sync="form.idCardReverse"></uploadImg>
                        <span>身份证反面</span>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <div style="margin: 0 auto; width: 200px">
                    <el-button @click="cancel">取消</el-button>
                    <el-button type="primary" @click="onSubmit('form')">保存</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import httpRequest from "../../api/api";
    import validate from "../../mixins/validate";
    import UploadImg from "../../components/uploadImg/uploadImg"
    import CitySelect from "../../components/select/CitySelect";
    export default {
        name: "Agentmessgesbasic",
        inject: ['parentTest'],
        data() {
            return {
                type:true, 
                form: {
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
                dictionary:{},
                rules: {  //表单验证规则
                    cooperType: validate.noEmpty,
                    agentType: validate.noEmpty,
                    agentName: validate.noEmpty,
                    agentTel: validate.phone,
                    responsibleName: validate.noEmpty,
                    agentContact: validate.phone,
                    agentAddr: validate.noEmpty,
                    salesman: validate.noEmpty,
                    operator: validate.noEmpty,
                    bankAccountType: validate.noEmpty,
                    bankName: validate.noEmpty,
                    bankNetwork: validate.noEmpty,
                    bankAccountName: validate.noEmpty,
                    bankAccount: validate.noEmpty,
                    fullName: validate.noEmpty,
                    idCardNo: validate.idCard
                },
            }
        },
        components:{
            UploadImg,CitySelect
        },
         created() {
            if(this.$route.query.type=='details'){
                this.detailInfo(this.$route.query.agentId)
                this.type=false
            }
            this.form = Object.assign(this.form, this.agentMessges)
        },
        mounted(){
            httpRequest('managecenter/sysDict/getSysDict/', 'get')
                .then(res => {
                    if (res.success) {
                        this.dictionary=res.data
                }
            })
        },
        methods: {
             addressFun(){
                this.type=true;
            },
            comBusExpDate(e){
                e?this.form.idCardEndDate = '9999-12-31':this.form.idCardEndDate = ''
            },
            detailInfo(id){
                httpRequest('sellerManagement/agentManage/getAgentBasicInfo', 'get', {
                    agentId:id
                })
                    .then(res => {
                        if (res.success) {
                            this.form=res.data
                            this.$router.push({query: {type: 'details', agentId: res.data.agentId,signId:res.data.signId}})
                        }
                })
            },
            // 地址联动
            selectCode(e,name){
                this.form.agentArea = e;
            },
            //正面照
            handleAvatarSuccess(res) {
                this.form.idCardFront = res.data
            },
            //反面照
            handleAvatarSuccess1(res) {
                this.form.idCardReverse = res.data
            },
            //增加代理商 编辑代理商
            addAgentBasicInfo() {
                let [url, msg] = ['', ''];
                if (this.$route.query.type == 'details') {
                    url = 'sellerManagement/agentManage/editAgentBasicInfo';
                    msg = '修改'
                } else {
                    url = 'sellerManagement/agentManage/editAgentBasicInfo'
                    // url = 'sellerManagement/agentManage/offOrNoAgent'
                    msg = '添加'
                }
                httpRequest(url, 'POST', this.form)
                    .then(res => {
                        if (res.success) {
                            this.$message({
                                type: 'success',
                                message: `${msg}成功`
                            })
                            if(this.$route.query.type=='add'){
                                this.$router.push({query: {type: 'add', agentId: res.data}})
                            }else{
                            this.$router.push('/agent')
                            }
                        }
                    })
            },
            //取消
            cancel(){
                this.$router.push('/agent')
            },
            //提交按钮  先表单验证 必填项 再提交操作
            onSubmit(fromName) {
                this.$refs[fromName].validate((valid) => {
                    console.log(valid)
                    if (valid) {
                        this.addAgentBasicInfo()
                    } else {
                        this.$message({
                            type: 'error',
                            message: '请填写正确的信息'
                        })
                    }
                });
            },
        }
    }
</script>

<style scoped>
    .agent-message .el-form-item {
        padding-bottom: 0px;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }

    .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }

    .agent-message {
        background: #ffffff;
        padding: 25px 80px 25px 25px;
        box-sizing: border-box;
        box-shadow: 0px 1px 6px 4px #f2f2f2;
        border-radius: 8px;
    }
    .agent-message .title {
        position: relative;
        color: #000000;
        font-size: 18px;
        font-weight: bold;
        padding-left: 30px;
        margin-bottom: 25px;
    }
    .agent-message .title:before {
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
