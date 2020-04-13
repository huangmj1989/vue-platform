<template>
    <div class="layout_main_wrap">
        <!-- 头部 开始-->
        <HeaderOne @isOpenAside="isOpenAside"></HeaderOne>
        <!-- 头部 结束 -->
        <!-- 中间部分 开始 -->
        <div class="layout_content_wrap">
            <!-- 左侧导航菜单 开始 -->
            <div class="layout_aside_wrap" >
                <LeftAside :menuSlider="menuSlider"></LeftAside>
            </div>
            <!-- 左侧导航菜单 结束 -->
            <!-- 右侧主体内容 开始 -->
            <div class="layout_main_content" :style="menuSlider ? 'margin-left:65px' : 'margin-left:250px'">
                <div class="layout_router_wrap">
                    <router-view></router-view>
                </div>
            </div>
            <!-- 右侧主体内容 结束 -->
            <!-- 页脚 start-->
            <FooterOne></FooterOne>
            <!-- 页脚 end-->
        </div>
        <!-- 中间部分 结束 -->
        <template>
            <el-backtop target=".layout_main_wrap"></el-backtop>
        </template>
        
    </div>
</template>
<script>
import LeftAside from '@/components/aside'
import FooterOne from '@/components/footerOne'
import HeaderOne from '@/components/headerOne'
export default {
    name: "layout",
    components: {
        LeftAside,
        FooterOne,
        HeaderOne
    },
    data(){
        return{
            menuSlider:false,
        }
    },
    created:function(){
        this.menuSlider = this.$store.state.menuSlider;
    },
    mounted() {
        
    },
    methods:{
        isOpenAside(item){
            this.menuSlider = item;
        },
    },
    watch: {
        
    },
}
</script>
<style lang="less">
    .layout_main_wrap{
        width: 100%;
        height: 100%;
        overflow-y: auto;
        
        .layout_content_wrap{
            width: 100%;
            height: calc(100% - 60px);
            .layout_aside_wrap{
                // height: 1200px;
                // width: 250px;
                height: 100%;
                overflow-y: auto;
                float: left;
                // background-color: #f1f1f1;
            }
            .layout_main_content{
                // width: calc(100% - 220px);
                margin-left: 250px;
                margin-top: 60px;
                background-color: #f1f1f1;
                min-height: 100%;
                padding: 0px 8px;
                padding-bottom: 8px;
                box-sizing: border-box;
                transition: margin-left .6s ease;
                -moz-transition: margin-left .6s ease; /* Firefox 4 */
                -webkit-transition: margin-left .6s ease; /* Safari 和 Chrome */
                -o-transition: margin-left .6s ease; /* Opera */
                min-width: 865px;
                .layout_router_wrap{
                    width: 100%;
                    background-color: #fff;
                }
            }
        }
    }
</style>