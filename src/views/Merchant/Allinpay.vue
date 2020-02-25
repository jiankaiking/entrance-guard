<template>
    <el-form class="business-form allinpay" label-width="230px">
        <div class="top-select">
            <label style="margin-right: 15px;">进件通道</label>
            <el-select>
                <el-option>通道二-新大陆</el-option>
                <el-option>通道2新大陆</el-option>
                <el-option>通道3新大陆</el-option>
            </el-select>
        </div>
        <div class="title">主体信息</div>

        <el-row>
            <el-col :span="8">
                <el-form-item label="商户名称">
                    <el-radio-group>
                        <el-radio label="0">企业</el-radio>
                        <el-radio label="1">个体户</el-radio>
                        <el-radio label="2">个人</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="5">
                <div class="right-hint">
                    <i><img src="../../assets/images/tip.png" alt=""></i>
                    <div>
                        <p>请先选择商户的主体类型</p>
                    </div>
                </div>

            </el-col>
        </el-row>

        <el-row style="margin-bottom: 10px">
            <el-col :span="5">
                <div class="divider-text">法定代表人/个体户经营者证件</div>
            </el-col>
            <el-col :span="17">
                <div class="u-divider"></div>
            </el-col>
        </el-row>

        <el-form-item label="证件类型">
            <el-radio-group>
                <el-radio label="0">中国大陆居民--身份证</el-radio>
                <el-radio label="1">中国港澳居民--港澳通行证</el-radio>
                <el-radio label="2">中国台湾居民--台湾通行证</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-row>
            <el-col :span="8">
                <el-form-item label="身份证人像面照片">
                    <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="5">
                <div class="right-hint">
                    <i><img src="../../assets/images/tip.png" alt=""></i>
                    <div><p>请上传法人身份证/通行证</p>
                        <p>上传后，等待3秒，系统将自动识别出相关字段，请注意核对！</p>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="身份证人像面照片">
                    <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item label="证件号码">
            <el-input style="width: 550px"/>
        </el-form-item>
        <el-form-item label="证件持有人姓名">
            <el-input style="width: 550px"/>
        </el-form-item>

        <el-row>
            <el-col :span="8">
                <el-form-item label="证件有效期">
                    <el-input/>
                </el-form-item>
            </el-col>
            <el-col :span="1" :offset="1">
                <el-form-item label-width="0">
                    <el-checkbox>长期</el-checkbox>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row style="margin-bottom: 10px">
            <el-col :span="3">
                <div class="divider-text">结算账户</div>
            </el-col>
            <el-col :span="20">
                <div class="u-divider"></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="商户名称">
                    <el-radio-group>
                        <el-radio label="0">企业</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="5">
                <div class="right-hint">
                    <i><img src="../../assets/images/tip.png" alt=""></i>
                    <div><p>你选择的是个人对私账户，请务必填写开户名为法人的银行账户</p>

                    </div>
                </div>

            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="身份证人像面照片">
                    <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="5">
                <div class="right-hint">
                    <i><img src="../../assets/images/tip.png" alt=""></i>
                    <div><p>请填写对应的银行卡持有人姓名</p></div>
                </div>
            </el-col>
        </el-row>
        <el-form-item label="开户名称">
            <el-input style="width: 550px"/>
        </el-form-item>
        <el-form-item label="卡折类型">
            <el-radio-group>
                <el-radio label="0">借记卡</el-radio>
                <el-radio label="1">存折</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="开户银行">
            <el-select>
                <el-option>通道二-新大陆</el-option>
                <el-option>通道2新大陆</el-option>
                <el-option>通道3新大陆</el-option>
            </el-select>
        </el-form-item>
        <el-row>
            <el-col :span="12">
                <el-form-item label="开户支行">
                    <el-col :span="7">
                        <el-select>
                            <el-option>通道二-新大陆</el-option>
                            <el-option>通道2新大陆</el-option>
                            <el-option>通道3新大陆</el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="7" offset="1">
                        <el-select>
                            <el-option>通道二-新大陆</el-option>
                            <el-option>通道2新大陆</el-option>
                            <el-option>通道3新大陆</el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="8" offset="1">
                        <el-select>
                            <el-option>通道二-新大陆</el-option>
                            <el-option>通道2新大陆</el-option>
                            <el-option>通道3新大陆</el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
                <div class="right-hint">
                    <i><img src="../../assets/images/tip.png" alt=""></i>
                    <div><p>请上传银行卡照，需端正清晰</p>
                        <p>上传后，等待3秒，系统将自动识别出相关字段，请注意核对！</p></div>
                </div>
            </el-col>
        </el-row>
        <el-form-item label="支行行号">
            <el-input style="width: 550px"/>
        </el-form-item>
        <el-form-item label="银行卡照">
            <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
        </el-form-item>
        <el-form-item label="银行账号">
            <el-input style="width: 550px"/>
        </el-form-item>
        <div class="title">经营信息</div>
        <el-form-item label="商户名称">
            <el-input style="width: 550px"/>
        </el-form-item>
        <el-form-item label="商户简称">
            <el-input style="width: 550px"/>
        </el-form-item>
        <el-form-item label="开户支行">
            <el-col :span="3">
                <el-select>
                    <el-option>通道二-新大陆</el-option>
                    <el-option>通道2新大陆</el-option>
                    <el-option>通道3新大陆</el-option>
                </el-select>
            </el-col>
            <el-col :span="3" offset="1">
                <el-select>
                    <el-option>通道二-新大陆</el-option>
                    <el-option>通道2新大陆</el-option>
                    <el-option>通道3新大陆</el-option>
                </el-select>
            </el-col>
        </el-form-item>
        <el-form-item label="详细地址">
            <el-input style="width: 550px"/>
        </el-form-item>
        <el-form-item label="客服电话">
            <el-input style="width: 550px"/>
        </el-form-item>
        <el-form-item label="所属行业">
            <el-col :span="5">
                <el-select>
                    <el-option>通道二-新大陆</el-option>
                    <el-option>通道2新大陆</el-option>
                    <el-option>通道3新大陆</el-option>
                </el-select>
            </el-col>
        </el-form-item>
        <el-form-item label="注册资本">
            <el-col :span="5">
                <el-select>
                    <el-option>通道二-新大陆</el-option>
                    <el-option>通道2新大陆</el-option>
                    <el-option>通道3新大陆</el-option>
                </el-select>
            </el-col>
        </el-form-item>
        <el-form-item label="员工人数">
            <el-col :span="5">
                <el-select>
                    <el-option>通道二-新大陆</el-option>
                    <el-option>通道2新大陆</el-option>
                    <el-option>通道3新大陆</el-option>
                </el-select>
            </el-col>
        </el-form-item>
        <el-form-item label="经营区域">
            <el-col :span="5">
                <el-select>
                    <el-option>通道二-新大陆</el-option>
                    <el-option>通道2新大陆</el-option>
                    <el-option>通道3新大陆</el-option>
                </el-select>
            </el-col>
        </el-form-item>
        <el-form-item label="经营地段">
            <el-col :span="5">
                <el-select>
                    <el-option>通道二-新大陆</el-option>
                    <el-option>通道2新大陆</el-option>
                    <el-option>通道3新大陆</el-option>
                </el-select>
            </el-col>
        </el-form-item>
        <el-form-item label="法人姓名">
            <el-col :span="4">
                <el-input></el-input>
            </el-col>
            <el-col :span="3" :offset="1">
                <el-input></el-input>
            </el-col>
        </el-form-item>
        <div class="title">平台信息</div>
        <el-form-item label="登录账号">
            <el-input style="width: 550px"/>
        </el-form-item>
        <el-form-item label="所属员工">
            <el-input style="width: 550px"/>
        </el-form-item>
        <div class="title">附件照片</div>
        <el-form-item label="银行卡照">
            <el-row>
                <el-col :span="3">
                    <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon1"></i>
                    </el-upload>
                </el-col>
                <el-col :span="3">
                    <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-col>
                <el-col :span="3">
                    <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar1">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-col>
                <el-col :span="3">
                    <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-col>
            </el-row>
        </el-form-item>
        <div class="title">广告服务条款</div>
        <el-form-item label-width="50px">
            <el-checkbox v-model="checked">我已阅读同意</el-checkbox>
            <span style="color: #38B8EE">《脸云广告-广告主合作协议》</span>
        </el-form-item>
        <el-form-item>
            <div style="margin: 0 auto; width: 300px;">
                <el-button>取消</el-button>
                <el-button>提交审核</el-button>
            </div>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "Allinpay"
    }
