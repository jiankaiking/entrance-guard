<template>
    <div class="main-contenner">
        <div class="searchData">
            <el-form ref="form" :model="searchData" label-width="80px">
                <el-form-item label="查询" style="width: 220px">
                    <el-input v-model="searchData.name" placeholder="请输入商家/门店/代理商名称"></el-input>
                </el-form-item>
                <el-form-item label-width="20px">
                    <el-input v-model="searchData.deviceNo" placeholder="请输入设备号"></el-input>
                </el-form-item>
                <el-form-item label="绑定日期">
                    <el-date-picker
                            v-model="searchData.searchTime"
                            type="daterange"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['00:00:00', '23:59:59']">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain @click="searchClick" >搜索</el-button>
                    <el-button type="warning" plain>导入设备号</el-button>
                    <el-button type="success" plain @click="headAdd">绑定</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tableData">
            <div class="tableBox">
                <el-table :data="tableData" border empty-text style="width: 100%">
                    <el-table-column align="center" prop="loginUserName"  label="序号"></el-table-column>
                    <el-table-column align="center" prop="sellerName" label="商家"></el-table-column>
                    <el-table-column align="center" prop="storeName"  label="门店"></el-table-column>
                    <el-table-column align="center" prop="deviceNo" label="设备号"></el-table-column>
                    <el-table-column align="center" prop="operResult" label="所属代理商"></el-table-column>
                    <el-table-column align="center" prop="isBind" label="状态"></el-table-column>
                    <el-table-column align="center" prop="bindTime" label="绑定日期"></el-table-column>
                    <el-table-column align="center" prop="bindUserName" label="操作人"></el-table-column>
                    <el-table-column align="center" prop="totalMoney" label="累计交易金额"></el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="headEdit">解绑</el-button>
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
        <el-dialog align="center" width="500px" :visible.sync="dialogTableVisible" :lock-scroll="false">
            <CashierBindModel></CashierBindModel>
        </el-dialog>
    </div>
</template>

<script>
    import httpRequest from "../../api/api";
    import CashierBindModel from "./moduleModel/CashierBindModel";
    import {myMixins} from "../../mixins/mixin";

    export default {
        name: "CashierBind",
        mixins: [myMixins],
        data() {
            return {
                //搜索数据
                searchData: {
                    name: '', //代理商、商户、门店
                    deviceNo: '', //设备号
                    searchTime:'',//时间
                    page: 1,
                    size: 10
                },
                dialogTableVisible: false,
                value: '',
                total: 0,
                listUrl: '/managecenter/deviceManage/deviceYrBind/cashierList',
                tableData: [{}]
            }
        },
        components: {
            CashierBindModel
        },
        methods: {
            //页面进来显示提示信息
            showTip() {
                const h = this.$createElement;
                this.$msgbox({
                    title: '消息',
                    message: h('div', {style: 'text-align:left'}, [
                        h('h2', {style: 'font-weight:bold;font-size:14px'}, '收银插件下放绑定'),
                        h('p', null, '•新增字段“绑定时间”、“操作人”、“累计交易总额”'),
                        h('p', null, '•添加设备号导入功能：新增模板文件下载，未绑定数展示'),
                        h('p', null, '•导入时只导入新的设备号，过滤掉已经存在的'),
                        h('p', null, '•导入结果展示：成功数、失败数、未绑定数'),
                        h('p', null, '•绑定插件激活码自动从数据库中获取未绑定的，如果未绑定数量为零，点击“绑定”提示：未绑定设备号数量为0，请先导入设备号'),
                        h('p', null, '•提交绑定成功要求“设备号、商家、门店、收银员”不能为空，否则提交不了'),
                        h('p', null, '•“累计交易总额”统计从“绑定日期”开始至昨日，该门店下的设备号产生的订单累计金额，一天一更新，遇到退款时，更新时调整统计结果'),
                        h('p', null, '•解绑时清空该设备的累计交易金额'),
                    ]),
                    center: true,
                    confirmButtonText: '确定',
                    beforeClose: (action, instance, done) => {
                        done();
                    }
                })
            }
        },
        mounted() {
            // this.showTip()
        }
    }
</script>

<style>

</style>
