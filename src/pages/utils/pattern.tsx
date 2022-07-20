// 14位整数2位小数的正则表达式
const number14_2 = /(^[1-9]([0-9]\d{0,12})?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
const number14_2msg = '请输入整数位最多14位,小数位最多2位的小数!';
//
const number5_3 = /(^\d{1,5}(?:\.\d{1,3})?$)/;
const number5_3msg = '请输入整数位最多5位,小数位最多3位的小数!';
//
const number4 = /^(\d{0,8})$/;
const number4msg = '请输入位数最多为4位的整数!';
//
const number8 = /^(\d{0,8})$/;
const number8msg = '请输入位数最多为8位的整数!';
//
const number10 = /^(\d{0,10})$/;
const number10msg = '请输入位数最多为10位的整数!';
//
const number11 = /^(\d{0,10})$/;
const number11msg = '请输入位数最多为11位的整数!';
//
const number6 = /^(\d{0,6})$/;
const number6msg = '请输入位数最多为6位的整数';
// 输入非中文
const uZh = /^[^\u4e00-\u9fa5]*$/;
const uZhMsg = '请输入非中文字符!';
//
const zh = /^[\u4e00-\u9fa5]*$/;
const zhMsg = '请输入中文字符!';
//
const web = new RegExp(/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/);
const webMsg = '请输入正确地网址!';
//
const account = /^[\\u4e00-\\u9fa5_a-zA-Z0-9-]{1,16}$/;
const accountMsg = '账号限16个字符，支持中英文、数字、减号或下划线';

//
const newPassword = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[`~!@#$%^&*()\-_+=,./<>?])[\da-zA-Z`~!@#$%^&*()\-_+=,./<>?]{10,18}$/;
const newPasswordMsg = '密码强度太弱，请输入包含数字+字母+特殊符号的10~18位密码';

// 校验固定电话、移动电话、传真（区号后面要加“-”）
const phone = /(^(\d{3,4}-)?\d{7,8})$|^((1[0-9][0-9]\d{8}$))/;
const phoneMsg = '请输入固定电话或移动电话';

// 校验固定电话(必须带区号)、移动电话
const ph = /^((0\d{2,3}-?\d{7,8})|(1[3465789]\d{9}))$/;
const phMsg = '请输入固定电话(加区号)或移动电话';
// 传真
const fax = /^(?:\d{3,4}-)?\d{7,8}(?:-\d{1,6})?$/;
const faxMsg = '请输入传真号';
// 邮编
const postCode = /^[0-9]{6}$/;
const postCodeMsg = '请输入邮编';

// 校验方法
// 参数：正则表达式，与正则表达式匹配的提醒字段
// 返回值：校验结果的Promise
const validateRegex = (pattern, msg) => {
    return ({ getFieldValue }) => ({
        validator(rule, value) {
            if (!value) {
                return Promise.resolve();
            }
            if (!pattern.test(value)) {
                return Promise.reject(msg);
            }
            return Promise.resolve();
        }
    });
};


export default {
    validateRegex,
    number4,
    number4msg,
    number11,
    number11msg,
    postCode,
    postCodeMsg,
    number10,
    number10msg,
    account,
    accountMsg,
    fax,
    faxMsg,
    ph,
    phMsg,
    phone,
    phoneMsg,
    number6,
    number6msg,
    number8,
    number8msg,
    number14_2,
    number14_2msg,
    number5_3,
    number5_3msg,
    uZh,
    uZhMsg,
    zh,
    zhMsg,
    web,
    webMsg,
    newPassword,
    newPasswordMsg
};