</script>

<style scoped>
.avatar-uploader-icon1{
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 95px;
    line-height: 95px;
    text-align: center;
}
.avatar1{
    display: block; width: 150px; height: 95px;
}
.avatar{
    display: block; width: 150px; height: 85px;
}
    .avatar-uploader-icon {

        font-size: 28px;
        color: #8c939d;
        width: 150px;
        height: 85px;
        line-height: 85px;
        text-align: center;
    }

    p {
        font-size: 14px;
        color: #333333;
        margin-top: 7px
    }

    .right-hint {
        display: flex;
        justify-content: flex-start;
    }

    .right-hint p:nth-child(2) {
        color: #FD3106;
    }

    .right-hint img {
        width: 21px;
        height: 21px;
        margin-top: 7px;
        margin-right: 8px;
    }

    .top-select {
        color: #666666;
        margin-bottom: 30px;
    }

    .business-form {
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 1px 6px 4px rgba(242, 242, 242, 1);
        border-radius: 8px;
        padding: 25px;
        box-sizing: border-box;
    }

    .u-divider {
        position: relative;

    }

    .divider-text {
        color: #999999;
        padding-left: 75px;
        font-size: 14px;
    }

    .u-divider::after {
        position: absolute;
        top: 8px;
        left: 0;
        content: "";
        height: 1px;
        background: #DCDFE6;
        width: 100%;
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
