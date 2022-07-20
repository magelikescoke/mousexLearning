import { Button,Form, Row, Col,Input, Select, Card, Table, Space } from "dw-mx";
import React, {useState,useEffect} from "react";
import LovChild from "./LovChild";
export default function LovTest() {
    const [ksInfo, setKsInfo] = useState({})
    const [lov, updateLov] = useState(
         false,
    )
    const openLov = ()=>{
        updateLov(
            true,
        )
    }
    const closeLov = ()=>{
        updateLov(
            false,
        )
    }
    const [form] = Form.useForm()
    
    return (<div>
            <Form form={form}>
                <Row>
                <Col span={6}>
                            <Form.Item name="ksbm" label="科室编号">
                                <Input.Search onSearch={() => openLov()} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="ksmc" label="科室名称">
                                <Input readOnly={true} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                        
                        </Col>
                </Row>
            </Form>
                
        
        
        {lov && <LovChild
            onOK = {closeLov}
            onCancel = {closeLov}
            // setValue = {form.setFieldsValue}
            setKsInfo= {setKsInfo}
        >
        </LovChild>}
    </div>)
}