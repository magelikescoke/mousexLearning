import React, { ReactNode, useImperativeHandle } from 'react';
import { Button, Col, Form, Modal, Row, Space } from 'dw-mx';
import common from '@/pages/common/common';
import TemplateForm from '@/components/templateComponent/TemplateForm';
import { Moment } from 'moment';
import func from '@/pages/utils/func';

// Modal的footer的button属性
export interface ModalFooterButton {
    // button样式
    type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default'
    // button的触发事件
    option: () => void,
    // button的显示标题
    title: string,
    // 是否能够看到button
    visible?: boolean
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

// ModalForm组件的入参类型
export interface TemplateModalFormProps {
    // modal标题名称
    title?: string,
    // 点击蒙层是否允许关闭
    maskClosable?: boolean,
    // 宽度
    width?: string | number,
    // CSS样式类选择器
    className?: string,
    // CSS样式
    style?: any,
    // 点击遮罩层或右上角叉或取消按钮的回调
    onCancel: () => void,
    // modal的footer的button配置，自带关闭按钮不需要配置关闭
    buttonList: Array<ModalFooterButton>,
    // modal的内置form的Item配置
    formItemList: Array<FormItemProps>,
    // form的初始值,用于查看和修改
    initialValues?: Record<string, unknown>,
    isReadOnly?: boolean
}

// export default function TemplateModalForm(props: TemplateModalFormProps) {
const TemplateModalForm = (props: TemplateModalFormProps, ref) => {
    // 暴露给父组件的方法
    useImperativeHandle(ref, () => ({
        // 提交验证方法，返回值为{flag:(true通过校验/false未通过校验),result:{...表单数据，未通过时为空对象}}
        submit: async () => {
            return await func.validateForm(form).then(res => res);
        },
        // 获取调用此函数值表单的数据
        getFormValues: () => {
            return form.getFieldsValue();
        }
    }));
    // 存储表单的值
    const [form] = Form.useForm();
    // 接收从父组件传过来的值
    const {
        title,
        maskClosable,
        width,
        className,
        style,
        onCancel,
        buttonList,
        formItemList,
        initialValues,
        isReadOnly
    } = props;

    return (
        <>
            <Modal
                title={title ? <h3>{title}</h3> : false}
                visible={true}
                maskClosable={maskClosable ? maskClosable : false}
                width={width ? width : common.modWidthLv1}
                className={className ? className : null}
                style={style ? style : null}
                onCancel={onCancel}
                footer={
                    <Row align={'middle'} justify={'center'} key={'modalFooterRow'}>
                        <Col key={'modalFooterCol'}>
                            <Space key={'modalFooterSpace'}>
                                {
                                    buttonList.map((value, index) => {
                                        // button不可见的场景
                                        if ((value.visible !== null && value.visible !== undefined) && value.visible === false) {
                                            return null;
                                        } else {
                                            return <Button
                                                type={value.type ? value.type : 'default'}
                                                key={'modalFooterButton' + index}
                                                onClick={value.option}>{value.title}</Button>;
                                        }
                                    })
                                }
                                <Button onClick={onCancel}>关闭</Button>
                            </Space>
                        </Col>
                    </Row>
                }
            >
                <TemplateForm initialValues={initialValues ? initialValues : {}} form={form}
                              formItemList={formItemList} isReadOnly={isReadOnly ? isReadOnly : false} />
            </Modal>
        </>
    );
};
export default React.forwardRef(TemplateModalForm);