import React, { ReactNode } from 'react';
import { Button, Card, Cascader, Col, DatePicker, Form, Input, InputNumber, Row, Select, Space } from 'dw-mx';
import layout from '@/pages/utils/layout';
import { Code, DatePickerAdapter } from 'dw-mx-extend';
import { Moment } from 'moment';

export interface TemplateFormProps {
    // Form.useForm(),创建出来的实例
    form: any,
    // form的初始值用于，查看和修改
    initialValues?: Record<string, unknown>,
    // form的Item数组
    formItemList: Array<FormItemProps>
    // 传入form中所有项是否是只读
    isReadOnly?: boolean,
    // 查询方法
    onSearch?: () => void,
    // 重置方法
    reSetData?: () => void
}

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

export default function TemplateForm(props: TemplateFormProps) {
    const { form, initialValues, formItemList, isReadOnly, onSearch, reSetData } = props;
    // 传入数据
    const { RangePicker } = DatePicker;

    return (
        <>
            {/*<Card>*/}
            <Form
                {...layout.label8Wrapper16}
                form={form}
                initialValues={initialValues ? initialValues : {}}
            >
                <Row style={{ padding: '0.12rem 0.08rem' }}>
                    {
                        formItemList.map((value: FormItemProps, index) => {
                            if (value.type == 'input') {
                                return (
                                    <Col span={8} key={'index' + index} hidden={value.hidden ? value.hidden : false}>
                                        <Form.Item label={value.label} name={value.name}
                                                   hidden={value.hidden ? value.hidden : false}
                                                   rules={value.rules ? value.rules : [{ required: false }]}>

                                            <Input maxLength={100}
                                                   addonAfter={value.addonAfter ? value.addonAfter : false}
                                                   addonBefore={value.addonBefore ? value.addonBefore : false}
                                                   prefix={value.prefix ? value.prefix : false}
                                                   suffix={value.suffix ? value.suffix : false}
                                                   placeholder={value.placeholder ? value.placeholder : ''}
                                                   disabled={value.disabled ? value.disabled : (isReadOnly ? isReadOnly : false)}
                                                   allowClear={true} />
                                        </Form.Item>
                                    </Col>
                                );
                            }else if (value.type === 'inputNumber') {
                                return (
                                    <Col span={8} key={'index' + index} hidden={value.hidden ? value.hidden : false}>
                                        <Form.Item label={value.label} name={value.name}
                                                   hidden={value.hidden ? value.hidden : false}
                                                   rules={value.rules ? value.rules : [{ required: false }]}>

                                            <InputNumber maxLength={100}
                                                         formatter={value.formatter ? value.formatter : false}
                                                         parser={value.parser ? value.parser : false}
                                                         placeholder={value.placeholder ? value.placeholder : ''}
                                                         disabled={value.disabled ? value.disabled : (isReadOnly ? isReadOnly : false)}
                                                         allowClear={true} />
                                        </Form.Item>
                                    </Col>
                                );
                            } else if (value.type === 'select') {
                                return (<Col span={8} key={'index' + index} hidden={value.hidden ? value.hidden : false}>
                                    <Form.Item label={value.label} name={value.name}
                                               hidden={value.hidden ? value.hidden : false}
                                               rules={value.rules ? value.rules : [{ required: false }]}>
                                        <Select options={Code.NAMEDCODE.get(value.optionsKey)}
                                                placeholder={value.placeholder ? value.placeholder : ''}
                                                disabled={value.disabled ? value.disabled : (isReadOnly ? isReadOnly : false)}
                                                allowClear={true} />
                                    </Form.Item>
                                </Col>);
                            } else if (value.type === 'selectWithFind') {
                                return (<Col span={8} key={'index' + index} hidden={value.hidden ? value.hidden : false}>
                                    <Form.Item label={value.label} name={value.name}
                                               hidden={value.hidden ? value.hidden : false}
                                               rules={value.rules ? value.rules : [{ required: false }]}>
                                        <Select
                                            showSearch
                                            optionFilterProp='children'
                                            placeholder={value.placeholder ? value.placeholder : '请选择'}
                                            options={Code.NAMEDCODE.get(value.optionsKey)}
                                            disabled={value.disabled ? value.disabled : (isReadOnly ? isReadOnly : false)}
                                            allowClear={true}
                                            filterOption={(input, option) => {
                                                // 注意此处不可用option的label属性，会出现报红，推测原因label属性为label组件，并非字符串
                                                return option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                            }}
                                        />
                                    </Form.Item>
                                </Col>);
                            } else if (value.type === 'rangePicker') {
                                return (<Col span={8} key={'index' + index} hidden={value.hidden ? value.hidden : false}>
                                    <Form.Item label={value.label} name={value.name}
                                               hidden={value.hidden ? value.hidden : false}
                                               rules={value.rules ? value.rules : [{ required: false }]}>
                                        <RangePicker format={'YYYY-MM-DD'}
                                                     disabled={value.disabled ? value.disabled : (isReadOnly ? isReadOnly : false)}
                                                     allowClear={true}
                                                     picker={'date'}
                                                     allowEmpty={value.allowEmpty ? value.allowEmpty : [false, false]}
                                        />
                                    </Form.Item>
                                </Col>);
                            } else if (value.type === 'datePicker') {
                                return (<Col span={8} key={'index' + index} hidden={value.hidden ? value.hidden : false}>
                                    <Form.Item label={value.label} name={value.name}
                                               hidden={value.hidden ? value.hidden : false}
                                               rules={value.rules ? value.rules : [{ required: false }]}>
                                        <DatePickerAdapter sourceMask={'YYYYMMDD'}>
                                            <DatePicker
                                                picker={value.picker ? value.picker : 'date'}
                                                disabledDate={value.disabledDate ? value.disabledDate : null}
                                                disabled={value.disabled ? value.disabled : (isReadOnly ? isReadOnly : false)} />
                                        </DatePickerAdapter>
                                    </Form.Item>
                                </Col>);
                            } else if (value.type === 'cascader') {
                                return (
                                    <Col span={8} key={'index' + index} hidden={value.hidden ? value.hidden : false}>
                                        <Form.Item label={value.label} name={value.name}
                                                   hidden={value.hidden ? value.hidden : false}
                                                   rules={value.rules ? value.rules : [{ required: false }]}>
                                            <Cascader
                                                options={Code.CASCADJSONCODE(value.cascaderOptions)}
                                                changeOnSelect={true}
                                                disabled={value.disabled ? value.disabled : (isReadOnly ? isReadOnly : false)}
                                                allowClear={true}
                                            />
                                        </Form.Item>
                                    </Col>
                                );
                            } else if (value.type === 'button') {
                                // 当配置文件中的type为‘button’时，渲染按钮，span为配置文件中传入的span
                                return (
                                    <Col span={value.span} key={'index' + index}>
                                        <Space style={{ float: 'right' }} key={'indexSpan' + index}>
                                            <Button type={'primary'} onClick={() => {
                                                onSearch();
                                            }}>
                                                查询
                                            </Button>
                                            <Button onClick={() => {
                                                reSetData();
                                            }}>重置</Button>
                                        </Space>
                                    </Col>
                                );
                            } else if (value.type === 'custom') {
                                return (
                                    <Col span={8} key={'index' + index} hidden={value.hidden ? value.hidden : false}>
                                        <Form.Item label={value.label} name={value.name}
                                                   hidden={value.hidden ? value.hidden : false}
                                                   rules={value.rules ? value.rules : [{ required: false }]}>
                                            {value.component}
                                        </Form.Item>
                                    </Col>
                                );
                            } else {
                                throw new Error('当前value的type无对应模板，请检查添加对应项或修改配置文件中相关配置。');
                            }
                        })
                    }
                </Row>
            </Form>
            {/*</Card>*/}
        </>
    );
}