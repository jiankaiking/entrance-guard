<template>
    <div class="agent-message">
        <div style="margin: 0 0 20px 20px" class="status-cont">
            <img v-if="form.status == 5" src="../../../assets/images/noyes.png">
            <img v-if="form.status == 0" src="../../../assets/images/waiteryes.png">
            <i  v-if="form.status == 1" class="el-icon-success visited-status"></i>
        </div>
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <div class="title">个人资料</div>
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-form-item label="姓名" prop="visitorName">
                        <el-input v-model="form.visitorName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="联系方式" prop="visitorPhone">
                        <el-input v-model="form.visitorPhone"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="身份证">
                        <el-input v-model="form.visitorIdNo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="车牌号">
                        <el-input v-model="form.visitorCarNo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="人脸照片">
                        <upload-img :img-url.sync="form.visitorFaceImgUrl"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="title">来访信息</div>
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-form-item label="事由" prop="reason">
                        <el-input v-model="form.reason"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="人数" prop="visitorCount">
                        <el-input v-model="form.visitorCount"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="开始时间" prop="startTime">
                        <el-date-picker
                                v-model="form.startTime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                type="datetime"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="结束时间" prop="endTime">
                        <el-date-picker
                                v-model="form.endTime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                type="datetime"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="title">被访人信息</div>
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-form-item label="小区">
                        <el-select v-model="communityId" placeholder="请选择小区" @change="changeComm">
                            <el-option v-for="item in communityArr" :key="item.id" :label="item.value" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="地址">
                        <el-select @change="changeBuilding" v-model="buildId" placeholder="请选择住宅楼">
                            <el-option v-for="item in communityBuildingArr" :key="item.id" :label="item.value"
                                       :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item label-width="0px">
                        <el-select v-model="unitId" placeholder="请选择单元"  @change="changeUnit" >
                            <el-option v-for="item in unitArr" :key="item.id" :label="item.value" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item  label-width="0px">
                        <el-select v-model="roomId" placeholder="请选择房间号" @change="changeRoom">
                            <el-option v-for="item in roomArr" :key="item.id" :label="item.value" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="title" v-if="form.id">登记时间：{{form.createTime | getTime}}</div>
            <el-form-item>
                <div style="margin: 40px auto; width: 500px">
                    <el-button @click="cancel">取消</el-button>
                    <el-button v-if="!form.status" class="myDefult-btn" @click="onSubmit('form')" plain>保存</el-button>
                    <el-button v-if="form.status == 0" type="info" @click="applyInvited('5')">驳回</el-button>
                    <el-button v-if="form.status == 0" class="myDefult-btn" @click="applyInvited('1')" plain>通过</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import validate from "../../../mixins/validate";
    import httpRequest from "../../../api/api";
    import uploadImg from "../../../components/uploadImg/uploadImg";

    export default {
        name: "invited",
        data() {
            return {
                type: true,
                form: {
                    communityOwnerInfoId: '',
                    visitorName: '',
                    visitorPhone: '',
                    visitorIdNo: '',
                    visitorCarNo: '',
                    visitorFaceImgUrl: '',
                    visitorCount: '',
                    reason: '',
                    startTime: '',
                    endTime: '',
                },
                unitId: '',
                communityId: '',
                buildId: '',
                roomId:'',
                url: {
                    selectUrl:'/property-manage/community/info/list',
                    info:'/property-manage/community/visitor/info/detail',
                    apply:'/property-manage/community/visitor/info/audit',
                    add: "/property-manage/community/visitor/info/insert"
                },
                communityArr: [],
                communityBuildingArr: [],
                unitArr: [],
                roomArr:[],
                rules:{
                    visitorName:{ required: true, message: '输入姓名', trigger: 'blur' },
                    visitorPhone:{ required: true, message: '输入联系方式', trigger: 'blur' },
                    reason:{ required: true, message: '输入来访事由', trigger: 'blur' },
                    visitorCount:{ required: true, message: '输入来访人数', trigger: 'blur' },
                    startTime:{ required: true, message: '选择开始时间', trigger: 'blur' },
                    endTime:{ required: true, message: '选择结束时间', trigger: 'blur' },
                    communityOwnerInfoId: { required: true, message: '选择地址', trigger: 'change' },
                },

            }
        },

        components: {
            uploadImg
        },
        mounted(){
            this.$route.query.id && this.getDetail(this.$route.query.id)
            this.getSelectArr()
        },
        methods: {
            getDetail(id){
                httpRequest(this.url.info,"GET",{id}).then(res=>{
                    if(res.code === 200){
                        this.communityId = res.data.communityName
                        this.unitId = res.data.unitName
                        this.buildId = res.data.buildingName
                        this.roomId = res.data.ownerRoomNo

                        this.form = res.data;
                    }
                })
            },
            getSelectArr(){
                httpRequest(this.url.selectUrl,"GET").then(res=>{
                    this.communityArr = res.data;
                })
            },
            changeComm(communityId) {
                this.buildId = '';
                this.unitId = '';
                httpRequest("/property-manage/community/building/info/building/list", 'GET', {communityId})
                    .then(res => {
                        this.communityBuildingArr = res.data;
                    })
            },
            changeBuilding(buildingId) {
                this.unitId = '';
                httpRequest("/property-manage/community/building/info/unit/list", 'GET', {buildingId})
                    .then(res => {
                        this.unitArr = res.data;
                    })
            },
            changeUnit(communityBuildingId) {
                httpRequest("/property-manage/community/owner/info/room/list", 'GET', {communityBuildingId})
                    .then(res => {
                        this.roomArr = res.data;
                    })
            },
            changeRoom(e){
                this.form.communityOwnerInfoId = e;
            },
            //取消
            cancel() {
                this.$router.push('/visit/list')
            },
            addInvited(){
                httpRequest(this.url.add,'POST',this.form).then(res=>{
                    if(res.code === 200){
                       this.cancel()
                    }
                })
            },
            applyInvited(status){
                httpRequest(this.url.apply,'GET',{id:this.form.id,status})
                    .then(res=>{
                        if(res.code === 200){
                            window.location.reload()
                        }
                    })
            },

            onSubmit(fromName) {
                this.$refs[fromName].validate((valid) => {
                    if (valid) {
                        this.addInvited()
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
    .visited-status{
        font-size: 100px; color: #6AC33F;
    }
    .status-cont img{
        width: 100px; height: 100px;
    }
</style>
