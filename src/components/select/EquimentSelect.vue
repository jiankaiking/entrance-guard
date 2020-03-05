<template>
    <el-select v-model="target" placeholder="选择设备类型" @change="selectType">
        <el-option v-for="(item,index) in deviceType"
                   :label="item.deviceTypeCode"
                   :value="item.deviceTypeId">
        </el-option>
    </el-select>
</template>
<script>
    import httpRequest from "../../api/api";
    export default {
        props:{
            deviceTypeId:{},
        },
        data(){
            return{
                target:'',
                deviceType:[],
            }
        },
        mounted(){
            //获取设备类型
                httpRequest("/deviceManage/deviceType/selectDeviceTypeList","GET")
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

