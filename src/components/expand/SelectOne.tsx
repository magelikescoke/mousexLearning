import React, { useEffect, useImperativeHandle, useState } from 'react';
import { Form, Input, Popover, Select } from 'dw-mx';
import layout from '@/pages/utils/layout';

// options数组的入参格式
export interface item {
    // 同内容
    label?: string,
    // 主键
    value: string,
    // 内容
    content?: string,
    // 同内容
    title?: string
}

export interface SOProps {
    // useForm的实例
    form,
    // Select选项框的Form.Item名称
    selectName: string,
    // Select选项框的Form.Item标题
    selectTitle: string,
    // 其他项在options中的value值（key）
    otherKey: string,
    // 其他项输入框的Form.Item名称
    otherName: string,
    // 其他项输入框的Form.Item标题
    otherTitle: string,
    // Select是否disabled的标志
    disabled: boolean,
    // Select的placeholder
    placeholder?: string,
    // Select的选项值
    options: Array<item>
    rules?: Array<object>
}

export default function SelectOne(props: SOProps, ref?) {
// 用多选框去模拟单选框实现效果
// const SelectOne = (props: SOProps, ref?) => {
    // 是否显示其他项的标记
    const [show, setShow] = useState(false);
    // 同optArr.length一起作为Popover是否显示的标志
    const [visible, setVisible] = useState(false);
    // 存储Select选中项的key值数组，用来初始化Popover的数据
    const [optArr, setOptArr] = useState([]);
    // 存储其他项Input值，用来将下拉面的其他项Input的值的变化与Popover的值的变化同步
    // const [inputValue, setInputValue] = useState('');
    const [popContent, setPopContent] = useState();

    // Select改变之后触发的方法
    const onChanged = (value, option) => {
        if (value.length !== 1) {
            // 会修改原数组
            value.splice(0, 1);
        }
        if (value[0] !== props.otherKey) {
            setShow(false);
            // setInputValue('');
            props.form.setFieldsValue({ ...props.form, [props.otherName]: '' });
        } else {
            setShow(true);
        }
        setOptArr(value);
        const pop = (
            <>
                {
                    // 处理undefined的情况
                    (value || []).map((x, index) => {
                        for (let i = 0; i < props.options.length; i++) {
                            if (x === props.options[i]['value']) {
                                return <div
                                    key={'popText' + index}>{props.options[i]['content'] ? props.options[i]['content'] : props.options[i]['title']}</div>;
                            }
                        }
                    })
                }
                {
                    value[0] === props.otherKey &&
                    <Form.Item style={{ marginBottom: '0rem' }} name={props.otherName}
                               label={props.otherTitle} {...layout.label5Wrapper19}>
                        <Input disabled/>
                    </Form.Item>
                }
            </>
        );
        setPopContent(pop);
    };
    // 其他输入框值改变的方法
    const onInputChange = (event) => {
        // setInputValue(event.target.value);
    };
    // Popover是否可视的标记
    const handleVisibleChange = (visible) => {
        setVisible(visible);
    };

    useEffect(() => {
        // 处理undefined的情况
        if ((props.form.getFieldValue(props.selectName) || []).indexOf(props.otherKey) !== -1) {
            setShow(true);
        }
        // setInputValue(props.form.getFieldValue(props.otherName));
        setOptArr(props.form.getFieldValue(props.selectName));
        const pop = (
            <>
                {
                    // 处理undefined的情况
                    (props.form.getFieldValue(props.selectName) || []).map((x, index) => {
                        for (let i = 0; i < props.options.length; i++) {
                            if (x === props.options[i]['value']) {
                                return <div
                                    key={'popText' + index}>{props.options[i]['content'] ? props.options[i]['content'] : props.options[i]['title']}</div>;
                            }
                        }
                    })
                }
                {
                    show &&
                    <Form.Item style={{ marginBottom: '0rem' }} name={props.otherName}
                               label={props.otherTitle} {...layout.label5Wrapper19}>
                        <Input disabled/>
                    </Form.Item>
                }
            </>
        );
        setPopContent(pop);
    }, [props.form.getFieldValue(props.selectName), show]);


    return (
        <>
            <Popover content={popContent} visible={(optArr || []).length !== 0 && visible}
                     onVisibleChange={handleVisibleChange}>
                <Form.Item name={props.selectName} label={props.selectTitle} rules={props.rules}>
                    <Select
                        mode={'multiple'}
                        // maxTagTextLength={2}
                        // style={{ width: 240 }}
                        placeholder={props.placeholder || ''}
                        value={optArr}
                        onChange={onChanged}
                        dropdownRender={menu => (
                            <div>
                                {menu}
                                <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                    {show &&
                                    <Form.Item style={{ marginBottom: '0rem' }} name={props.otherName}
                                               label={props.otherTitle}>

                                        <Input style={{ flex: 'auto' }} onKeyDown={(event) => {
                                            event.stopPropagation();
                                        }} onChange={onInputChange}/>
                                    </Form.Item>
                                    }
                                </div>
                            </div>
                        )}
                        allowClear
                        disabled={props.disabled}
                    >
                        {props.options.map(item => (
                            <Select.Option key={item.value}
                                           value={item.value}>{item.content ? item.content : item.title}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Popover>
        </>
    );
};

// export default React.forwardRef(SelectOne);