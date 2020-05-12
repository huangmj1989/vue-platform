/**
 * crystalSong tools
 */
export default {
    formatDate (date, fmt) {
        date = new Date(date);
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
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str));
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
    //+-------------------------------------	
	//|日期格式化的总调方法
	//|dateObj：日期对象或字符串型日期内容
	//|formatter：
	//+-------------------------------------
	dateFormat(dateObj,formatter){
		if(!dateObj)return '';
		var tmpDate = null;
		if(typeof(dateObj) === 'string'){
			tmpDate = parse(dateObj);
		}else if(typeof(dateObj) === 'number'){
			var d = new Date();
			d.setTime(dateObj);
			tmpDate = d;
		}else if(dateObj instanceof Date){
			tmpDate = dateObj;
        }
		return this.format(tmpDate,formatter);
    },
    // 将日期字符串转换为yyyy-MM-dd的标准格式
	format(date,formatter){
		if(date==null){return null;}
		if(formatter==null){formatter = "yyyy-MM-dd";};
		var year = date.getFullYear().toString();
		var month = (date.getMonth() + 1).toString();
		var day = date.getDate().toString();
		var hours = date.getHours().toString();
		var minutes = date.getMinutes().toString();
		var seconds = date.getSeconds().toString();
		var yearMarker = formatter.replace(/[^y]/g,'');
		var monthMarker = formatter.replace(/[^M]/g,'');
		var dayMarker = formatter.replace(/[^d]/g,'');
		var hoursMarker = formatter.replace(/[^h]/g,'');
		var minutesMarker = formatter.replace(/[^m]/g,'');
		var secondsMarker = formatter.replace(/[^s]/g,'');
		if(yearMarker.length == 2){year = year.substring(2,4);}
		if(monthMarker.length > 1 && month.length==1){month = "0" + month;}
		if(dayMarker.length > 1 && day.length==1){day = "0" + day;}
		if(hoursMarker.length > 1 && hours.length==1){hours = "0" + hours;}
		if(minutesMarker.length > 1 && minutes.length==1){minutes = "0" + minutes;}
		if(secondsMarker.length > 1 && seconds.length==1){seconds = "0" + seconds;}
		if(yearMarker.length>0){formatter = formatter.replace(yearMarker,year);}
		if(monthMarker.length>0){formatter = formatter.replace(monthMarker,month);}
		if(dayMarker.length>0){formatter = formatter.replace(dayMarker,day);}
		if(hoursMarker.length>0){formatter = formatter.replace(hoursMarker,hours);}
		if(minutesMarker.length>0){formatter = formatter.replace(minutesMarker,minutes);}
		if(secondsMarker.length>0){formatter = formatter.replace(secondsMarker,seconds);}
		return formatter;
    },
    //日期字符串转转换为指定格式
	parse : function(str){  
		if(typeof str == 'string'){
			///处理CST时间； Fri Aug 14 20:51:57 CST 2015
			if(str.toUpperCase().indexOf("CST") != -1){
				//默认的CST格式时间使用的时区是美国中部时间UT-6:00
				//而所需要的是中国标准时间UT+8:00
				//所以默认使用CST格式时间进行初始化日期对象后，实际时间比中国标准时间早了14个小时
				//在日期转换时需要进行相减
				var tmpd = new Date(str);
				tmpd.setHours(tmpd.getHours()-14);
				return tmpd;
			}
			if(str.toUpperCase().indexOf("GMT") != -1){
				return new Date(str);
			}
			var results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) *$/);
			if(results && results.length>3)
				return new Date(parseInt(results[1]),parseInt(results[2]) -1,parseInt(results[3]));
			results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2}) *$/);
			if(results && results.length>6)
				return new Date(parseInt(results[1]),parseInt(results[2]) -1,parseInt(results[3]),parseInt(results[4]),parseInt(results[5]),parseInt(results[6]));
			results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,9}) *$/);
			if(results && results.length>7)
				return new Date(parseInt(results[1]),parseInt(results[2]) -1,parseInt(results[3]),parseInt(results[4]),parseInt(results[5]),parseInt(results[6]),parseInt(results[7]));
		}
		return null;  
	},
	//除法函数，用来得到精确的除法结果
	//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
	//调用：accDiv(arg1,arg2)
	//返回值：arg1除以arg2的精确结果
	accDiv(arg1,arg2){
		var t1=0,t2=0,r1,r2;
		try{t1=arg1.toString().split(".")[1].length;}catch(e){}
		try{t2=arg2.toString().split(".")[1].length;}catch(e){}
		r1=Number(arg1.toString().replace(".",""));
		r2=Number(arg2.toString().replace(".",""));
		return (r1/r2)*Math.pow(10,t2-t1);
	},
	//数字格式化
	//num :源数字，支持数字或数字字符串 
	//n   :保留小数点倍数，默认为2位小数
	numFormat(num,n){
		var temp = 1;
		var temp2 = "";
		if($.type(n)!='number' && !n) n=2;
		for(var i=0;i<n;i++){
			temp = temp * 10;
			temp2 = temp2 + "0";
		}
		if(num==0){
			if(n==0) return "0";
			else return "0."+temp2;
		}
		if(isNaN(num) || num==""){return "";}
		var result = (Math.round(parseFloat(num)*temp)/temp).toString();
		if(result.indexOf(".")==-1){
			if(n==0) return result;
			else return result + "." + temp2;
		}
		else return (result+temp2).substr(0,1 + parseInt(n) + parseInt((result+temp2).indexOf(".")));
	},
	//为数字添加千位符，返回字符串结果
	thousandSeparator(num,separator){
		var scode = separator?separator:',';
		if(!/^(\+|-)?(\d+)(\.\d+)?$/.test(num)){  
			return num;  
		}  
		var a = RegExp.$1,b = RegExp.$2,c = RegExp.$3;  
		var re = new RegExp();
		re.compile("(\\d)(\\d{3})("+scode+"|$)");
		while(re.test(b)){
			b = b.replace(re,"$1"+scode+"$2$3");  
		}  
		return a +""+ b +""+ c;  
	},
	//去除千位符
	unThousandSeparator(num,separator){
		var result='';
		var scode = separator?separator:',';
		if(num && typeof(num)=='string'){
			result = this.replaceAll(num, scode, '');
		}
		return result;
	},
	//全部替换
	replaceAll(srcStr,substr,newstr){
		if(!srcStr || !typeof(srcStr)=='string') return;
		return srcStr.replace(new RegExp(substr,"gm"),newstr);
	},
	//数字转字母
	//下标从1开始
	number2letter(num){
		if(typeof(num)=='number' && num > 0 && num <= 26){
			var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
			return str.substring(num-1, num);
		}
	},
	//数字转大写金额
	digitUppercase(n) {
	    var fraction = ['角', '分'];
	    var digit = ['零', '壹', '贰', '叁', '肆','伍', '陆', '柒', '捌', '玖'];
	    var unit = [
	        ['元', '万', '亿'],
	        ['', '拾', '佰', '仟']
	    ];
	    var head = n < 0 ? '欠' : '';
	    n = Math.abs(n);
	    var s = '';
	    for (var i = 0; i < fraction.length; i++) {
	        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
	    }
	    s = s || '整';
	    n = Math.floor(n);
	    for (var i = 0; i < unit[0].length && n > 0; i++) {
	        var p = '';
	        for (var j = 0; j < unit[1].length && n > 0; j++) {
	            p = digit[n % 10] + unit[1][j] + p;
	            n = Math.floor(n / 10);
	        }
	        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
	    }
	    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
	},
}