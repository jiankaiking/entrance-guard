<template>
    <div class="main-contenner">
        正在开发中
        <!-- <div class="searchData">
            <el-form ref="form" label-width="80px">
                <el-form-item label="设备型号" style="width: 220px">
                    <EquimentSelect :deviceTypeId.sync="deviceTypeId"></EquimentSelect>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  plain>搜索</el-button>
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
                    <el-form ref="form" label-width="80px">
                        <el-form-item label="设备型号" style="width: 220px">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" plain >搜索</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="all-chart">
                    <div class="chart-item">
                        <h2 class="chart-title">设备绑定(台)</h2>
                        <div id="myChart" :style="{width: '100%', height: '400px'}"></div>
                    </div>
                    <div class="chart-item">
                        <h2 class="chart-title">设备绑定(台)</h2>
                        <div id="myChart1" :style="{width: '100%', height: '400px'}"></div>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
    import echarts from 'echarts'
    import httpRequest from "../../api/api";
    import EquimentSelect from "../../components/select/EquimentSelect";

    export default {
        name: "EquipmentData",
        data() {
            return {
                deviceTypeId: null,
                value: '',
            }
        },
        mounted() {
            // this.drawLine()
            // this.drawLine1()
        },
        methods: {
            drawLine() {
                let myChart = echarts.init(document.getElementById("myChart"));
                myChart.setOption({
                    animationDuration: 100,
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    grid: {
                        left: '1%',
                        right: '1%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: [820, 932, 901, 934, 1290, 1330, 1320]
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '总分润',
                            type: 'line',
                            stack: '总量',
                            itemStyle: {
                                color: '#FFB307'
                            },
                            areaStyle: {
                                color: '#FFB307'
                            },
                            data: [820, 932, 901, 934, 1290, 1330, 1320]
                        },
                    ]
                });
            },
            drawLine1() {
                let myChart = echarts.init(document.getElementById("myChart1"));
                myChart.setOption({
                    animationDuration: 100,
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    grid: {
                        left: '1%',
                        right: '1%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: [820, 932, 901, 934, 1290, 1330, 1320]
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '总分润',
                            type: 'line',
                            stack: '总量',
                            itemStyle: {
                                color: '#FFB307'
                            },
                            areaStyle: {
                                color: '#FFB307'
                            },
                            data: [820, 932, 901, 934, 1290, 1330, 1320]
                        },
                    ]
                });
            }
        },
        components: {
            EquimentSelect,
        }
    }
</script>

<style scoped>
    .tableBox .searchData {
        box-shadow: none;
        margin-bottom: 0;
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

    .chart-title {
        font-size: 20px;
        color: #000000;
        text-align: center;
        font-weight: bold;

    }

    .chart-container {
        height: 360px;
        border: 1px solid #CECECE;
        margin: 30px 0;
    }
</style>
