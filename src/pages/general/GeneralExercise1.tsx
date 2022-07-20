import { Form,Row,Col, Input,Select, TreeSelect, InputNumber, Checkbox, Radio, Cascader, Space, Button, Card, } from "dw-mx";
import { Code, NumberMask, } from "dw-mx-extend";
import { request } from "dw-mx-request";
import { BasicTable,DateCell,LinkCell, SelectCell } from "dw-mx-table";
import React, { useState } from "react";
import FormLov from "./FormLov";
import TableLov from "./TableLov";

export default function GeneralExercise1(){
    const [form] = Form.useForm()
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
    }
    const initialValue = {
        name: '阿四',
        gender:'2',
        area:'2',
        nationality:'1',
        salary:5000,
        businessType:['3','4'],
        level:['1','3'],
        targetCity:'1',
        ksbm:'2',
        ksmc:'儿科',
        currentArea:['3', '6', '9'],
    }
    const [visibility,setVisibility] = useState(false)
    const [visibilityForm,setVisibilityForm] = useState(false)
    const [rowData, setRowData] = useState({})
    const openLovForm = () => {
           setVisibilityForm(true)
       }
       const closeLovForm = () => {
           setVisibilityForm(false)
       }
    const openLov = () => {
        setVisibility(true)
    }
    const closeLov = () => {
        setVisibility(false)
    }
    const [data, setData] = useState([])
    const columns = [
        {
            title:'姓名:',
            dataIndex:'name'
        },{
            title:'性别:',
            dataIndex:'gender',
            render: (value) => {
                return <SelectCell value={value} options={Code.STRINGCODE("1:男,2:女")} />;
            
            }
        },{
            title:'联系方式：',
            dataIndex:'cell'
        },{
            title:'所属科室：',
            dataIndex:'ksmc',
            render:(value)=>{
                return <SelectCell value={value} options={Code.JSONCODE([
                    {value: "内科", content: "内科"},
                    {value: "外科", content: "外科"},
                    {value: "儿科", content: "儿科"},
                ])}/>;
            }

        },{
            title:'外出时间：',
            dataIndex:'timeOut',
            render:(value)=>{
                return <DateCell value={value}
                    mask="YYYY-MM-DD HH:mm:ss"
                    sourceMask="YYYYMMDDHHmmss"
                />
            }
        },{
            title:'操作：',
            dataIndex:'operation',
            render:(_,record)=>{
                return <LinkCell 
                align="center"
                value='修改' onclick={()=>{
                    setRowData(record)
                    openLovForm()
                }}/>
            }
        },
    ]
    const clear =()=>{
        form.resetFields()
        setData([])
    }
    const getDataSource = async() => {
        setData(await request('/mock/search/perInfo'))
    }
    const search = ()=>{
        // alert('查询')
        // setData(ret)
        form.validateFields()
        getDataSource()
    }
    return (
        <div>
            <div>
            <Form form={form}
                layout = {'horizontal'}  {...layout}
            >
            <Row>
                    <Col span="8" >
                        <Form.Item label={'专家名称：'} name={'name'} rules={[{required: true,message: '请输入专家姓名'}]}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span="8" >
                        <Form.Item label={'性别：'} name={'gender'} rules={[{required: true,message: '请输入性别'}]}>
                            <Select options={Code.STRINGCODE('1:男,2:女')}></Select>
                        </Form.Item>
                    </Col>
                    <Col span="8" >
                        <Form.Item label={'归属地：'} name={'area'}>
                        <TreeSelect showSearch>
                                <TreeSelect.TreeNode value='1' title='山东'>
                                    <TreeSelect.TreeNode value='2' title='济南'/>
                                    <TreeSelect.TreeNode value='3' title='烟台'/>
                                </TreeSelect.TreeNode>
                                <TreeSelect.TreeNode value='4' title='江苏'>
                                    <TreeSelect.TreeNode value='5' title='南京'/>
                                    <TreeSelect.TreeNode value='6' title='苏州'/>
                            </TreeSelect.TreeNode>
                            </TreeSelect>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span="8" >
                        <Form.Item label={'民族：'} name={'nationality'} rules={[{required: true,message: '请输入民族'}]}>
                            <Select options={Code.STRINGCODE('1:汉族,2:回族,3:满族')}></Select>
                        </Form.Item>
                    </Col>
                    <Col span="8" >
                        <Form.Item label={'薪资：'} name={'salary'}>
                            <InputNumber {...NumberMask('####.00')}/>
                        </Form.Item>
                    </Col>
                    <Col span="8" >
                        <Form.Item label={'业务类型：'} name={'businessType'} rules={[{required: true,message: '请输入业务类型'}]}>
                            <Select mode={'multiple'}  options={Code.STRINGCODE('1:计划建立,2:缴费管理,3:交易处理,4:匹配处理')}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span="8" >
                        <Form.Item label={'所属级别：'} name={'level'} rules={[{required: true,message: '请输入民族'}]}>
                            <Checkbox.Group options={Code.STRINGCODE('1:一级,2:二级,3:三级')}/>
                        </Form.Item>
                    </Col>
                    <Col span="8" >
                        <Form.Item label={'意向城市：'} name={'targetCity'} rules={[{required: true,message: '请输入意向城市'}]}>
                            <Radio.Group options={Code.STRINGCODE('1:济南,2:北京,3:南京,4:合肥') } />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item name="ksbm" label="科室编号：" labelCol= {{ span: 4 }}
                            wrapperCol= {{ span: 20 }}>
                            <Input.Search onSearch={()=>{openLov()}} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="ksmc" label="科室名称：" labelCol= {{ span: 4 }}
                            wrapperCol= {{ span: 20 }}>
                            <Input readOnly={true}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item name="currentArea" label="当前所在地：" labelCol= {{ span: 4 }}
                            wrapperCol= {{ span: 20 }}>
                            <Cascader options={Code.CASCADJSONCODE([
                                { value: '1', content: '浙江',children:[{value:'4',content:'杭州',children:[{value:'7',content:'西湖'}]}] },
                                { value: '2', content: '山东',children:[{value:'5',content:'济南',children:[{value:'8',content:'大明湖'}]}] },
                                { value: '3', content: '江苏',children:[{value:'6',content:'南京',children:[{value:'9',content:'秦淮河'}]}] }
                            ])}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item name="detail" label="个人情况说明：" labelCol= {{ span: 2 }}
                            wrapperCol= {{ span: 22 }}>
                            <Input.TextArea/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify="end">
                    <Space>
                        <Button type='primary' onClick={()=>{alert(JSON.stringify(form.getFieldsValue()))}}>取值</Button>
                        <Button type='primary' onClick={() => {form.setFieldsValue(initialValue)}}>填值</Button>
                    </Space>
                </Row>
            </Form>
            </div>
            {visibility && <TableLov 
                update = {form.setFieldsValue}
                getInfo = {form.getFieldsValue}
                onCancel = {closeLov}
                onOK = {closeLov}
            >
                </TableLov>}
                <div margin-top='10px'>
                <Card title='个人信息'
                    extra={
                        <div>
                            <Space>
                                <Button type='primary' onClick={()=>{search()}}>查询</Button>
                                <Button type='primary' onClick={() => {clear()}}>清空</Button>
                            </Space>
                        </div>
                    }
                >
                    <BasicTable
                    // title={"个人信息"}
                    dataSource={data}
                    columns={columns}
                    tableNumber={{isShow:true,title:'序号',width:150,align:'center'}}
                >
                </BasicTable>
                </Card>
                
                </div>
                {
                visibilityForm&&<FormLov 
                    onOk = {()=>{
                        closeLovForm()
                    }}
                    onCancel = {()=>{closeLovForm()}}
                    update = {setData}
                    data={data}
                    info = {rowData}
                >
                </FormLov>
            }
        </div>
    )
}