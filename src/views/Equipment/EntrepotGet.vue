<template>
    <div class="equipment-lsit">
        <div class="tableData">
            <div class="searchData">
                <el-form ref="form" :model="searchData" label-width="100px">
                    <el-form-item label="设备型号">
                        <EquimentSelect :deviceTypeId.sync="searchData.deviceTypeId"></EquimentSelect>
                    </el-form-item>
                    <el-form-item label="发货时间">
                        <el-date-picker
                            v-model="searchTime"
                            type="daterange"
                            align="right"
                            unlink-panels
                            format='yyyy-MM-dd'
                            @change="timeChage"
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
                            </el-date-picker>
                    </el-form-item>
                    <el-form-item label-width="20px">
                        <el-input placeholder="入库单号" v-model="searchData.orderNum"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="searchClick" type="primary" plain>搜索</el-button>
                        <el-button @click="resetSearch" type="success" plain>重置</el-button>
                        <el-button @click="headAdd" type="success" plain>新增入库</el-button>
                        <el-button  type="success" plain>导出</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="tableBox">
                <el-table empty-text v-loading="loading" element-loading-text="数据正在加载中" element-loading-spinner="el-icon-loading"
                          :headerRowStyle="{color:'#000000'}" :data="tableData" border style="width: 100%;">
                    <el-table-column align="center" prop="orderNum" label="入库单号"></el-table-column>
                    <el-table-column align="center" prop="deviceTypeCode" label="设备型号"></el-table-column>
                    <el-table-column align="center" prop="introductionCount" label="数量"></el-table-column>
                    <el-table-column align="center" prop="buyingPrice" label="单价"></el-table-column>
                    <el-table-column align="center" prop="factory" label="厂商"></el-table-column>
                    <el-table-column align="center" prop="createPersonId" label="操作人"></el-table-column>
                    <el-table-column align="center" prop="putTime" label="入库时间"></el-table-column>
                    <el-table-column align="center" prop="remark" label="备注"></el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="headEdit(scope.row)">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="searchData.size"
                        :total="total"
                        layout=" sizes, prev, pager, next, jumper"
                >
                </el-pagination>
            </div>
        </div>
        <el-dialog
                title="提示"
                align="center"
                :visible.sync="dialogTableVisible"
                :lock-scroll="false"
                width="40%"
               >
            <EntrepotAddModel style="padding: 0 150px; box-sizing: border-box"  ref="modalForm" @close="modalClose" @ok="modalFormOk"></EntrepotAddModel>
        </el-dialog>
    </div>
</template>

<script>
    import {myMixins} from "../../mixins/mixin";
    import EquimentSelect from "../../components/select/EquimentSelect";
    import EntrepotAddModel from "./moduleModel/EntrepotAddModel";
    import httpRequest from "../../api/api";
    export default {
        name: "EntrepotGet",
        mixins: [myMixins],
        provide(){
            return{
                parentTest:this
            }
        },
        data() {
            return {
                searchData: {
                    deviceTypeId: null, //设备类型
                    startTime:'',
                    endTime:'',  //查询条件
                    orderNum: '',  // 入库id
                    size: 10,
                    page: 1
                },
                searchTime:[],
                deviceType:[],
                total: 1,
                dialogTableVisible: false,
                tableData: [],
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                listUrl: '/managecenter/deviceManage/deviceInStorehouse/selectList',   //表格数据接口
            }
        },
        mounted(){
            if(this.$route.query.deviceTypeId != undefined){
                this.searchData.deviceTypeId = this.$route.query.deviceTypeId
            }
        },
        methods:{
            timeChage(){
                this.searchData.startTime=this.searchTime[0]
                this.searchData.endTime=this.searchTime[1]
            },
        },
        components:{
            EquimentSelect,
            EntrepotAddModel
        },
    }
</script>

<style scoped>
    .searchData{
        box-shadow: none; margin-bottom: 0; padding-top: 25px;
    }



</style>
