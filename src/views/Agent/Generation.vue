<template>
        <div class="tableData">
            <div class="tableBox">
                <el-table empty-text :headerRowStyle="{color:'#000000'}"
                          v-loading="loading" element-loading-text = "数据正在加载中"
                          element-loading-spinner = "el-icon-loading"
                        :data="tableData" border style="width:99.8%;">
                    <el-table-column align="center" prop="agentName" label="子代理名称"></el-table-column>
                    <el-table-column align="center" prop="agentLevel" label="代理商等级"></el-table-column>
                    <el-table-column align="center" prop="responsibleName" label="联系人"></el-table-column>
                    <el-table-column align="center" prop="regionName" label="代理区域"></el-table-column>
                    <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
                    <el-table-column align="center" prop="sellerCount" label="商户数量"></el-table-column>
                    <el-table-column align="center" prop="address" label="状态">
                        <template slot-scope="scope">
                            <el-button type="text">{{scope.row.sonAgentStatus == 1?'正常':'停用'}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="goInfo(scope.row)">详情</el-button>
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
</template>

<script>
    import {myMixins} from "../../mixins/mixin";

    export default {
        name: "generation",
        mixins:[myMixins],
        data() {
            return {
                searchData:{
                    page:1,
                    size:10
                },
                total:0,
                dialogTableVisible: false,
                listUrl:'/sellerManagement/agentManage/getAgentList?agentPid=' + this.$route.query.agentId,
                tableData: []
            }
        },
        mounted(){

        },
        methods: {

            goInfo(row){
                 this.$router.push({path: '/agentmessges', query: {type: 'details',pageType:'children', agentId: row.agentId}})
            },
        }

    }
</script>

<style scoped>

    .tableData {
        background: #ffffff;
        box-shadow: 0px 1px 6px 4px rgba(242, 242, 242, 1);
    }
    .tableData .tableBox {
        padding: 30px;
        box-sizing: border-box;

    }

    .tableData .pagination {
        padding-bottom: 30px;
    }
</style>
