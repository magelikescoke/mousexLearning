import React from 'react';
import { Code } from 'dw-mx-extend';
import { message } from 'dw-mx';
import moment from 'moment';
import _ from 'lodash';
// 从指定指标的下拉列表数据中的某个符合条件的code-value转换为code-content，查找不到的返回code-value
// 参数：指标名，要查找的code-value
// 返回值：对应code-value的code-content
const adaptCodeUndefined = (codeName, recordItem) => {
    return Code.NAMEDCODE.get(codeName).find(val => val.value === recordItem) !== undefined ? Code.NAMEDCODE.get(codeName).find(val => val.value === recordItem).title : recordItem;
};
// 处理特殊的Code，Code值为带逗号的字符串
// 参数：指标名，要查找的code-value
// 返回值：对应code-value的code-content
const adaptCodeUndefinedPlus = (codeName, recordItem) => {
    return Code.NAMEDCODE.get(codeName).find(val => val.value.indexOf(recordItem) > -1) !== undefined ? Code.NAMEDCODE.get(codeName).find(val => val.value.indexOf(recordItem) > -1).title : recordItem;
};
// 验证Form数据是否通过了校验的方法
// 参数：Form.useForm的实例
// 返回值：校验结果
const validateForm = async (form) => {
    let resultData = {
        flag: false,
        result: {}
    };
    try {
        const result = await form.validateFields();
        resultData = { flag: true, result: { ...result } };
    } catch (e) {
        console.log('Error: ', e);
        // 定位到第一个校验出错位置
        if (e.errorFields) {
            const name = e.errorFields[0]['name'][0];
            const element = document.getElementById(name);
            element.scrollIntoView({ block: 'center', inline: 'nearest' });
        }
    }
    return resultData;
};
// 定位名为id值的元素，显示位置到中央（不可滚动时除外）
// 参数：document元素id名
const linkToEID = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ block: 'center', inline: 'nearest' });
    }
};
// 总计样式
const showTotal = (total, range) => {
    return <span>共 {total} 条</span>;
};
// 获取table当前选中行数组的方法
// 参数：table当前选中行数组，table的key字段名
// 返回值：所有选中行的key数组
const getSelectedItems = (selectedItems: Array<string>, keyName: string) => {
    return selectedItems.map(item => {
        return item[keyName];
    });
};

