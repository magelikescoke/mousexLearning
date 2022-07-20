import { Button, Col, Form, Input, Row, Select, Space } from 'dw-mx';
import { Code } from 'dw-mx-extend';
import { request } from 'dw-mx-request';
import { BasicTable, DateCell, LinkCell, SelectCell } from 'dw-mx-table';
import React, { useState } from 'react';
import ShowPDF from './ShowPDF';

export default function PDFPreview(){
    const [form] = Form.useForm()
    const [data,setData] = useState([])
    const [visibility,setVisibility] = useState(false)
    const layout = {
        labelCol:{ span:8},
        wrapperCol:{ span:18}
    }
    const reset = ()=>{
        form.resetFields()
        setData([])
    }
    const search = ()=>{
        getInfo()
    }
    const openLov = () => {
        setVisibility(true)
    }
    const closeLov = () => {
        setVisibility(false)
    }
    const getInfo = async ()=>{
        setData(await request('/mock/wangxinlong/workerInfo',form.getFieldsValue()))
    }
    const preview = ()=>{
        openLov()
    }
    const columns = [
        {
            dataIndex:'unitName',
            title: '单位名称',
            width:70,
        },{
            dataIndex:'cardNum',
            title: '证件号码',
            width:100,
        },{
            dataIndex:'name',
            title: '姓名',
            width:50,
        },{
            dataIndex:'gender',
            title: '性别',
            width:50,
            render:(value)=>{
                return <SelectCell value={value} options={Code.STRINGCODE('1:男性,2:女性')}/>
            }
        },{
            dataIndex:'birth',
            title: '出生日期',
            width:100,
            render:(value)=>{
                return <DateCell value={value} mask='YYYY-MM-DD' sourceMask='YYYYMMDD'/>
            }
        },{
            dataIndex:'nationality',
            title: '民族',
            width:50,
            render:(value)=>{
                return <SelectCell value={value} options={Code.STRINGCODE('1:汉族,2:回族,3:满族,4:蒙古族')}/>
            }
        },{
            dataIndex:'status',
            title: '人员状态',
            width:60,
            render:(value)=>{
                return <SelectCell value={value} options={Code.STRINGCODE('1:在职,2:调出')}/>
            }
        },{
            dataIndex:'workType',
            title: '岗位类别',
            width:100,
            render:(value)=>{
                return <SelectCell value={value} options={Code.STRINGCODE('1:专业技术岗位,2:管理岗位,3:不定岗')}/>
            }
        },{
            dataIndex:'level',
            title: '岗位等级',
            width:100,
            render:(value)=>{
                return <SelectCell value={value} options={Code.STRINGCODE('1:试用期（专业技术岗位）,2:试用期（管理岗位）,3:专技十级,4:管理九级')}/>
            }
        },{
            dataIndex:'workTime',
            title: '参加工作时间',
            width:100,
            render:(value)=>{
                return <DateCell value={value} mask='YYYY-MM-DD' sourceMask='YYYYMMDD'/>
            }
        },{
            dataIndex:'operation',
            title: '操作',
            width:50,
            render:()=>{
                return <LinkCell value='打印' onclick={
                    ()=>{
                        preview()
                    }
                }/>
            }
        },
    ]
    return (<div>
        <Form form={form} layout={'horizontal'} {...layout}>
            <Row>
                <Col span={8}>
                    <Form.Item label='证件号码' name='cardNum'>
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label='姓名' name='name'>
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label='人员状态' name='status'>
                        <Select options={
                            Code.STRINGCODE('1:在职,2:调出')
                        }/>
                    </Form.Item>
                </Col>
            </Row>
            <Row justify='end'>
                <Space>
                    <Button type='primary' onClick={search}>查询</Button>
                    <Button onClick={reset}>重置</Button>
                </Space>
            </Row>
        </Form>
        <BasicTable
            dataSource={data}
            columns={columns}
            showNumber={{isShow:true,title:'No.',width:150,align:'center'}}
        >
        </BasicTable>
        {visibility && <ShowPDF 
        
            onCancel={closeLov}
            onOk = {closeLov}
            >
            </ShowPDF>
        }
    </div>)
}