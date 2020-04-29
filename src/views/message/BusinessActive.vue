<template>
    <div class="main-contenner">
        <div class="searchData">
            <el-form ref="form" :model="searchData" label-width="100px">
                <el-form-item label="活动主题">
                    <el-input v-model="searchData.subject "></el-input>
                </el-form-item>
                <el-form-item style="vertical-align: top" label="活动时间" label-width="90px">
                    <el-col :span="10">
                        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
                                        style="width: 100%;" v-model="searchData.activityStartTime"></el-date-picker>
                    </el-col>
                    <el-col :span="2" style="text-align: center">至</el-col>
                    <el-col :span="10">
                        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
                                        style="width: 100%;" v-model="searchData.activityEndTime"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="类型" label-width="40px">
                    <CommonSelect :value.sync="searchData.newsType" type="news_merch_activity_type"></CommonSelect>
                </el-form-item>
                <el-form-item label="状态" label-width="50px">
                    <el-select v-model="searchData.status">
                        <el-option :value="1" label="未开始"></el-option>
                        <el-option :value="2" label="活动中"></el-option>
                        <el-option :value="3" label="已结束"></el-option>
                    </el-select>
                </el-form-item>

                <el-button style="margin-left: 15px;" @click="searchClick" type="primary" plain>搜索</el-button>
                <el-button @click="searchReset" plain>重置</el-button>
                <el-button type="success" plain @click="headAdd(2)">新增</el-button>

            </el-form>
        </div>
        <div class="tableData">
            <div class="tableBox">
                <el-table empty-text v-loading="loading"
                          element-loading-text="数据正在加载中" element-loading-spinner="el-icon-loading"
                          :headerRowStyle="{color:'#000000'}" :data="tableData"
                          border style="width: 99%;">
                    <el-table-column align="center" prop="subject" label="活动主题"></el-table-column>
                    <el-table-column align="center" prop="createTime" label="发布时间"></el-table-column>
                    <el-table-column align="center" prop="newsType" label="活动类型"></el-table-column>
                    <el-table-column align="center" label="活动时间">
                        <template slot-scope="scope">
                            <span>{{scope.row.startTime + '至' + scope.row.endTime}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="活动状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status == 1">未开始</span>
                            <span v-if="scope.row.status == 2">活动中</span>
                            <span v-if="scope.row.status == 3">已结束</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="headEdit(scope.row)">详情</el-button>
                            <el-popconfirm title="确定删除这条数据吗？" @onConfirm="headDelete(scope.row)">
                                <el-button slot="reference" type="text">删除</el-button>
                            </el-popconfirm>
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
        <el-dialog :lock-scroll="false" title="活动详情" center width="50%" :visible.sync="dialogTableVisible">
            <ActiveModel ref="modalForm" @close="modalClose" @ok="modalFormOk"></ActiveModel>
        </el-dialog>
    </div>
</template>

<script>
    import {myMixins} from "../../mixins/mixin";
    import httpRequest from "../../api/api";
    import ActiveModel from "./moduleModel/ActiveModel";
    import CommonSelect from "../../components/select/CommonSelect";

    export default {
        name: "agentchildlist",
        mixins: [myMixins],
        data() {
            return {
                searchData: {
                    activityStartTime: '', // 活动开始时间
                    activityEndTime: '', // 活动结束时间
                    subject: '', //主题
                    newsModule: '2', //消息所属模块 1 公告 2 商户活动 3 代理商活动
                    status: '', //活动状态
                    newsType: '',//消息类型
                    size: 10,
                    currentPage: 1
                },
                total: 0,
                dialogTableVisible: false,
                tableData: [],
                listUrl: '/managecenter/ad/news/center/list',   //表格数据接口
            }
        },
        components: {
            ActiveModel,
            CommonSelect
        },
        methods: {

            headAdd(type) {
                this.$router.push({path: '/activeadd', query: {type: type}})
            },
            headDelete(row) {
                httpRequest("/managecenter/ad/news/center/update", "POST", {id: row.id})
                    .then(res => {
                        this.$message.success(res.msg)
                        this.getTableData()
                    })
            },
            searchReset() {
                this.searchData.subject = '';
                this.searchData.activityEndTime = '';
                this.searchData.activityStartTime = '';
                this.searchData.status = '';
                this.searchData.newsType = '';
                this.getTableData()
            },
        },

    }
</script>

<style scoped>
</style>
