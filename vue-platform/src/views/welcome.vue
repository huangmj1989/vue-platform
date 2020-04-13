<template>
    <div class="welcome_main_wrap container_common">
        <div class="welcome_container">
           <p class="welcometxt_txt"> 欢迎使用本管理平台---</p> 
        </div>
    </div>
</template>
<script>
export default {
    name:'welcome',
    data(){
        return{

        }
    },
    created() {
        
    },
    mounted() {
        
    },
    methods: {
        
    },
    watch: {
        
    },
}
</script>
<style lang="less" scoped>
    .position-rel-box,.position-rel-box .position-rel{
        position: relative;
        width: 260px;
        height: 34px;
    }
    .position-rel .form-control{
        display: block;
        width: 100%;
        height: 100%;
        padding: 6px 12px;
        box-sizing: border-box;
        background-color: #fff;
        background-image: none;
        border: 1px solid #ccc;
        border-radius: 3px;
        -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
        -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
        -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
        transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    }
    .position-rel .bank_xljt{
        position: absolute;
        right: 0;
        top: 1px;
        width: 40px;
        height: 33px;
        line-height: 33px;
        text-align: center;
        // border-left: 1px solid #ccc;
    }
    .position-rel .bank_xljt img{
        
    }
    .position-rel #chose_bank{
        height: 32px;
        position: absolute;
        width: 100%;
        top: 0;
    }
    .position-rel-box .bank_xl{
        width: 100%;
        border: 1px solid #ccc;
        // border-top: 0;
        // border-bottom: 0;
        position: absolute;
        z-index: 1;
        background: #fff;
        box-sizing: border-box;
    }
    .position-rel-box .bank_xl ul.template_list{
        list-style: none;
        margin: 0;
        padding: 0;
        color: #222;
        font-size: 13px;
    }
    .position-rel-box .bank_xl  .bank_xl_header{
        border-bottom: 1px solid #ccc;
        padding: 10px 0;
        box-sizing: border-box;
    }
    .position-rel-box .template_list .template{
        margin: 0;
        padding: 0;
        display: inline-block;
        width: 20%;
        text-align: center;
    }
    .position-rel-box  .template_list .hotBank-list{
        padding: 10px 0;
        box-sizing: border-box;
    }
    .position-rel-box  .template_list .hotBank-list:hover{

    }
    .position-rel-box .template_list .template.template_id{
    }
    .position-rel-box .template_list .template.template_name{
        width: 50%;
    }
    .position-rel-box .template_list .template.template_style{
        width: 25%;
    }
    .position-rel-box .bank_xl  .hotBank-list .hotBank-list-ico{
        color: #4084F0;
        text-decoration: none;
    }
    .welcometxt_txt{
        font-size: 24px;
        font-weight: bold;
    }
</style>