<template>
    <div class="left-aside-wrap">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo aside-menu-container"
        mode="vertical"
        :show-timeout="200"
        :unique-opened="false"
        text-color="#4e9ec5"
        active-text-color="#fff"
         @open="handleAsideOpen" @close="handleAsideClose" :collapse="menuSlider" 
         @select="handleAsideSelect">
            <!-- <template v-for="(menuitem, menuindex) in menuList" >
                <el-submenu :index="menuitem.menuUrl ? menuitem.menuUrl : '/'" :key="menuindex">
                    <template slot="title">
                        <i class="iconfont iconset"></i>
                        <span>{{menuitem.menuTitle}}</span>
                    </template>
                    <template v-if="menuitem.children">
                        <el-menu-item-group>
                            <template v-for="(item02, index02) in menuitem.children">
                                <el-menu-item :index="item02.menuUrl" :key="index02">
                                    <router-link :to="item02.menuUrl"><i :class="item02.menuIcon"></i> <span>{{item02.menuTitle}}</span></router-link>
                                </el-menu-item>
                            </template>
                        </el-menu-item-group>
                    </template>
                </el-submenu>
            </template> -->
            <el-submenu index="channelmanage">
                <template slot="title">
                    <i class="iconfont iconzhifuqudaoguanli"></i>
                    <span>渠道管理</span>
                </template>
                <template>
                    <el-menu-item-group>
                        <template>
                            <el-menu-item index="/channel" >
                                <router-link to="/channel"><i class="iconfont iconqudao"></i> <span>渠道查询</span></router-link>
                            </el-menu-item>
                        </template>
                    </el-menu-item-group>
                </template>
            </el-submenu>
            <!-- <el-submenu index="salemanage">
                <template slot="title">
                    <i class="iconfont iconZHicon-"></i>
                    <span>销售统计</span>
                </template>
                <template>
                    <el-menu-item-group>
                        <template>
                            <el-menu-item index="/growth" >
                                <router-link to="/growth"><i class="iconfont iconzengchang1"></i> <span>增长统计</span></router-link>
                            </el-menu-item>
                        </template>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template>
                            <el-menu-item index="/channelArea" >
                                <router-link to="/channelArea"><i class="iconfont icondiqu3"></i> <span>渠道地区分布统计</span></router-link>
                            </el-menu-item>
                        </template>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template>
                            <el-menu-item index="/productSale" >
                                <router-link to="/productSale"><i class="iconfont iconxiaoshou7"></i> <span>产品销量统计</span></router-link>
                            </el-menu-item>
                        </template>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template>
                            <el-menu-item index="/distribution" >
                                <router-link to="/distribution"><i class="iconfont icontask"></i> <span>渠道经销商产品销售统计</span></router-link>
                            </el-menu-item>
                        </template>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template>
                            <el-menu-item index="/renewalChal" >
                                <router-link to="/renewalChal"><i class="iconfont icontask"></i> <span>用户续费统计（渠道维度）</span></router-link>
                            </el-menu-item>
                        </template>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template>
                            <el-menu-item index="/renewalPlat" >
                                <router-link to="/renewalPlat"><i class="iconfont icontask"></i> <span>用户续费统计（平台维度）</span></router-link>
                            </el-menu-item>
                        </template>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template>
                            <el-menu-item index="/activeCode" >
                                <router-link to="/activeCode"><i class="iconfont icontask"></i> <span>激活码统计</span></router-link>
                            </el-menu-item>
                        </template>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template>
                            <el-menu-item index="/memberDistri" >
                                <router-link to="/memberDistri"><i class="iconfont icontask"></i> <span>会员分布统计</span></router-link>
                            </el-menu-item>
                        </template>
                    </el-menu-item-group>
                </template>
            </el-submenu> -->
            <!-- <el-submenu index="menu02">
                <template slot="title">
                    <i class="iconfont iconwriting"></i>
                    <span>任务管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="menu0201">待办任务</el-menu-item>
                    <el-menu-item index="menu0202">已办任务</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="menu03">
                <template slot="title" >
                    <i class="iconfont iconfeeds"></i>
                    <span>人事管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="menu0301">请假审批</el-menu-item>
                </el-menu-item-group>
            </el-submenu> -->
        </el-menu>
    </div>
