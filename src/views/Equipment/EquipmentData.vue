<template>
    <div class="main-contenner">
        <div class="searchData">
            <el-form ref="form" :model="searchData" label-width="80px">
                <el-form-item label="设备型号" style="width: 220px">
                    <el-input v-model="searchData.loginStaffName"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchClick">搜索</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tableData">
            <div class="tableBox">
                <div class="title">累计数据</div>
                <div class="equipment-total">
                    <ul>
                        <li><p>已发货设备</p>
                            <p>123213</p></li>
                        <li><p>已绑定设备</p>
                            <p>123213</p></li>
                        <li><p>交易笔数</p>
                            <p>123213</p></li>
                        <li><p>交易金额</p>
                            <p>123213</p></li>
                    </ul>
                </div>
                <div class="title">累计数据</div>
                <div class="searchData">
                    <el-form ref="form" :model="searchData" label-width="80px">
                        <el-form-item label="设备型号" style="width: 220px">
                            <el-input v-model="searchData.loginStaffName"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="searchClick">搜索</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="all-chart">
                    <div class="chart-item">
                        <h2 class="chart-title">设备绑定(台)</h2>
                        <div class="chart-container"></div>
                    </div>
                    <div class="chart-item">
                        <h2 class="chart-title">设备绑定(台)</h2>
                        <div class="chart-container"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import httpRequest from "../../api/api";
    import {myMixins} from "../../mixins/mixin";

    export default {
        name: "EquipmentData",
        mixins: [myMixins],
        data() {
            return {
                //搜索数据
                searchData: {
                    loginStaffName: '',
                    loginClientIp: '',
                    loginTime: null,
                    loginStatus: '',
                    page: 1,
                    size: 10
                },
                value: '',
                total: 0,
                listUrl: '/log/getSysLoginLog',
                tableData: []
            }
        },
    }
</script>

<style scoped>
   .tableBox .searchData{
        box-shadow: none; margin-bottom: 0;
    }
    .title {
        position: relative;
        color: #000000;
        font-size: 18px;
        font-weight: bold;
        padding-left: 30px;
        margin: 25px 0;
    }
    .title:before {
        position: absolute;
        content: "";
        left: 0;
        top: 2px;
        width: 9px;
        height: 21px;
        background: linear-gradient(180deg, #ff2a00 0%, #ed7346 100%);
        border-radius: 5px;
    }
    .chart-title{
        font-size: 20px; color: #000000; text-align: center; font-weight: bold;

    }
    .chart-container{
        height: 360px; border: 1px solid #CECECE; margin: 30px 0;
    }
</style>
