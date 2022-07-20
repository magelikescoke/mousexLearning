/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Form, Modal, Row,Input, Select, InputNumber, DatePicker } from "dw-mx";
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
    // alert(JSON.stringify(data.map((d,index) => {return {value: index.toString(), content: d.ksmc}})))
    return (
        <Modal title='维护鉴定科室' visible={true} onCancel={onCancel}
            onOk={
                ()=>{
                    const fv = form.getFieldsValue()
                    // alert(JSON.stringify(fv))
                    // alert(JSON.stringify(data))
                    update(data.map((d)=>{
                            if(d.key == info.key) {
                                return fv
                            }
                            return d
                    }))
                    onOk()
                }
            }
        >
            <Form form={form}
            >
                <Row>
                <Form.Item label={'姓名'} name='name' rules={[{ required: true, message: '请输入姓名!' }]} >
                            <Input autoFocus={true}/>
                        </Form.Item>
                </Row>
                <Row>
                    <Form.Item label={'性别'} name={'gender'} rules={[{required: true,message:'请输入性别'}]}>
                        <Select options={Code.STRINGCODE('1:男,2:女')}></Select>
                    </Form.Item>
                </Row>
                <Row>
                    <Form.Item label={'联系方式'} name={'cell'} rules={[{required:true,message:'请输入联系方式'},Rule.TelephoneRule()]}>
                        <InputNumber/>
                    </Form.Item>
                </Row>
                <Row>
                    <Form.Item label={'所属科室'} name={'ksmc'} rules={[{required: true,message:'请输入科室名称'}]}>
                        <Select options={Code.JSONCODE([
                            {value: "1", content: "内科"},
                            {value: "2", content: "外科"},
                            {value: "3", content: "儿科"},
                        ])}/>
                    </Form.Item>
                </Row>
                <Row>
                <Form.Item label={'外出时间'} name='timeOut' rules={[{required: true,message:'请输入外出时间'}]}>
                            <DatePicker picker={'date'} format='YYYY-MM-DD hh:mm:ss'/>
                        </Form.Item>
                </Row>
            </Form>
        </Modal>
    )
}