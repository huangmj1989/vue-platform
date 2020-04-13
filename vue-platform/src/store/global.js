import {sessionStorage} from '@/utils/storage'
//全局变量，判断访问哪个接口系统
const globalBaseURL = "http://10.8.0.245:33333/ecp-web-manage/";
// const menuSlider = sessionStorage.getItem('menuSlider') ?  sessionStorage.getItem('menuSlider') : false;//侧边栏是否收起
// const muneCode = sessionStorage.getItem('muneCode') ?  sessionStorage.getItem('muneCode') : '';//当前菜单

export default {
    globalBaseURL,
}