// 将checkbox的选中数组转换为带分隔符的字符串的方法
// 参数：选中数组，分隔符
// 返回值：带分隔符的选中字符串
const convertCheckboxArrToStr = (arr: Array<string>, separator: string) => {
    let temp = '';
    for (let i = 0; i < arr.length; i++) {
        temp += arr[i];
        if (i < arr.length - 1) {
            temp += separator;
        }
    }
    return temp;
};
// 将带分隔符的选中字符串转换为选中数组按的方法
// 参数：带分隔符的选中字符串，分隔符
// 返回值：选中数组
const convertCheckboxStrToArr = (str: string, separator: string) => {
    if (str) {
        return str.split(separator);
    }
    return [];
};
// 将传入的form对象进行checkbox转换
//  参数：form对象，分隔符
// 返回值：处理后的form对象
const convertFormCheckboxArrToStr = (form: object, separator: string) => {
    const keys = Object.keys(form);
    const temp = {};
    keys.forEach(key => {
        if (form[key] instanceof Array) {
            temp[key] = convertCheckboxArrToStr(form[key], separator);
        } else {
            temp[key] = form[key];
        }
    });
    return temp;
};
// 将后台返回的form对象的checkbox选项字符串转化为数组
// 参数：form对象，需要转换的对象key数组,分隔符
// 返回值：转换完的对象
const convertFormCheckboxStrToArr = (form: object, keys: Array<string>, separator: string) => {
    const temp1 = { ...form };
    keys.forEach(key => {
        const temp2 = {
            [key]: convertCheckboxStrToArr(form[key], separator)
        };
        Object.assign(temp1, temp2);
    });
    return temp1;
};
// 将（YYYYMMDD）类型的字符串孩转换为（YYYY-MM-DD）类型的方法
// 参数：string或Number类型，格式为（YYYYMMDD）的字符串或数字
// 返回值：YYYY-MM-DD类型的字符串
const showTimeConverter = (date) => {
    let dateString;
    if (typeof date === 'number') {
        dateString = date.toString();
    } else {
        dateString = date;
    }
    let formatedDate = null;
    if (dateString) {
        const pattern = /(\d{4})(\d{2})(\d{2})/;
        formatedDate = dateString.replace(pattern, '$1-$2-$3');
    }
    return formatedDate;
};
// 处理行政区划数组数据，仅返回行政区划数组最后一位的code值
// 参数：行政区划code数组
// 返回值：code的string
const getZoneOptionsCode = (zoneArr: Array<string>) => {
    return zoneArr !== undefined ? zoneArr[zoneArr.length - 1] : null;
};
// 将数组的指定下标（数组每位值减一）位置的item置为可选（disabled置为false）
// 参数：boolean类型数组，下标数组
// 返回值：根据入参boolean类型数组返回新的boolean类型数组
const getInitCheckboxItems = (initArr: Array<boolean>, index: Array<number>) => {
    const temp = { ...initArr };
    if (index) {
        index.forEach(item => {
            temp[item - 1] = false;
        });
    }
    return temp;
};
// 将（yyyy-MM-dd hh:mm:ss）Date类型的字符串，转换成Date类型的数据
// 参数：string类型，格式为（yyyy-MM-dd hh:mm:ss）的Date字符串
// 返回值：Date类型数据
const convertDateFromString = (dateString) => {
    if (dateString) {
        const arr1 = dateString.split(' ');
        const sdate = arr1[0].split('-');
        return new Date(sdate[0], sdate[1] - 1, sdate[2]);
    }
};
// 将（2021-02-19T04:11:54.000+0000）Date类型的字符串，转换成（YYYY-MM-DD hh:mm:ss）类型字符串
// 参数：（2021-02-19T04:11:54.000+0000）类型字符串
// 返回值：（YYYY-MM-DD hh:mm:ss）类型字符串
const renderTime = (date) => {
    let result = null;
    if (date) {
        const dateee = new Date(date).toJSON();
        result = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
    }
    return result;
};
// 將Code的返回值，转换为初始化Code机制的数据
// 参数：后端返回的List，类型[{dmbh:'',codeItemList:[{value:'',content:''}]}]
// 返回值：Code机制需要的初始化对象，类型{'':[{value:'',content:''}]}
const codeFormatter = (codeArr) => {
    const tempCode = {};
    if (codeArr) {
        codeArr.forEach(item => {
            tempCode[item['dmbh']] = item['codeItemList'];
        });
    }
    return tempCode;
};
// 将form表单对象数据转换为数组
// 参数：form。get到的对象
// 返回值：类型为[{aee207 : '' ,aee208 : '' },...]的数组
const objectToList = (form: object) => {
    const keys = Object.keys(form);
    const tempArr = [];
    keys.forEach(key => {
        tempArr.push({
            aee207: key,
            aee208: form[key]
        });
    });
    return tempArr;
};
// 将数组form数据源转为对象
// 参数：类型为[{aee207 : '' ,aee208 : '' },...]的数组
// 返回值：form。set要使用的数值化数组
const listToObject = (arr: Array<object>) => {
    const tempForm = {};
    if (arr) {
        arr.forEach(item => {
            Object.assign(tempForm, { [item['aee207']]: item['aee208'] });
        });
    }
    return tempForm;
};
// 将areaCode的空children删除
// 参数：areaCode
// 返回值：无，直接修改入参
const convertAreaCode = (areaCode) => {
    if (areaCode && areaCode.children) {
        if (areaCode.children.length === 0) {
            delete areaCode.children;
        } else {
            areaCode.children.forEach((item) => {
                convertAreaCode(item);
            });
        }
    }
};
// 将全国行政区划的空children删除
// 参数：allAreaCode，全国行政区划对象
// 返回值：无，直接修改入参
const convertAllAreaCode = (allAreaCode) => {
    const keys = Object.keys(allAreaCode);
    keys.forEach(key => {
        convertAreaCode(allAreaCode[key]);
    });
};
// 判断数值是和否数字
// 参数：待判断数值
// 返回值：boolean
const isNumber = value => typeof value === 'number' && !isNaN(value);
// 使用最后一位，得到级联下拉框的全值数组
// 参数：json对象，目标值
// 返回值：下拉框数组
const getInitCodeArrByLast = (node, target) => {
    // 全局变量，来进行深度遍历函数的控制
    let arrPath = [];//保存路径
    let count = 0;
    // 深度遍历函数
    const deepFinds = (node, target) => {
        arrPath.push(node.value);
        if (node.value === target) {
            count++;
        } else {
            if (node.children) {
                for (let i = 0; i < node.children.length; i++) {
                    let flag = deepFinds(node.children[i], target);
                    if (!flag)
                        arrPath.pop();
                    else
                        break;
                }

            }
        }
        return count > 0;
    };
    // 调用深度遍历
    deepFinds(node, target);
    return [...arrPath];
};
//
//
//
const getInitCodeContentByLastValue = (node, target) => {
    // 全局变量，来进行深度遍历函数的控制
    let arrPath = [];//保存路径
    let count = 0;
    // 深度遍历函数
    const deepContentFinds = (node, target) => {
        arrPath.push(node.content);
        if (node.value === target) {
            count++;
        } else {
            if (node.children) {
                for (let i = 0; i < node.children.length; i++) {
                    let flag = deepContentFinds(node.children[i], target);
                    if (!flag)
                        arrPath.pop();
                    else
                        break;
                }

            }
        }
        return count > 0;
    };
    // 调用深度遍历
    deepContentFinds(node, target);
    return [...arrPath];
};
//
//
//
const getOrgContentByCodeValue = (node, target) => {
    if (target) {
        // 全局变量，来进行深度遍历函数的控制
        let arrPath = [];//保存路径
        let count = 0;
        // 深度遍历函数
        const deepContentFinds = (node, target) => {
            arrPath.push(node.content);
            if (node.value === target) {
                count++;
            } else {
                if (node.children) {
                    for (let i = 0; i < node.children.length; i++) {
                        let flag = deepContentFinds(node.children[i], target);
                        if (!flag)
                            arrPath.pop();
                        else
                            break;
                    }

                }
            }
            return count > 0;
        };
        // 调用深度遍历
        deepContentFinds(node, target);
        // 将所属机构的名字返回回去
        return arrPath.pop();
    } else {
        return null;
    }
};
// 处理首位为null或空字符串的数组
// 参数：node对象树，目标值
// 返回值：级联数组
const getListByItemPlus = (node, target) => {
    const arrByLast = getInitCodeArrByLast(node, target);
    if (arrByLast !== null && arrByLast.length > 0 && (arrByLast[0] === '' || arrByLast[0] === null)) {
        arrByLast.shift();
    }
    return [...arrByLast];
};
// 根据树形对象，和目标Code的value拼接content的方法
// 参数：树形对象，目标朱
// 返回值：结果String
const getContentListByItem = (node, target) => {
    const arrByLast = getInitCodeContentByLastValue(node, target);
    let resultStr = '';
    if (arrByLast !== null && arrByLast.length > 0 && (arrByLast[0] === '全国' || arrByLast[0] === null)) {
        arrByLast.shift();
    }
    arrByLast.forEach(item => {
        resultStr += item;
    });
    return resultStr;
};
// 将级联下拉框的数组首位去掉的方法
// 参数：node对象树，目标值
// 返回值：级联数组
const getChildrenListByItem = (node, target) => {
    const arrByLast = getInitCodeArrByLast(node, target);
    if (arrByLast.length > 1) {
        arrByLast.shift();
    }
    return [...arrByLast];
};

