import { Button, Col, Form, Input, Row, Select, Space } from "dw-mx";
import { Code } from "dw-mx-extend";
import { request } from "dw-mx-request";
import { BasicTable, DateCell, SelectCell } from "dw-mx-table";
import React, { useState } from "react";
export default function PersonInfoQueryMain() {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [pagination, setPagination] = useState({
        current:1,
        pageSize:10,
        total:0,
    })
    const layout={
        labelCol:{ span: 6 },
        wrapperCol:{ span: 18 }
    }
    // const search = ()=>{
    //     getInfo()
    // }
    // const getInfo=async ()=>{
    //     setData(await request('/mock/exercise2/personInfo',form.getFieldsValue()))
    // }
    const resetPage = ()=>{
        form.resetFields()
        setData([])
        setPagination({
            current:1,
            pageSize:10,
            total:0,
        })
    }
    const lazyLoading = (pagination)=>{
        fetch(pagination.current, pagination.pageSize)
    }
    const search = ()=>{
        setPagination({
            current:1,
            pageSize:10,
            total:0,
        })
        fetch(pagination.current,pagination.pageSize)

    }
    const fetch = (current, pageSize)=>{
        setLoading(true);
        request('/mock/exercise2/personInfo',{
            current,
            pageSize,
            ...form.getFieldsValue()
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
    // const onShowSizeChange = (current, pageSize)=>{
    //     setPagination({
    //         current,
    //         pageSize,
    //         total:pagination.total
    //     })
    // }
    const columns = [
        {
            dataIndex:'unitName',
            title:'单位名称',
            width:100,
        },{
            dataIndex:'cardType',
            title:'证件类型',
            width:100,
            render:(value)=>{
                return <SelectCell value={value} options={Code.STRINGCODE('1:居民身份证（户口簿）,2:护照')}/>
            }
        },{
            dataIndex:'cardNum',
            width:100,
            title:'证件号码'
        },{
            dataIndex:'name',
            width:100,
            title:'姓名'
        },{
            dataIndex:'birthday',
            title:'出生日期',
            width:100,
            render:(value)=>{
                return <DateCell value={value} sourceMask="YYYYMMDD" mask="YYYY-MM-DD" align="left"/>
            }
        },{
            dataIndex:'gender',
            title:'性别',
            width:100,
            render: (value) => {
                return <SelectCell value={value} options={Code.STRINGCODE("1:男,2:女")} />;
            }
        },{
            dataIndex:'nationality',
            title:'民族',
            width:100,
            render: (value) => {
                return <SelectCell value={value} options={Code.STRINGCODE("1:汉族,2:回族,3:满族")} />;
            }
        },{
            dataIndex:'workType',
            title:'岗位类别',
            width:100,
            render: (value) => {
                return <SelectCell value={value} options={Code.STRINGCODE('1:专业技术岗位,2:管理岗位,3:不定岗')} />;
            }
        },{
            dataIndex:'level',
            width:100,
            title:'岗位等级'
        },{
            dataIndex:'status',
            title:'人员状态',
            width:100,
            render: (value) => {
                return <SelectCell value={value} options={Code.STRINGCODE('1:在职,2:调出,3:辞职')} />;
            }
        },{
            dataIndex:'telephone',
            width:100,
            title:'联系电话'
        },
    ]
    return (
        <div>
            <Form
                form={form}
                layout={'horizontal'}
                {...layout}
            >
                <Row>
                    <Col span={8}>
                        <Form.Item name='cardType' label='证件类型'>
                            <Select options={Code.STRINGCODE('1:居民身份证（户口簿）,2:护照')}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item  name='cardNum' label='证件号码'>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name='name' label='姓名'>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Form.Item name='workType' label='岗位类别'>
                            <Select options={Code.STRINGCODE('1:专业技术岗位,2:管理岗位,3:不定岗')}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify='end'>
                    <Space>
                        <Button type='primary' onClick={()=>{search()}}>查询</Button>
                        <Button onClick={()=>{resetPage()}}>重置</Button>
                    </Space>
                </Row>
            </Form>
            <BasicTable 
                dataSource={data}
                columns={columns}
                pagination={{
                    ...pagination,
                    showQuickJumper:true,
                    showSizeChanger:true,
                    // onShowSizeChange:onShowSizeChange,
                    // onChange:(pageNumber)=>{
                    //     setPagination({
                    //         current:pageNumber,
                    //         pageSize:pagination.pageSize,
                    //         total:pagination.total
                    //     })
                    // },
                    showTotal:(a)=>`共${a}条`
                }}
                loading={loading}
                tableNumbers={{isShow:true,title:'序号列',width:150,align:'center'}}
                onChange={(a)=>{lazyLoading(a)}}
            >
            </BasicTable>
        </div>
    )

}