import React, { ReactNode } from 'react';
import { Button, Col, Modal, Row, Space } from 'dw-mx';
import common from '@/pages/common/common';

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

// ModalForm组件的入参类型
export interface TemplateModalProps {
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
    // 子组件
    children: ReactNode,
}

export default function TemplateModal(props: TemplateModalProps) {
    // 接收从父组件传过来的值
    const {
        title,
        maskClosable,
        width,
        className,
        style,
        onCancel,
        buttonList,
        children
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
                {children}
            </Modal>
        </>
    );
}