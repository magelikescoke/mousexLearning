import React, { useState } from 'react';
import { Form, message, Select } from 'dw-mx';
import { request } from 'dw-mx-request';
import func from '@/pages/utils/func';

export interface SSProps {
    // 父组件的useForm实例
    form: any,
    // 请求后端地址
    url: string,
    // FormItem的name
    itemName: string,
    // FormItem的Title
    itemTitle: string,
    // 底纹提示语
    placeholder?: string,
    // 机构id
    orgIdName: string,
    // 是否不可编辑
    disabled: boolean,
    // 规则
    rules: Array<Record<string, unknown>>,
    // 延时时间
    delay?: number
}

export default function SelectSearchPlus(props: SSProps) {
    const { Option } = Select;
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState('');
    // 存储选中项信息
    const [personalInfo, setPersonalInfo] = useState([]);
    let timeout;
    let currentValue;
    const fetch = (value, callback) => {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = value;
        const fake = async () => {
            try {
                const ret = await request(props.url, {
                    query: {
                        [props.itemName]: value
                    }
                });
                if (currentValue === value) {
                    const r = ret;
                    const result = [];
                    setPersonalInfo([...r]);
                    r.forEach(item => {
                        result.push({
                            key: func.isNumber(item[props.orgIdName]) ? item[props.orgIdName].toString() : item[props.orgIdName],
                            value: func.isNumber(item[props.orgIdName]) ? item[props.orgIdName].toString() : item[props.orgIdName],
                            text: item[props.itemName]
                        });
                    });
                    callback(result);
                }
            } catch (e) {
                message.error('请求失败!');
            }
        };
        // timeout = setTimeout(fake, 1000);
        timeout = setTimeout(fake, props.delay !== undefined ? props.delay : 500);
    };

    const onSelect = (value) => {
        setValue(value);
        let tempPerson;
        // 从查询出的列表时数据中，获取到选中人员的数据
        personalInfo.forEach(p => {
            if (p[props.orgIdName].toString().indexOf(value) !== -1) {
                tempPerson = { ...p };
            }
        });
        let tempForm;
        // 处理一些后台存储的特别字段（不一定在返回数据中有，但是有必须处理否则pop的提示面板报错）
        if (tempPerson['aeb004'] !== undefined || tempPerson['aee033'] !== undefined || tempPerson['aee021'] !== undefined) {
            tempForm = func.convertFormCheckboxStrToArr(tempPerson, ['aeb004', 'aee033', 'aee021'], ',');
        }
        // 当存在表单字段名和数据字段名不同时，先给表单结构赋值，在单独赋值不同字段
        props.form.setFieldsValue({ ...tempForm });
    };

    const onSearch = (value) => {

        if (value) {
            fetch(value, data => setOptions(data));
        } else {
            setOptions([]);
        }
    };
    const selectOpt = options.map(item => {
        return <Option key={item.key} value={item.value}>{item.text}</Option>;
    });

    return (
        <>
            <Form.Item label={props.itemTitle} name={props.itemName} rules={props.rules}>
                <Select
                    value={value}
                    placeholder={props.placeholder}
                    onChange={onSelect}
                    onSearch={onSearch}
                    showSearch
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    notFoundContent={null}
                    disabled={props.disabled}
                >
                    {selectOpt}
                </Select>
            </Form.Item>
        </>
    );
}