</template>
<script>
export default {
    name:"LeftAside",
    props:{
        menuSlider:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            menuCode:'',//选择的菜单
            menuList:[
                {
                    id:33018,
                    menuIcon:'iconfont iconset',
                    menuType:'0',
                    menuTitle:'系统管理',
                    parentId:33000,
                    menuUrl:'',
                    children:[
                        {
                            id:33022,
                            menuIcon:'iconfont iconqudao',
                            menuType:'1',
                            menuTitle:'渠道管理',
                            parentId:33018,
                            menuUrl:'/channel',
                        },
                        {
                            id:33020,
                            menuIcon:'iconfont iconcertified-supplier',
                            menuType:'1',
                            menuTitle:'角色管理',
                            parentId:33018,
                            menuUrl:'/role',
                        },
                        {
                            id:33021,
                            menuIcon:'iconfont iconCustomermanagement',
                            menuType:'1',
                            menuTitle:'权限管理',
                            parentId:33018,
                            menuUrl:'/people',
                        }
                    ]
                }
            ],//菜单数据
        }
    },
    created(){
        // 请求左侧菜单接口 获得数据渲染页面
    },
    methods:{
        // 菜单打开
        handleAsideOpen(key, keyPath){
            // this.$emit("handleSelect", queryData);
        },
        // 合上菜单
        handleAsideClose(key, keyPath){
            // this.$emit("handleSelect", queryData);
        },
        // 选择
        handleAsideSelect(key, keyPath){
            this.menuCode = this.$route.path;
            this.$store.dispatch('commitMenuCode',this.menuCode);
        },
    },
    watch:{},
}
</script>
<style lang="less">

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 220px;
        position: fixed;
        top: 60px;
        left: 0;
        bottom: 0;
        overflow-y: auto;
        height: auto !important;
        z-index: 55;
    }
    .left-aside-wrap{
        height: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
        top: 60px;
        z-index: 55;
    }
    // .left-aside-wrap{
        .el-menu{
            height: 100%;
            border-right: none !important;
        }
        .el-submenu__title{
            font-size: 16px;
            span{
                font-size: 16px;
            }
        }
        .el-submenu i.iconfont{
            color: #4e9ec5;
            font-size: 20px;
            vertical-align: sub;
        }
        .el-menu-item{
            a{
                color: #4e9ec5 !important;
                font-size: 16px;
                display: inline-block;
                width: 100%;
                height: 100%;
                padding: 10px 0;
            }
            height: auto !important;
            line-height: initial !important;
            white-space: normal !important;
            // padding-top: 10px !important;
            // padding-bottom: 10px !important;
        }
        .el-menu-item.is-active{
            background-color: #4e9ec5;
            a{
                color: #fff !important;
                font-size: 16px;
            }
            i.iconfont{
                color: #fff;
            }
        }
        .el-menu-item:focus, .el-menu-item:hover{
            background-color: #4e9ec5 !important;
            color: #fff !important;
            a{
                color: #fff !important;
                font-size: 16px;
            }
            i.iconfont{
                color: #fff;
            }
        }

        .el-menu--vertical .el-menu-item i.iconfont{
            color: #4e9ec5;
            font-size: 20px;
            vertical-align: sub;
        }
        .el-menu--vertical .el-menu-item.is-active i.iconfont{
            color: #fff;
        }
        .el-menu--vertical .el-menu-item:focus, .el-menu--vertical .el-menu-item:hover{
            background-color: #4e9ec5 !important;
            color: #fff !important;
            a{
                color: #fff !important;
                font-size: 16px;
            }
            i.iconfont{
                color: #fff;
            }
        }
    // }
    
</style>