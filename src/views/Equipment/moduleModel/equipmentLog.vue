<template>
  <el-dialog title="设备日志 " :visible.sync="centerDialogVisible" width="45%" center>
    <div class="log-box">
      <div class="log-header">
        <span>设备sn码：12334948484833</span>
        <span>创建时间：2020-02-02  12:22:22</span>
      </div>
      <div class="log-table">
        <div class="log-content">
          <div class="log-item">
            <p>设备关闭</p>
            <p>关闭时间：2020-02-02  12:22:22</p>
          </div>
          <div class="log-item">
            <p>设备异常</p>
            <p>
              <span>关闭时间：2020-02-02  12:22:22</span>
              <span>关闭时间：2020-02-02  12:22:22</span>
              <span>关闭时间：2020-02-02  12:22:22</span>
              <span>关闭时间：2020-02-02  12:22:22</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>

export default {
  data() {
    return {
      centerDialogVisible: false

    }
  },
  mounted() {

  },
  methods: {
    info() {
      this.centerDialogVisible = true
    }

  }

}
</script>

<style scoped>
  .log-table{
      height: 502px; overflow-y: scroll;
  }
  .log-header{
      display: flex; justify-content: space-between; margin-bottom: 15px;
  }
  .log-item p{
      padding: 0 15px; box-sizing: border-box;
  }
  .log-box{
      padding: 0 30px; box-sizing: border-box;
  }
  .log-content{
      border:1px solid rgba(202,202,202,1); margin: 15px 0; height: 500px; box-sizing: border-box;
  }
  .log-item p{
      line-height: 36px; font-size: 14px;
  }
    .log-item p:last-child{
        background-color: #CACACA;
        display: flex; justify-content: flex-start; flex-wrap: wrap;
    }
  .log-item p:last-child span{
      width: 50%;
  }
  .log-item p:first-child{
      background-color: #F6F6F6;
  }
</style>
