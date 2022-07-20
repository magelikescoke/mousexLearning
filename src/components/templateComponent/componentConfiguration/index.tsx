import React from 'react';
import moment, { Moment } from 'moment';
import func from '@/pages/utils/func';
import { ReactNode } from 'react';

// FormItem的内部组件的属性
export interface FormItemProps {
    // 组件标题
    label?: string,
    // 组件的key（指标名）
    name?: string,
    // 校验规则
    rules?: Array<any>
    // 组件类型
    type: 'input' | 'inputNumber' | 'button' | 'select' | 'rangePicker' | 'datePicker' | 'cascader' | 'selectWithFind' | 'custom',
    // 组件是否隐藏
    hidden?: boolean,
    // 组件是否不可编辑
    disabled?: boolean,
    // 下拉选项获取Code中下拉列表的key，Code.NAMEDCODE.get((optionsKey的值))
    optionsKey?: string,
    // FormItem所占的Col的span的大小，一般用于管理页面Form的Button控制靠右，其他组件一般默认span={8}
    span?: number,
    // 带标签的 input，设置后置标签
    addonAfter?: ReactNode,
    // 带标签的 input，设置前置标签
    addonBefore?: ReactNode,
    // 带有前缀图标的 input
    prefix?: ReactNode,
    // 带有后缀图标的 input
    suffix?: ReactNode,
    // 控制时间选择器的日期可选范围
    disabledDate?: (currentDate: Moment) => boolean,
    // 时间选择器类型
    picker?: 'date' | 'week' | 'month' | 'quarter' | 'year',
    // 多选下拉框的下拉菜单选项
    cascaderOptions?: any,
    // RangePicker的是否可为空属性
    allowEmpty?: [boolean, boolean],
    // 底纹提示
    placeholder?: string,
    // InputNumber的最小值
    min?: number,
    // InputNumber的最大值
    max?: number,
    // 指定InputNumber输入框展示值的格式
    formatter?: (value: string | number) => string,
    // InputNumber指定从 formatter 里转换回数字的方式，和 formatter 搭配使用
    parser?: (string) => number,
    // 自定义FormItem的子组件
    component?: ReactNode
}

// Table的Column配置
export interface TableColumnItem {
    // Table列的位置
    align: 'left' | 'center' | 'right'
    // （IE 下无效）列是否固定，可选 true (等效于 left) left right
    fixed?: boolean | 'left' | 'right',
    // 列标题名称
    title: string,
    // 对应后端返回值的哪个属性
    // 列数据在数据项中对应的路径，支持通过数组查询嵌套路径
    dataIndex: string | string[],
    // 	React 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性
    key?: string,
    // 宽度
    width?: string | number,
    // 渲染函数
    render?: (text, record, index) => any,
    // 列样式类名
    className?: string,
    // 	表头列合并,设置为 0 时，不渲染
    colSpan?: number,
    // 渲染标记，可以在配置文件打个自定义标记，然后在父组件还找到相应标记，做特殊渲染
    renderKey?: string
}

// 个人信息管理页面查询Form
const PersonalInfoQueryForm: Array<FormItemProps> = [
    {
        label: '证件号码',
        name: 'idCode',
        type: 'input'
    },
    {
        label: '姓名',
        name: 'name',
        type: 'input'
    },
    {
        type: 'button',
        span: 8
    }
];
// 个人信息管理页面Table
const PersonalInfoTable: Array<TableColumnItem> = [
    {
        align: 'left',
        title: '姓名',
        dataIndex: 'name',
        fixed: 'left'
    },
    {
        align: 'left',
        title: '行政区划',
        dataIndex: 'zone',
        renderKey: 'area'
    },
    {
        align: 'left',
        title: '出生日期',
        dataIndex: 'birth',
        render: (text) => {
            return func.showTimeConverter(text);
        }
    },

    {
        align: 'left',
        title: '联系电话',
        dataIndex: 'phone'
    },
    {
        align: 'left',
        title: '所在单位名称',
        dataIndex: 'aab004'
    },
    {
        align: 'center',
        title: '数据状态',
        dataIndex: 'state',
        renderKey: 'state'
    },
    {
        align: 'center',
        title: '操作',
        dataIndex: 'options'
    }
];
// 个人信息管理页面填写Form
const PersonalInfoForm: Array<FormItemProps> = [
    {
        label: '行政区划',
        name: 'zone',
        type: 'cascader'
    },
    {
        label: '证件类型',
        name: 'idCardType',
        type: 'select',
        optionsKey: 'idCardType'
    },
    {
        label: '证件号码',
        name: 'idCode',
        type: 'input',
        rules: [{ required: true }]
    },
    {
        label: '国家(地区)',
        name: 'area',
        type: 'selectWithFind',
        optionsKey: 'country'
    },
    {
        label: '姓名',
        name: 'name',
        type: 'input'
    },
    {
        label: '性别',
        name: 'gender',
        optionsKey: 'gender',
        type: 'select'
    },
    {
        label: '民族',
        name: 'nationality',
        type: 'selectWithFind',
        optionsKey: 'nationality'
    },
    {
        label: '出生日期',
        name: 'birth',
        type: 'datePicker',
        disabledDate: (current) => current && current > moment().endOf('day')
    },
    {
        label: '政治面貌',
        name: 'politicalStatus',
        type: 'select',
        optionsKey: 'politicalStatus'
    },
    {
        label: '家庭住址',
        name: 'address',
        type: 'input'
    },
    {
        label: '联系电话',
        name: 'phone',
        type: 'input'
    },
    {
        label: '邮箱',
        name: 'email',
        type: 'input'
    },
    {
        label: '邮编',
        name: 'postcode',
        type: 'input'
    },
    {
        label: '所在单位',
        name: 'aab004',
        type: 'input'
    },
    {
        label: '单位地址',
        name: 'companyAddress',
        type: 'input'
    },
    {
        label: '职称',
        name: 'jobTitle',
        type: 'input'
    },
    {
        label: '专业技术等级',
        name: 'skillLv',
        type: 'input'
    },
    {
        label: '毕业院校',
        name: 'college',
        type: 'input'
    },
    {
        label: '所学专业',
        name: 'profession',
        type: 'input'
    },
    {
        label: '学历',
        name: 'education',
        type: 'input'
    },
    {
        label: '学位',
        name: 'degree',
        type: 'input'
    }
];


export default {
    PersonalInfoConfig: {
        PersonalInfoQueryForm: PersonalInfoQueryForm,
        PersonalInfoTable: PersonalInfoTable,
        PersonalInfoForm: PersonalInfoForm
    }
};