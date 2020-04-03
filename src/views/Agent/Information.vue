<template>
    <div>
        <el-form :model="agentManage" ref="form" :rules="rules" class="agent-from from-shadow agentManag" label-width="100px">
            <!-- <el-form ref="form" :rules="rules" :model="agentManag" label-width="100px"> -->
            <el-form-item label="代理费" prop="agentMoney">
                <el-row >
                    <el-col :span="2">
                        <el-select v-model="agentManage.currency" placeholder="请选择">
                            <el-option
                                    v-for="item in currency_type"
                                    :key="item.dataValue"
                                    :label="item.dataCode"
                                    :value="item.dataValue">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col style="padding-left:20px" prop="agentContact" :span="3">
                        <el-input v-model="agentManage.agentMoney"  type="number"  placeholder="请输入内容"></el-input>
                    </el-col>
                    <el-col style="padding-left:20px" :span="1">
                    元</el-col>
                    <el-col style="padding-left:20px" prop="agentContact" :span="1.5">
                    预存款</el-col>
                    <el-col style="padding-left:20px" :span="3">
                        <el-input type="number" v-model="agentManage.prepateSavings" placeholder="请输入内容"></el-input>
                    </el-col>
                    <el-col style="padding-left:20px" :span="1">
                    元</el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="代理等级" prop="agentLevel">
                <el-col :span="3">
                    <el-select v-model="agentManage.agentLevel" @change="agencyLevel" placeholder="请选择">
                        <el-option
                                v-for="item in agent_area_level"
                                :key="item.dataValue"
                                :label="item.dataCode"
                                :value="item.dataValue">
                        </el-option>
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="代理位置" v-if="agent_level!=0">
                <el-col :span="4" v-if="agent_level==1">
                        <el-select v-model="province" @change="provinceSelect">
                            <el-option v-for="(item,index) in provinceArr" :label="item.regionName" :value="item.regionLongCode+'/'+item.regionName" :key='index'></el-option>
                        </el-select>
                </el-col>
                <el-col :span="8" v-if="agent_level==3">
                    <CitySelect   ref="citySelect" @selectCode="selectCode"></CitySelect>
                </el-col>
                <el-col :span="4" v-if="agent_level==2">
                    <CitySelect  :type="'city'" ref="citySelect" @selectCode="selectCode"></CitySelect>
                </el-col>
                <el-tag
                :key="tag"
                v-for="tag in newAgentRegion"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
                {{tag}}
                </el-tag>
            </el-form-item>
            <div class="title">代理规则</div>
            <el-table
                        v-if="rlue"
                        empty-text
                        element-loading-text = "数据正在加载中"
                        element-loading-spinner = "el-icon-loading"
                        :headerRowStyle="{color:'#000000'}"
                        :data="list"
                        border
                        style="width: 100%;">
                    <el-table-column align="center" width="360" label="进件通道">
                        <template slot-scope="scope">
                            <el-checkbox v-model="scope.row['checked']" @change="checked=>aisle(checked,scope.$index)" >{{scope.row.channelName}}&nbsp;</el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" width="320" label="签约产品">
                        <template slot-scope="scope" >
                            <div v-for="(item,index) in scope.row.payMediaCodeVos" :key="index">
                                <div class="spacing">
                                    <el-checkbox  v-model="item['checked']" @change="checked=>product(checked,scope.$index,index)" >{{item.name}}&nbsp;</el-checkbox>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" width="365" label="费率范围">
                        <template slot-scope="scope">
                            <div v-for="(item,index) in scope.row.payMediaCodeVos" :key="index">
                                <div class="spacing">{{item.rateRange}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" width="135" label="备注">
                        <template slot-scope="scope">
                            <div v-for="(item,index) in scope.row.payMediaCodeVos" :key="index">
                                <div class="spacing">{{item.remark}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" width="256" label="费率">
                        <template slot-scope="scope">
                            <div v-for="(item,index) in scope.row.payMediaCodeVos" :key="index">
                               <div style="width:100px;margin:20px auto;">
                                    <el-input type="number" v-model="item['prdRate']"></el-input>
                                </div>
                            </div>

                        </template>
                    </el-table-column>
                </el-table>
            <div class="title">合同信息</div>
                <el-form-item label="合同有效期" required>
                    <el-col :span="3">
                        <el-form-item prop="contractStartDate">
                        <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="agentManage.contractStartDate"
                                        style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="1" style="text-align: center">-</el-col>
                    <el-col :span="3">
                        <el-form-item prop="contractStartDate">
                        <el-date-picker type="date" placeholder="选择日期"  format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="agentManage.contractEndDate"
                                        style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="上传附件">
                    <el-col :span="6" class="file-upload">
                        <el-upload
                         v-show="Fileupload"
                        action="/api/sellerManagement/managecenter/upload/uploadFile"
                        list-type="picture-card"
                        :limit="1"
                        :show-file-list='false'
                        :headers="myHeaders"
                        :on-change="handleChange"
                        :file-list="fileList"
                        :on-success="handleAvatarSuccess1">
                        <el-button slot="trigger" size="small" type="primary">上传文件</el-button>
                        </el-upload>
                        <el-tag
                        class="tags"
                        :key="tag.name"
                        v-for="tag in fileList"
                        closable
                        :disable-transitions="false"
                        @close="filehandleClose(tag)">
                        <a :href="tag.url">{{tag.name}}</a>
                        </el-tag>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <div class="formsubmit-btn">
                        <el-button @click="back">取消</el-button>
                        <el-button  class="myDefult-btn" @click="onSubmit('form')">保存</el-button>
                    </div>
                </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import httpRequest from "../../api/api";
    import CitySelect from "../../components/select/CitySelect";
    import uploadImg from "../../components/uploadImg/uploadImg";
     var token = localStorage.getItem("token")
    import BASE_URL from '../../api/config';
    import validate from "../../mixins/validate";
    export default {
        name: "information",
        data() {
            return {
                myHeaders: {Authorization: token},
                agentManage: {
                    agentId:'',
                    agentMoney: '', // 代理费
                    prepateSavings: '', // 预存款
                    agentLevel: '', // 	代理级别ID，国、省、市、区县、街道
                    agentScope: '', // 多个区域ID，中间用,分割，Id,id
                    contractStartDate: '', // 合同开始时间
                    contractEndDate: '', // 合同结束时间
                    contractUrl: '', // 合同文件
                    currency:'',///货币类型
                    channelInfoList: '', // json格式的渠道、产品、费率信息列表
                },
                checked:false,
                agentlevel: ['国', '省', '市', '区县', '街道'],
                form: {},
                options: [],
                newAgentRegion:[],///多个区域名称
                agentRegionId:[],///多个区域id
                currency_type:[],
                agent_area_level:[],
                fileList:[],
                Fileupload:true,
                rlue:false,
                list:[],
                agent_level:0, ///代理等级
                provinceArr:[],///省级数据
                province:'',
                rules:{
                    'agentLevel':[
                        { required: true, message: '请选择代理级别', trigger: 'change' }
                    ],
                    'contractStartDate':[
                        { required: true, message: '请选择合同开始有效期', trigger: 'change' }
                    ],
                    'contractEndDate':[
                        { required: true, message: '请选择合同结束有效期', trigger: 'change' }
                    ],
                    'contractFile':[
                        { required: true, message: '请上传附件', trigger: 'change' }
                    ],
                    'agentMoney':[
                        { required: true, message: '请输入代理费', trigger: 'blur' },
                    ],
                    'prepateSavings':[
                        { required: true, message: '请输入预存款', trigger: 'blur' },
                    ],

                },
            }
        },
        components:{
            CitySelect,uploadImg
        },
        created() {
            this.form = this.agentMessges;
            this.agentManage.agentId=this.$route.query.agentId
                if(this.$route.query.signId){
                    httpRequest("sellerManagement/agentManage/getAgentAgentInfo", "GET", {signId: this.$route.query.signId})
                        .then(res => {
                        this.agentManage=res.data
                        this.agent_level=this.agentManage.agentLevel
                        for(var i=0;i<this.agentManage.regionList.length;i++){
                            this.newAgentRegion.push(this.agentManage.regionList[i].regionName)
                        }
                        delete this.agentManage.regionList
                        if(this.agentManage.contractUrl){
                            this.Fileupload=false
                            this.fileList.push({
                            'name':'合同文件',
                            'url':this.agentManage.contractUrl
                            })
                        }
                    })
                }
                this.dropDownData()
        },
        mounted(){
            // this.dropDownData()
        },
        methods: {
            back(){
                this.$router.push('/agent')
            },
            // 通道选择关联
            aisle(e,index){
                if(e){
                    for(var i=0;i<this.list[index].payMediaCodeVos.length;i++){
                            this.list[index].payMediaCodeVos[i].checked=true
                    }
                }else{
                    for(var i=0;i<this.list[index].payMediaCodeVos.length;i++){
                            this.list[index].payMediaCodeVos[i].checked=false
                            this.list[index].payMediaCodeVos[i].input=''
                    }
                }
            },
            // 签约关联
            product(e,index,id){
                if(e){
                    this.list[index].checked=true
                    this.list[index].payMediaCodeVos[id].checked=true
                }else{
                    this.list[index].payMediaCodeVos[id].checked=false
                    for(var i=0;i<this.list[index].payMediaCodeVos.length;i++){
                        if(this.list[index].payMediaCodeVos[i].checked){
                            this.list[index].checked=true
                            return;
                        }else{
                            this.list[index].checked=false
                        }
                    }
                }
            },
            ///代理等级
            agencyLevel(e){
                this.newAgentRegion=[]
                this.agentManage.agentScope=''
                this.agent_level=e
                if(e==1){
                    httpRequest("managecenter/sysRegion/getRegionByCode", "GET", {regionLongCode: 0})
                    .then(res => {
                        this.provinceArr = res.data;
                        this.province = ''
                    })
                }
            },
            ///省级
             provinceSelect(e) {
                if(this.newAgentRegion.indexOf(e.split('/')[1])==-1){
                    this.newAgentRegion.push(e.split('/')[1])
                    this.agentRegionId.push(e.split('/')[0])
                    this.province='';
                    this.agentManage.agentScope=this.agentRegionId.join(',')
                }else{
                    this.$message({
                                type: 'error',
                                message: `切勿重复添加`
                            })
                    this.province='';
                }
            },
             ///上传附件
            filehandleClose(tag) {
                this.fileList=[];
                this.Fileupload=true
                this.agentManage.contractUrl=''
            },
            // 上传附件
            handleAvatarSuccess1(e) {
                if(e.success){
                    this.Fileupload=false
                    this.agentManage.contractUrl=e.data
                    this.fileList.push({
                    'name':'合同文件',
                    'url':e.data
                    })
                }
            },
            handleChange(file, fileList) {
                // this.fileList = fileList.slice(-3);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            ///地址tag
            handleClose(tag) {
                this.newAgentRegion.splice(this.newAgentRegion.indexOf(tag), 1);
                this.agentRegionId.splice(this.newAgentRegion.indexOf(tag), 1);
                this.agentManage.agentScope=this.agentRegionId.join(',')
                console.log(this.agentManage)
            },
            // 地址选择
            selectCode(e,name){
                if(this.newAgentRegion.indexOf(name)==-1){
                    this.newAgentRegion.push(name)
                    this.agentRegionId.push(e)
                    this.$refs.citySelect.initial();
                    this.agentManage.agentScope=this.agentRegionId.join(',')
                }else{
                    this.$message({
                                type: 'error',
                                message: `切勿重复添加`
                            })
                }
            },
            onSubmit(form){
                this.$refs[form].validate((valid) => {
                if (valid) {
                    var newArr=this.list;
                    for(var i=0;i<this.list.length;i++){
                        if(!this.list[i].checked){
                            newArr.splice(i, 1)
                        }else{
                            for(var j=0;j<newArr[i].payMediaCodeVos.length;j++){
                                if(!newArr[i].payMediaCodeVos[j].checked){
                                    newArr[i].payMediaCodeVos.splice(j, 1)
                                }else{
                                    if(newArr[i].payMediaCodeVos[j].prdRate==''){
                                        this.$message({
                                            type: 'error',
                                            message: `请填写代理规则费率`
                                        })
                                        return ;
                                    }
                                }
                            }
                        }
                    }
                    this.agentManage.channelInfoList=JSON.stringify(newArr)
                    var url;
                    var msg;
                    if(this.$route.query.type=='add'){
                        url='sellerManagement/agentManage/addAgentAgentInfo'
                        msg='添加'
                    }else{
                        url='sellerManagement/agentManage/updateAgentAgentInfo'
                        msg='修改'
                    }
                    httpRequest(url, 'post',this.agentManage)
                        .then(res => {
                            if (res.success) {
                                this.$message({
                                    type: 'success',
                                    message: `${msg}成功`
                                })
                                this.$router.push('/agent')
                            }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });

            },
              // 获取代理费，代理等级，代理位置数据
            dropDownData() {
                httpRequest('managecenter/sysDict/getSysDict/', 'get')
                    .then(res => {
                        if (res.success) {
                            this.currency_type=res.data.currency_type
                            this.agent_area_level=res.data.agent_area_level
                        }
                    })
                httpRequest('/sellerManagement/agentManage/getAgentRateInfo', 'get')
                    .then(res => {
                        if (res.success) {
                            this.list=res.data.list
                            var special=''
                            var channelInfoList=[]
                            if(this.$route.query.signId){

                                channelInfoList=JSON.parse(this.agentManage.channelInfoList)
                            }
                            for(var i=0;i<this.list.length;i++){
                                this.list[i]['checked']=false
                                // if(this.list[i].channelName=='支付宝'){

                                // }
                                // if(this.list[i].channelName=='微信'){

                                // }
                                if(channelInfoList.length!=0&&this.list[i].channelId==channelInfoList[i].channelId){
                                    this.list[i]['checked']=true
                                }else{
                                    this.list[i]['checked']=false
                                }
                                for(var j=0;j<this.list[i].payMediaCodeVos.length;j++){
                                    if(channelInfoList.length!=0&&this.list[i].payMediaCodeVos[j].payMediaCodeId==channelInfoList[i].prd[j].channelPrdId){
                                        this.list[i].payMediaCodeVos[j]['checked']=true
                                        this.list[i].payMediaCodeVos[j]['prdRate']=channelInfoList[i].prd[j].prdRate
                                    }else{
                                        this.list[i].payMediaCodeVos[j]['checked']=false
                                        this.list[i].payMediaCodeVos[j]['prdRate']=''
                                    }

                                }
                            }
                             this.list = JSON.parse(JSON.stringify(this.list))
                            this.rlue=true
                        }
                })
            }
        }
    }
</script>
<style>
.file-upload .el-upload--picture-card{
            background-color: #fff !important;
            border: 0px !important;
            width: auto;
            height: auto;
            line-height:normal
        }
        input[type="number"]{-moz-appearance:textfield;}
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button{
            -webkit-appearance: none !important;
            margin: 0;
        }
</style>
<style scoped>
        .tags a{
            text-decoration:none;
            color: #409EFF;
        }

        .spacing{
        margin: 20px 0;
    }
    .el-tag{
        margin-left: 20px;
    }
    .title{
        margin-top: 20px;
    }
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
