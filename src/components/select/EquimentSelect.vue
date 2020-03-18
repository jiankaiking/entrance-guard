<template>
    <el-select v-model="deviceTypeId" placeholder="选择设备类型" :disabled="disabled" @change="selectType">
        <el-option v-for="(item,index) in deviceType"
                   :label="item.deviceTypeCode"
                   :key="item.deviceTypeId"
                   :value="item.deviceTypeId">
        </el-option>
    </el-select>
</template>
<script>
    import httpRequest from "../../api/api";
    export default {
        props:{
            deviceTypeId:{
                type:Number,
                default(){
                    return null
                }
            },
            disabled:{
                default() {
                    return false;
                }
            }
        },
        data(){
            return{
                deviceType:[],
            }
        },
        mounted(){
            //获取设备类型
            httpRequest("/managecenter/deviceManage/deviceType/selectDeviceTypeList","GET")
                .then(res=>{
                    if(res.success){
                        this.deviceType = res.data;
                    }
                })

        },
        methods:{
            selectType(e){
                this.$emit("update:deviceTypeId",e)
            }
        }
    }
</script>
