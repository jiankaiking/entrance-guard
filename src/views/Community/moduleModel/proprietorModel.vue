<template>
    <el-dialog title="业主信息" center width="30%" :visible.sync="dialogTableVisible">
        <div class="menuInfo">
            <el-form ref="form" :model="modelFromdata" :rules="rules" label-width="120px">
                <el-form-item label="小区名称" prop="communityId" >
                    <el-select v-model="modelFromdata.communityId"   placeholder="请选择小区" @change="changeComm">
                        <el-option v-for="item in communityArr" :key="item.id" :label="item.value" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="住宅楼名称" prop="buildId">
                    <el-select @change="changeBuilding" v-model="modelFromdata.buildId"   placeholder="请选择住宅楼">
                        <el-option v-for="item in communityBuildingArr" :key="item.id" :label="item.value" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item @change="changeUnit" label="单元名称"  prop="unitId">
                    <el-select v-model="modelFromdata.unitId"   placeholder="请选择单元">
                        <el-option v-for="item in unitArr" :key="item.id" :label="item.value" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="房间号" prop="ownerRoomNo">
                    <el-input v-model="modelFromdata.ownerRoomNo" placeholder="请输入房间号"></el-input>
                </el-form-item>
                <el-form-item label="住户类型" prop="ownerType">
                    <el-select v-model="modelFromdata.ownerType"   placeholder="请选择小区名称">
                        <el-option v-for="item in ownerTypeArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="姓名" prop="ownerName">
                    <el-input v-model="modelFromdata.ownerName" placeholder="请输入联系人"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="ownerPhone">
                    <el-input v-model="modelFromdata.ownerPhone" placeholder="请输入联系电话"></el-input>
                </el-form-item>
                <el-form-item label="证件类型">
                    <el-select v-model="modelFromdata.ownerIdType"   placeholder="请选择证件类型">
                        <el-option v-for="item in ownerIdTypeArr" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码" >
                    <el-input v-model="modelFromdata.ownerIdNo" placeholder="请输入证件号码"></el-input>
                </el-form-item>
                <el-form-item label="添加照片">
                    <upload-img :img-url.sync="modelFromdata.imgUrl" />
                </el-form-item>
            </el-form>
            <div class="btn-box">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="ok" plain>确认</el-button>
            </div>
        </div>
    </el-dialog>

</template>

<script>
    import httpRequest from "../../../api/api";
    import uploadImg from "../../../components/uploadImg/uploadImg";

    export default {
        name: 'residentialModel',
        data() {
            return {
                dialogTableVisible:false,
                modelFromdata: {
                    communityId:'',
                    ownerRoomNo: '',
                    ownerName: '',
                    ownerPhone: '',
                    unitId:'',
                    ownerType: '',
                    ownerIdType: '',
                    ownerIdNo:'',
                    buildId:'',
                    faceStatus:'',
                    imgUrl:'',
                },
                communityBuildingId: '',
                communityArr:[],
                communityBuildingArr:[],
                unitArr:[],
                ownerTypeArr:[{value:'1',label:'业主'}, {value:'2',label:'住户'},],
                ownerIdTypeArr:[
                    {value:'1',label:'身份证'},
                    {value:'2',label:'港澳通行证'},
                    {value:'3',label:'护照'},
                    {value:'4',label:'同胞证'}
                ],
                type:'',
                rules:{
                    communityId:{ required: true, message: '选择小区', trigger: 'change' },
                    communityBuildingId:{ required: true, message: '选择单元', trigger: 'change' },
                    ownerRoomNo:{ required: true, message: '输入房间号', trigger: 'blur' },
                    ownerName:{ required: true, message: '输入联系人', trigger: 'blur' },
                    ownerPhone:{ required: true, message: '输入联系方式', trigger: 'blur' },
                    ownerType: { required: true, message: '选择业主类型', trigger: 'change' },
                    unitId:{ required: true, message: '选择单元楼', trigger: 'change' },
                    buildId:{ required: true, message: '选择住宅楼', trigger: 'change' },
                },
                url: {
                    selectUrl:'/property-manage/community/info/list',
                    add: '/property-manage/community/owner/info/insert',
                    edit: '/property-manage/community/owner/info/update',
                },
            }
        },
        components:{
            uploadImg
        },
        mounted(){
            this.getSelectArr()
        },
        methods: {
            changeComm(communityId){
                this.modelFromdata.buildId = '';
                this.modelFromdata.unitId = '';
                httpRequest("/property-manage/community/building/info/building/list",'GET',{communityId})
                    .then(res=>{
                        this.communityBuildingArr = res.data;
                    })
            },
            changeBuilding(buildingId){
                this.modelFromdata.unitId = '';
                httpRequest("/property-manage/community/building/info/unit/list",'GET',{buildingId})
                    .then(res=>{
                        this.unitArr = res.data;
                    })
            },
            changeUnit(){},
            //清空填充项
            modelDatanull() {
                for (var key in this.modelFromdata) {
                    this.modelFromdata[key] = ""
                }
            },

            add() {
                this.dialogTableVisible = true;
                this.modelDatanull()
            },
            edit(row){
                this.changeComm(row.communityId)
                this.changeBuilding(row.buildId)
                this.dialogTableVisible = true;
                this.modelFromdata = Object.assign(this.modelFromdata,row)

                console.log( this.modelFromdata)


                // console.log(this.modelFromdata)
            },
            selectCode(e){
                this.modelFromdata.regionCode = e.code
                this.modelFromdata.regionValue = e.regionName
            },
            getSelectArr(){
                httpRequest(this.url.selectUrl,"GET").then(res=>{
                    this.communityArr = res.data;
                })
            },
            ok() {
                console.log(this.modelFromdata)
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        let url;
                        this.modelFromdata.communityBuildingId =  this.modelFromdata.unitId
                        if(this.modelFromdata.id){
                            url = this.url.edit
                        }else{
                            url = this.url.add
                        }
                        httpRequest(url, "POST", this.modelFromdata)
                            .then(res => {
                                if (res.success) {
                                    this.dialogTableVisible = false;
                                    this.$emit('ok')
                                }
                            })
                    } else {
                        return false;
                    }
                });
            },
            //取消
            close() {
                this.dialogTableVisible = false;
                this.$emit("close")
            },
        },
    }

</script>
<style scoped>
    .btn-box {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 0 100px;
        box-sizing: border-box;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
    }

    .btn-box {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 0 100px;
        box-sizing: border-box;
    }

    /*.menuInfo .el-form-item{*/
    /*    margin-bottom: 0;*/
    /*}*/

    .avatar {
        width: 50px;
        height: 50px;
        display: block;
    }

    .menuinfo-form {

    }
</style>

