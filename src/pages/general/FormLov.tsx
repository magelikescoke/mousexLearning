/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Form, Modal, Row,Input, Select, InputNumber, DatePicker, Col } from "dw-mx";
import { Code,Rule } from "dw-mx-extend";
import {request} from 'dw-mx-request'
import React, { useEffect,useState } from "react";
export default function FormLov(props) {
    const {onOk, onCancel, update, info,data} = props
    const [form] = Form.useForm()
    useEffect(
        ()=>{
            form.setFieldsValue(info)
        },
        []
    )
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 24 }
    }
    return (
        <Modal title='维护个人信息' visible={true} onCancel={onCancel}
            onOk={
                async ()=>{
                    await form.validateFields()
                    const fv = form.getFieldsValue()
                    update(data.map((d)=>{
                            if(d.key == info.key) {
                                fv.key = info.key
                                return fv
                            }
                            return d
                    }))
                    onOk()
                }
            }
        >
            <Form form={form}
            layout = {'horizontal'}
            {...layout}
            >
                <Row>
                    <Col span="24">
                    <Form.Item label={'姓名'} name='name' rules={[{ required: true, message: '请输入姓名!' }]} >
                                <Input/>
                            </Form.Item>
                    </Col>
                    </Row>
                <Row>
                <Col span="24">

                    <Form.Item label={'性别'} name={'gender'} rules={[{required: true,message:'请输入性别'}]}>
                        <Select options={Code.STRINGCODE('1:男,2:女')}></Select>
                    </Form.Item>
                    </Col>
                </Row>
                <Row>
                <Col span="24">

                    <Form.Item label={'联系方式'} name={'cell'} rules={[{required:true,message:'请输入联系方式'},Rule.TelephoneRule()]}>
                        <InputNumber/>
                    </Form.Item>
                    </Col>

                </Row>
                <Row>
                <Col span="24">

                    <Form.Item label={'所属科室'} name={'ksmc'} rules={[{required: true,message:'请输入科室名称'}]}>
                        <Select options={Code.JSONCODE([
                            {value: "内科", content: "内科"},
                            {value: "外科", content: "外科"},
                            {value: "儿科", content: "儿科"},
                        ])}/>
                    </Form.Item>
                    </Col>

                </Row>
                <Row>
                <Col span="24">

                <Form.Item label={'外出时间'} name='timeOut' rules={[{required: true,message:'请输入外出时间'}]}>
                            <DatePicker picker={'date'} format='YYYY-MM-DD hh:mm:ss'/>
                        </Form.Item>
                    </Col>

                </Row>
            </Form>
        </Modal>
    )
}