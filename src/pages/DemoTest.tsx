import React from "react";
import { Form, Row, Col, Input, InputNumber,DatePicker, Select, Checkbox, Radio, Cascader, Space, Button, message } from 'dw-mx'
import { NumberMask,Code } from "dw-mx-extend";
import moment from 'moment';
export default function DemoTest() {
    const [form] = Form.useForm()
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 }
    }
    const initValues = {
        name: '张三',
        detail: '我叫张三',
        salary: 5000
    }
    const getValue = async () => {
        try {
            const values = await form.validateFields();
            message.success('成功录入')
            console.log(values)
        } catch (error) {
            message.error(error)
        }
    }
    const disableEndDate = (start, end)=>{
        const startDate = form.getFieldValue(start)
        const endDate = form.getFieldValue(end)
        if(endDate && startDate && (endDate < startDate.startOf('day'))){
            return Promise.reject('end must > start')
        }
        return Promise.resolve()
    }
    return (
        <div>
            <Form 
                form = {form}
                layout = {'horizontal'}
                {...layout}
                initialValues = {initValues}
            >
            <Row>
                <Col span={8}>
                    <Form.Item label={'name'} name={'name'}>
                        <Input placeholder={'请输入'} maxLength={6} allowClear={true} onChange={()=>alert(1)}/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label={'age'} name={'age'}>
                        <Input disabled={true}/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label={'detail'} name={'detail'}>
                        <Input.TextArea showCount={true}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <Form.Item label={'search'} name={'search'}>
                        <Input.Search onSearch={(e)=>alert(e)}/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label={'salary'} name={'salary'}>
                        <InputNumber {...NumberMask('####.00')}/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label={'date0'} name={'date0'}>
                        <DatePicker picker={'date'} format='YYYY-MM-DD'/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <Form.Item label={'date1'} name={'date1'}>
                        <DatePicker.RangePicker/>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item label={'ywlb'} name={'ywlb'}>
                        <Select mode ='multiple' placeholder='请选择'
                            options = {Code.STRINGCODE('1:计划建立,2:待遇支付,3:缴费管理')}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label={'ssjb'} name={'ssjb'}>
                        <Checkbox.Group options={Code.STRINGCODE('1:一级,2:二级,3:三级')}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <Form.Item label={'yxcs'} name={'yxcs'}>
                        <Radio.Group options={Code.STRINGCODE('1:一级,2:二级,3:三级')}/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label={'dqszd'} name={'dqszd'}>
                        <Cascader options={Code.STRINGCODE('1:一级,2:二级,3:三级')}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Row justify="center">
                        <Space>
                            <Button type='primary' onClick={getValue}>取值</Button>
                            <Button type='primary' onClick={()=>{
                                form.setFieldsValue({
                                    name:'小二',
                                    date0: moment(),
                                    yxcs:'1'
                                })
                            }}>填值</Button>
                            <Button type='primary' onClick={()=>{
                                form.resetFields()
                            }}>重置</Button>
                        </Space>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <Form.Item label={'qsrq'} name='qsrq' rules={[{validator:()=>disableEndDate('qsrq','zzrq')}]}>
                        <DatePicker format={'YYYY-MM-DD'} picker={'date'}/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label={'zzrq'} name='zzrq' rules={[{validator:()=>disableEndDate('qsrq','zzrq')}]}>
                        <DatePicker format={'YYYY-MM-DD'} picker={'date'}/>
                    </Form.Item>
                </Col>
            </Row>
            </Form>
        </div>
    )
}