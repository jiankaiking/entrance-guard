<template>
    <el-dialog title="小区信息" :lock-scroll="false" center   width="30%" :visible.sync="dialogTableVisible">
        <div class="menuInfo">
            <el-form ref="form" :model="modelFromdata" :rules="rules" label-width="80px">
                <el-form-item label="小区" prop="communityName" >
                    <el-input v-model="modelFromdata.communityName"  placeholder="请输入小区名称" ></el-input>
                </el-form-item>
                <el-form-item label="地址"  prop="regionCode">
                    <city-select @selectCode="selectCode" :cityCode="modelFromdata.regionCode" />
                </el-form-item>
                <el-form-item  prop="communityAdress">
                    <el-input v-model="modelFromdata.communityAdress" placeholder="详细地址"></el-input>
                </el-form-item>
                <el-form-item label="住宅楼数" prop="buildingCount">
                    <el-input v-model="modelFromdata.buildingCount" placeholder="请输入住宅楼数"></el-input>
                </el-form-item>
                <el-form-item label="住户数" prop="householdCount">
                    <el-input v-model="modelFromdata.householdCount" placeholder="请输入住户数"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="contact">
                    <el-input v-model="modelFromdata.contact" placeholder="请输入联系人"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="contactPhone">
                    <el-input v-model="modelFromdata.contactPhone" placeholder="请输入联系电话"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" placeholder="字数不能超过50个字符" :rows="6" maxlength="50" show-word-limit
                              v-model="modelFromdata.introduce"></el-input>
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
    import CitySelect from "../../../components/select/CitySelect";
    import httpRequest from "../../../api/api";

    export default {
        name: 'menuaddmodel',
        data() {
            return {
                dialogTableVisible:false,
                modelFromdata: {
                    communityName: '',
                    buildingCount: '',
                    householdCount: '',
                    contact: '',
                    contactPhone: '',
                    communityAdress: '',
                    regionCode:'',
                    regionValue:'',
                    introduce: '',

                },
                type:'',
                rules:{
                    communityName:{ required: true, message: '输入小区名称', trigger: 'blur' },
                    buildingCount:{ required: true, message: '输入住宅楼数', trigger: 'blur' },
                    householdCount:{ required: true, message: '输入住户数', trigger: 'blur' },
                    contact:{ required: true, message: '输入联系人', trigger: 'blur' },
                    contactPhone: { required: true, message: '输入手机号', trigger: 'blur' },
                    communityAdress: { required: true, message: '请输入详细地址', trigger: 'blur' },
                    regionCode:{ required: true, message: '选择地址', trigger: 'change' },
                },
                url: {
                    add: '/property-manage/community/info/insert',
                    edit: '/property-manage/community/info/update',
                },
            }
        },
        methods: {
            //清空填充项
            modelDatanull() {
                for (var key in this.modelFromdata) {
                    this.modelFromdata[key] = ""
                }
            },

            add() {
                this.dialogTableVisible = true;
                this.modelDatanull()
                // this.$nextTick(() => {
                //     this.$refs.form.resetFields()
                // })

            },
            edit(row){
                this.dialogTableVisible = true;
                this.modelFromdata = Object.assign(this.modelFromdata,row)
                console.log(this.modelFromdata)
            },
            selectCode(e){
                this.modelFromdata.regionCode = e.code
                this.modelFromdata.regionValue = e.regionName
            },

            ok() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        let url;
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

        components: {
            CitySelect
        },
    }

</script>
<style>
    .menuInfo .el-table td, .menuInfo .el-table th {
        padding: 0 !important;
    }
</style>
<style scoped>

    .btn-box {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 0 100px;
        box-sizing: border-box;
    }

</style>