// 将后端返回的数据转换为Echarts封装组件使用的初始化数据
// 参数：后盾返回数组，行政区划字段名，数据值字段名
// 返回值：Echarts省地图组件需要的数据，数据类型为
//     {
//         name: '370000',
//         title: '山东省',
//         value: 120
//     }
// 的数组
// const convertMapData = (dataArr, codeName, valueName) => {
//     const resultArr = [];
//     const map = require('@/pages/map/util/province34.json');
//     dataArr.forEach(item => {
//         map.features.forEach(area => {
//             if (item[codeName] === area.properties.adcode) {
//                 resultArr.push({
//                     name: item[codeName],
//                     title: area.properties.name,
//                     value: item[valueName] === undefined ? 0 : item[valueName]
//                 });
//             }
//         });
//     });
//     return [...resultArr];
// };
// 将后端返回的大写字段的属性值转为小写字段
// 参数：后端返回的对象
// 返回值：处理后小写字段的对象
const objToLowerCase = (obj: object) => {
    const keys = Object.keys(obj);
    const temp = {};
    keys.forEach(key => {
        Object.assign(temp, { [key.toLowerCase()]: obj[key] });
    });
    return { ...temp };
};
// 校验上传文件form的是否必填
// 参数：需要校验的form，需要校验的formItem名，是否启用校验
// 返回值：校验结果
const validateFormFileIsUpload = (form, key, required) => {
    let flag = true;
    if (required && (form.getFieldValue(key) === undefined || form.getFieldValue(key) === '')) {
        message.warning(<span>请<strong>上传文件</strong>该文件为必填项!</span>);
        flag = false;
    }
    return flag;
};
// 校验上传文件form的是否必填
// 参数：需要校验的form，需要校验的formItem名，是否启用校验
// 返回值：校验结果
const validateImgFileIsUpload = (form, key, required) => {
    let flag = true;
    if (required && (form.getFieldValue(key) === undefined || form.getFieldValue(key) === '')) {
        message.warning(<span>请<strong>上传头像</strong>!</span>);
        flag = false;
    }
    return flag;
};
// 将指定指标值的下拉选项框的code值转换为Code的content，支持带分隔符的code的value，返回值支持传入分隔符
// 参数：code的指标名，code的指标值，返回值string中每个code-content的间隔符，code值输入值的分隔符
// 返回值：带传入间隔符的code-content的string
const getCodeString = (codeName: string, codeValue: string, delimiter: string, separator: string) => {
    const stringArr = codeValue.split(separator);
    let result = '';
    stringArr.forEach((str, index) => {
        Code.NAMEDCODE.get(codeName, (value, content) => {
            if (str === value.value) {
                result += value.content;
                if (index < stringArr.length - 1) {
                    result += delimiter;
                }
            }
        });
    });
    return result;
};
// 将要查找的字段后面追加上括号和补充字段
// 参数：完整字段，要查找的字段，补充字段
// 返回值：添加补充值之后的String
const resolveOtherString = (holeStr, findStr, addStr) => {
    let result = holeStr;
    if (holeStr.indexOf(findStr) > -1) {
        if (addStr !== undefined && addStr !== null) {
            result = holeStr.slice(0, holeStr.indexOf(findStr)).concat(findStr.concat('(' + addStr + ')')).concat(holeStr.slice(holeStr.indexOf(findStr) + findStr.length));
        }
    }
    return result;
};
// 不是undefined也不是null
// 参数：需要判断的值
// 返回值：boolean，是否符合条件
const notUndefinedAndNull = (value) => {
    return value !== undefined && value !== null;
};
//
//
//
const byteArrayToBase64 = (buffer) => {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};
// 将后端返回的对象List转换为可以显示的下拉面板值
// 参数：后端返回的list，后端返回的options的value的名字，后端返回的options的content的名字
// 返回值：
const initSelectOption = (list: Array<Record<string, unknown>>, valueKey: string, contentKey: string) => {
    if (list && list.length > 0) {
        return list.map(item => {
            return {
                value: item[valueKey],
                content: item[contentKey]
            };
        });
    }
};
// 删除table中选中行的方法
// 参数：当前table数组的数据，所有需要删除行的key数组，table的key字段名
// 返回值：删除选中行之后，当前table应该设置的值
const deleteItemsFromTable = (table: Array<object>, deleteItems: Array<string>, keyName: string) => {
    const temp = [...table];
    deleteItems.forEach(item => {
        deleteItemFromTable(temp, item, keyName);
    });
    return temp;
};
// 删除table中key为deleteItem的值的方法
// 参数：当前table数组的数据，所有需要删除行的key，table的key字段名
const deleteItemFromTable = (table: Array<object>, deleteItem: string, keyName: string) => {
    let tableIndex = 0;
    table.forEach((item, index) => {
        if (item[keyName] === deleteItem) {
            tableIndex = index;
            table.splice(tableIndex, 1);
        }
    });
};
// 往table数组中新增数据的方法
// 参数：当前table数组的数据，当前form，关键字名称，关键字值
// 返回值：添加form的值之后，当前table应该设置的值
const addItemToTable = (table: Array<object>, form, keyName: string, keyValue: any) => {
    const temp = [...table];
    temp.push({ ...form.getFieldsValue(), [keyName]: keyValue });
    return temp;
};
// 更新table数组中数据的方法
// 参数：当前table数组的数据，当前form，关键字名称
// 返回值：更新form的值之后，当前table应该设置的值
const updateItemToTable = (table: Array<object>, form, keyName: string) => {
    let temp = [];
    temp = table.map(item => {
        if (item[keyName] === form.getFieldValue(keyName)) {
            return form.getFieldsValue();
        } else {
            return item;
        }
    });
    return temp;
};
// 生成随机主键
// 参数：位数
// 返回值：主键
const randomRangeId = (num) => {
    let returnStr = '';
    // const charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charStr = '0123456789';
    for (let i = 0; i < num; i++) {
        const index = Math.round(Math.random() * (charStr.length - 1));
        returnStr += charStr.substring(index, index + 1);
    }
    return returnStr;
};
//
//
//
const randomRangeStringId = (num) => {
    let returnStr = '';
    const charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    // const charStr = '0123456789';
    for (let i = 0; i < num; i++) {
        const index = Math.round(Math.random() * (charStr.length - 1));
        returnStr += charStr.substring(index, index + 1);
    }
    return returnStr;
};
// 将moment转换为String
// 参数：moment，需要转换的对象属性名
// 返回值：返回转换后的数组
const momentToString = (tableData, keyName) => {
    return tableData.map((item) => {
        if (moment.isMoment(item[keyName])) {
            return { ...item, [keyName]: item[keyName].format('YYYYMMDD') };
        } else {
            return { ...item };
        }
    });
};
// 将【moment，moment】装换为result对象的两个属性(String 类型时间)
// 参数：传输对象，前端日期域名称，开始日期名称，截止日期名称
// 返回值：无，直接修改入参
const transferRangePicker = (result: Record<string, unknown>, listName: string, begin: string, end: string) => {
    if ((result !== null) && result[listName]) {
        const temp = {
            [begin]: result[listName][0] !== null && result[listName][0] !== undefined && moment.isMoment(result[listName][0]) ? result[listName][0].format('YYYYMMDD') : null,
            [end]: result[listName][1] !== null && result[listName][1] !== undefined && moment.isMoment(result[listName][1]) ? result[listName][1].format('YYYYMMDD') : null
        };
        Object.assign(result, temp);
        delete result[listName];
    }
};
// 将后端返回的两个String类型时间转换为【moment,moment】
// 参数：后端返回值对象，开始时间名称，结束时间名称，转换为的时间域名称
// 返回值：
const receiveRangerPicker = (source, begin, end, listName) => {
    if (source) {
        const temp = {
            [listName]: [source[begin] !== null && source[begin] !== undefined ? moment(source[begin], 'YYYYMMDD') : null, source[end] !== null && source[end] !== undefined ? moment(source[end], 'YYYYMMDD') : null]
        };
        Object.assign(source, temp);
        delete source[begin];
        delete source[end];
    }
};
// 将moment年度转换为YYYY字符串
// 参数：传输值对象，属性
// 返回值：无，直接修改入参
const transferYear = (source, year) => {
    if (source) {
        const temp = {
            [year]: source[year] !== null && source[year] !== undefined && moment.isMoment(source[year]) ? source[year].format('YYYY') : source[year] !== null && source[year] !== undefined && typeof (source[year]) === 'string' ? source[year] : null
        };
        Object.assign(source, temp);
    }
};
// 将YYYY类型年度字符串转换为moment年度
// 参数：初始化对象，属性
// 返回值：无，直接修改入参
const receiveYear = (source, year) => {
    if (source) {
        const temp = {
            [year]: source[year] !== null && source[year] !== undefined ? moment(source[year], 'YYYY') : null
        };
        Object.assign(source, temp);
    }
};
// 将form的对象转换为List
// 参数：待处理的数组，需要转为List数据的form，form中需要转换的属性名数组
// 返回值：处理后的数组
const transferFormToList = (source: Array<Record<string, unknown>>, form: Record<string, unknown>, nameList: Array<string>) => {
    const temp = source ? [...source] : [];
    const tempObj = {};
    nameList.forEach(item => {
        Object.assign(tempObj, { [item]: form[item] });
    });
    temp.push(tempObj);
    return temp;
};
// 将返回值List转换为所有form的初始值数组的方法
// 参数：返回值，初始值数组，返回值中每项需要转换的属性
// 返回值：
const receiveListToForm = (source: Array<Record<string, unknown>>, nameList: Array<string>) => {
    const result = [];
    if (source) {
        source.forEach(item => {
            const tempObj = {};
            nameList.forEach(name => {
                Object.assign(tempObj, { [name]: item[name] });
            });
            result.push(tempObj);
        });
    }
    return result;
};
// 将北京从行政区划Code中剔除
// 参数：全国行政区划对象
// 返回值：剔除北京之后的行政区划对象
const deleteBeiJingFromAreaCode = (areaCode) => {
    let temp = null;
    if (areaCode) {
        temp = _.cloneDeep(areaCode);
        if (areaCode['children']) {
            temp['children'].forEach((item, index) => {
                if (item['value'] === '110000') {
                    temp['children'].splice(index, 1);
                }
            });
        }
    }
    return temp;
};
// 获取北京的行政区划
// 参数：全国行政区划对象
// 返回值：北京行政区划对象
const getBeiJingFromAreaCode = (areaCode) => {
    let temp = null;
    let result = null;
    if (areaCode) {
        temp = _.cloneDeep(areaCode);
        if (areaCode['children']) {
            temp['children'].forEach((item, index) => {
                if (item['value'] === '110000') {
                    result = temp['children'].splice(index, 1);
                }
            });
        }
    }
    return result;
};

