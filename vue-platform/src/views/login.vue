<template>
    <div class="Login_main_wrap">
        <div class="Login_container_wrap">
            <div class="Login_logo_wrap"></div>
            <div class="Login_page_wrap">

                <div class="Login_img_wrap">
                    <!-- 登录页面图片区域 -->
                    <p class="login_welcome_txt01">欢迎登录</p>
                </div>

                <div class="Login_box_wrap"
                v-loading="fullscreenAllLoading"
                element-loading-text="登录中..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(255, 255, 255, 0)">
                    <h1 class="changeStyle">
                        <span class="code_login" @click="changeStatus" :style="status ? '' : 'color:#1270d2'">账号登录</span>
                        <el-divider direction="vertical"></el-divider>
                        <span class="quick_login" @click="changeStatus" :style="status ? 'color:#1270d2' : ''">快捷登录</span>
                    </h1>
                    <template >
                        <el-form :model="codeForm" :rules="rules" ref="codeForm" label-width="0" class="code_form" v-show="!status">
                            <el-form-item label="" prop="j_username">
                                <el-input v-model="codeForm.j_username" placeholder="请输入用户名" @keyup.enter.native="submitCodeForm('codeForm')"></el-input>
                            </el-form-item>
                            <el-form-item label="" prop="j_password">
                                <el-input  type="password" v-model="codeForm.j_password" placeholder="请输入密码" @keyup.enter.native="submitCodeForm('codeForm')"></el-input>
                            </el-form-item>
                            <el-form-item label="" prop="j_check_code">
                                <el-input v-model="codeForm.j_check_code" placeholder="请输入验证码" class="checkCode_input" @keyup.enter.native="submitCodeForm('codeForm')"></el-input>
                                <p class="checkcode_img_wrap">
                                    <img :src="this.axios.defaults.baseURL+'captcha/CapthcaImage'" alt="" @click="changeCode" title="点击，更换验证码">
                                </p>
                            </el-form-item>
                            <el-form-item class="login_btn_wrap">
                                <el-button type="primary" @click="submitCodeForm('codeForm')">登录</el-button>
                            </el-form-item>
                        </el-form>
                    </template>
                    <template>
                        <el-form :model="quickForm" :rules="rules2" ref="quickForm" label-width="0" class="code_form quick_form" v-show="status">
                            <el-form-item label="" prop="j_username">
                                <el-input v-model="quickForm.j_username" placeholder="请输入手机号" @keyup.enter.native="submitQuickForm('quickForm')"></el-input>
                            </el-form-item>
                           <el-form-item label="" prop="j_check_code">
                                <el-input v-model="quickForm.j_check_code" placeholder="请输入验证码" class="checkCode_input" @keyup.enter.native="submitCodeForm('codeForm')"></el-input>
                                <p class="checkcode_img_wrap">
                                    <img :src="this.axios.defaults.baseURL+'captcha/CapthcaImage'" alt="" @click="changeCode" title="点击，更换验证码">
                                </p>
                            </el-form-item>
                            <el-form-item label="" prop="j_sms_code">
                                <el-input v-model="quickForm.j_sms_code" placeholder="请输入短信验证码" style="width: 60%;" class="checkCode_input" @keyup.enter.native="submitQuickForm('quickForm')"></el-input>
                                <p class="msg_checkcode">
                                    <el-button type="primary" plain @click="getCheckCode()" :disabled="isCanCode ? false : true">{{getCodeMsg}}</el-button>
                                </p>
                            </el-form-item>
                            <el-form-item class="login_btn_wrap">
                                <el-button type="primary" @click="submitQuickForm('quickForm')">登录</el-button>
                            </el-form-item>
                        </el-form>
                    </template>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import checkTool from '@/utils/check'
