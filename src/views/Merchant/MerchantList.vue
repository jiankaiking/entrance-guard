<template>
    <div class="equipment-lsit">
        <div class="searchData">
            <el-form ref="form" :model="searchData" label-width="25px">
                <el-form-item>
                    <el-input placeholder="代理商名称/联系人/联系方式" v-model="searchData.queryCriteria"></el-input>
                </el-form-item>
                <el-form-item style="vertical-align: top" label="开通时间" label-width="100px">
                    <el-col :span="10">
                        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
                                        style="width: 100%;" v-model="searchData.startTime"></el-date-picker>
                    </el-col>
                    <el-col :span="2" style="text-align: center">-</el-col>
                    <el-col :span="10">
                        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
                                        style="width: 100%;" v-model="searchData.endTime"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button @click="searchClick" type="primary" plain>搜索</el-button>
                    <el-button @click="resetSearch" plain>重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tableData">
            <div class="tableBox">
                <el-table empty-text v-loading="loading" element-loading-text="数据正在加载中"
                          element-loading-spinner="el-icon-loading"
                          :headerRowStyle="{color:'#000000'}"
                          :data="tableData" border style="width: 100%;">
                    <el-table-column type="index" align="center" width="80" label="序号"></el-table-column>
                    <el-table-column align="center" prop="mercNm" label="商户名称"></el-table-column>
                    <el-table-column align="center" prop="stoeCntNm" label="商户联系人"></el-table-column>
                    <el-table-column align="center" prop="mccNM" label="行业类目"></el-table-column>
                    <el-table-column align="center" prop="channel" label="当前通道"></el-table-column>
                    <el-table-column align="center" prop="area" label="所在区域"></el-table-column>
                    <el-table-column align="center" width="150" label="账号状态">
                        <template slot-scope="scope">
                            <el-button type="text" @click="changeSonStatus(scope.row)">
                                <el-switch
                                        :active-value="1"
                                        :inactive-value="0"
                                        :value="scope.row.status"
                                        active-text="正常"
                                        inactive-text="停用">
                                </el-switch>
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="mini" @click="goInfo(scope.row)">详情</el-button>
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
        name: "MerchantList",
        mixins: [myMixins],
        data() {
            return {
                searchData: {
                    queryCriteria: '',  //查询条件
                    startTime: '',
                    endTime: '',
                    size: 10,
                    page: 1
                },

                total: 0,
                dialogTableVisible: false,
                tableData: [{}],
                listUrl: '/sellerManagement/sellerMange/getSellerList',   //表格数据接口
            }
        },
        methods: {
            changeSonStatus(row) {
                httpRequest("/sellerManagement/sellerMange/offOrOnSeller", "POST", {
                    status: row.status == 1 ? 0 : 1, sellerId: row.sellerId
                }).then(res => {
                    if (res.success) {
                        this.getTableData()
                    }
                })
            },
            goInfo(row){
                this.$router.push({path:"/merchant/info",query:{id:row.sellerId}})
            },
        },
    }
</script>

<style scoped>


</style>
