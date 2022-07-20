/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Modal } from "dw-mx";
import { BasicTable,SelectCell } from "dw-mx-table";
import { Code } from "dw-mx-extend";
import {request} from 'dw-mx-request'
import React, { useEffect,useState } from "react";
export default function TableLov(props) {
    const [data, setData] = useState([])
    const {onOk, onCancel, setValue} = props
    const columns = [
        {
            title: '科室名称',
            dataIndex: 'ksmc',
            render:(value)=>{
                return <SelectCell value={value} options={Code.JSONCODE([
                    {value: "1", content: "内科"},
                    {value: "2", content: "外科"},
                    {value: "3", content: "儿科"},
                ])}/>;
            }
        }
    ];
    useEffect(
        ()=>{getInfo()},
        []
    )
    const getInfo = async()=>{
        setData(await request('/mock/search/ksInfo')) 
    }
    return (
        <Modal title='请选择' visible={true} onCancel={onCancel}>
        <BasicTable 
            dataSource={data}
            columns = {columns}
            tableNumber={{isShow:true,title:'序号',width:150,align:'left'}}
            onRow = {
                (record, index) => {
                    return {
                        onDoubleClick: ()=>{
                            setValue({
                                ksbm:record.key,
                                ksmc:record.ksmc
                            })
                            onOk();
                        }
                    }
                }
            }
            >
        </BasicTable>
        </Modal>
    )
}