import {sessionStorage} from '@/utils/storage'
import { getRemoteForm} from "@/api.js"
import qs from 'qs';
export default {
    name:'Login',
    data(){
        var checkUsername  = (rule, value, callback) => {
            if(!checkTool.p_regUsename.test(value)){
               callback(new Error('用户名支持6-16位大小写英文数字'));
            }else{
                callback();
            }
        };
        var checkPwd  = (rule, value, callback) => {
            if(!checkTool.p_regPwd.test(value)){
               callback(new Error('密码支持8位大小写英文数字'));
            }else{
                callback();
            }
        };
        
        var checkphonenum  = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入手机号'));
            } else if(!checkTool.regPhonNum.test(value)){
               callback(new Error('请正确输入手机号码'));
            }else{
                callback();
            }
        };
        return{
            fullscreenAllLoading:false,
            status:false,//默认账号密码登录
            isCanCode:true,//默认可获得
            getCodeMsg:"获取验证码",
            codeTime:60,//60秒一分钟
            codeForm:{
                j_username:"",
                j_password:"",
                j_check_code:""
            },
            quickForm:{
                j_username:"",
                j_sms_code:"",
                j_check_code:"",//短信验证码
                j_from:"SMS"
            },
            rules: {
                j_username: [
                    { required: true, trigger: 'blur',validator: checkUsername },
                ],
                j_password: [
                    { required: true,  trigger: 'blur',validator: checkPwd}
                ],
                j_check_code: [
                    {required: true, message: '请输入验证码', trigger: 'blur' },
                    // { min: 4, max: 4, message: '4位验证码', trigger: 'blur' }
                ],
            },
            rules2: {
                j_check_code: [
                    {required: true, message: '请输入验证码', trigger: 'blur' },
                    // { min: 4, max: 4, message: '4位验证码', trigger: 'blur' }
                ],
                j_sms_code: [
                    { required: true, message: '请输入短信验证码', trigger: 'blur'},
                    // { min: 4, max: 6, message: '长度在 4 到 6 个字符', trigger: 'blur' }
                ],
                j_username:[
                    { required: true,  trigger: 'blur',validator: checkphonenum}
                ]
            },
        }
    },
    created() {
        document.title = this.$route.meta.title;
        this.changeCode();
    },
    mounted() {
        
    },
    methods: {
        changeStatus(){
            this.changeCode();
            this.status = !this.status;
            var formName = this.status ? 'codeForm' : 'quickForm';
            this.$refs[formName].resetFields();
        },
        changeCode(event){
            $('.checkcode_img_wrap img').attr("src",this.axios.defaults.baseURL+"captcha/CapthcaImage?"+new Date().getTime())
        },
        // submitCodeForm用户名密码登录
        submitCodeForm(formName){
            let _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    _this.loginIn(this.codeForm);
                } else {
                    // _this.$message({
                    //     showClose: true,
                    //     type: 'error',
                    //     message: '请正确输入相关登录信息！'
                    // });
                    return false;
                }
            });
        },
        // 快捷登录
        submitQuickForm(formName){
            let _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    _this.loginIn(this.quickForm);
                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
        // 登录
        loginIn(data){
            // console.log('===========登录数据================',data)
            let _this = this;
            _this.fullscreenAllLoading = true;
            _this.axios({
                method:"post",
                url: '/j_spring_security_check',
                data:qs.stringify(data),
                headers:{
                    _api_name:'',
                    _api_version:"1.0.0",
                    "Content-Type":"application/x-www-form-urlencoded",
                    "X-Requested-With":"XMLHttpRequest",
                }
            }).then(res=>{
                // console.log('===========登录返回=================',res,_this.codeForm);
                _this.fullscreenAllLoading = false;
                //请求异常 0,
                //请求成功1,
                //表单验证失败 2,
                //请求超时 3;
                if(res.data.ajaxResult == 1 || res.data.ajaxResult == '1'){
                    if(res.data.values){
                        // 有values
                        _this.$store.dispatch('commitToken',{token:res.data.values,type:'1'});
                        // let cksid = _this.$cookies.get('cksid');
                        let key = _this.encryption.randomHexString(16);
                        let loginInfo = {
                            info: _this.encryption.Encrypt({j_username:data.j_username,token:res.data.values},key),
                            key:key
                        };
                        // _this.$cookies.set('p_userinfo',{j_username:_this.codeForm.j_username,token:res.data.values}, 40 * 60 * 60);
                        sessionStorage.setItem('loginInfo',loginInfo);
                        _this.$router.push({ name: 'channel'});
                        // _this.$message({
                        //     showClose: true,
                        //     type: 'success',
                        //     message: '登录成功！'
                        // });
                    }else{
                        this.changeCode();
                        _this.$message({
                            showClose: true,
                            type: 'error',
                            message: res.data.errorMessage[0].message
                        });
                    }
                }else if(res.data.ajaxResult == 0 || res.data.ajaxResult == '0'){
                    this.changeCode();
                    _this.$message({
                        showClose: true,
                        type: 'error',
                        message: res.data.errorMessage[0].message
                    });
                }else{
                    this.changeCode();
                    if(res.data.errorMessage[0].message){
                        _this.$message({
                            showClose: true,
                            type: 'error',
                            message: res.data.errorMessage[0].message
                        });
                    }else{
                        _this.$message({
                            showClose: true,
                            type: 'error',
                            message: '服务错误，请稍后再试或咨询工作人员！'
                        });
                    }
                }
            });
        },
        // 短信验证码
        getCheckCode(event){
            let _this = this;
            this.$refs.quickForm.validateField('j_username')
            if(!this.quickForm.j_username){
                // this.$message({
                //     showClose: true,
                //     message: '请输入手机号！',
                //     type: 'warning'
                // });
                return false;
            }
            this.isCanCode = false;
            _this.getCodeMsg = "验证码发送...";
            getRemoteForm({phone:this.quickForm.j_username},`user/check/checkPhoneCode`).then(res=>{
                if(res.data.resultFlag == 'ok'){
                    let codeInterval = window.setInterval(function() {
                    _this.codeTime = _this.codeTime - 1;
                    _this.getCodeMsg = _this.codeTime + " 秒后获取";
                    if (_this.codeTime <= 0) {
                        _this.codeTime = 60;
                        _this.isCanCode = true;
                        _this.getCodeMsg = "重新获取";
                        window.clearInterval(codeInterval);
                    }
                }, 1000);
                }else{
                    this.$message({
                        showClose: true,
                        message: '获取短信验证码失败！',
                        type: 'error'
                    });
                }
            });
        },
    },
    filters: {
    
    },
    watch: {
        
    },
}
</script>
<style lang="less" scoped>
    .commwandh{
        width: 100%;
        height: 100%;
    }
    .Login_main_wrap{
        .commwandh();
        min-width: 1100px;
        background: -webkit-linear-gradient(#0a0e19,#373e51);
       .Login_container_wrap{
            .commwandh();
            overflow-y: auto;
            overflow-x: hidden;
            &:before{
                content: '';
                width: 100%;
                height: 100%;
                display: block;
                z-index: -1;
                background: url("../assets/img/p_big3.jpg");
                background-size: cover;
                -webkit-filter: blur(10px);
                filter: blur(10px);
                z-index: 1;
                position: absolute;
                top: 0;
                right: 0;
            }
            .Login_page_wrap{
                width: 998px;
                position: relative;
                margin: 0 auto;
                // box-shadow: 0 5px 25px 5px rgba(23,28,63,.5);
                z-index: 999;
                background-color: #fff;
                border-radius: 3px;
                margin: 120px auto;
                overflow: hidden;
            }
            .Login_img_wrap,.Login_box_wrap{
                float: left;
                min-height: 450px;
            }
            .Login_img_wrap{
                background: rgba(121,106,238,.9);
                color: #fff;
                height: 100%;
                width: 60%;
                .login_welcome_txt01{
                    font-size: 3rem;
                    margin: 50px;
                }
            }
            .Login_box_wrap{
                height: 100%;
                width: 40%;
                h1.changeStyle{
                    font-size: 20px;
                    color: #5a617d;
                    text-align: center;
                    margin: 30px auto;
                    margin-bottom: 20px;
                    font-weight: bold;
                    span{
                        cursor: pointer;
                    }
                }
                .code_form{
                    margin: 50px auto;
                    width: 80%;
                }
                .checkCode_input{
                    width:70%;
                }
                .checkcode_img_wrap{
                    display: inline-block;
                    vertical-align: -webkit-baseline-middle;
                }
                .checkcode_img_wrap{
                    margin-left: 3%;
                }
                .login_btn_wrap{
                    .el-button{
                        width: 100%;
                    }
                    
                }
                .msg_checkcode{
                    display: inline-block;
                    margin-left: 3%;
                    width: 35%;
                    .el-button{
                        width: 100%;
                        padding: 0;
                        height: 40px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
            }
       }
    }
</style>