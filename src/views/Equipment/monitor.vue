<template>
    <div class="main-contenner clear">
        <div class="left-options">
            <div class="title">
                组织机构
            </div>
            <el-input class="treeKeyWords" placeholder="请输入" v-model="treeKeyWords">
                <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-tree
                    ref="treeRef"
                    :lazy="lazy"
                    :data="treeList"
                    node-key="id"
                    :load="loadTreeNode"
                    :props="{label:'treeName'}"
                    @node-click="menuNodeClick"
            >

            </el-tree>
        </div>
        <div class="right-table">
            <div class="tableData">
                <div class="tableBox flex-box">
                    <div class="monitor-item" v-for="item in tableData">
                        <span>设备名称：{{item.equipmentName}}</span>
                        <span>管理区域：{{item.areaName}}</span>
                        <span><i class="el-icon-warning"></i>呼叫物业</span>
                        <span><el-button type="success" @click="lookMonior">查看监控</el-button></span>
                    </div>
                </div>
                <div class="pagination">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :page-sizes="[6, 20, 50, 100]"
                            :page-size="searchData.size"
                            :total="total"
                            layout=" sizes, prev, pager, next, jumper"
                    >
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import httpRequest from "../../api/api";
    import {myMixins} from "../../mixins/mixin";

    export default {
        name: "monitor",
        mixins: [myMixins],
        data() {
            return {
                originData: [],
                searchData: {
                    currentPage: 1,
                    size: 6
                },
                total: 0,
                tableData: [],
                lazy: true,
                treeList: [],
                url: {
                    areaTree: '/property-manage/area/info/tree/area',
                    areaTreeInfo: '/property-manage/area/info/tree',
                },
                listUrl: '/property-manage/equipment/info/page',
                treeKeyWords: '', //机构搜索
            }
        },
        watch: {
            treeKeyWords(val) {
                this.$refs.tree.filter(val);
            }
        },
        mounted() {
            this.getOrganTree()
        },
        methods: {
            init() {
                let url = 'wss://finance.allhome.com.cn/scanCodeLogin'
                // 创建websocket连接
                this.websock = new WebSocket(url);
                // 监听打开
                this.websock.onopen = this.websockOpen;
                // 监听关闭
                this.websock.onclose = this.websockClose;
                //监听异常
                this.websock.onerror = this.websockError;
                //监听服务器发送的消息
                this.websock.onmessage = this.websockMessage;
            },
            websockOpen() {
                console.log('监听打开')
            },
            websockClose() {
                console.log('监听关闭')
            },
            websockError() {
                console.log('监听异常')
            },
            websockMessage(e) {
                console.log('监听服务器发送的消息', e.data)
            },
            start(){
                // 发送心跳
                clearInterval(this.timeoutObj)
                this.timeoutObj = setInterval(() => {
                    let date = new Date()
                    this.webSocket.send(`发送心跳给后端${date}`)
                }, 2 * 60 * 1000)
            },
            //机构搜索
            filterNode(value, data) {
                if (!value) return true;
                return data.organName.indexOf(value) !== -1;
            },
            //机构树形
            getOrganTree() {
                // console.log(123)
                httpRequest(this.url.areaTreeInfo, 'GET', {level: 0, pid: 0})
                    .then(res => {
                        this.treeList = res.data
                    })
            },
            menuNodeClick() {

            },
            lookMonior() {
                this.$message.info('待开发')
            },
            loadTreeNode(node, resolve) {
                let level = node.level;
                let pid = node.level == 2 ? node.data.pid : node.data.id;
                let url = node.data.type == 0 ? (level == 3 ? this.url.areaTree : this.url.areaTreeInfo) : this.url.areaTree;
                if (level == 0) {
                    pid = 0
                }
                httpRequest(url, 'GET', {pid: pid, level: level})
                    .then(res => {
                        if (resolve) {

                            resolve(res.data)
                        } else if (node) {
                            node.doCreateChildren(res.data)
                            this.$nextTick(() => {
                                // 设置当前选择的节点
                                this.$refs.tree.setCurrentKey(this.selectNodeData[this.nodeKey])
                                // 将当前选中节点展开
                                this.$refs.tree.store.nodesMap[this.selectNodeData[this.nodeKey]].expanded = true
                            })
                        } else if (!this.lazy) {
                            resolve(res.data)
                            this.treeList = res.data
                        }
                    })
            },
            // 树状图展开
            expandedStructure(data) {
                this.searchData.organId = data.organId
                this.getTableData()
            },
        }

    }
</script>

<style scoped>
    .monitor-item {
        padding: 36px;
        box-sizing: border-box;
        display: flex;
        margin: 7px 15px;
        align-items: center;
        justify-content: center;
        width: 274px;
        height: 270px;
        box-shadow: 0px 1px 6px 4px rgba(242, 242, 242, 1);
        border-radius: 8px;
        flex-direction: column;
    }

    .monitor-item span {
        margin-bottom: 15px;
    }

    .monitor-item span:nth-child(3) {
        color: #E40505;
        font-size: 18px;
        font-weight: bold;
    }

    .flex-box {
        display: flex;
        flex-wrap: wrap;
    }

    .left-options {
        float: left;
        margin-right: 25px;
        width: 22%;
        background: #ffffff;
        height: 100%;
        box-shadow: 0px 1px 6px 4px rgba(242, 242, 242, 1);
        border-radius: 8px;
        padding: 20px 33px;
        box-sizing: border-box;
    }

    .right-table {
        float: left;
        width: 75%;
    }

    .treeKeyWords {
        margin-bottom: 40px;
    }

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
