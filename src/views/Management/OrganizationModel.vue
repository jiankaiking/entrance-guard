<template>

    <el-form ref="form" :model="modelFromdata" label-width="80px" style="padding: 0 30px; box-sizing: border-box;">
        <el-form-item label="*上级部门">
            <el-select v-model="modelFromdata.organPid" @change="changeOrgan" placeholder="请选择">
                <el-option
                        v-for="item in OrganList"
                        :key="item.value"
                        :label="item.organName"
                        :value="item.organId">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="*部门名称">
            <el-input v-model="modelFromdata.organName" placeholder="请选择"></el-input>
        </el-form-item>
        <el-form-item label="*负责人">
            <el-select v-model="modelFromdata.userId" @change="changeUser" placeholder="请选择">
                <el-option
                        v-for="item in ChargeUserList"
                        :key="item.staffId"
                        :label="item.staffFullName"
                        :value="item.staffId">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="*手机号">
            <el-input v-model="modelFromdata.loginPhone" disabled></el-input>
        </el-form-item>
        <el-form-item label="分类">
            <el-select v-model="modelFromdata.organType" placeholder="请选择">
                <el-option
                        v-for="item in organType"
                        :key="item.dataValue"
                        :label="item.dataCode"
                        :value="item.dataValue">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="显示排序">
            <el-input-number v-model="modelFromdata.organSort" :min="1" :max="10" ></el-input-number>
        </el-form-item>

        <el-form-item label="部门状态">
            <el-radio-group v-model="modelFromdata.organStatus">
                <el-radio label="0">停用</el-radio>
                <el-radio label="1">启用</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
            <el-input type="textarea"  v-model="modelFromdata.organRemarks"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleOk">立即创建</el-button>
            <el-button @click="close">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import httpRequest from "../../api/api";

    export default{
        name:'OrganizationModel',
        data(){
            return{
                modelFromdata:{
                    organName:'',//机构名
                    organType:'',//机构类型
                    organSort:'',//机构顺序
                    userId:'',//机构负责人
                    organPid:'',//父节点ID
                    organStatus:'',//机构状态
                    organRemarks:'',//备注
                    loginPhone:'',
                },
                OrganList:[],
                ChargeUserList:[],
                organType:[],
                phone:'',
                url:{
                    add:'/managecenter/organManage/editOrgan',
                    info:'',
                },
            }
        },
        mounted(){
            this.getChildOrganList()
        },
        methods:{

            //机构选择获取负责人
            changeOrgan(e){
                  this.modelFromdata.userId = this.modelFromdata.staffId;
                // console.log( this.modelFromdata.userId)
                httpRequest("/managecenter/organManage/getChargeUserList","GET",{organId:e})
                    .then(res=>{
                        this.ChargeUserList = res.data;
                    })
            },
            changeUser(e){
                let selcetItem =  this.ChargeUserList.filter((item,index)=>{
                    return item.staffId == e
                })

                this.modelFromdata.loginPhone = selcetItem[0].loginPhone
            },
            //获取机构
            getChildOrganList(){
                httpRequest("/managecenter/organManage/getChildOrganList","GET")
                    .then(res=>{
                        this.OrganList = res.data
                        return httpRequest("/managecenter/sysDict/getDataListByType","GET",{dataType:"organ_type"})
                    })
                    .then(res=>{
                       this.organType = res.data;
                    })
            },
            //清空填充项
            modelDatanull(){
                this.modelFromdata.loginPhone = ''
                for(var key in this.modelFromdata){
                    this.modelFromdata[key] = ""
                }
            },
            add(){
                this.modelDatanull()
            },
            close(){
                this.$emit('close');
            },
            edit(record) {
                // 员工详情
                this.modelDatanull()
                Object.assign(this.modelFromdata,record)
                this.changeOrgan(record.organPid)


            },
            handleOk(){
                const that = this;
                // console.log(this.modelFromdata)
                // 触发表单验证
                httpRequest(that.url.add, 'POST', this.modelFromdata)
                    .then((res) => {
                        if(res.success){
                            that.$message.success("修改成功")
                            that.$emit('ok',{id:that.modelFromdata.organPid});
                        }
                    })
                    .finally(() => {
                        this.$emit('close');
                    })
            },
        }
    }

</script>

<style scoped>
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 50px;
        height:  50px;
        line-height:  50px;
        text-align: center;
    }
    .avatar {
        width:  50px;
        height:  50px;
        display: block;
    }
</style>
