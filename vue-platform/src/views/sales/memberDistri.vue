<template>
    <div class="member_main_wrap container_common">
        <div class="member_container">
            <div class="common_query_form_wrap">
                <el-form :inline="true" label-width="150px" class="queryForm-form-inline" ref="queryForm">
                    <el-form-item label="请选择省/市/区：">
                        <!-- @selected="onSelected" -->
                        <v-distpicker :placeholders="placeholders" 
                        :province="queryForm.provincetxt" :city="queryForm.citytxt" :area="queryForm.areatxt"
                        @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>
                    </el-form-item>
                </el-form>
            </div>
            <el-divider></el-divider>
            <div class="member_result_wrap common_result_container">
                <div class="common_result_operation">
                    <p class="member_msg">
                        <template v-if="queryForm.provincetxt">
                            {{queryForm.provincetxt}}
                        </template>
                        <template v-if="queryForm.citytxt">
                            / {{queryForm.citytxt}}
                        </template>
                        <template v-if="queryForm.areatxt">
                            / {{queryForm.areatxt}}
                        </template>
                        共有****个VIP会员
                    </p>
                    <el-divider></el-divider>
                    <div class="echart_wrap">
                        <p class="echart_titile">会员区域分布</p>
                        <div ref="MapMountNode" style="width:60%; height:400px"></div>
                        <div class=""></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import VDistpicker from 'v-distpicker'
// 引入echart
import echarts from 'echarts'
import 'echarts/map/js/china'
// 工具
import tools from '@/utils/utils'

export default {
    name:'member',
    components:{
        VDistpicker 
    },
    data(){
        return{
            MapMountNode:null,//地图
            queryForm: { 
                province: '', 
                city: '',
                area: '',
                provincetxt: '', 
                citytxt: '',
                areatxt: '',
            },
            placeholders: {
                province: '--请选择--',
                city: '--请选择--',
                area: '--请选择--',
            },
            centerMapDataList:[
                {name:"南海诸岛",value:0},
                {name: '北京', value: tools.randomValue(100)},
                {name: '天津', value: tools.randomValue(100)},
                {name: '上海', value: tools.randomValue(100)},
                {name: '重庆', value: tools.randomValue(100)},
                {name: '河北', value: tools.randomValue(100)},
                {name: '河南', value: tools.randomValue(100)},
                {name: '云南', value: tools.randomValue(100)},
                {name: '辽宁', value: tools.randomValue(100)},
                {name: '黑龙江', value: tools.randomValue(100)},
                {name: '湖南', value: tools.randomValue(100)},
                {name: '安徽', value: tools.randomValue(100)},
                {name: '山东', value: tools.randomValue(100)},
                {name: '新疆', value: tools.randomValue(100)},
                {name: '江苏', value: tools.randomValue(100)},
                {name: '浙江', value: tools.randomValue(100)},
                {name: '江西', value: tools.randomValue(100)},
                {name: '湖北', value: tools.randomValue(100)},
                {name: '广西', value: tools.randomValue(100)},
                {name: '甘肃', value: tools.randomValue(100)},
                {name: '山西', value: tools.randomValue(100)},
                {name: '内蒙古', value: tools.randomValue(100)},
                {name: '陕西', value: tools.randomValue(100)},
                {name: '吉林', value: tools.randomValue(100)},
                {name: '福建', value: tools.randomValue(100)},
                {name: '贵州', value: tools.randomValue(100)},
                {name: '广东', value: tools.randomValue(100)},
                {name: '青海', value: tools.randomValue(100)},
                {name: '西藏', value: tools.randomValue(100)},
                {name: '四川', value: tools.randomValue(100)},
                {name: '宁夏', value: tools.randomValue(100)},
                {name: '海南', value: tools.randomValue(100)},
                {name: '台湾', value: tools.randomValue(100)},
                {name: '香港', value: tools.randomValue(100)},
                {name: '澳门', value: tools.randomValue(100)}
            ],//地图数据
        }
    },
    created() {
        document.title = this.$route.meta.title;

    },
    mounted() {
        // console.log('-------------调用地图初始化------------')
        this.MapMountNode = echarts.init(this.$refs.MapMountNode); //这里是为了获得容器所在位置
        window.onresize = this.MapMountNode.resize;
        // this.$nextTick(() => {
        var data = this.centerMapDataList;
        // console.log('-------------地图数据------------',data)
        let option = {
            tooltip: {
                show: true,
                formatter: function(params) {
                    console.log('-------------地图数据参数进入option------------',params)
                    return params.name + "：" + params.value;
                }
            },
            visualMap: {//图注样式定制，其中包括color范围，文字提示
                calculable: true,
                seriesIndex: [0],
                min: 0,
                max: 100,
                inRange: {
                    color: ['#b7d6f3','#2b65b0']
                },
                bottom: 4,
                left: "4%",
                text: ['高','低'],
            },
            grid: {
                right: 0,
                top: 20,
                bottom: 30,
                width: "100%"
            },
            geo: {//定义地图为china，其中可能大概率要用的一个配置zoom: 视角缩放比例，roam：是否开启缩放和平移
                map: "china",//表示中国地图
                roam: true,
                // left: "120",
                // right: "100",
                layoutSize: "100%",
                position: 'center',
                zoom: 1.2,
                label: {
                    emphasis: {
                        show: false
                    },
                    normal: {
                        show: true, // 是否显示对应地名
                        textStyle: {
                            color: 'rgba(0,0,0,0.4)'
                        }
                    }
                },
                itemStyle: {//地图外观定制，其中normal表示正常显示的样式，emphasis表示鼠标悬浮下样式
                    emphasis: {
                        areaColor: "#fff464"
                    }
                }
            },
            series: [//整体配置 其中type很关键 表示该例是地图，data:图表所用数据，实际项目中大家可以通过http获取数据，再赋值给data
                // {
                //     type: 'scatter',
                //     coordinateSystem: 'geo' // 对应上方配置
                // },
                {
                    name: "mapSer",
                    type: "map",
                    // roam: false,
                    geoIndex: 0,
                    label: {
                        show: false
                    },
                    data: data
                }
            ]
        };
        this.MapMountNode.setOption(option);
    },
    methods: {
        // 省市区三级联动
        onSelected(data) {
            console.log(data)
        },
        // 省份更改
        onChangeProvince(data){
            this.queryForm.provincetxt = data.value;
            this.queryForm.province = data.code;
            console.log(data,this.queryForm)
        },
        // 市区更改
        onChangeCity(data){
            this.queryForm.citytxt = data.value;
            this.queryForm.city = data.code;
            console.log(data,this.queryForm)
        },
        // 区更改
        onChangeArea(data){
            this.queryForm.areatxt = data.value;
            this.queryForm.area = data.code;
            console.log(data,this.queryForm)
        },
        // 产生随机数
        randomValue(){
            return 
        },
    },
    watch: {
        
    },
}
</script>
<style lang="less" scoped>
    .member_result_wrap{
        .member_msg{
            color: #ff3a00;
            font-weight: bold;
            font-size: 14px;
        }
    }
</style>
<style lang="less">
    
</style>