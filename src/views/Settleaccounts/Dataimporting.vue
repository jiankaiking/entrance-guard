<script src="../../store/state.js"></script>
<template>
    <div class="main-contenner">
        <div class="searchData">
            <el-form ref="form" :model="searchData" label-width="50px">
                <el-form-item label="日期">
                    <el-date-picker
                            v-model="searchData.month"
                            type="month"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="searchData.type" placeholder="请选择">
                        <el-option label="设备补贴" value="1"></el-option>
                        <el-option label="支付宝直连分润" value="2"></el-option>
                        <el-option label="微信直连分润" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="searchClick" type="primary" plain>搜索</el-button>
                    <el-button @click="resetSearch" plain>重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="tableData">
            <div class="tableBox">
                <el-table empty-text  :headerRowStyle="{color:'#000000'}" :data="tableData"
                          border style="width: 100%;">
                    <el-table-column align="center" type="index" width="80" label="序号"></el-table-column>
                    <el-table-column align="center" prop="createTime" label="导入时间"></el-table-column>
                    <el-table-column align="center" prop="month" label="月份"></el-table-column>
                    <el-table-column align="center" label="类型">
                        <template slot-scope="scope">
                             <span>{{scope.row.type == 1?'设备补贴':'直连分润'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="filePath" label="导入数据"></el-table-column>
                    <el-table-column align="center" label="操作">
                        <template>
                            <el-button type="text" @click="showModel">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <div class="template">
                    <div class="template-button">
                        <el-row>
                            <el-col :span="6">
                                <el-button type="primary" plain @click="downloadTemplate">模版下载</el-button>
                            </el-col>
                            <el-col :span="6">
                                <el-upload
                                        ref="upload"
                                        :headers="headers"
                                        :on-success="upSuccess"
                                        accept=".xlsx"
                                        action="/api/managecenter/center/settlement/manage/import/excel/data"
                                        :with-credentials="true"
                                        :data="getUploadList"
                                >
                                    <el-button type="success" plain>导入设备补贴</el-button>
                                </el-upload>
                            </el-col>
                            <el-col :span="6">
                                <el-upload
                                        ref="upload"
                                        :headers="headers"
                                        :on-success="upSuccess"
                                        accept=".xlsx"
                                        action="/api/managecenter/center/settlement/manage/import/excel/data"
                                        :with-credentials="true"
                                        :data="getUploadList1"
                                >
                                    <el-button type="success" plain>导入直连分润</el-button>
                                </el-upload>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="temp-messges">
                        <p>设备补贴导入 : 设备的补贴需从支付宝或微信后台下载，下载整理后导入运营后台，代理商即可看到其相应的补贴收益 </p>
                        <p>直接分润导入 : 每月1号-28号导入上月佣金，若超过时间则上月佣金停止导入，每月的佣金在支付宝或微信中仅能导入一次</p>
                    </div>
                </div>
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
        <el-dialog :lock-scroll="false" title="提示" width="40%" align="center" :visible.sync="dialogTableVisible"
        >
            <CommissionModel></CommissionModel>
        </el-dialog>
    </div>
</template>
<script>
    import {myMixins} from "../../mixins/mixin";
    import exportExcel from "../../mixins/exportExcel";
    import axios from 'axios'
    import httpRequest from "../../api/api";
    import BASE_URL from '../../api/config'

    export default {
        name: "Dataimporting",
        mixins: [myMixins],
        data() {
            return {
                searchData: {
                    currentPage: 1,
                    size: 10,
                    month: '',
                    type: '',
                },
                headers: {
                    processData: false, //因为data值是FormData对象，不需要对数据做处理。
                    contentType: false,
                    Authorization: this.$store.state.token
                },
                total: 0,
                listUrl: '/managecenter/center/settlement/manage/export/data/query/page',
                getUploadList: {type: 1},
                getUploadList1: {type: 2},
                dialogTableVisible: false,
                tableData: []
            }
        },
        components: {},
        methods: {
            downloadTemplate() {
                 exportExcel("GET","/api/managecenter/center/settlement/manage/export/excel/template",this.$store.state.token,{})
            },
            upSuccess(response, file, fileList) {
                if (response.success) {
                    this.getTableData()
                    this.$message.success(response.msg)
                } else {
                    this.$message.error(response.msg)
                }
            },
            showModel() {

            },
        }

    }
</script>


<style scoped>

    .tableData {
        background: #ffffff;
        box-shadow: 0px 1px 6px 4px #f2f2f2;
    }

    .tableData .tableBox {
        padding: 30px;
        box-sizing: border-box;
    }

    .tableData .pagination {
        padding-bottom: 30px;
        display: flex;
        justify-content: space-between;
        padding-left: 30px;
        align-items: center;
    }

    .tableData .pagination p {
        color: #666666;
        font-size: 12px;
    }

    .tableData .pagination .template-button {
        margin-bottom: 20px;
    }


</style>

