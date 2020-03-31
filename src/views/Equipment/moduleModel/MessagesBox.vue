<template>
    <div class="message-shipped">
        <div  v-if="review.type==3">
            <i class="el-icon-success"></i>
            <p style="color: #333333; font-size: 18px;margin-top: 14px;">上架成功</p>
        </div>
        <div v-if="review.type==1">
            <el-form label-width="75px">
                <el-form-item label="实付金额:">
                    <el-input v-model="review.payMoney"></el-input>
                </el-form-item>
                <el-form-item label="付款时间:">
                    <el-input v-model="review.payTime"></el-input>
                </el-form-item>
                <!-- <el-form-item label="收款账户:">
                    <el-input></el-input>
                </el-form-item> -->
                <el-form-item label="备注信息:">
                    <el-input v-model="remark"></el-input>
                </el-form-item>
                    <el-button @click="reviewBtn">确定</el-button>
            </el-form>
        </div>
        <div v-if="review.type==0">
               <el-input type="textarea"
                         :rows="4"
                         v-model="remark"
                         placeholder="请输入内容"></el-input>
            <el-button style="margin-top: 30px" @click="reviewBtn">确定</el-button>
        </div>
    </div>
</template>

<script>
import httpRequest from "../../../api/api";
    export default {
        name: "MessagesBox",
        props:{
            review:{
                type:Object
            }
        },
        data(){
            return{
                remark:''
            }
        },
        methods:{
            reviewBtn(){
                var data={
                    deviceApplyId:this.review.deviceApplyId,
                    auditStatus:this.review.type,
                    remark:this.remark
                }
                httpRequest("/managecenter/deviceManage/deviceApply/auditApply", "post",data)
                    .then(res => {
                        if(res.success){
                            this.$message({
                                    type: 'success',
                                    message: res.msg
                                })
                            this.$emit('backrank')
                        }
                })
            }
        }
    }
</script>

<style scoped>
    .message-shipped {
        width: 100%;
        padding: 0 40px;
        box-sizing: border-box;

    }

    .el-icon-success {
        color: #67C23B;
        font-size: 44px;
    }
</style>
