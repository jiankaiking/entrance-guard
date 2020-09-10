<template>
    <el-row :gutter="24">
        <el-col :span="type == 'city'?12:8">
            <el-select v-model="province" @change="provinceSelect">
                <el-option v-for="(item,index) in provinceArr" :label="item.regionLongName"
                           :value="item.regionLongCode"></el-option>
            </el-select>
        </el-col>
        <el-col :span="type == 'city'?12:8">
            <el-select v-model="city" @change="citySelect">
                <el-option v-for="(item,index) in cityArr" :label="item.regionName"
                           :value="item.regionLongCode"></el-option>
            </el-select>
        </el-col>
        <el-col :span="7" v-if="type != 'city'">
            <el-select v-model="region" @change="selectCode">
                <el-option v-for="(item,index) in regionArr" :label="item.regionName"
                           :value="item.regionLongCode"></el-option>
            </el-select>
        </el-col>
    </el-row>
</template>

<script>


    //省市区 选择   type: 'city' 直选到市级
    import httpRequest from "../../api/api";

    export default {
        name: "CitySelect",
        props: {
            type: {
                type: String,
                default() {
                    return "region";
                }
            },
            cityCode: {
                type: String,
                default() {
                    return "";
                }
            },
        },
        data() {
            return {
                provinceArr: [],
                province: {},
                city: {},
                code: this.cityCode,
                region: {},
                cityArr: [],
                regionArr: [],
                rId: 0  // 查询id
            }
        },
        mounted() {
             // this.code.length === 7 ? this.showCode() : this.initial()
        },
        methods: {
            showCode() {
                this.province = this.code.substring(0, 2)
                this.city = this.code.substring(0, 4)
                this.region = this.code
                httpRequest("managecenter/sysRegion/getRegionByCode", "GET", {regionLongCode: this.rId})
                    .then(res => {
                        this.provinceArr = res.data;
                        return httpRequest("managecenter/sysRegion/getRegionByCode", "GET", {regionLongCode: this.province})
                    })
                    .then(res => {
                        this.cityArr = res.data;
                        return httpRequest("managecenter/sysRegion/getRegionByCode", "GET", {regionLongCode: this.city})
                    })
                    .then(res => {
                        this.regionArr = res.data;
                    })
            },
            initial() {
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
                httpRequest("managecenter/sysRegion/getRegionByCode", "GET", {regionLongCode: e})
                    .then(res => {
                        this.regionArr = res.data;
                        this.region = ''
                    })
            },
            selectCode(code, name) {
                let optionsArr = this.regionArr.filter(item => {
                    return item.regionLongCode === code;
                })
                let regionName = optionsArr[0].regionLongName
                this.$emit("selectCode", {code, regionName})
            },
        },
        watch: {
            cityCode: {
                immediate: true,
                handler(val) {
                    this.code = val
                    val.length === 7?this.showCode(): this.initial()
                }
            },
        }
    }
</script>

<style scoped>

</style>
