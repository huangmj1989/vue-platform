import axios from "axios"
import qs from 'qs';



// 公共api json类型
export function getRemoteJson(data,url) {
	return axios({
		url: url,
		data,
		method:"post",
		headers:{
			_api_name:'',
			_api_version:"1.0.0",
			"Content-Type":"application/json",
			"X-Requested-With":"XMLHttpRequest",
		}
	});
}
// 公共api form类型
export function getRemoteForm(data,url) {
	return axios({
		method:"post",
		url: url,
		data:qs.stringify(data),
		headers:{
			// _api_name:'',
			// _api_version:"1.0.0",
			"Content-Type":"application/x-www-form-urlencoded",
			"X-Requested-With":"XMLHttpRequest",
		}
	});
}
// 防止重复
export function uniqueCommonArr(array,type,value) {
	for (let i in array) {
		if (array[i].type == type && i < array.length - 1 ) {
			array.splice(i, 1); //删除这个过滤项
			break;
		}
	}
	return array;
}
// 下载
export function remoteDownload(id,filename,apiname) {
	axios({
		method:"GET",
		url: `/common/sigleDownload?id=`+id,
		responseType: 'blob', // important
		headers:{
			_api_name:apiname,
			_api_version:"1.0.0",
		}
	}).then(res=>{
		if(res.data && res.status == 200){
			let url = window.URL.createObjectURL(new Blob([res.data]))
			let link= document.createElement('a')
			link.style.display='none'
			link.href=url
			link.setAttribute('download', filename+'.doc')    // 自定义下载文件名（如exemple.txt）
			document.body.appendChild(link)
			link.click();
		}
	});
}
// 导出
export function remoteexport(data) {
	axios({
		method:"POST",
		url: `chnlStaff/export`,
		responseType: 'blob', // important
		data:qs.stringify(data),
		// headers:{
		// 	_api_name:apiname,
		// 	_api_version:"1.0.0",
		// }
	}).then(res=>{
		if(res.data && res.status == 200){
			let blob = new Blob([res.data],{type:res.data.type});
			let url = window.URL.createObjectURL(blob);
			let link= document.createElement('a')
			link.style.display='none'
			link.href=url
			link.setAttribute('download', 'activeCodeExport.xls')    // 自定义下载文件名（如exemple.txt）
			document.body.appendChild(link)
			link.click();
		}
	});
}
// 时间戳
export function getFormatTime(timestamp) {
	var year=new Date(timestamp).getFullYear(); 
	var month=new Date(timestamp).getMonth()+1; 
	var date=new Date(timestamp).getDate(); 
	var hour=new Date(timestamp).getHours(); 
	var minute=new Date(timestamp).getMinutes(); 
	var second=new Date(timestamp).getSeconds(); 
	return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
}
// 处理 获取产品
export function getProductList() {
	return axios({
		method:"POST",
		url: `chnlStaff/product`,
		headers:{
			// _api_name:apiname,
			_api_version:"1.0.0",
			"X-Requested-With":"XMLHttpRequest",
		}
	});
}
// 获取状态
export function getStatusList() {
	return axios({
		method:"POST",
		url: `chnlStaff/status`,
		headers:{
			// _api_name:apiname,
			_api_version:"1.0.0",
			"X-Requested-With":"XMLHttpRequest",
		}
	});
}