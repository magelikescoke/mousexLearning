import React, {useState, useEffect} from "react";
import { Modal, Table } from "dw-mx";
const dataS = [
    {
        key:1,
        ksbm:1,
        ksmc:'科室1'
    },
    {
        key:2,
        ksbm:2,
        ksmc:'科室2'
    },
    {
        key:3,
        ksbm:3,
        ksmc:'科室3'
    }
]
const columns = [
    {
        title:'科室编码',
        dataIndex:'ksbm'
    },
    {
        title:'科室名称',
        dataIndex:'ksmc'
    },
]
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function LovChild(props){
    const {setValue, setInfo, onOK, onCancel,setKsInfo} = props
    const [data, setData] = useState([])
    useEffect(() => {
        setData(dataS)
    },[])
    return (
        <Modal visible={true} onCancel={onCancel}>
            <Table
                columns = {columns}
                dataSource = {data}
                rowKey = {'ksbm'}
                onRow = {
                    (record, index) => {
                        return {
                            onDoubleClick: ()=>{
                                // setValue({
                                //     ksbm:record.ksbm,
                                //     ksmc:record.ksmc
                                // })
                                setKsInfo({
                                        ksbm:record.ksbm,
                                        ksmc:record.ksmc
                                    })
                                onOK();
                            }
                        }
                    }
                }
            >
            </Table>
        </Modal>
    )
}