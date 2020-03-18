<template>
    <div class="main-contenner">
        <div class="overspread-parent"  v-if="!dialogTableVisible">
            <div class="searchData">
                <el-form ref="form" :model="searchData" label-width="80px">
                    <el-form-item label="设备型号" style="width: 220px">
                        <el-input v-model="searchData.deviceTypeCode" placeholder="请输入设备型号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchClick" plain>搜索</el-button>
                        <el-button type="info" plain @click="resetSearch">重置</el-button>
                        <el-button type="success" @click="headAdd" plain>新增</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="tableData">
                <div class="tableBox">
                    <el-table :data="tableData" border empty-text style="width: 100%" v-loading="loading">
                        <el-table-column align="center" type="index" label="序号" width="100px">
                        </el-table-column>
                        <el-table-column prop="deviceTypeCode" label="设备型号" align="center"></el-table-column>
                        <el-table-column prop="factory" align="center" label="厂商"></el-table-column>
                        <el-table-column prop="ladderPrice" align="center" label="价格(元)"></el-table-column>
                        <el-table-column prop="shelvesStatusName" align="center" label="状态"></el-table-column>
                        <el-table-column align="center" prop="updateTime" label="操作时间"></el-table-column>
                        <el-table-column align="center" label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" @click="headEdit(scope.row.deviceTypeId)">详情</el-button>
                                <el-button type="text" @click="changeStatus(scope.row)">
                                    {{scope.row.shelvesStatus == 0?'上架':'下架'}}
                                </el-button>
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
        </div>
        <EquipmentAddModel ref="modalForm" v-if="dialogTableVisible" @ok="modalFormOk" @backrank="modalClose" class="overspread-model"></EquipmentAddModel>
    </div>
</template>

<script>
    import httpRequest from "../../api/api";
    import {myMixins} from "../../mixins/mixin";
    import EquipmentAddModel from "./moduleModel/EquipmentAddModel";

    export default {
        name: "EquipmentConfig",
        mixins: [myMixins],
        data() {
            return {
                //搜索数据
                searchData: {
                    deviceTypeCode: '',
                    page: 1,
                    size: 10
                },
                dialogTableVisible:false,
                value: '',
                total: 0,
                listUrl: '/managecenter/deviceManage/deviceType/selectList',
                tableData: []
            }
        },
        methods:{
            // showAdd(){
            //     this.dialogTableVisible = true
            // },
            changeStatus(row){
                httpRequest("/managecenter/deviceManage/deviceType/updateDeviceShelvesStatus","POST", {
                    deviceTypeId:row.deviceTypeId,
                    shelvesStatus:row.shelvesStatus == 0?1:0})
                    .then(res=>{
                        this.getTableData()
                    })
            },
        },
        components:{
            EquipmentAddModel
        }
    }
</script>

<style>

</style>
