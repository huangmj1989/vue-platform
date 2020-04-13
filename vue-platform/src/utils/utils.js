/**
 * crystalSong tools
 */
export default {
    formatDate (date, fmt) {
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        const o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        };
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
            }
        }
        return fmt;
    },
    padLeftZero (str) {
        return ('00' + str).substr(str.length);
    },
     /**
	 * 获取随机数
	 * @param section 区间
	 * @return
	 * @throws 
	 */
	randomValue(section){
        return Math.ceil(Math.random()*section);
    },
    getFormatTime(timestamp) {
        var year=new Date(timestamp).getFullYear(); 
        var month=new Date(timestamp).getMonth()+1; 
        var date=new Date(timestamp).getDate(); 
        var hour=new Date(timestamp).getHours(); 
        var minute=new Date(timestamp).getMinutes(); 
        var second=new Date(timestamp).getSeconds(); 
        return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
    }
}