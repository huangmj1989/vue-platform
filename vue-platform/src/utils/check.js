/**
 * crystalSong check input
 */
//全局校验规则
const regUsename = /^[\u4e00-\u9fa5_a-zA-Z0-9]{2,12}$/;//用户名
const regPwd = /^[_a-zA-Z0-9]{6,12}$/;//密码 6-12位数字英文下划线

const p_regUsename = /^[a-zA-Z0-9]{6,16}$/;//用户名
const p_regPwd = /^[_a-zA-Z0-9]{8}$/;//密码 8位数字英文下划线

const regPhonNum = /^1[34578]\d{9}$/;//手机号
export default {
    checkUername(rule, value, callback){

    },
    regUsename,
    regPwd,
    regPhonNum,
    p_regUsename,
    p_regPwd
}