<template>
    <div class="header_main_wrap" v-loading.fullscreen.lock="fullscreenLoading">
        <div class="layout_header_wrap">
            <div class="layout_logo">
                <a href="#/welcome" class="logo_txt">
                    <!-- <img src="../assets/img/lemon02.png" alt=""> -->
                    <span class="logo_title">管理平台</span>
                </a>
            </div>
            <div class="left_open">
                <a href="javascript:void(0);" @click="isOpenAside">
                    <i class="iconfont iconcaidanshouqi" v-show="!menuSlider" title="收起"></i>
                    <i class="iconfont iconcaidanzhankai" v-show="menuSlider" title="展开"></i>
                </a>
            </div>
            <div class="left_index_page">
                <p>
                    <router-link to="/welcome"><i class="iconfont iconMoneymanagement"></i><span> 首页</span></router-link>
                </p>
            </div>
            <div class="layout_user_wrap">
                <ul class="user_wrap">
                    <li class="item">
                        <!-- <el-dropdown @command="handleTopCommand"> -->
                            <span class="el-dropdown-link" style="color:#fff;">
                                {{userInfo.j_username}}
                            </span>
                            <!-- <el-dropdown-menu slot="dropdown"> -->
                                <!-- <el-dropdown-item command="personalMsg">个人信息</el-dropdown-item> -->
                                <!-- <el-dropdown-item command="changPwd">修改密码</el-dropdown-item> -->
                                <!-- <el-dropdown-item command="logout" divided>退出</el-dropdown-item> -->
                            <!-- </el-dropdown-menu> -->
                        <!-- </el-dropdown> -->
                    </li>
                    <li class="item">
                        <a href="javascript:void(0);" title="退出" class="logout" @click="logout">
                            <i class="iconfont">&#xe70f;</i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import {sessionStorage} from '@/utils/storage'
export default {
    name:'headerOne',
    props:{},
    data(){
        return{
            userInfo:{},
            menuSlider:false,
            fullscreenLoading:false,
        }
    },
    created() {
        var info = sessionStorage.getItem("loginInfo").info,key = sessionStorage.getItem("loginInfo").key
        this.userInfo = this.encryption.Decrypt(info,key)
        this.menuSlider = this.$store.state.menuSlider;
        // this.$cookies.get('p_userinfo') ? this.userInfo = this.$cookies.get('p_userinfo') : this.userInfo;
        // console.log('----------------',this.userInfo)
    },
    mounted() {
        
    },
    methods: {
        // 头部用户
        handleTopCommand(command){
            // console.log(command,'ffffffffffffff')
            let _this = this;
            if(command == 'logout'){
                _this.logout();
            }
        },
        // 左侧菜单是否打开
        isOpenAside(){
            this.menuSlider = !this.menuSlider;
            this.$store.dispatch('commitMenuSlider',this.menuSlider);
            this.$emit("isOpenAside",this.menuSlider)
        },
        logout(){
            let _this = this;
            this.$confirm('确定要退出吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.fullscreenLoading = true;
                _this.axios({
                    method:"post",
                    url: 'chnlStaff/alogout',
                    headers:{
                        _api_name:'',
                        _api_version:"1.0.0",
                        "Content-Type":"application/x-www-form-urlencoded",
                        "X-Requested-With":"XMLHttpRequest",
                    }
                }).then(res=>{
                    _this.$store.dispatch('commitToken',{token:'',type:'2'});
                    sessionStorage.clear();
                    // _this.$message({
                    //     showClose: true,
                    //     type: 'success',
                    //     message: '已退出，转向登录页!'
                    // });
                    _this.$router.push({ name: 'login'});
                }).catch(error=>{
                    _this.$store.dispatch('commitToken',{token:'',type:'2'});
                    sessionStorage.clear();
                    // _this.$message({
                    //     showClose: true,
                    //     type: 'success',
                    //     message: '已退出，转向登录页!'
                    // });
                    _this.$router.push({ name: 'login'});
                });
                
            }).catch(() => {
                    
            });
        },
    },
    watch: {
        
    },
}
</script>
<style lang="less" scoped>
    .layout_header_wrap{
        width: 100%;
        height: 60px;
        overflow: hidden;
        background-color: #4e9ec5;
        position: fixed;
        right: 0;
        left: 0;
        z-index: 9999;
        a,a:hover{
            color: #fff;   
        }
        .layout_logo{
            float: left;
            font-size: 18px;
            // padding-left: 20px;
            width: 250px;
            box-sizing: border-box;
            height: 100%;
            line-height: 60px;
            a.logo_txt{
                // margin-top: 9px;
                display: inline-block;
                width: 100%;
                height: 100%;
                text-align: center;
                span{
                    font-size: 20px;
                    letter-spacing: 6px;
                }
            }
            img{
                height: 32px;
                width: 32px;
                object-fit: contain;
            }
        }
        .left_open{
            height: 100%;
            float: left;
            margin-left: 10px;
            line-height: 60px;
            padding-right: 10px;
            box-sizing: border-box;
            i{
                font-size: 22px;
            }
        }
        .left_index_page{
            height: 100%;
            float: left;
            margin-left: 10px;
            line-height: 60px;
            p>a{
                padding: 5px 10px;
                border: 1px solid #78c2e6;
                font-size: 14px;
                border-radius: 3px;
                background-image: linear-gradient(#4e9ec5, #6ebbe0);
            }
        }
        .layout_user_wrap{
            float: right;
            margin-right: 20px;
            .user_wrap{
                overflow: hidden;
                li.item{
                    float: left;
                    height: 100%;
                    line-height: 60px;
                    margin: 0 10px;
                    font-size: 16px;
                    i{
                        font-size: 20px;
                    }
                    .el-dropdown{
                        color: #fff;
                        cursor: pointer;
                        font-size: 16px;
                    }
                    .logout{
                        i{
                            font-weight: bold;
                            font-size: 22px;
                        }
                    }
                }
            }
        }
    }
</style>