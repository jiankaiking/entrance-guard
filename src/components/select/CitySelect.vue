<template>
    <el-row :gutter="24">
        <el-col :span="8">
            <el-select v-model="province" @change="provinceSelect">
                <el-option v-for="(item,index) in provinceArr" :label="item.regionName" :value="item.regionId"></el-option>
            </el-select>
        </el-col>
        <el-col :span="8">
            <el-select v-model="city" @change="citySelect">
                <el-option v-for="(item,index) in cityArr" :label="item.regionName" :value="item.regionId"></el-option>
            </el-select>
        </el-col>
        <el-col :span="7" v-if="type != 'city'">
            <el-select v-model="region" @change="selectCode">
                <el-option v-for="(item,index) in regionArr" :label="item.regionName" :value="item.regionId"></el-option>
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
                rId: 1  // 查询id
            }
        },
        mounted() {
            httpRequest("/sysRegion/getRegion", "GET", {regionId: this.rId})
                .then(res => {
                    this.provinceArr = res.data;
                    this.province = ''
                    this.city = ''
                    this.region = ''
                })
        },
        methods: {
            provinceSelect(e) {
                httpRequest("/sysRegion/getRegion", "GET", {regionId: e})
                    .then(res => {
                        this.cityArr = res.data;
                        this.city = ''
                        this.region = ''
                    })
            },
            citySelect(e) {
                httpRequest("/sysRegion/getRegion", "GET", {regionId: e})
                    .then(res => {
                        if(this.type == "city"){
                            this.$emit("selectCode",e)
                        }else{
                            this.regionArr = res.data;
                        }
                        this.region = ''
                    })
            },
            selectCode(e){

                this.$emit("selectCode",e)
            },
        }
    }
</script>

<style scoped>

</style>
