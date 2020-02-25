<template>
    <div class="equipment-lsit">
        <div class="tableData">
            <div class="searchData">
                <el-form ref="form" :model="searchData" label-width="25px">
                    <el-form-item>
                        <el-select v-model="searchData.agentArea" placeholder="选择省">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="searchData.agentArea" placeholder="选择市">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="代理商名称/联系人/联系方式" v-model="searchData.queryCriteria"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="searchClick" type="primary" plain>搜索</el-button>
                        <el-button  type="success" plain>重置</el-button>
                        <el-button @click="searchClick" type="primary" plain>导出</el-button>
                        <el-button  type="success" plain>新增发货</el-button>
                        <el-button @click="searchClick" type="primary" plain>批量审核</el-button>

                    </el-form-item>
                </el-form>
            </div>
            <div class="tableBox">
                <el-table
                        empty-text
                        ref="multipleTable"

                        tooltip-effect="dark"
                        @selection-change="handleSelectionChange"
                        element-loading-text="数据正在加载中"
                        element-loading-spinner="el-icon-loading"
                        :headerRowStyle="{color:'#000000'}"
                        :data="tableData"
                        border
                        style="width: 100%;">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="agentId"
                            label="订单号"
                    >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="agentName"
                            label="代理商名称"
                    >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="address"
                            label="设备型号">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="responsibleName"
                            label="数量">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="responsibleName"
                            label="总价">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="agentScope"
                            label="收货人">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="createTime"
                            label="支付类型">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="sellerCount"
                            label="预存款可用余额">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="sellerCount"
                            label="已发货数量">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="sellerCount"
                            label="申请时间">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="sellerCount"
                            label="申请人">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="sellerCount"
                            label="订单状态">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button type="info" plain size="mini" @click="showModel(scope.row)">详情</el-button>
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
</template>

<script>
    import {myMixins} from "../../mixins/mixin";
    import httpRequest from "../../api/api";
    export default {
        name: "Unshipped",
        mixins: [myMixins],
        data() {
            return {
                searchData: {
                    agentArea: '', //代理区域
                    queryCriteria: '',  //查询条件
                    agent_pid: '',  //上级代理商id
                    size: 10,
                    page: 1
                },
                multipleSelection: [],
                total: 1,
                dialogTableVisible: false,
                tableData: [{}],
                listUrl: '/agentManage/getAgentList',   //表格数据接口
            }
        },
        methods:{
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        },
    }
</script>

<style scoped>
    .searchData{
        box-shadow: none; margin-bottom: 0; padding-top: 25px;
    }



</style>
