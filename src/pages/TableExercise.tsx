import React,{useState,useRef, useEffect} from "react";
import { Table, Button,Card,Popconfirm, Space, message} from "dw-mx";
import {Code, Rule} from "dw-mx-extend";
import { NumberCell, SelectCell,DateCell, LinkCell,Sorter,Filter,BasicEditTable, Operation  } from "dw-mx-table";
import { request } from "dw-mx-request";

const dataSource = [{
    key:0,
    name:'Edward King 0',
    age:32,
    address:'London Park Lane no.0',
    date:'20200209',
    status:'2',
    operation:'delete'
},{
    key:1,
    name:'Edward King 1',
    age:32,
    address:'London Park Lane no.1',
    date:'20200809',
    status:'2',
    operation:'delete'
},{
    key:2,
    name:'Edward King 2',
    age:32,
    address:'London Park Lane no.2',
    date:'20200209',
    status:'2',
    operation:'delete'
},{
    key:3,
    name:'Edward King 3',
    age:32,
    address:'London Park Lane no.3',
    date:'20200809',
    status:'2',
    operation:'delete'
},{
    key:4,
    name:'Edward King 4',
    age:32,
    address:'London Park Lane no.4',
    date:'20200209',
    status:'2',
    operation:'delete'
},{
    key:5,
    name:'Edward King 5',
    age:32,
    address:'London Park Lane no.5',
    date:'20200809',
    status:'2',
    operation:'delete'
}]
export default function TableExercise() {
    const [count, setCount] = useState(0)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [pagination, setPagination] = useState({
        current:1,
        pageSize:4,
        total:0,
    })
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    // const [show, setShow] = useState(false)
    const dataRef = useRef()

    dataRef.current = data
    const getTableData = (newData) => {
        setData(newData)
    }
    const validateFieldsRef = useRef();
    const validate = async () => {
        const value = await validateFieldsRef.current.tableValidateFields();
        console.log(value)
        if(value.message) {
            message.error('校验未通过')
        }else{
            message.success('校验通过')
        }
    }
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys)
        }
    }
    const addData = {
            key: count,
            name:`Edward King ${count}`,
            age:32,
            address:'London Park Lane no.5',
            date:'20200809',
            status:'2',
            operation:'delete'
    }
    const addRow = ()=>{
        const datas = Operation.addRow(data, addData)
        setCount(count+1)
        setData(datas)
    }
    const addAll = () => {
        if(data.length == 0) {
            setData(dataSource)
            setCount(dataSource.length)
        }
        alert(JSON.stringify(data))
    }
    const opDelete = key => {
        const dataSo = dataRef.current;
        const ret = dataSo.filter(item => item.key !== key)
        setData(ret)
    };
   
    const columns = [{
            title:'name',
            dataIndex:'name',
            align:'center',
            editable: true,
            componentType:{
                type: 'Input',
                props:{
                    required: true,
                    message: 'name是必填项',
                    rule:Rule.ChnEngRule()
                }
            }
        },{
            title:'age',
            dataIndex:'age',
            align:'center',
            editable: true,
            componentType:{
                type: 'InputNumber',
            }
        },{
            title:'address',
            dataIndex:'address',
            align:'center',
            editable: true,
            componentType:{
                type: 'Input.TextArea',
            }
        },{
            title:'date',
            dataIndex:'date',
            align:'center',
            render:(value) => {
                return <DateCell value={value} mask={'YYYY-MM-DD'} sourceMask={'YYYYMMDD'}/>
            },
            editable: true,
            componentType:{
                type: 'DatePicker',
                props:{
                    format: 'YYYY-MM-DD'
                }
            }
        },{
            title:'任务状态',
            dataIndex:'status',
            align:'center',
            editable: true,
            render:(value) => {
                return <SelectCell align={'center'} value={value} options={Code.JSONCODE([
                    { value: '1', content: '已完成' },
                    { value: '2', content: '未完成' },
                    { value: '3', content: '已作废' },
                ])}/>
            },
            componentType:{
                type: 'Select',
                props:{
                    options:Code.JSONCODE([
                        { value: '1', content: '已完成' },
                        { value: '2', content: '未完成' },
                        { value: '3', content: '已作废' },
                    ])
                }
            }
        },{
            title:'operation',
            dataIndex:'operation',
            align:'center',
            render: (text, record) =>
                dataRef.current && dataRef.current.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => opDelete(record.key)}>
                        <a>Delete</a>
                    </Popconfirm>
                ) : null,
    
        }]
        const handleDelete = () => {
            const ret = Operation.batchDeletion(data,selectedRowKeys)
            setSelectedRowKeys([])
            setData(ret)
        };
        const getData = async()=>{
            const ret = await request('/mock/table/test')
            setData(ret)
            setCount(count+ret.length)
        }
        useEffect(() => {
            // getData()
            // setCount(count+data.length)
            fetch(1,4)
        },[])
        
        // const showData = ()=>{
        //     setShow(!show)
        // }
        const lazyLoading = (pagination)=>{
            fetch(pagination.current,pagination.pageSize)
        }
        const fetch = (current, pageSize)=>{
            setLoading(true);
            request('/mock/table/testPage',{
                current,
                pageSize
            }).then(ret=>{
                setPagination({
                    current,
                    pageSize,
                    total:ret.total
                })
                setData(ret.data)
                setLoading(false);
            })
        }
    return (
        <div>
            <Card
                title={'数据操作'}  
                extra={
                <div>
                    <Space>
                    <Button type='primary' onClick={addAll}> 查询 </Button>
                    <Button type='primary' onClick={addRow}> 添加 </Button>
                    <Button type='primary' onClick={handleDelete}> 删除 </Button>
                    <Button type='primary' onClick={validate}> 校验 </Button>
                    {/* <Button type='primary' onClick={showData}>隐藏数据展示</Button> */}
                    </Space>
                </div>
            }></Card>
            <BasicEditTable
            // rowSelection={{ ...rowSelection, }}
            dataSource={data}
            columns={columns}
            // columns={show ? [{title:'隐藏数据',dataIndex:'innerData'},...columns] : columns}
            ref={validateFieldsRef}
            rowSelection={{...rowSelection}}
            tableNumber={{isShow:true,title:'序号列',width:150,align:'center'}}
            loading={loading}
            pagination={pagination}
            onChange={(pagination)=>{lazyLoading(pagination)}}
            getChildValues={getTableData}/>

            {/* <Table dataSource={dataSource} columns={columns}>

            </Table> */}
        </div>
    )
}
