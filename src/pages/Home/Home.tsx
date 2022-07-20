import React from 'react';
import { Form, Row, Col, Button, Input, Space} from 'dw-mx';
import { BasicTable } from 'dw-mx-table';
import FormTableTemplate from '@/components/templateComponent/FormTableTemplate';
import Config from '@/components/templateComponent/ComponentConfiguraction';

export default function Home() {
    const [form] = Form.useForm();

    const dataSource = [
        {
            key: 0,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        },
        {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        },
        {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        },
        {
            key: 3,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        },{
            key: 4,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        },{
            key: 5,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        },
        {
            key: 6,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        },
        {
            key: 7,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        },
        {
            key: 8,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        },
        {
            key: 9,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        },{
            key: 10,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        },{
            key: 11,
            date: '2018-02-1',
            amount: 120,
            type: 'income',
            note: 'transfer',
        },
    ]

    const columnsList = Config['HomepageConfig'].HomePageColumnsListGroup;
    const columns = columnsList.map((value, index) => {
        if (value.renderKey == 'delete') {
            value['render'] = (_value, record, _index) => {
                return (<a>Delete</a>);
            }
        }
        return value;
    })
    const pagination = {
        pageSize:5,
    }
    const onClick = async (value) => {
        // 可以从外部取值
        console.log(form.getFieldsValue());

        // 可以验证必填项
        try {
            const values = await form.validateFields();
            console.log('Success:', values);
        } catch (errorInfo) {
            // 验证失败
            console.log('Failed:', errorInfo);
        }
    };
    const formButtonList = (
        <Button onClick={onClick} type={'primary'}>取值</Button>
    )
    // const columns = [

    //     {
    //         title: 'Date',
    //         dataIndex: 'date',
    //     },
    //     {
    //         title: 'Amount',
    //         dataIndex: 'amount',
    //     },
    //     {
    //         title: 'Type',
    //         dataIndex: 'type',
    //     },
    //     {
    //         title: 'Note',
    //         dataIndex: 'note',
    //     },
    //     {
    //         title: 'Action',
    //         key: 'action',
    //         render: () => <a>Delete</a>,
    //     },
    // ]

   

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
    };

   
    return (
        <>
            <FormTableTemplate
                // 传输form模板的数据和方法
                form={form}
                configKey={'HomepageConfig'}
                formListGroupKey={'HomePageFormListGroup'}
                formButtonList={formButtonList}
                layout={layout}
                // 传入Table模板的数据和方法
                data={dataSource}
                columns={columns}
                pagination={pagination}
            ></FormTableTemplate>
            {/* <Form form={form}
                  {...layout}
                  layout={'horizontal'}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item label="单位名称" name="name" rules={[{ required: true }]}>
                            <Input placeholder={"单位名称"} maxLength={10}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="单位地址" name="address" rules={[{ required: true }]}>
                            <Input placeholder={"单位地址"} maxLength={10}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Row justify={'start'}>
                            <Space>
                                <Button onClick={onClick} type={'primary'}>取值</Button>
                            </Space>
                        </Row>
                    </Col>
                </Row>
            </Form>
            <BasicTable
                dataSource={dataSource}
                pagination={pagination}
                columns={columns}
            /> */}
        </>
    )
}