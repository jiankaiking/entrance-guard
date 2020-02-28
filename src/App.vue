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

<style>

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

  .el-container  .aside {
    min-height: 935px;
    height: auto;
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

  }
  .searchData .el-form-item {
    display: inline-block;
    margin-bottom: 0;
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
  .forget-from .el-input-group__append{
    padding: 0;
    background: #ffffff;
    border: none;
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

  .tableData .pagination {
    display: flex;
    justify-content: flex-end;
    padding-right: 30px;
  }


  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .userMessges-all  .el-input__inner {
    height: 30px;
  }

  .clear::after {
    clear: both;
    content: '';
    display: block;
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

  .el-pager {
    vertical-align: middle !important;
  }

  .el-pager li {
    height: 24px !important;
    min-width: 24px !important;
    line-height: 24px !important;;
    border-radius: 4px;
    border: 1px solid rgba(202, 202, 202, 1);
    color: #666666 !important;
    font-weight: normal;
    margin: 0 5px !important;;
  }
  .el-pager li.active {
    background: rgba(56, 184, 238, 1) !important;
    color: #ffffff !important;
  }

  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:auto;
  }
  .equipment-total ul {
    display: flex;
  }

  .equipment-total li {
    background: #ffffff;
    color: #000000;
    font-size: 20px;
    width: 225px;
    line-height: 30px;
    box-shadow: 0px 1px 6px 4px rgba(242, 242, 242, 1);
    border-radius: 8px;
    text-align: center;
    height: 131px;
    margin-right: 30px;
    padding: 28px 0;
    cursor: pointer;
    box-sizing: border-box;
    position: relative
  }

  .equipment-total p:first-child {
    font-size: 16px;

  }

  .equipment-total li::before {
    position: absolute;
    content: "";
    height: 3px;
    bottom: 0;
    left: 0;
    width: 100%;
    background: red;
  }
  .overspread-parent{
    position: relative;
  }
  .overspread-model {
    position: relative;
    background: #ffffff;
    width: 100%;
    z-index: 999;
    top: 0;
    left: 0;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 100% !important;
  }
  .overspread-model{
    box-shadow:0px 1px 6px 4px rgba(242,242,242,1);
    border-radius:8px; padding: 25px ; box-sizing: border-box;
  }
  .shipped-class .el-dialog__body{

    padding:0 0 25px 0 !important;
  }
  .title {
    position: relative;
    color: #000000;
    font-size: 18px;
    font-weight: bold;
    padding-left: 30px;
    margin-bottom: 25px;
  }
  .title::before {
    position: absolute;
    content: '';
    left: 0;
    top: 2px;
    width: 9px;
    height: 21px;
    background: linear-gradient(180deg, rgba(255, 42, 0, 1) 0%, rgba(237, 115, 70, 1) 100%);
    border-radius: 5px;
  }
</style>
