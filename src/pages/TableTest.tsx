import React,{useState,useRef} from "react";
import { Table, Button,Card} from "dw-mx";
import {Code} from "dw-mx-extend";
import { NumberCell, SelectCell,DateCell, LinkCell,Sorter,Filter,BasicEditTable, Operation  } from "dw-mx-table";
import moment from "moment";
const dataSource = [
    {
        key: 1,
        name: 'wxl',
        age: 20,
        address:'河南省洛阳市',
        salary:8000,
        work: [1,2,6],
        // birth: new Date()
        birth: '20000803',
        selfIndex: '123456'
    },
    {
        key: 2,
        name: 'wxl',
        age: 20,
        address:'河南省郑州市',
        salary:6000,
        work: [1,2,6],
        // birth: new Date()
        birth: '20000804',
        selfIndex: '123456'
    },
    {
        key: 3,
        name: 'wxl',
        age: 20,
        address:'河南省周口市',
        salary:10000,
        work: [1,2,6],
        // birth: new Date()
        birth: '20000805',
        selfIndex: '123456'
    }
]


const columns = [
    {
        ellipsis: true,//超长内容省略
        title: '姓名',
        dataIndex: 'name',
        align: 'center',
    },
    {
        title: '年龄',
        dataIndex: 'age',  
        align: 'center',
    },
    {
        title: '地址',
        dataIndex: 'address',  
        align: 'center',
        // filters:[
        //     {
        //         text:'洛阳市',
        //         value:"河南省洛阳市"
        //     },
        //     {
        //         text:'郑州市',
        //         value:"河南省郑州市"
        //     },
        // ],
        // onFilter:(value, record)=>{
        //     return record.address.indexOf(value) != -1
        // },
        // ...Filter.dateFilter('birth','YYYY-MM-DD')
        ...Filter.dateFilter('birth',undefined)
    },
    {
        title:'薪资',
        dataIndex:'salary',
        align: 'center',
        // sorter:(a,b) => a.salary - b.salary,
        sorter:Sorter.sortNumber('salary'),
        sortDirections: ['ascend','descend'],
        render:(value) => {
            return <NumberCell value={value} mask = {'0.00'} align='center'/>
        },
        editable: true,
        componentType:{
            type: 'InputNumber',
            props:{

            }
        },
    },
    {
        title: '工作职责',
        align: 'center',
        dataIndex: 'work',
        render: (value) =>{
            return <SelectCell value={value} separator='/' options={Code.STRINGCODE('1:计划建立,2:待遇支付,3:缴费管理,4:交易处理,5:交易处理,6:匹配处理,7:计划管理,8:单位管理,9:人员管理,10:考核管理')}/>
        }
    },
    {
        title:'生日',
        dataIndex:'birth',
        render: (value) =>{
            // return <DateCell value={value} mask='YYYY-MM-DD hh:mm:ss 星期dd'/>
            return <DateCell value={value} mask='YYYY-MM-DD' sourceMask="YYYYMMDD"/>
        },
        editable: true,
        componentType:{
            type: 'DatePicker',
            props:{
                format: 'YYYY-MM-DD'
            }
        },
        sorter:Sorter.sortDate('birth',undefined),
        sortDirections: ['ascend','descend'],

    },
    {
        title: '主页',
        dataIndex:'selfIndex',
        render: (value)=>{
            return <LinkCell value={value} onclick={()=>{
                alert(value)
            }}/>
        }
    }
]

export default function TableTest() {
    const [data, setData] = useState(dataSource)
    const [count, setCount] = useState(dataSource.length)

    const getTableData = (newData) => {
        setData(newData)
        console.log(newData)
    }
    const validateFieldsRef = useRef();
    const validate = async () => {
        const value = await validateFieldsRef.current.tableValidateFields();
        console.log(value)
    }
    const addRow = ()=>{
        const newData = Operation.addRow(data,{
            key: count+1,
            name: 'wxl',
            age: 20,
            address:'河南省郑州市',
            salary:6000,
            work: [1,2,6],
            birth: '20000804',
            selfIndex:'123456'
        })
        setData(newData)
        setCount(count+1)
    }
    // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    // const rowSelection = {
    //     selectedRowKeys,
    //     onChange: (selectedRowKeys) => {
    //         setSelectedRowKeys(selectedRowKeys);
    //     },
    // };
    return (
        <div>
            <Card extra={
                <div>
                    <Button onClick={validate}> 校验 </Button>
                    <Button onClick={addRow}> 添加 </Button>
                </div>
            }></Card>
            <BasicEditTable
            // rowSelection={{ ...rowSelection, }}
            dataSource={data}
            columns={columns}
            ref={validateFieldsRef}
            getChildValues={getTableData}/>

            {/* <Table dataSource={dataSource} columns={columns}>

            </Table> */}
        </div>
    )
}