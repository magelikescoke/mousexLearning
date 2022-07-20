import React from "react";
import { Form, Row, Col, Input, InputNumber,DatePicker, Select, Checkbox, Radio, Cascader, Space, Button, message, TreeSelect } from 'dw-mx'
import moment from 'moment';
import { NumberMask,Code } from "dw-mx-extend";
export default function FormExercise() {
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
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
    const [form] = Form.useForm()
    const {TreeNode} = TreeSelect
    const initValues = {
        name: '阿四',
        birthday: moment(new Date('2022.07.01'),'YYYY-DD-MM'),
        area:['6'],
        nationality:'1',
        salary: 2000.00,
        businessType:['1','2'],
        level:['1','2'],
        targetCity:'1',
        currentArea:['3', '6', '9'],
        detail:'姓名：阿四'
    }
    const addedValues = {
        name: '阿三',
        birthday: moment(new Date('2022.08.03'),'YYYY-DD-MM'),
        area:['5'],
        nationality:'1',
        salary: 20000.00,
        businessType:['1'],
        level:['1','2'],
        targetCity:'1',
        currentArea:['2', '5', '8'],
        detail:'姓名：阿四'
    }
    const jsonCascadeCode = [
        { value: '1', content: '浙江',children:[{value:'4',content:'杭州',children:[{value:'7',content:'西湖'}]}] },
        { value: '2', content: '山东',children:[{value:'5',content:'济南',children:[{value:'8',content:'大明湖'}]}] },
        { value: '3', content: '江苏',children:[{value:'6',content:'南京',children:[{value:'9',content:'秦淮河'}]}] }
    ]
    return (
        <div>
              <Form 
                form = {form}
                layout = {'horizontal'}
                {...layout}
                initialValues = {initValues}>
                <Row>
                    <Col span={8}>
                        <Form.Item label={'姓名'} name='name' rules={[{ required: true, message: '请输入姓名!' }]} >
                            <Input autoFocus={true}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label={'出生日期'} name='birthday'>
                            <DatePicker picker={'date'} format='YYYY-MM-DD'/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label={'归属地'} name='area'>
                            {/* <TreeSelect treeData={treeData}/> */}
                            <TreeSelect showSearch>
                                <TreeNode value='1' title='山东'>
                                    <TreeNode value='2' title='济南'/>
                                    <TreeNode value='3' title='烟台'/>
                                </TreeNode>
                                <TreeNode value='4' title='江苏'>
                                    <TreeNode value='5' title='南京'/>
                                    <TreeNode value='6' title='苏州'/>
                            </TreeNode>
                            </TreeSelect>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Form.Item label={'民族'} name='nationality'>
                            <Checkbox.Group options={Code.STRINGCODE('1:汉族,2:回族,3:满族')}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label={'薪资'} name='salary'>
                            <InputNumber {...NumberMask('####.00')}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label={'业务类型'} name='businessType' rules={[{ required: true, message: '请输入业务类型!' }]}>
                            <Select mode={'multiple'}  options={Code.STRINGCODE('1:计划建立,2:缴费管理')}/>
                        </Form.Item>
                    </Col> 
                </Row>
                <Row>
                    <Col span={8}>
                        <Form.Item label={'所属级别'} name='level' rules={[{ required: true, message: '请输入所属级别!' }]}>
                            <Checkbox.Group options={Code.STRINGCODE('1:一级,2:二级,3:三级')} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label={'意向城市'} name='targetCity' rules={[{ required: true, message: '请输入意向城市!' }]}>
                            <Radio.Group options={Code.STRINGCODE('1:济南,2:北京,3:南京,4:合肥') } />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label={'当前所在地'} name='currentArea'  labelCol= {{ span: 2 }} wrapperCol= {{ span: 22 }}>
                            <Cascader options={Code.CASCADJSONCODE(jsonCascadeCode)}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label={'个人情况说明'} name='detail' labelCol= {{ span: 2 }} wrapperCol= {{ span: 22 }}>
                            <Input.TextArea/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                <Col span={24}>
                    <Row justify="end">
                        <Space>
                            <Button type='primary' onClick={getValue}>取值</Button>
                            <Button type='primary' onClick={()=>{
                                form.setFieldsValue(
                                    addedValues
                                )
                            }}>填值</Button>
                        </Space>
                    </Row>
                </Col>
            </Row>
                </Form>
        </div>
    )
}