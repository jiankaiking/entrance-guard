<template>

    <el-form ref="form" :model="modelFromdata" label-width="80px" style="padding: 0 30px; box-sizing: border-box;">
        <el-form-item label="*上级部门">
            <el-select v-model="modelFromdata.organPid" placeholder="请选择">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="*部门名称">
            <el-input v-model="modelFromdata.organName" placeholder="请选择"></el-input>
        </el-form-item>
        <el-form-item label="*负责人">
            <el-select v-model="modelFromdata.userId" placeholder="请选择">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="*手机号">
            <el-input v-model="phone"></el-input>
        </el-form-item>
        <el-form-item label="分类">
            <el-select v-model="value" placeholder="请选择">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="显示排序">
            <el-input-number v-model="modelFromdata.organSort" :min="1" :max="10" ></el-input-number>
        </el-form-item>

        <el-form-item label="部门状态">
            <el-radio-group v-model="modelFromdata.organStatus">
                <el-radio :label="6">备选项</el-radio>
                <el-radio :label="9">备选项</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
            <el-input type="textarea"  v-model="modelFromdata.organRemarks"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
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
                },
                phone:'123',
                ulr:{
                    add:'/organManage/editOrgan',
                    info:'',
                },
            }
        },
        methods:{
            //清空填充项
            modelDatanull(){
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
            },
            handleOk(){
                const that = this;
                let url = '';
                // 触发表单验证
                httpRequest(url, 'post', this.modelFromdata)
                    .then((res) => {
                        if(res.success){
                            that.$message.success("修改成功")
                            that.$emit('ok');
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
