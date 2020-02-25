<template>
    <div class="equipment-lsit">
        <div class="equipment-total">
            <ul>
                <li><p>已绑定设备</p>
                    <p>123213</p></li>
                <li><p>绑定设备申请</p>
                    <p>123213</p></li>
                <li><p>已发货设备</p>
                    <p>123213</p></li>
            </ul>
        </div>
        <div class="status-options">
            <ul>
                <li>已绑定设备</li>
                <li>待绑定设备</li>
                <li>解除绑定申请</li>
            </ul>
        </div>
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
                        <el-button @click="agentAdd" type="success" plain>新增</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="tableBox">
                <el-table
                        empty-text
                        v-loading="loading"
                        element-loading-text="数据正在加载中"
                        element-loading-spinner="el-icon-loading"
                        :headerRowStyle="{color:'#000000'}"
                        :data="tableData"
                        border
                        style="width: 100%;">
                    <el-table-column
                            align="center"
                            prop="agentId"
                            label="代理商号"
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
                            label="代理商等级">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="responsibleName"
                            label="联系人">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="responsibleName"
                            label="所属运营">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="agentScope"
                            label="代理区域">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="createTime"
                            label="创建时间">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="sellerCount"
                            label="商户数量">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            width="150"
                            label="状态">
                        <template slot-scope="scope">
                            <el-button
                                    type="text"
                                    @click="changeSonStatus(scope.row,scope.$index,0)">
                                <el-switch
                                        :active-value="1"
                                        :inactive-value="0"
                                        :value="scope.row.agentStatus"
                                        active-text="正常"
                                        inactive-text="停用">
                                </el-switch>
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            width="150"
                            label="子代功能">
                        <template slot-scope="scope">
                            <el-button
                                    type="text"
                                    @click="changeSonStatus(scope.row,scope.$index,1)">
                                <el-switch
                                        :active-value="1"
                                        :inactive-value="0"
                                        :value="scope.row.sonAgentStatus"
                                        active-text="正常"
                                        inactive-text="停用">
                                </el-switch>
                            </el-button>
                        </template>
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
        name: "EquipmentKList",
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
                listUrl: '/agentManage/getAgentList',   //表格数据接口
            }
        },
    }
</script>

<style scoped>
    .searchData{
        box-shadow: none; margin-bottom: 0; padding-top: 25px;
    }
    .status-options {
        width: 100%;
        background: #fff;
        margin: 25px 0;
        height: 60px;
        line-height: 60px;
        box-shadow: 0px 1px 6px 4px rgba(242, 242, 242, 1);
        border-radius: 8px;
    }

    .status-options ul {
        padding: 0 34px;
        box-sizing: border-box;
    }

    .status-options li {
        display: inline-block;
        margin-right: 100px;
        color: #000000
    }

</style>
