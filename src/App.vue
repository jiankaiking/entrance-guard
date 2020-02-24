<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
  export default {
    name: 'app'
  };
</script>

<style lang="scss">

  .el-select{
    width: 100% ;
  }


  .el-select-dropdown__item {
    padding: 0 20px;
  }

  .el-dropdown-menu__item {
    padding: 5px 15px;
  }


  body, html, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, form, fieldset, input, textarea, p, blockquote, th, td {
    margin: 0;
    padding: 0;
  }
  body {
    background: #ffffff;
  }
  body, html,#app {

    width: 100%;
    height: auto;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  fieldset, img {
    border: 0;
  }

  .el-container {
    height: auto !important;
  }

  .el-container {
    .aside {
      min-height: 935px;
      height: auto;
    }
  }

  address, caption, cite, code, dfn, em, strong, th, var {
    font-style: normal;
    font-weight: normal;
  }

  .searchData {
    background: #ffffff;
    box-shadow: 0px 1px 6px 4px rgba(242, 242, 242, 1);
    border-radius: 8px;
    margin-bottom: 25px;
    padding-top: 12px;


    .el-form-item {
      display: inline-block;
      margin-bottom: 0;
    }
  }

  .el-form-item {
    padding-bottom: 15px;

  }

  ol, ul {
    list-style: none;
  }

  caption, th {
    text-align: left;
  }

  h1, h2, h3, h4, h5, h6 {
    font-size: 100%;
    font-weight: normal;
  }
  .forget-from{
    .el-input-group__append{
      padding: 0;
      background: #ffffff;
      border: none;
    }
  }

  .userMessges .el-form-item {
    margin-top: 15px;
  }

  .userMessges-all .el-form-item__label {
    text-align: left;
  }

  .aside {
    background: #fff;
    height: 100%;
    box-shadow: 0px 2px 10px 8px rgba(234, 234, 234, 0.5);
  }

  .avatar-uploader .el-upload, .avatar-uploader1 {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .tableData {
    .pagination {
      display: flex;
      justify-content: flex-end;
      padding-right: 30px;
    }
  }


  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .userMessges-all {
    .el-input__inner {
      height: 30px;
    }
  }

  .clear::after {
    clear: both;
    content: '';
    display: block;
  }

  .tableData {
    background: #ffffff;
    box-shadow: 0px 1px 6px 4px rgba(242, 242, 242, 1);

    .tableBox {
      padding: 30px;
      box-sizing: border-box;

    }

    .pagination {
      padding-bottom: 30px;
    }
  }

  .el-pager {
    vertical-align: middle !important;
  }

  .el-pager li {
    height: 24px !important;
    min-width: 24px !important;
    line-height: 24px;
    border-radius: 4px;
    border: 1px solid rgba(202, 202, 202, 1);
    color: #666666 !important;
    font-weight: normal;
    margin: 0 5px;

    &.active {
      background: rgba(56, 184, 238, 1) !important;
      color: #ffffff !important;
    }
  }

  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:auto;
  }

</style>
