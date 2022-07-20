// 模态框高度全局配置
const modHeightLv1 = '80%';
// 模态框宽度
const modWidthLv1 = '80%';
// 二级模态框
const modWidthLv2 = '60%';
// 日期文本框宽度
const datePickerWidth = 200;
// InputNumber输入框的宽度
const inputNumWidth = 200;
// 类似修改密码Modal框的大小
const modWidthLv3 = '40%';
// 穿梭框的高度
const transferHeight = window.innerHeight * 0.6;
// 穿梭框内置Table的高度
// const transferInnerTableHeight = window.innerHeight * 0.33;
const transferInnerTableHeight = '33vh';
// 退回原因Modal框高度
const modHeightLv3 = window.innerHeight * 0.33;

// 分页请求的初始值
const page = {
    current: 1,
    size: 10,
    total: null
};


export default {
    page,
    modHeightLv1,
    modWidthLv1,
    modWidthLv2,
    datePickerWidth,
    modWidthLv3,
    inputNumWidth,
    transferHeight,
    transferInnerTableHeight,
    modHeightLv3
};