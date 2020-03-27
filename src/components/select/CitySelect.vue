<template>
    <el-row :gutter="24">
        <el-col :span="type == 'city'?12:8">
            <el-select v-model="province" @change="provinceSelect">
                <el-option v-for="(item,index) in provinceArr" :label="item.regionLongName" :value="item.regionLongCode"></el-option>
            </el-select>
        </el-col>
        <el-col :span="type == 'city'?12:8">
            <el-select v-model="city" @change="citySelect">
                <el-option v-for="(item,index) in cityArr" :label="item.regionName" :value="item.regionLongCode+'/'+item.regionName"></el-option>
            </el-select>
        </el-col>
        <el-col :span="7" v-if="type != 'city'">
            <el-select v-model="region" @change="selectCode">
                <el-option v-for="(item,index) in regionArr" :label="item.regionName" :value="item.regionLongCode+'/'+item.regionName"></el-option>
            </el-select>
        </el-col>
    </el-row>
</template>

<script>


    //省市区 选择   type: 'city' 直选到市级
    import httpRequest from "../../api/api";
    export default {
        name: "CitySelect",
        props:{
            type:{
                type:String,
                default(){
                    return "region";
                }
            },
        },
        data() {
            return {
                provinceArr: [],
                province:{},
                city:{},
                region:{},
                cityArr: [],
                regionArr: [],
                rId: 0  // 查询id
            }
        },
        mounted() {
             this.initial()
        },
        methods: {
            initial(){
                this.provinceArr=[],
                this.cityArr=[],
                this.regionArr=[],
                httpRequest("managecenter/sysRegion/getRegionByCode", "GET", {regionLongCode: this.rId})
                .then(res => {
                    this.provinceArr = res.data;
                    this.province = ''
                    this.city = ''
                    this.region = ''
                })
            },
            provinceSelect(e) {
                httpRequest("managecenter/sysRegion/getRegionByCode", "GET", {regionLongCode: e})
                    .then(res => {
                        this.cityArr = res.data;
                        this.city = ''
                        this.region = ''
                    })
            },
            citySelect(e) {
                httpRequest("managecenter/sysRegion/getRegionByCode", "GET", {regionLongCode: e.split('/')[0]})
                    .then(res => {
                        if(this.type == "city"){
                            this.$emit("selectCode",e.split('/')[0],e.split('/')[1]=='市辖区'?this.city.split('/')[1]:e.split('/')[1])
                        }else{
                            this.regionArr = res.data;
                        }
                        this.region = ''
                    })
            },
            selectCode(e,name){
                this.$emit("selectCode",e.split('/')[0],e.split('/')[1]=='市辖区'?this.city.split('/')[1]:e.split('/')[1])
            },
        }
    }
</script>

<style scoped>

</style>
