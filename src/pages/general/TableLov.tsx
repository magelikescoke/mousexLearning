import { Modal } from "dw-mx";
import { Code } from "dw-mx-extend";
import { request } from "dw-mx-request";
import { BasicTable, SelectCell } from "dw-mx-table";
import React, { useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function TableLov(props){
    const {update, getInfo, onOK, onCancel} = props;
    const [data, setData] = useState([])
    const fv = getInfo()
    useEffect(
        ()=>{
            getData()
        },
        []
    )
    const getData = async()=>{
        setData(await request('/mock/search/ksInfo')) 
    }
    const columns = [
        {
            title: '科室名称',
            dataIndex: 'ksmc',
            render:(value)=>{
                return <SelectCell value={value} options={Code.JSONCODE([
                    {value: "内科", content: "内科"},
                    {value: "外科", content: "外科"},
                    {value: "儿科", content: "儿科"},
                ])}/>;
            }
        }
    ];
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
                                fv.ksbm = record.key
                                fv.ksmc = record.ksmc
                                update(fv)
                                onOK();
                            }
                        }
                    }
                }
                >
            </BasicTable>
        </Modal>
    )
}