export default {
    deleteBeiJingFromAreaCode,
    getBeiJingFromAreaCode,
    getOrgContentByCodeValue,
    getContentListByItem,
    transferFormToList,
    receiveListToForm,
    transferYear,
    receiveYear,
    momentToString,
    randomRangeId,
    deleteItemFromTable,
    updateItemToTable,
    addItemToTable,
    deleteItemsFromTable,
    validateForm,
    adaptCodeUndefined,
    adaptCodeUndefinedPlus,
    linkToEID,
    showTotal,
    convertAreaCode,
    convertAllAreaCode,
    codeFormatter,
    getSelectedItems,
    convertFormCheckboxArrToStr,
    convertFormCheckboxStrToArr,
    convertCheckboxArrToStr,
    convertCheckboxStrToArr,
    showTimeConverter,
    getZoneOptionsCode,
    getInitCheckboxItems,
    convertDateFromString,
    renderTime,
    objectToList,
    listToObject,
    isNumber,
    getInitCodeArrByLast,
    // convertMapData,
    objToLowerCase,
    validateFormFileIsUpload,
    validateImgFileIsUpload,
    getCodeString,
    resolveOtherString,
    notUndefinedAndNull,
    byteArrayToBase64,
    getListByItemPlus,
    initSelectOption,
    getChildrenListByItem,
    transferRangePicker,
    receiveRangerPicker,
    randomRangeStringId
};