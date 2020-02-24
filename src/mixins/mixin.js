/*
*   全局获取table表格数据；
*   引入minxin需要定义
*   获取数据接口   listUrl；
*   搜索数据    searchData;
*/


import httpRequest from "../api/api";

export const myMixins = {
    data() {
        return {
            loading:false,
        }
    },

    mounted() {
        this.getTableData()
    },
    methods: {
        //点击搜索
        searchClick() {
            this.getTableData()
        },

        //获取表格数据
        getTableData() {
            this.loading = true
            httpRequest(this.listUrl, 'get', this.searchData)
                .then((res) => {
                    if (res.code == 200) {
                        this.total = res.data.total;
                        this.tableData = res.data.rows;
                    }
                    this.loading = false;
                })
        },
        //每页多少个获取数据
        handleSizeChange(e) {
            this.searchData.size = e;
            this.getTableData()
        },
        //数据页数
        handleCurrentChange(e) {
            this.searchData.page = e;
            this.getTableData()
        },
        //model框显示
        showModel() {
            this.dialogTableVisible = true;
        },

        //模态框关闭
        modalClose() {
            this.dialogTableVisible = false;
        },

        // 新增/修改 成功时，重载列表
        modalFormOk() {
            this.getTableData()
            this.modalClose()
        },


        //编辑
        headEdit(record) {
            this.dialogTableVisible = true;
            this.$nextTick(() => {
                this.$refs.modalForm.edit(record);
            })
        },
        //新增
        headAdd() {
            this.dialogTableVisible = true;
            // 要等dom节点渲染结束 在调方法。
            console.log(this)
            this.$nextTick(() => {
                this.$refs.modalForm.add();
            })

        },
        //删除单挑数据
        delData(id) {
            httpRequest(this.delUrl, 'post', {staffId: id})
                .then((res) => {
                    if (res.code == 200) {
                        this.getTableData()
                    }
                })
        },
        //错误信息
        errorMessages(data) {

            Message.error({
                type: 'error',
                message: data
            })
        }
    }
}



