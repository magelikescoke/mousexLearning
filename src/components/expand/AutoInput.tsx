import React, { useRef, useState } from 'react';
import { request } from 'dw-mx-request';
import debounce from 'lodash/debounce';
import { SearchOutlined } from 'dw-mx-icons';
import { AutoComplete, Form, Input } from 'dw-mx';

export interface ATProps {
    // 父组件的useForm实例
    form: any,
    // 请求后端地址
    url: string,
    // FormItem的name
    itemName: string,
    // FormItem的Title
    itemTitle: string,
    // 下拉面板的前置字段，查询后端的查询条件字段，也是回填的itemName的值
    beforeStr: string,
    // 下拉面板的后置字段
    afterStr: string,
    // 底纹提示语
    placeholder?: string
}

const AutoInput = (props: ATProps) => {
    // 查询条件
    const [value, setValue] = useState('');
    // 下拉面板显示List
    const [options, setOptions] = useState<{ value: string }[]>([]);
    // 存储选中项信息
    const [personalInfo, setPersonalInfo] = useState([]);

    // 普通查询后端的操作
    const onSearch = async (searchText: string) => {
        // 使用searchText，搜索后端，请求数据
        const result = await request(props.url, {
            query: {
                [props.beforeStr]: searchText
            }
        });
        /**
         * 仅适用于后端返回类型为
         * {
         *     map:{
         *         data:返回值
         *     }
         * }
         * */
        // 存储人员数据列表
        setPersonalInfo([...result['map']['data']]);
        // 拼装下拉面板数据，来区分同名人员
        const tempResult = result['map']['data'].map((item) => {
            return {
                value: item[props.beforeStr] + '--' + item[props.afterStr]
            };
        });
        setOptions(
            !searchText ? [] : [...tempResult]
        );
    };

    // 因为函数式组件，每次查询会重新实例化，useState无法用于存储一个只实例化一次的防抖函数
    // 带最大延迟时间的防抖函数，以下两种方法均可实现
    const delayedQuery = useRef(debounce(onSearch, 1000, { 'maxWait': 5000 })).current;
    // const delayedQuery = useCallback(debounce(onSearch, 1000, { 'maxWait': 5000 }), []);

    // 选中下拉面板的回调
    const onSelect = (data: string, options) => {
        // 截取姓名
        const tempStr = data.substring(0, data.indexOf('-'));
        let tempPerson;
        // 从查询出的列表时数据中，获取到选中人员的数据
        personalInfo.forEach(p => {
            if (p[props.beforeStr].indexOf(tempStr) !== -1) {
                tempPerson = { ...p };
            }
        });
        // 当存在表单字段名和数据字段名不同时，先给表单结构赋值，在单独赋值不同字段
        props.form.setFieldsValue({ ...tempPerson, [props.itemName]: tempPerson[props.beforeStr] });
    };
    // 查询框变化的回调
    const onChange = (data: string) => {
        setValue(data);
        // lodash/debounce防抖函数加载后端数据
        delayedQuery(data);
    };

    return (
        <>
            <Form.Item name={props.itemName} label={props.itemTitle} rules={[{ required: true }]}>
                <AutoComplete
                    allowClear
                    value={value}
                    options={options}
                    onSelect={onSelect}
                    onChange={onChange}
                    placeholder={props.placeholder}
                >
                    <Input suffix={<SearchOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }}/>}/>
                </AutoComplete>
            </Form.Item>
        </>
    );
};

export default AutoInput;