<template>
    <div class="center-container">
        <el-form label-width="110px">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="设备型号名称">
                        <el-input placeholder="请输入设备型号" v-model="modelFromdata.deviceTypeCode"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="厂商">
                        <el-input placeholder="请输入设备型号" v-model="modelFromdata.factory"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="价格">
                        <el-input placeholder="请输入设备价格" v-model="modelFromdata.price"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="设置阶梯价格">
                        <el-row>
                            <el-col>
                                <el-checkbox v-model="modelFromdata.isLadder" :true-label="1" :false-label="0"
                                             label="是否设置阶梯价格"></el-checkbox>
                                <el-button type="text" style="margin-left: 50px" @click="addRules" v-if="modelFromdata.isLadder == 1">
                                    <i class="el-icon-circle-plus-outline el-icon--left"></i>新增一条规则
                                </el-button>
                            </el-col>
                            <el-col v-if="modelFromdata.isLadder == 1" v-for="(item,index) in deviceLadderList">
                                单次满
                                <el-input style="width: 100px;" v-model="item.deviceNumber"></el-input>
                                件,每件价格为￥
                                <el-input style="width: 100px;" v-model="item.devicePrice"></el-input>
                                <i class="del-image" @click="delRules(index)"><img src="../../../assets/images/del.png" alt=""/></i>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="设备图片">
                        <uploadImg :imgUrl.sync="modelFromdata.imgUrl"></uploadImg>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="适用行业说明">
                        <el-input type="textarea" v-model="modelFromdata.description"
                                  :rows="4"
                                  placeholder="请输入适用行业说明"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item style="margin-top: 67px;">
                <el-button @click="backrank">返回</el-button>
                <el-button style="margin-left: 60px" @click="addEquiment">确认</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import uploadImg from "../../../components/uploadImg/uploadImg";
    import httpRequest from "../../../api/api";

    export default {
        name: "EquipmentAddModel",
        data() {
            return {
                modelFromdata: {
                    deviceTypeCode: '',//设备型号
                    factory: '',//设备厂商
                    price: '',//单价
                    isLadder: 0,//是否阶梯价格1是0否
                    imgUrl: '',//图片URL
                    description: '',//描述
                    deviceLadderList: [], //阶梯类型
                },
                deviceLadderList:[
                    {deviceNumber:'',devicePrice:''},
                ],
                url:{
                    add:'/deviceManage/deviceType/insert',
                    info:'/deviceManage/deviceType/findOne',
                    edit:'/deviceManage/deviceType/update'
                }
            }
        },
        methods: {
            //清空填充项
            modelDatanull(){
                for(var key in this.modelFromdata){
                    this.modelFromdata[key] = ""
                }
            },
            add(){
                this.modelDatanull()
            },
            edit(record) {
                // 员工详情
                this.modelDatanull()
                httpRequest(this.url.info, 'get', {deviceTypeId: record})
                    .then(res => {
                        Object.assign(this.modelFromdata,res.data)
                        if(res.data.deviceLadderList){
                            this.deviceLadderList = res.data.deviceLadderList
                        }
                    })
            },
            //新增设备
            addEquiment(){
                this.modelFromdata.deviceLadderList = JSON.stringify(this.deviceLadderList)
                //有设备id就是修改 没有就是新增
                let url = this.modelFromdata.deviceTypeId?this.url.edit:this.url.add
                httpRequest(url,"POST",this.modelFromdata)
                    .then(res=>{
                        if(res.success){
                            this.$message.success(res.msg)
                            this.$emit('ok')
                        }
                    })
            },
            //返回
            backrank() {
                this.$emit('backrank')
            },
            //新增规则
            addRules(){
               this.deviceLadderList.push(JSON.parse(JSON.stringify({deviceNumber:'',devicePrice:''})))
            },
            //删除规则
            delRules(index){
                this.deviceLadderList.splice(index,1)
            }
        },
        components: {
            uploadImg
        },
        computed: {
            isLadder() {
                return this.modelFromdata.isLadder;
            }
        },
        watch:{
            isLadder(val){
                if(val == 0){
                    this.modelFromdata.deviceLadderList = ""
                }
            }
        },
    }
</script>

<style scoped>
    .center-container {
        background: #ffffff;
        padding: 40px 150px;
        box-sizing: border-box;
        box-shadow: 0px 1px 6px 4px rgba(242, 242, 242, 1);
        border-radius: 8px;
    }

    .avatar-uploader {
        width: 150px;
        height: 150px;
    }

    .avatar {
        width: 150px;
        height: 150px;
    }

    .el-form-item {
        padding-bottom: 0;
    }

    .avatar-uploader-icon {
        width: 150px;
        height: 150px;
        line-height: 150px;
    }

    .del-image img {
        width: 24px;
        height: 24px;
        margin-top: 10px;
        margin-left: 30px;
    }
.el-input__inner{
    padding: 0 5px;
}
</style>
