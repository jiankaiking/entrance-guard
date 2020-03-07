<template>
    <el-form label-width="100px">
        <el-form-item label="入库单号">
            <el-input v-model="modelFromdata.orderNum"></el-input>
        </el-form-item>
        <el-form-item label="设备型号">
            <EquimentSelect :deviceTypeId.sync="modelFromdata.deviceTypeId"></EquimentSelect>
        </el-form-item>
        <el-form-item label="厂商名称">
            <el-input  v-model="modelFromdata.factory"></el-input>
        </el-form-item>
        <el-form-item label="进货单价">
            <el-input  v-model="modelFromdata.buyingPrice"></el-input>
        </el-form-item>
        <el-form-item label="设备数量">
            <el-input  v-model="modelFromdata.introductionCount"></el-input>
        </el-form-item>
        <el-form-item label="入库时间">
            <el-date-picker
                    v-model="modelFromdata.putTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="备注">
            <el-input type="textarea"
                      v-model="modelFromdata.remark"
                      :rows="4"
                      placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label-width="0">
            <el-button @click="close">取消</el-button>
            <el-button v-if="saveBtnfalg" @click="handleOk">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import httpRequest from "../../../api/api";
    import EquimentSelect from "../../../components/select/EquimentSelect";
    export default {
        name: "EquipmentAddModel",
        data(){
            return{
                modelFromdata:{
                    deviceTypeId:'', //设备类型
                    orderNum:'',//入库订单号
                    introductionCount:'',//入库数量
                    buyingPrice:'',//进货价格
                    factory:'',//厂商
                    putTime:'',//入库日期
                    remark:'',//备注
                },
                saveBtnfalg:true, // 添加还是详情
                url:{
                    info:"/deviceManage/deviceInStorehouse/findOne",
                    add:"/deviceManage/deviceInStorehouse/insert",
                },
            }
        },

        methods:{
            //取消
            close(){
               this.$emit('close')
            },
            //添加
            add() {
                this.saveBtnfalg = true
                for(var key in this.modelFromdata){
                    this.modelFromdata[key] = ""
                }
            },
            //详情
            edit(record) {
                this.saveBtnfalg = false
                httpRequest(this.url.info, 'get', {deviceIntroductionId: record.deviceIntroductionId})
                    .then(res => {
                        this.modelFromdata = res.data;
                    })
            },
            //添加保存
            handleOk() {
                const that = this;
                // 触发表单验证
                httpRequest(this.url.add, 'post', this.modelFromdata)
                    .then((res) => {
                        if(res.success){
                            that.$emit("ok");
                        }
                    })
            },
        },
        components:{
            EquimentSelect
        }
    }
</script>

<style scoped>

</style>
