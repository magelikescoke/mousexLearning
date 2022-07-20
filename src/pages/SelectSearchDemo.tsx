import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Select, Button } from 'dw-mx';
import { request } from 'dw-mx-request';
export default function SelectSearchDemo() {
    const [form] = Form.useForm();
    const { Option } = Select;
    const [data,setData] = useState([])
    const [searchvalue,setSearchValue] = useState('')
    let timeout;
    let currentValue;
    const fetch = (value, callback) => {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = value;
        const fake = async () => {
            const ret  = await request('/mock/test/search', { value })
            if(currentValue === value){
                const r = ret.data
                const result = [];
                r.forEach(item => {
                    result.push({
                        key:item.key,
                        value:item.address,
                        text:item.address,
                    })
                })
                callback(result);
            }
        }
        timeout = setTimeout(fake, 300);
    }
    const handleChange = (value) => {
        setSearchValue(value)
    }
    
    const onSearch = (value) => {
        form.setFieldsValue({search:''})
        if (value) {
            fetch(value, data => setData(data));
        } else {
            setData([]);
        }
    }
    const options = data.map(item => {
        return <Option  key={item.key} value={item.value}>{item.text}</Option>
    })
    const onClick = () => {
        const ret = form.getFieldsValue()
        console.log(ret)
    }
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
    };
    return (
        <div>
            <Form form={form}
                  {...layout}
                  layout={'horizontal'}>
                <Row>
                    <Col span={8}>
                        <Form.Item label="地区" name="search" rules={[{ required: true }]}>
                            <Select
                                value={searchvalue}
                                placeholder="input search text"
                                onChange={handleChange}
                                onSearch={onSearch}
                                showSearch
                                defaultActiveFirstOption={false}
                                showArrow={false}
                                filterOption={false}
                                notFoundContent={null}
                            >
                                {options}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Button onClick={onClick}>取值</Button>
        </div>
    );
}