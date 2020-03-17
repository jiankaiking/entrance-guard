<template>
    <div class="main-contenner">
        <div class="searchData">
            <el-form ref="form" :model="searchData" label-width="25px">
                <el-col :span="4">
                    <el-form-item>
                        <CitySelect @selectCode="selectCode" type="city"></CitySelect>
                    </el-form-item>
                </el-col>
                <el-form-item>
                    <el-input placeholder="代理商名称/联系人/联系方式" v-model="searchData.queryCriteria"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="searchClick" type="primary" plain>搜索</el-button>
                    <el-button @click="resetSearch"  plain>重置</el-button>
                    <el-button @click="agentAdd" type="success" plain>新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tableData">
            <div class="tableBox">
                <el-table empty-text v-loading = "loading" element-loading-text = "数据正在加载中"
                        element-loading-spinner = "el-icon-loading" :headerRowStyle="{color:'#000000'}"
                        :data="tableData" border style="width: 100%;">
                    <el-table-column align="center" prop="agentId" label="代理商号"></el-table-column>
                    <el-table-column align="center" prop="agentName" label="代理商名称"></el-table-column>
                    <el-table-column align="center" prop="address" label="代理商等级"></el-table-column>
                    <el-table-column align="center" prop="responsibleName" label="联系人"></el-table-column>
                    <el-table-column align="center" prop="responsibleName" label="所属运营"></el-table-column>
                    <el-table-column align="center" prop="agentScope" label="代理区域"></el-table-column>
                    <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
                    <el-table-column align="center" prop="sellerCount" label="商户数量"></el-table-column>
                    <el-table-column align="center" width="150" label="状态">
                        <template slot-scope="scope">
                            <el-button type="text" @click="changeSonStatus(scope.row,scope.$index,0)">
                                <el-switch :active-value="1" :inactive-value="0"
                                        :value="scope.row.agentStatus" active-text="正常" inactive-text="停用">
                                </el-switch>
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" width="150" label="子代功能">
                        <template slot-scope="scope">
                            <el-button type="text" @click="changeSonStatus(scope.row,scope.$index,1)">
                                <el-switch
                                        :active-value="1" :inactive-value="0" :value="scope.row.sonAgentStatus"
                                        active-text="正常" inactive-text="停用">
                                </el-switch>
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="showModel(scope.row)">详情</el-button>
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
                        layout=" sizes, prev, pager, next, jumper">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import {myMixins} from "../../mixins/mixin";
    import httpRequest from "../../api/api";
    import CitySelect from "../../components/select/CitySelect";
    export default {
        name: "agentlist",
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

                total: '',
                dialogTableVisible: false,
                tableData: [],
                listUrl: '/sellerManagement/agentManage/getAgentList',   //表格数据接口
            }
        },
        components:{
            CitySelect
        },
        mounted() {
        },
        methods: {

            selectCode(e){
                this.searchData.agentArea = e;
            },
          //改变代理商状态以及子代功能.  type 等于0 是代理商状态  1 是子代功能
            changeSonStatus(row, index, type) {
                let [url, data] = ['',  {agentId: row.agentId}];
                if (type == 0) {
                    url = '/sellerManagement/agentManage/offOrNoAgent'
                    data.agentStatus = row.agentStatus == 0?1:0
                } else {
                    url = '/sellerManagement/agentManage/offOrNoSonAgent'
                    data.sonAgentStatus = row.sonAgentStatus == 0?1:0
                }
                httpRequest(url, 'POST', data)
                    .then(res => {
                        if (res.success) {
                            //这里判断是不是代理商状态发生变化 发生变化则子代功能随着变化
                            this.getTableData()
                           // if(type == 1){
                           //     this.tableData[index].sonAgentStatus = data.sonAgentStatus
                           // }else{
                           //     this.tableData[index].agentStatus = data.agentStatus
                           //     this.tableData[index].sonAgentStatus = data.agentStatus
                           // }
                        }
                    })
            },

            //修改 详情 代理商
            showModel(row) {
                this.$router.push({path: '/agentmessges', query: {type: 'details', agentId: row.agentId}})
            },
            //新增代理商
            agentAdd() {
                this.$router.push({path: '/agentmessges', query: {type: 'add'}})
            },

        },

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
