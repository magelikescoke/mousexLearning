import { Form,Row,Col,Input,Card,Button, Space, Select, } from "dw-mx";
import React, {useEffect, useState} from "react";
import TableLov from "./TableLov";
import { Code } from "dw-mx-extend";
import FormLov from "./FormLov";
import { BasicTable,DateCell,LinkCell,SelectCell } from "dw-mx-table";
import {request} from 'dw-mx-request'

export default function ModalExercise(){
    const [visibility, setVisibility] = useState(false)
    const [visibilityForm,setVisibilityForm] = useState(false)
    const [form] = Form.useForm()
    const [data, setData] = useState([])
    const [rowData, setRowData] = useState({})
    const openLov = () => {
        setVisibility(true)
    }
    const closeLov = () => {
        setVisibility(false)
    }
    const openLovForm = () => {
        setVisibilityForm(true)
    }
    const closeLovForm = () => {
        setVisibilityForm(false)
    }
    const search = async (ksmc) => {
        const ret = await request('/mock/search/docInfo', {ksmc})
        setData(ret)
    }
    const clear =()=>{
        setData([])
    }
    const columns = [
        {
            title:'姓名',
            dataIndex:'name'
        },{
            title:'性别',
            dataIndex:'gender',
            render: (value) => {
                return <SelectCell value={value} options={Code.STRINGCODE("1:男,2:女")} />;
            
            }
        },{
            title:'联系方式',
            dataIndex:'cell'
        },{
            title:'所属科室',
            dataIndex:'ksmc',
            render:(value)=>{
                return <SelectCell value={value} options={Code.JSONCODE([
                    {value: "1", content: "内科"},
                    {value: "2", content: "外科"},
                    {value: "3", content: "儿科"},
                ])}/>;
            }

        },{
            title:'外出时间',
            dataIndex:'timeOut',
            render:(value)=>{
                return <DateCell value={value}
                    mask="YYYY-MM-DD hh:mm:ss"
                    sourceMask="YYYYMMDDhhmmss"
                />
            }
        },{
            title:'操作',
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
    return (
        <div>
            <Card >
                <Form form={form}>
                    <Row>
                    <Col span={6}>
                                <Form.Item name="ksbm" label="科室编号">
                                    <Input.Search onSearch={() => openLov()} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item name="ksmc" label="科室名称">
                                <Select options={Code.JSONCODE([
                                    {value: "1", content: "内科"},
                                    {value: "2", content: "外科"},
                                    {value: "3", content: "儿科"},
                                ])} disabled={true}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>  
                            <Row justify={"end"}>
                                <Space>
                                    <Button type='primary' onClick={()=>{search(form.getFieldValue("ksmc"))}}>查询</Button>
                                    {/* <Button onClick={()=>{alert(form.getFieldValue("ksmc"))}}>查询</Button> */}
                                    <Button onClick={()=>{clear()}}>清空</Button>
                                </Space>
                                </Row>
                            </Col>
                    </Row>
                </Form>
                
            </Card>
            {
                visibility&&<TableLov 
                    onOk = {()=>{closeLov()}}
                    onCancel = {()=>{closeLov()}}
                    setValue = {form.setFieldsValue}
                >
                </TableLov>
            }
            <BasicTable 
            columns={columns}
            dataSource = {data}
            tableNumber={{isShow:true,title:'序号',width:150,align:'center'}}
        >
        </BasicTable>
        {
                visibilityForm&&<FormLov 
                    onOk = {()=>{
                        closeLovForm()
                    }}
                    onCancel = {closeLovForm}
                    update = {setData}
                    data={data}
                    info = {rowData}
                >
                </FormLov>
            }
        </div>
        
    )
}